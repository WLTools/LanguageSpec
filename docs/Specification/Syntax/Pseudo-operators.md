# Pseudo-operators

There are several tokens in Wolfram Language whose status as an operator is questionable.

* String-related characters like `#!wl "` and `#!wl \< … \>`.
* The line continuation pseudo-operator `#!wl \`.
* The character representation operators: `#!wl \[name]`, `#!wl \:nn`, `#!wl \.nnnn` and the catalog of escaped characters `#!wl \r`, `#!wl \t`, etc.
* The newline escape character `#!wl \n`, which can cancel an implicit multiplication.
* The number representation pseudo-operators: `#!wl ^^`, `#!wl *^`, and ```#!wl  `` ```.
* The single ``#!wl  ` `` character appears in two distinct contexts: to specify precision in a number literal and as a context path separator. Both uses might be considered lexical rather than operational.
* The comment matchfix operator `#!wl (* … *)`.
* The `#!wl Get` and `#!wl Put` operates `#!wl <<` and `#!wl >>`.
* The information operators `#!wl ??` and `#!wl ?`.

These are pseudo-operators in the sense that their function is write-time  representation rather than runtime computation. They are lexemes that are such basic units of the language that they may be processed by Mathematica during or even prior to the lexical analysis phase of the code parsing process similar to how `C/C++` compiler drivers preprocess `#!c #define`, `#!c #include`, and other preprocessor directives before sending the result to the compiler.

These sorts of language elements are not unique to Wolfram Language, of course, and language tool authors generally make choices about how to handle them based on their syntactic role within the language and what simplifies the software engineering task.

## Precedence of Pseudo-operators

There are cases in which pseudo-operators need a notion of precedence.

### Precision vs. context

```wl
In[1]:= Global`b
Out[1]= b
In[2]:= FullForm[7`b]
Out[2]//FullForm= Times[7.`,b]
```

In this case, the `` ` `` is interpreted as the precision pseudo-operator, not the context pseudo-operator.

### Decimal point versus various operators

```wl
2//.3 == ReplaceRepeated[2,3]
2/.3->4 == Rule[Times[2,Power[0.3`,-1]],4]
1...3 == Times[RepeatedNull[1],3]
_.1 == Times[Optional[Blank[]], 1]
x_.3 == Times[Optional[Pattern[x,Blank[]]],3]
b=.1 == Set[b, 0.1`]
b=. 1 == Times[Unset[b], 1]
1... == RepeatedNull[1]
1.. == Repeated[1]
1...1 == Times[RepeatedNull[1],1]
1..1 == Times[Repeated[1],1]
1.... == $Failed
1....1 == Times[RepeatedNull[1], 0.1`]
1..... == Repeated[RepeatedNull[1]]
1.....1 == Times[Repeated[RepeatedNull[1]],1] 
```

The operators (each written as an example here) that DO NOT steal the `.` from a trailing digit are `a/.1`, 
`a/:b=.1`, and `a=.1`. As noted, `//.` is inconsistent with `/.`, and the `Dot` operator `(a.b)` needs to be 
treated as a special case. This places the “precedence” of a leading decimal point between `//.` and `/.`, which is
 consistent with everything except the `Dot` operator. 