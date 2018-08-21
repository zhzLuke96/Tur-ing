from tape import tape
from utils import clearCommit
import re
import os


def setCONSOLE(title):
    os.system(f"title {title}")


class tur:
    def __init__(self, bias=0, gap="" ,debug=False):
        self.init(bias, gap, debug)

    def init(self, bias, gap, debug):
        self.variable = tape(self.title if debug else None)
        self.stack = []
        self.bias = bias
        self.gap = gap
        self.macro = dict()

    def title(self):
        setCONSOLE(self.variable.this)

    def run(self, code):
        return self.eval(self.parser(self.lexer(code)))

    def updateMacro(self, fAll):
        for m in fAll:
            self.macro.update({
                m[0]: m[1]
            })

    def lexer(self, code):
        # pattern = re.compile(r'[^\S]')
        # return re.sub(pattern,"",clearCommit(code))
        code = clearCommit(code)

        reg = re.compile("(\w[\d\w]*){([^}]*)}")
        macros = reg.findall(code)
        self.updateMacro(macros)

        pattern = re.compile('(\w[\d\w]*){([^}]*)}')
        return re.sub(pattern, "", code)

    def parser(self, code):
        return code

    def eval(self, tokens):
        PC = 0
        while len(tokens) >= PC + 1:
            token = tokens[PC]
            PC += 1
            if token is "(":
                mName = ""
                while token is not ")":
                    token = tokens[PC]
                    PC += 1
                    mName += token
                self.eval(self.macro[mName[:-1]])
            elif token is ")":
                raise Exception("Uncaught SyntaxError: Unexpected token )")
            elif token is "+":
                self.variable.inc()
            elif token is "-":
                self.variable.sub()
            elif token is "?":
                self.variable.dispVal(self.bias, self.gap)
            elif token is ",":
                self.variable.set(ord(input("")[0]))
            elif token is ";":
                self.variable.set(int(input("")))
            elif token is ".":
                self.variable.disp(self.bias, self.gap)
            elif token is ">":
                self.variable.rise()
            elif token is "<":
                self.variable.drop()
            elif token is "[":
                if self.variable.get() is 0:
                    counter = 1
                    while counter > 0:
                        token = tokens[PC]
                        PC += 1
                        if token is "[":
                            counter += 1
                        if token is "]":
                            counter -= 1
                else:
                    self.stack.append(PC - 1)
            elif token is "]":
                PC = self.stack.pop()
