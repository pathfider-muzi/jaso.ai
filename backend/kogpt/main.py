import os
import requests

# import server dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS

from datetime import datetime

# import KoGPT inference dependency
from typing import Optional, Union
from transformers import PreTrainedTokenizerFast
from transformers import GPTJForCausalLM

# prompt processing
import projectParser
import motiveParser

# Response validation check
from responseValidChecker import stringValidation

# Celery
from celery import Celery

# Log
import logging

# Logging setting
logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler = logging.FileHandler('responseMessage.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Declare local json path
prompt_project_json_path = 'data/project_resume.json'
prompt_motive_json_path = 'data/motive_resume.json'

# Declare KoGPT variables
pretrained_model_name = 'kakaobrain/kogpt'
revision = 'KoGPT6B-ryan1.5b-float16'
device = 'cuda'
temperature = 0.8
maxLength = 2048

# Flask setting
app = Flask(__name__)
app.config.update(
	CELERY_BROKER_URL='redis://localhost:6379',
	CELERY_RESULT_BACKEND='redis://localhost:6379'
)
CORS(app)

# Celery setting
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

# Global var
isInit = True
model = None

# get local json as prmompt string
prompt_project_list = projectParser.parseLocalJsonToPromptString(filepath=prompt_project_json_path)
motiveIdx, prompt_motive_list = motiveParser.parseLocalJsonToPromptString(cnt=0, filepath=prompt_motive_json_path)

# response
url = 'https://api-jasoai.kro.kr/'
headers = {'Content-Type': 'application/json'}

class KoGPTInference:
    def __init__(self, pretrained_model_name_or_path: Optional[Union[str, os.PathLike]], revision: str = 'KoGPT6B-ryan1.5b-float16', device: str = 'cuda'):
        assert device in ('cuda', 'cpu')
        self.tokenizer = PreTrainedTokenizerFast.from_pretrained(
            pretrained_model_name_or_path, revision=revision,
            bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
        )

        model = GPTJForCausalLM.from_pretrained(
            pretrained_model_name_or_path,  revision=revision,
            pad_token_id=self.tokenizer.eos_token_id,
            torch_dtype='auto', low_cpu_mem_usage=True
        )

        model.eval()
        self.model = model.to(device=device)
        self.device = device

    def generate(self, prompt: str, temperature: float, max_length: int = 128) -> str:

        tokens = self.tokenizer.encode(prompt, return_tensors='pt').to(device=self.device, non_blocking=True)

        gen_tokens = self.model.generate(tokens, do_sample=True, temperature=temperature, max_length=max_length)
        gen_text = self.tokenizer.batch_decode(gen_tokens)[0]
        return gen_text

def init():
    global isInit
    global model

    # Start building KoGPT model
    print('Start building model')
    start = datetime.now()
    model = KoGPTInference(pretrained_model_name, revision, device=device)
    print(f'elapsed time for building model --> {datetime.now() - start}')
    # Finish building KoGPT model

    isInit = False

@celery.task
def project_generation(d: dict, prompt: str, promptLen: int) -> str:
    global isInit
    if isInit:
        init()
    try:
        recommendText = model.generate(prompt=prompt, temperature=temperature, max_length=maxLength)
        recommendText = stringValidation(str(recommendText)[promptLen:])
        logger.info(f'projectIntroduction: {recommendText}')
        introductionByResume = {"resumeProjectId": d['resumeProjectId'], "projectIntroduction": recommendText}
        res = requests.post(url=url + 'generation/project/result', json=introductionByResume, headers=headers).json()
    except Exception as e:
        exception_message = {"error": str(e)}
        res = requests.post(url=url + 'generation/project/result', json=exception_message, headers=headers).json()
    return res

@celery.task
def motive_generation(d: dict, prompt: str, promptLen: int) -> str:
    global isInit
    if isInit:
        init()
    try:
        recommendText = model.generate(prompt=prompt, temperature=temperature, max_length=maxLength)
        recommendText = stringValidation(str(recommendText)[promptLen:])
        logger.info(f'motiveIntroduction: {recommendText}')
        introductionByResume = {"resumeMotivationId": d['resumeMotivationId'], "motiveIntroduction": recommendText}
        res = requests.post(url=url + 'generation/motivation/result', json=introductionByResume, headers=headers).json()
    except Exception as e:
        exception_message = {"error": str(e)}
        res = requests.post(url=url + 'generation/motivation/result', json=exception_message, headers=headers).json()
    return res

@app.route("/project", methods=["POST"])
def generate_project_self_introduction():
    if request.method == "POST":
        requestText = request.get_json(silent=True)
        if requestText is None:
            return jsonify({"error": "no input data"})
        try:
            requestPrompt = projectParser.parseRequestJsonToPromptString(d=requestText)
            prompt, promptLen = projectParser.mergePrompts(local=prompt_project_list, req=requestPrompt)
            task = project_generation.delay(d=requestText, prompt=prompt, promptLen=promptLen)
            res = requests.get(url='http://localhost:5555/api/queues/length').json()['active_queues'][0]['messages']
            return jsonify({"queueNum": res + 5})
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"

@app.route("/motive", methods=["POST"])
def generate_motive_self_introduction():
    if request.method == "POST":
        requestText = request.get_json(silent=True)
        if requestText is None:
            return jsonify({"error": "no input data"})
        try:
            requestPrompt = motiveParser.parseRequestJsonToPromptString(cnt=motiveIdx, d=requestText)
            prompt, promptLen = motiveParser.mergePrompts(local=prompt_motive_list, req=requestPrompt)
            task = motive_generation.delay(d=requestText, prompt=prompt, promptLen=promptLen)
            res = requests.get(url='http://localhost:5555/api/queues/length').json()['active_queues'][0]['messages']
            return jsonify({"queueNum": res + 5})
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
