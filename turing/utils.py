import re

def clearCommit(code):
    pattern = re.compile('//.+|\s|/\*\*[\W\w]*\*/')
    return re.sub(pattern,"",code)

def Compress(code):pass

def deCompress(code):pass
