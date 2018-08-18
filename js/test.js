// const tur = require('./Turing');
const tur_b = require('./Turing_backtrack');

function exec_tCode(code,self,bias,gap){
    with(self){
        init(false,bias,gap)
        console.time("Turing [use time]");
        console.log("\nTuring END:",eval(parser(lexer(code))) || "[__DEFAULT EOF__]");
        console.timeEnd("Turing [use time]");
    }
}

// TEST 1
// exec_tCode("+++++.",tur);

// TEST t_b parser
// let res = tur_b.parser(tur_b.lexer("+[++-[-].]."))
// console.log(res)

// exec_tCode("++++++++++>+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->+++++++>++++++++++>+++>+<<<<->++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.",tur_b);

exec_tCode(`
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
`,tur_b);


let fib = `
+++++ >+ >+?             // init [4,1,1];
<<[
    >                   // arr[1]->arr[2;3];
    [
        > +
        > +
        << -
    ]
    >?>[-<<+>>]<<       // arr[3]->arr[1];
    >                   // arr[2]->arr[1;3];
    [
        < +
        >> +
        < -
    ]
    >[-<+>]<            // arr[3]->arr[2];
    <?
    <-
]
`
exec_tCode(fib,tur_b,0," ")
