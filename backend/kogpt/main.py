import os

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

app = Flask(__name__)
CORS(app)

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

# Start building KoGPT model
print('Start building model')
start = datetime.now()
model = KoGPTInference(pretrained_model_name, revision, device=device)
print(f'elapsed time for building model --> {datetime.now() - start}')
# Finish building KoGPT model

# get local json as prmompt string
prompt_project_list = projectParser.parseLocalJsonToPromptString(filepath=prompt_project_json_path)
prompt_motive_list = motiveParser.parseLocalJsonToPromptString(filepath=prompt_motive_json_path)

@app.route("/project", methods=["POST"])
def generate_project_self_introduction():
    if request.method == "POST":
        requestText = request.get_json(silent=True)
        if requestText is None:
            return jsonify({"error": "no input data"})
        try:
            requestPrompt = projectParser.parseRequestJsonToPromptString(d=requestText)
            prompt, promptLen = projectParser.mergePrompts(local=prompt_project_list, req=requestPrompt)
            recommendText = model.generate(prompt=prompt, temperature=temperature, max_length=maxLength)
            recommendText = stringValidation(str(recommendText)[promptLen:])
            logger.info(f'projectIntroduction: {recommendText}')
            introductionByResume = {"projectIntroduction": recommendText}
            return jsonify(introductionByResume)
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
            requestPrompt = motiveParser.parseRequestJsonToPromptString(d=requestText)
            prompt, promptLen = motiveParser.mergePrompts(local=prompt_motive_list, req=requestPrompt)
            recommendText = model.generate(prompt=prompt, temperature=temperature, max_length=maxLength)
            recommendText = stringValidation(str(recommendText)[promptLen:])
            logger.info(f'motiveIntroduction: {recommendText}')
            introductionByResume = {"motiveIntroduction": recommendText}
            return jsonify(introductionByResume)
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
