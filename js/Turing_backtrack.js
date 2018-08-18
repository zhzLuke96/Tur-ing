const {
    clearCommit,Compress,deCompress
} = require('./Turing_utils.js');

const Turing = Object.create(null)

class tape {
    constructor(bias,gap) {
        this.self = [0]
        this.cursor = 0
        this.bias = bias || 0
        this.gap = gap || ""
    }
    get() {
        return this.self[this.cursor]
    }
    getChar() {
        return String.fromCharCode(this.get()+this.bias)
    }
    set(v) {
        this.self[this.cursor] = v
    }
    inc() {
        this.self[this.cursor] += 1
    }
    sub() {
        this.self[this.cursor] -= 1
    }
    rise() {
        this.cursor += 1;
        if (this.self.length <= this.cursor) this.self.push(0);
    }
    drop() {
        this.cursor -= 1;
    }
    disp() {
        process.stdout.write(this.getChar()+this.gap)
    }
    dispVal() {
        process.stdout.write(this.get()+this.gap)
    }
}

Turing.init = function(de,b,g){
    this.variable = new tape(b,g);
    this.stack = [];
    this.debug = de || false;
}

Turing.variable = new tape();

Turing.stack = [];

Turing.lexer = _STR_ => clearCommit(_STR_).replace(/[^\S]/g, "").split("");

Turing.parser = i=>i;

Turing.eval = function(tokens) {
    let PC = 0;
    let text = ""
    while (tokens.length >= PC + 1) {
        let _t = tokens[PC];
        PC += 1;
        text+=_t=="["||_t=="]"?"_":_t;
        switch (_t) {
            case "+":
                this.variable.inc();
                break;
            case "-":
                this.variable.sub();
                break;
            case "?":
                this.variable.dispVal();
                break;
            case ".":
                this.variable.disp();
                break;
            case ">":
                this.variable.rise();
                break;
            case "<":
                this.variable.drop();
                break;
            case "[":
                if(this.variable.get()==0){
                    let counter = 1;
                    while(counter>0){
                        _t = tokens[PC];PC += 1;
                        if(_t=="[")counter+=1;
                        if(_t=="]")counter-=1;
                    }
                    this.debug && console.log(this.variable.self,this.variable.cursor,PC)
                }else{
                    this.stack.push(PC - 1);
                }
                break;
            case "]":
                PC = this.stack.pop();
                break;
        }
    }
    this.debug && console.log("\n",text)
}

module.exports = Turing;
