import os
import json


def parseName(name: str) -> str:
	return f'1) 프로젝트 이름\n{name}\n'


def parseDetail(detail: str) -> str:
	return f'2) 프로젝트 설명\n{detail}\n'


def parseTerm(term: str) -> str:
	return f'3) 프로젝트 기간\n{term}\n'


def parseRole(role: list) -> str:
	ret = '4) 프로젝트에서 맡은 역할\n'
	for idx, r in enumerate(role):
		ret = ret + f'({idx + 1}) {r}\n'
	return ret


def parseResult(result: list) -> str:
	ret = '5) 프로젝트에서 얻은 결과\n'
	for idx, r in enumerate(result):
		ret = ret + f'({idx + 1}) {r}\n'
	return ret


def parseFeeling(feeling: list) -> str:
	ret = '6) 프로젝트에서 느낀 점\n'
	for idx, f in enumerate(feeling):
		ret = ret + f'({idx + 1}) {f}\n'
	return ret

def parseIntroduction(introduction: str) -> str:
	return f'7) 프로젝트 소개서\n{introduction}\n\n'


def CLS() -> str:
	return '7) 프로젝트 소개서\n'


def parseLocalJsonToPromptString(filepath: os.PathLike) -> list:
	ret = []
	with open(filepath) as file:
		f = json.load(file)
		for d in f:
			ret.append(parseName(d['projectName']) + parseDetail(d['projectDetail']) + parseTerm(d['projectTerm']) + parseRole(d['projectRole']) + parseResult(d['projectResult']) + parseFeeling(d['projectFeeling']) + parseIntroduction(d['projectIntroduction']))
	return ret

def parseRequestJsonToPromptString(d: dict) -> str:
	return parseName(d['projectName']) + parseDetail(d['projectDetail']) + parseTerm(d['projectTerm']) + parseRole(d['projectRole']) + parseResult(d['projectResult']) + parseFeeling(d['projectFeeling']) + CLS()

def mergePrompts(local: list, req: str):
	ret = ''
	for l in local:
		ret = ret + l
	return ret + req, len(ret + req)
