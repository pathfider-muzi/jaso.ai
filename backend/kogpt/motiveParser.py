import os
import json


def parseName(name: str) -> str:
	return f'1.\n1) 지원한 회사 이름\n{name}\n'

def parseRole(role: str) -> str:
	return f'2) 지원한 직무\n{role}\n'
	
def parseDetail(detail: str) -> str:
	return f'3) 지원한 회사 소개\n{detail}\n'

def parseEmphasis(emphasis: list) -> str:
	ret = '4) 강조하고 싶은 동기\n'
	for idx, e in enumerate(emphasis):
		ret = ret + f'({idx + 1}) {e}\n'
	return ret

def parseMotivation(motivation: str) -> str:
	return f'5) 지원한 동기\n{motivation}\n'

def CLS() -> str:
	return '5) 지원한 동기\n'

def parseLocalJsonToPromptString(filepath: os.PathLike) -> list:
	ret = []
	with open(filepath) as file:
		f = json.load(file)
		for d in f:
			ret.append(parseName(d['orgName']) + parseRole(d['orgRole']) + parseDetail(d['orgDetail']) + parseEmphasis(d['motivationEmphasis']) + parseMotivation(d['motivation']))
	return ret

def parseRequestJsonToPromptString(d: dict) -> str:
	return parseName(d['orgName']) + parseRole(d['orgRole']) + parseDetail(d['orgDetail']) + parseEmphasis(d['motivationEmphasis']) + CLS()

def mergePrompts(local: list, req: str):
	ret = ''
	for l in local:
		ret = ret + l
	return ret + req, len(ret + req)
