# Number Representations

Wolfram Language has a curiously flexible syntax for number literals. We will build up a grammar for number literals from their constituent syntactic parts.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Number Representations](#number-representations)
	- [Syntax](#syntax)
		- [Signs in a Number Literal](#signs-in-a-number-literal)
		- [Digits](#digits)
		- [Numbers in a specified base](#numbers-in-a-specified-base)
			- [Examples](#examples)
			- [Non Examples](#non-examples)
		- [Specifying numeric precision and accuracy.](#specifying-numeric-precision-and-accuracy)
			- [Examples](#examples)
			- [Non Examples](#non-examples)
		- [Scientific Form / Scientific Notation](#scientific-form-scientific-notation)
			- [Examples](#examples)
			- [Non Examples](#non-examples)
	- [Complete Number Representation](#complete-number-representation)
	- [A Regular Expression Accepting Number Literals](#a-regular-expression-accepting-number-literals)

<!-- /TOC -->


## Syntax

### Signs in a Number Literal

The sign of a number, that is, whether the number is positive, zero, or negative, is manifestly intrinsic to the semantics of the number. However, a number's sign, when given explicitly, is treated syntactically as an operator. Indeed, there are several operators effecting the sign of a number: `#!wl Minus`, `#!wl UnaryPlus`, `#!wl PlusMinus`, and `#!wl MinusPlus`. These operators may even be nested arbitrarily, as in the expression `#!wl -+7`. Thus, treating a negative sign in, say, `#!wl -7` as an operator is syntactically the more consistent alternative. As a consequence, all number literals in Wolfram Language are necessarily nonnegative according to this spec.

The exception to this rule applies not to number literals but rather to the decorations on number literals: the precision, accuracy, and exponent all accept a single (unnested) optional `#!wl +` or `#!wl -`.

!!! warning "Compatibility Warning"
	Mathematica only accepts the ASCII `-` character and its character code synonyms `\:002d` and `\.2d` in number literal forms. The Unicode character form `\:2212`, named character `#!wl \[Minus]`, and corresponding Unicode literal `#!wl −` (which renders identically to ASCII `#!wl -`) are not allowed within number literal forms. This spec requires complying implementations to accept the ASCII `#!wl -` in number literal decorations. However, implementations may also accept Unicode `#!wl Minus` anywhere an ASCII `#!wl -` may appear. (There is no Unicode equivalent to `#!wl +` that Mathematica recognizes, so `#!wl +` does not have this issue.)

### Digits

The most basic component of any number is the digit. The decimal digits 0 through 9 are fundamental even within number forms expressed in bases other than 10.

```antlr
fragment
DIGIT: [0-9];
```

Wherever a number with a point is allowed to appear, either the digits to the left of the point or the right of the point may be ommitted, but not both. Note that numbers may begin with any number of leading zeros.

```antlr
fragment
DecimalNumber
	:	DIGIT+ '.' DIGIT* 	// We can omit numbers after the decimal point and not before, or...
	|	DIGIT* '.' DIGIT+ 	// ...before the decimal point and not after.
	| DIGIT+ // An integer, no (decimal) point.
	;
```

Note that a negative sign is not included in the definition of `DecimalNumber`.

### Numbers in a specified base

Wolfram Language also allows number literals in bases other than base 10, with letters<sup name="aletters" id="aletters">[1](#letters)</sup> acting as the digits for bases higher than 10, up to base 36.<sup name="amaxbase" id="amaxbase">[2](#maxbase)</sup> No distinction is made between lowercase and capital letters.

```antlr
fragment
DigitInAnyBase: DIGIT | [a-zA-Z];

fragment
NonDecimalNumber
    : DigitInAnyBase+ '.' DigitInAnyBase*  	// We can omit numbers after the decimal point and not before, or...
    | DigitInAnyBase* '.' DigitInAnyBase+  	// ...before the decimal point and not after.
    | DigitInAnyBase+  // An integer, no point.
    ;

fragment
NumberInBase: DIGIT+ '^^' NonDecimalNumber; // Additional constraints below.
```

We observe again that a negative sign is not included in these definitions.

The number preceding the `^^` [pseudo-operator](Pseudo-operators.md) specifies the base in which the following digit sequence is to be interpreted. The `NumberInBase` production must satisfy the following additional constraints:

1. The `^^` must be preceded by a base that is an integer between 2 and 36, itself expressed in base 10, though the base may have arbitrarily many leading zeros.
2. The `NonDecimalNumber` following `^^` may contain only digits compatible with the base. Thus a number in base $n$ consists of digits corresponding to the decimal numbers $0$ to $n -1$, and each digit greater than $9$ is represented by a letter according to the following table.

```wl
10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35
↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕   ↕
a   b   c   d   e   f   g   h   i   j   k   l   m   n   o   p   q   r   s   t   u   v   w   x   y   z
```

#### Examples

```wl
2^^101.101
(* 5.625 *)

35^^WolframLanguage
(* 135376476330464607218449 *)

16^^dead.Beef
(* 57005.7 *)
```

#### Non Examples

```wl
1^^0.00
(* $Failed *)

3.5^^12
(* Syntax::sntxf: "3.5^" cannot be followed by "^12". *)

6^^1972
(* General::digit: Digit at position 2 in 1972 is too large to be used in base 6. *)

99^^123abc
(* $Failed *)

10^^-30
(* Syntax::tsntxi: "10^^-35" is incomplete; more input is needed. *)
```

!!! info
	The output in the non examples above are those given by Mathematica v11.3.0. Implementations are encouraged to provide more consistently helpful error messages, especially for the last non example.

### Specifying numeric precision and accuracy.

Precision and accuracy are related concepts in Wolfram Language. See the section *index.md* for a detailed discussion. A number literal may either specify a precision or an accuracy, but not both. A single backtick `` ` `` after a number specifies _machine precision_. A number followed by a single backtick and a `DecimalNumber` specifies a precision of `DecimalNumber`. A precision or accuracy specifier must appear before a scientific form multiplier.

```antlr
fragment
numberLiteralPrecision
	:	'`' (( '+' | '-')? DecimalNumber)? // Precision
	|	'``' ( '+' | '-')? DecimalNumber // Accuracy
	;
```

Note that if a sign is given for precision, it must be followed by a `DecimalNumber`.

!!! warning
	Mathematica's `Precision` and `Accuracy` functions return `∞`. However, `∞` cannot be used in a number literal.


#### Examples

```wl
123`
(* 123. *)

1.381`
(* 1.381 *)

16^^9fe.c3`7
(* 2558.76172 *)

3.0`+7
(* 3.000000 *)

3`7
(* 3.000000 *)

3.000000000000000000000`7
(* 3.000000 *)

3.000000000000000000`-7
(* 0. *)
```

#### Non Examples

```wl
16^^9fe.c3`\[Minus]7 (* Treated as subtraction. *)
(* 2551.76 *)

3.98``
(* Syntax::sntxf: "3.98" cannot be followed by "``". *)

2``\:22127 (* Differs in command line vs FE vs `ToExpression`. *)
(* 2 *)
(* Syntax::tsntxi: "2.\[Minus]7" is incomplete; more input is needed. *)

2``\[Minus]7 (* WARNING: Crashes command line interface leaving zombie kernel running at 100% of CPU. *)
(* Syntax::tsntxi: "2.\[Minus]7" is incomplete; more input is needed. *)

2`+
(* Syntax::tsntxi: "2.+" is incomplete; more input is needed. *)

2`-
(* Syntax::tsntxi: "2.-" is incomplete; more input is needed. *)

3``+
(* Syntax::sntxf: "3" cannot be followed by "``+". *)
(* Syntax::tsntxi: "3.+" is incomplete; more input is needed. *)

3``-
(* Syntax::sntxf: "3" cannot be followed by "``-". *)
(* Syntax::tsntxi: "3.-" is incomplete; more input is needed. *)

3`\[Infinity] (* Interpreted as 3.0 * \[Infinity] *)
(* ∞ *)

3``\[Infinity] (* WARNING: Crashes command line interface leaving zombie kernel running at 100% of CPU. *)
(* $CharacterEncoding::utf8: The byte sequence {249} could not be interpreted as a character in the UTF-8 character encoding. *)
```

### Scientific Form / Scientific Notation

A multiplier `base^power` may be provided using the [[pseudo-operator|Pseudo-operators]] `*^` followed by an optionally signed integral power itself expressed in base 10. The `*^` expression must appear after any precision or accuracy expression.

```antlr
fragment
numberLiteralExponent
	:	'*^' ( '+' | '-')? DIGITS
	;
```

Observe that
1. This form does not contain `DecimalNumber` but rather `DIGITS`, which is a string of digits in base 10.
2. The `*^` must be followed by `DIGITS`.

#### Examples

```wl
3.98`5*^3
(* 3980.0 *)

16^^dead.beef``+4*^-3
(* 13.9174 *)

0.0000000001*^10
(* 1. *)

35^^small*^-10 // InputForm
(* 6139108/394078193359375 *)

10000000000*^-10
(* 1 *)
```

#### Non Examples

```wl
1.0*^1.9 (* Parsed by FE as (1.0*^1)*0.9. *)
(* General::ifexp: The exponent 1.9 is not an integer.
Syntax::sntxb: Expression cannot begin with "1.0*^1.9". *)

3*^\[Minus]1 (* FE message vs. command line message. *)
(* Syntax::tsntxi: "3.^\[Minus]1" is incomplete; more input is needed. *)
(* Syntax::sntxb: Expression cannot begin with "3*^\[Minus]1". *)

3.98*^3`5 (* FE message vs. command line message. *)
(* Syntax::tsntxi: "3.98*10^3`5" is incomplete; more input is needed. *)
(* Syntax::sntxf: "3.98*^3" cannot be followed by "`5". *)

16^^dead.beef*^-3``4 (* FE message vs. command line message. *)
(* Syntax::tsntxi: "16^^dead.beef*^-3``4" is incomplete; more input is needed. *)
(* Syntax::sntxf: "16^^dead.beef*^-3" cannot be followed by "``4". *)

1*^\[Infinity] (* FE message vs. command line message. *)
(* Syntax::sntxb: Expression cannot begin with "1*^\[Infinity]". *)
(* Syntax::tsntxi: "1.^\[Infinity]" is incomplete; more input is needed. *)
```



## Complete Number Representation

We combine the grammar components defined above to obtain the final grammar production for number literals.

```antlr
numberLiteral
	:	DIGITS NumberInBase numberLiteralPrecision? numberLiteralExponent? // Number in any base.
	|	(DIGITS | DecimalNumber) numberLiteralPrecision? numberLiteralExponent? // Number in base ten.
	;
```

!!! warning "Compatibility Warning"
	Mathematica automatically interprets number literals, discarding the original input form in most cases. Consequently, there is no `FullForm` representation of number literals. One cannot extract, for example, the base of a number. Implementations may emulate Mathematica's behavior or maintain the input representation of a number literal.

!!! warning "Compatibility Warning"
	Mathematica does not allow any whitespace whatsoever within a number literal expression.

## A Regular Expression Accepting Number Literals

The following regular expression matches all Wolfram Language number literals without special character input forms. However, if a base is specified, it does not require that the given digits are compatible with the base, but those are the only invalid strings it accepts.

```perl
((([2-9]|[1-2]\d|[3][0-5])\^\^(\w*\.\w+|\w+\.\w*|\w+))|(\d*\.\d+|\d+\.\d*|\d+))((``(\+|-)?(\d*\.\d+|\d+\.\d*|\d+))|(`((\+|-)?(\d*\.\d+|\d+\.\d*|\d+))?))?(\*\^(\+|-)?\d+)?
```

!!! important
	This regular expression does not require that the digits be compatible with the given base. For example, it will match `#!wl 7^^2a` even though `a` is not a digit in base 7.

## Additional Examples and Non Examples

### Examples using special character input forms

```wl
4\.2b5 (* ASCII plus is 0x2B. *)
(* 9 *)

4\:002b5
(* 9 *)

4\.2d6 (* ASCII minus is 0x2D. *)
(* -2 *)

4\:002d6
(* -2 *)

4*^\.2b01
(* 40 *)

4*^\:002b01
(* 40 *)

4``\.2b02
(* 4.0 *)

4``\.2b02
(* 4.0 *)

4`\.2b02
(* 4.0 *)

4`\.2b02
(* 4.0 *)

\.31\.36\.5e\.5e\.44\.65\.61\.64\.2e\.42\.65\.65\.66\.60\.60\.2b\.34\.2a^-3 (* 16^^Dead.Beef``+4*^-3 *)
(* 13.9174 *)

\:0031\:0036\:005e\:005e\:0044\:0065\:0061\:0064\:002e\:0042\:0065\:0065\:0066\:0060\:0060\:002b\:0034\:002a\:005e\:002d\:0033 (* 16^^Dead.Beef``+4*^-3 *)
(* 13.9174 *)

16^^\.66
(* 15 *)
```

### Example due to Richard Fateman

This example is from:

> Richard J. Fateman, "A review of Mathematica," _Journal of Symbolic Computation,_ vol. 13, iss. 5, May 1992, p. 545-579. doi: [10.1016/s0747-7171(10)80011-2](https://doi.org/10.1016/S0747-7171%2810%2980011-2)


```wl
In[1]:= 4/.4->5
Out[1]= 10. -> 5

In[2]:= 4/ .4->5
Out[2]= 10. -> 5

In[3]:= 4 /.4->5
Out[3]= 10. -> 5

In[4]:= 4/. 4->5
Out[4]= 5
```

<hr>

<b id="letters" name="letters"><sup>1</sup></b> Here we mean letters in the [ISO basic Latin alphabet](https://en.wikipedia.org/wiki/ISO_basic_Latin_alphabet), not to be confused with letter-like forms. [↩](#aletters)

<b id="maxbase" name="maxbase"><sup>2</sup></b> The limitation to a maximum base of 36 is, of course, due to the fact that there are only 10 decimal digits and 26 letters, making 36 different possible digits to use in a number literal. An implementation could conceivably allow larger integral bases despite an inability to express every digit in the base, e.g., `100^^25==205`. Such number forms would be confusing, to say the least, and so are disallowed by this spec. [↩](#amaxbase)
