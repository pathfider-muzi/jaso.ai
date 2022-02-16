#coding=utf-8

import re

def searchEndLine(text: str) -> int:
    endLine = re.search('\n\n', text)
    if endLine == None:
        return -1
    return endLine.start()

def searchInvalidSentence(text: str) -> int:
    matches = list(re.finditer("\. ", text))
    if len(matches) == 0: 
        return -1
    return matches[-1].end()

def stringValidation(text: str) -> str:
    end = searchEndLine(text)
    if end > 0:
        return text[:end]
    end = searchInvalidSentence(text)
    if end < 0:
        return text
    return text[:end]
