from tur import tur
from time import time
import sys


def execTur(code, t):
    start = time()
    res = t.run(code)
    print("\nTuring EOF:", res if res is not None else "[__DEFAULT EOF__]")
    print("Turing [use time]:", time() - start)

# python test.py ../example/math.tur debug


if len(sys.argv) > 1:
    D = len(sys.argv) is 3
    turm = tur(gap="", debug=D)
    with open(sys.argv[1], "r") as f:
        execTur(f.read(), turm)
