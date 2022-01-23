#coding=utf-8

import io
import os
import json
import pickle
import faiss
import argparse
import numpy as np    

from tqdm import tqdm
from glob import glob

import torch
import torch.nn as nn
import torch.nn.functional as F

from transformers import ElectraModel, ElectraTokenizer

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

device = 'cuda'
checkpoint_dir = 'models/experiment/model_batch_16_lr_1e-05_norm_false/checkpoints+'
feature_path = 'models/experiment/model_batch_16_lr_1e-05_norm_false/data_features.pkl'
pretrained_model_path = 'models'
max_length = 512

class ELECTRAEncoder(torch.nn.Module):
	def __init__(self, pretrained_model_path, ckpt_dir=None, norm=True):
		super().__init__()
		self.model = ElectraModel.from_pretrained(pretrained_model_path)
		self.norm = norm
		if ckpt_dir:
			self._init_weight(ckpt_dir)        
		
	def forward(self, batch):
		embed = self.model(**batch)        
		embed = embed.last_hidden_state[:,0,:]
		if self.norm:            
			embed = F.normalize(embed, dim=1)

		return embed
	
	def _init_weight(self, ckpt_dir):
		print("Load weight from {}".format(ckpt_dir))
		checkpoint = torch.load(ckpt_dir)
		self.load_state_dict(checkpoint) 

def build_model(pretrained_model_path, ckpt_dir, device):
	tokenizer = ElectraTokenizer.from_pretrained(pretrained_model_path)
	model = ELECTRAEncoder(pretrained_model_path, ckpt_dir)
	model.eval()
	model.to(device)
	return model, tokenizer

def extract_feat(text, max_length, model, tokenizer, device):
	input_ids = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=max_length)
	input_ids = {k:v.to(device) for k,v in input_ids.items() if k!='token_type_ids'}
	embed = model(input_ids)
	embed = embed.view(-1).cpu().detach().numpy()    
	return embed

def read_pkl(path):
	with open(path, 'rb') as f:
		data = pickle.load(f)
	return data

print("Start building model..")
device = torch.device(device=device)
ckpt_dir = glob(f'{checkpoint_dir}/*.pt')
ckpt_dir = sorted(ckpt_dir, key=lambda i: float(i.split('/')[-1].split('_')[-1].split('.pt')[0]))[0] # sort by eval loss
model, tokenizer = build_model(pretrained_model_path, ckpt_dir, device)
print("Finish building model!")

def build_faiss_index(feature_path, norm=True):
	data_features = read_pkl(feature_path)
	reference_embed = np.stack([d['body_embed'] for d in data_features])
	if norm:
		faiss.normalize_L2(reference_embed)
	faiss_index = faiss.IndexFlatIP(reference_embed.shape[1])
	faiss_index.add(reference_embed)     
	
	faiss_index_save_path = feature_path.replace('.pkl', '_faiss_index.pkl')
	faiss.write_index(faiss_index, faiss_index_save_path)
	return faiss_index, data_features

faiss_index, data_features = build_faiss_index(feature_path)

def recommendation(data, num):
	ret_recommendation_list = list()

	spec_text = f' {tokenizer.sep_token} '.join(data.split(' / '))
	spec_embed = extract_feat(spec_text, max_length, model, tokenizer, device)       
	distance, indicies = faiss_index.search(spec_embed.reshape(1, -1), num)
	
	distance = distance.tolist()[0]
	indicies = indicies.tolist()[0]
	
	nearest_docs = [data_features[idx] for idx in indicies]

	for idx, doc in enumerate(nearest_docs):
		push_dict = dict()
		rank = idx + 1
		near_title = doc['title']
		near_spec = doc['spec']
		near_body = doc['body']
		tags = near_title.split(' / ')
		tags.extend(near_spec.split(' / '))

		if len(near_spec)==0 or len(near_body)==0:
			continue
		
		push_dict['rank'] = rank
		push_dict['title'] = near_title
		push_dict['spec'] = near_spec
		push_dict['body'] = near_body
		push_dict['tags'] = tags
		ret_recommendation_list.append(push_dict)

	return ret_recommendation_list

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
	if request.method == "POST":
		req = request.get_json(silent=True)
		if req is None:
			return jsonify({"error": "no input data"})
		try:
			req_spec = req['spec']
			req_num = req['listNum']
			res = recommendation(req_spec, req_num)
			data = {"recommendationList": res}
			return jsonify(data)
		except Exception as e:
			return jsonify({"error": str(e)})

	return "OK"


if __name__ == "__main__":
	app.run(debug=True)
