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
