import json
import os

class Blacklist:
    def __init__(self, filepath: os.PathLike):
        self.path = filepath
        self.blacklist = []
        with open(self.path) as f:
            f = json.load(f)
            self.blacklist = f['id']

    def isBlocked(self, requestId: int) -> bool:
        return requestId in self.blacklist
    
    def register(self, requestId: int) -> int:
        if self.isBlocked(requestId):
            return -1
        self.blacklist.append(requestId)
        self.updateToLocal()
        return requestId

    def updateToLocal(self):
        d = dict()
        d['id'] = self.blacklist
        with open(self.path, 'w') as f:
            json.dump(d, f, ensure_ascii=False, indent=4, sort_keys=True)
