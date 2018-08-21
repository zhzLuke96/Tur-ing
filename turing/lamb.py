# import re
import regex as re

gloENV = dict()


def trim(s):
    if len(s) == 0:
        return s
    elif s[0] in " \n\t":
        return (trim(s[1:]))
    elif s[-1] in " \n\t":
        return (trim(s[:-1]))
    return s


def insterBlank(code):
    return re.sub("([\\.()])", " \\g<1> ", code)


def simpleTREE(code):
    def nextSubTree(code):
        res = ""
        counter = 1
        for c in code:
            if c is "(":
                counter += 1
            elif c is ")":
                counter -= 1
            if counter is 0:
                return res
            res += c
        raise Exception("Uncaught SyntaxError: Unexpected token )")

    cur = 0
    res = []
    temp = ""
    while cur < len(code):
        if code[cur] is "(":
            if len(temp) is not 0:
                res += temp.split(" ")
                temp = ""
            n = nextSubTree(code[cur + 1:])
            res.append(f"({n})")
            cur += len(n) + 1
        elif code[cur] not in " \n\t":
            temp += code[cur]
        cur += 1
    return res
# \x y.x
# 0 = \f x.x
# succ = \n f x.f(n f x)
# 1 = (\n f x.f(n f x)) (\f x.x) => \f x.f(x)


def testObj(fn):
    def T(*args):
        print(fn(*args))
    return T


stest = testObj(simpleTREE)
stest("(\\n f x.f(n f x)) (\\f x.x)")
stest("\\n f x.f(n f x)")
print("###############")


class lambOBJ:
    def __init__(self, code):
        self.keys, self.body = map(lambda x: trim(x), code.split("."))
        self.keys = self.keys.split(" ")
        # print(self.keys, self.body)

    def __call__(self, *args):
        args = list(args)
        if len(self.keys) is not 0 and len(args) is not 0:
            body = self.body
            argslen = len(args)
            for k in self.keys:
                if len(args) is 0:
                    break
                body = self.body.replace(k, f"( {args.pop()} )")
            return "\\" + " ".join(self.keys[argslen:]) + "." + body
        return "\\" + " ".join(self.keys) + "." + self.body


succ = lambOBJ("n f x.f(n f x)")
zero = lambOBJ("f x.x")

once = succ(zero())
once2 = succ(zero(), succ(zero()))

print(once)
print(once2)


def parse(tree):
    global gloENV

    for l in tree:
        if l[0] is "(":
            return parse(simpleTREE(l))
        elif l[0] is "\\":
            pass


def lexer(code):
    return map(lambda x: re.split("\s+", x), insterBlank(trim(body)).split("\n"))


def eval_lamb(code):
    tokens = lexer(code)
    res = parse(tokens)
    print(res)

# class lamb:
#     def __init__(self, para, body):
#         self.para = para
#         self.body = map(lambda x: re.split("\s+", x),
#                         insterBlank(trim(body)).split("\n"))
#
#     def __call__(self):
#         global parse
#         return parse(self.body)
