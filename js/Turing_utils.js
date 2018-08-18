// const tur_b = require('./Turing_backtrack');

let test_code = `
+++++ +++++             // initialize counter (cell #0) to 10
[                       // use loop to set 70/100/30/10
    > +++++ ++          //     add  7 to cell #1
    > +++++ +++++       //     add 10 to cell #2
    > +++               //     add  3 to cell #3
    > +                 //     add  1 to cell #4
<<<< -                  // decrement counter (cell #0)
]
> ++ .                  // print 'H'
> + .                   // print 'e'
+++++ ++ .              // print 'l'
.                       // print 'l'
+++ .                   // print 'o'
> ++ .                  // print ' '
<< +++++ +++++ +++++ .  // print 'W'
> .                     // print 'o'
+++ .                   // print 'r'
----- - .               // print 'l'
----- --- .             // print 'd'
> + .                   // print '!'
> .                     // print '\\n'
`

function clearCommit(_c_){
    return _c_.replace(/\/\/.+|\s|\/\*\*[\W\w]*\*\//g,"");
}

function Compress(_c_){
    let tokens = _c_.match(/(\+|-|\[|\]|\.|>|<)\1*/g);
    for (let index in tokens) {
        tokens[index] = tokens[index].length==1?tokens[index]:tokens[index][0]+tokens[index].length;
    }
    return tokens.join("");
}
function deCompress(_c_){
    let tokens = _c_.match(/\+|-|\[|\]|\.|>|<|\d+/g);
    let repeat = (src,n)=>(new Array(n+1)).join(src);
    for (let _i in tokens) {
        let _t = tokens[_i]
        if(/\d/g.test(_t)){
            tokens[_i] = repeat(tokens[_i-1],parseInt(_t));
            tokens[_i-1] = ""
        }
    }
    return tokens.join("");
}

module.exports = {
    clearCommit,Compress,deCompress
};
//
// let dc = clearCommit(test_code)
// console.log(dc)
// let c = Compress(dc)
// console.log(c)
// let dec = deCompress(c)
// console.log(dec)
