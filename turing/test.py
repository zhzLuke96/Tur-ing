from tur import tur
from time import time

def execTur(code,t):
    start = time()
    res = t.run(code)
    print("\nTuring EOF:",res if res is not None else "[__DEFAULT EOF__]")
    print("Turing [use time]:",time()-start)


# hello
#

tm1 = tur()
with open("../example/hello.tur","r") as f:
    execTur(f.read(),tm1)

#
#

# fib
#

tm2 = tur(gap=" ")
with open("../example/fib.tur","r") as f:
    execTur(f.read(),tm2)

#
#

# macro finder
# tm3 = tur(gap=" ")
# import re
# from utils import clearCommit
# with open("../example/fib.tur","r") as f:
#     code = clearCommit(f.read())
#
#     pattern = re.compile('(\w[\d\w]*){([^}]*)}')
#     c = re.sub(pattern,"",code)
#
#     reg = re.compile("(\w[\d\w]*){([^}]*)}")
#     print(reg.findall(code),c)

# fib macro
#

tm3 = tur(gap=" ")
with open("../example/fib_macro.tur","r") as f:
    execTur(f.read(),tm3)

#
#
