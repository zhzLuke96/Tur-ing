const Turing = Object.create(null)

Turing.variable = [0];
Turing.variable.cursor = 0;
Turing.variable.add = function() {
    this[this.cursor] += 1;
}
Turing.variable.sub = function() {
    this[this.cursor] -= 1;
}
Turing.variable.display = function(){
    return console.log(String.fromCharCode(this[this.cursor]+32))
}

Turing.var_insert = function(o) {
    this.variable.push(o || 0);
    this.variable.cursor += 1;
};

Turing.lexer = _STR_ => _STR_.replace(/[^\S]/g, "").split("");

Turing.parser = input => input;

Turing.eval = function(tokens) {
    for (let _t of tokens) {
        switch (_t) {
            case "+":
                this.variable.add()
                break;
            case "-":
                this.variable.sub()
                break;
            case ".":
                this.variable.display()
                break;
            case ">":
                Turing.variable.cursor+=1;
                break;
            case "<":
                Turing.variable.cursor-=1;
                break;
            case "[":break;
            case "]":break;
        }
    }
}

module.exports = Turing;
