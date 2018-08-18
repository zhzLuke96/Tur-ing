
class tape:
    def __init__(self):
        self.this = [0]
        self.cursor = 0

    def get(self):
        return self.this[self.cursor]

    def set(self,val):
        self.this[self.cursor] = abs(val)

    def getChar(self,b):
        return chr(self.get()+b)

    def inc(self):
        self.this[self.cursor] += 1

    def sub(self):
        self.this[self.cursor] -= 1

    def rise(self):
        self.cursor += 1
        if len(self.this) <= self.cursor:
            self.this.append(0)

    def drop(self):
        self.cursor -= 1

    def disp(self,b,g):
        print(self.getChar(b) + g,end="")

    def dispVal(self,b,g):
        print(str(self.get()) + g,end='')
