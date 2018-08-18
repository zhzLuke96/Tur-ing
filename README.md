# Tur-ing
language

fork by [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck)

todo:
- [ ] Standard Template Library
- [ ] Macro Scope
- [ ] optimize?

# Features
- comments
- function / macro

# Guide

    >   increment the data pointer (to point to the next cell to the right).
    <   decrement the data pointer (to point to the next cell to the left).
    +   increment (increase by one) the byte at the data pointer.
    -   decrement (decrease by one) the byte at the data pointer.
    .   output the character at the data pointer of ascii.
    ?   output the byte at the data pointer.
    ,   accept one byte of input, storing its value in the byte at the data pointer.
    ;   accept one number of input, storing its value in the byte at the data pointer.
    [   if the byte at the data pointer is zero, then instead of moving
        the instruction pointer forward to the next command, jump it forward
        to the command after the matching ] command.
    ]   if the byte at the data pointer is nonzero, then instead of moving the
        instruction pointer forward to the next command, jump it back to the
        command after the matching [ command.
    (   call macro, Between the () is name of macro, This
        can be thought of as an unconditional jump, or by pasting
        the code from the macro here.
    )   End of macro call

### Hello world
```
/**
 *   fork by wikipedia
 * - turing is great
 *
 */

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
> .                     // print '\n'
```
这里没有使用macro，看上去就是正常的bf

### 斐波那契数列
```
/**
 * author : zhzluke96 (sanshi) - github
 * mail   : zhz961101@gmail.com
 * date   : 18/08/18
 */
Fibonacci{
    >+? >+?                 // init [?,1,1];
    <<[
        >[>+>+<<-]          // stack[1]->stack[2;3];
        >?                  // print stack[2];
        >[-<<+>>]<<         // stack[3]->stack[1];
        >[<+>>+<-]          // stack[2]->stack[1;3];
        >[-<+>]<            // stack[3]->stack[2];
        <?                  // print stack[3];
        <-
    ]
    >[-]>[-]>[-]<<<         // garbage collection
}

main{
    ;(Fibonacci)            // input Number(opt;)
}

(main)
```
看上去强多了！
```
11
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368
Turing EOF: [__DEFAULT EOF__]
Turing [use time]: 4.164583683013916
```

# Tips
> js文件夹主要是摸索着玩的，主要还是python实现

用动态语言来写解释器，真滴爽爆

写这个东西，其实特别纠结，到底加啥呢？

`bf`虽然指令少，但是像`if`这种看上去没有的其实是可以实现出来的。思来想去，把它`函数化`看上去是唯一的选择

暂时没找过别的实现，不知道别人是怎么改编bf的，有空会研究下（你的代码写的很好！下一秒就是我的了！）

如果有什么好想法，联系我额~
