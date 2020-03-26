# Differences Between Mathematica's Command Line and Notebook Frontend

There are many differences in behavior between Wolfram Mathematica's command line interface and notebook frontend,
which use different parsers. The differences may be categorized into two groups: those that matter and those that
 don't. A difference in behavior "doesn't matter" if the behavior is semantically identical, that is, if the different
  behavior has no effect on Mathematica programs. Semantically meaningful differences are important for programmers
   to know about and were the primary motivation for this effort to describe Wolfram Language.
  
The phrase "no effect" needs qualification, because Mathematica is able to inspect its own behavior. In this context,
no effect means the difference can only be detected using homoiconic reflection, e.g. inspecting the literal text of
 code or inspecting some undocumented internal structure of the system. However, see the section 
 [Hashing](#semantically-meaningful-differences) below.

## Semantically meaningful differences

Semantically meaningful differences can effect how programs are executed. The first item in this section, Hashing, 
shows that *all syntactic differences are semantically meaningful.* Despite this fact, we nonetheless place syntactic
 differences that only effect hashing under the "semantically equivalent" category.

### Hashing

!!! quote "From [Hash—Wolfram Language Documentation](https://reference.wolfram.com/language/ref/Hash.html)"
    * The "Expression" hash code is computed from the internal representation of an expression and may vary between
    computer systems and from one version of the Wolfram Language to another. 
    * For hash code types (such as "SHA") that operate on sequences of bytes, 
    `#!wl Hash[expr, \[Ellipsis]]` first converts
    *expr* to bytes according to ... bytes based on `#!wl ToString[FullForm[expr]]`. 

As a consequence of the above, any expression for which the FE and command line give different `#!wl FullForm
` expressions also have different hashes in each. Many examples of this are given below.

### Determining the FullForm expression of an expression

Different methods of determining `#!wl FullForm` give different answers. The following two ways to transform an
  expression to FullForm give different results such that only one of them is an error.
  
```wl
In[1]:= ToExpression["Hold[a;;\[Intersection]b\[SquareIntersection];;c]"]//FullForm
Out[1]//FullForm= Hold[Span[SquareIntersection[Intersection[Span[a,All],b],System`Private`DummyId],c]]
```
vs.
```wl
In[3]:= ToExpression["a;;\[Intersection]b\[SquareIntersection];;c",StandardForm,Hold]//FullForm
During evaluation of In[3]:= Syntax::sntxf: "a;;\[Intersection]b\[SquareIntersection]" cannot be followed by ";;c".
During evaluation of In[3]:=
ToExpression::sntx: 
   Invalid syntax in or before 
    "\!\(StandardForm\`a;;\[Intersection]b\[SquareIntersection];;c
        \)
                                          
         ^
      ".
Out[3]//FullForm= $Failed
```

If the expressions within the strings are entered as expressions in the FE, it is a syntax error. However, only the
 second form of `#!wl ToExpression` gives a syntax error in the command line as well.

### Number forms

These number forms should be accepted but fail differently in the FE vs. CL.

```wl
2``\:22127 (* Differs in command line vs FE vs `ToExpression`. *)
(* 2 *)
(* Syntax::snthex: 4 hexadecimal digits are required after \: to construct a 16-bit character. *)
(* Syntax::tsntxi: "2.\[Minus]7" is incomplete; more input is needed. *)

Accuracy[2``\:22127] (* Same as above. Fails in both FE and CL the same, `ToExpression` different. *)
(* ToExpression::sntx: 
   Invalid syntax in or before "Accuracy[2``\[Minus]7]".
                                         ^  
 *)
(* Syntax::sntxf: "Accuracy" cannot be followed by "[2``\:22127]". *)

2``\[Minus]7 (* WARNING: Crashes command line interface leaving zombie kernel running at 100% of CPU. *)
(* Syntax::tsntxi: "2.\[Minus]7" is incomplete; more input is needed. *)
```

Number forms that are malformed but fail differently. This difference in error message is common not just in number
 forms, but these supply convenient examples.
```wl
3``+
(* Syntax::sntxf: "3" cannot be followed by "``+". *)
(* Syntax::tsntxi: "3.+" is incomplete; more input is needed. *)

3``-
(* Syntax::sntxf: "3" cannot be followed by "``-". *)
(* Syntax::tsntxi: "3.-" is incomplete; more input is needed. *)

2.78`26``10
(* Syntax::tsntxi: "2.78`26``10" is incomplete; more input is needed. *)
(* Syntax::sntxf: "2.78`26" cannot be followed by "``10". *)

2.78``26`10
(* Syntax::tsntxi: "2.78`26`10" is incomplete; more input is needed. *)
(* Syntax::sntxf: "2.78``26" cannot be followed by "`10". *)
```

Number forms whose interpretation is debatable but which fail differently:
```wl
3``\[Infinity] (* WARNING: Crashes command line interface leaving zombie kernel running at 100% of CPU. *)
(* $CharacterEncoding::utf8: The byte sequence {249} could not be interpreted as a character in the UTF-8 character encoding. *)

1.0*^1.9 (* Parsed by FE as (1.0*^1)*0.9. *)
(* General::ifexp: The exponent 1.9 is not an integer.
Syntax::sntxb: Expression cannot begin with "1.0*^1.9". *)
(* 9. *)
```

### Parsing identifiers in input

Consider the following command line session:
```wl
In[1]:= a\[RawEscape] = 7                                                       
Out[1]= 7

In[2]:= a\[RawEscape]^2                                                         
Out[2]= 49
```

It is impossible to do the same in the FE, as the FE insists on separating the `a` and `\[RawEscape]` and then doesn't
 know what to do with the input. Copy+pasting as plain text, as I have done below, automatically inserts a space
  between the `a` and `\[RawEscape]`.

```wl
In[1]:= a \[RawEscape]=7
During evaluation of In[5]:= Set::write: Tag Times in \[RawEscape] a is Protected.
Out[1]= 7
In[2]:= a \[RawEscape]^2
Out[2]= \[RawEscape]^2 a
```

To see what the FE is doing, compare
```wl
In[1]:= MathLink`CallFrontEnd[ FrontEnd`UndocumentedTestFEParserPacket["a\[RawEscape]a", False]]
Out[1]= List[BoxData[RowBox[List["a","\[RawEscape]a"]]],StandardForm]
```
to
```wl
In[2]:= MathLink`CallFrontEnd[ FrontEnd`UndocumentedTestFEParserPacket["a\[Alpha]a", False]]
Out[2]= List[BoxData["a\[Alpha]a"],StandardForm]
```

You can, however, begin an identifier with `\[RawEscape]` in the FE:
```wl
In[1]:= \[RawEscape]a = 7                                                       
Out[1]= 7

In[2]:= \[RawEscape]a^2                                                         
Out[2]= 49
```

A similar but distinct phenomenon happens with `\[LongDash]`. The difference is, the FE treats `a\[LongDash]b` as 
three symbols multiplied together, whereas it interprets `a\[RawEscape]b` as `Times[a,\[RawEscape]b]`.
```wl
In[1]:= Hold[a\[LongDash]b]//FullForm
Out[1]//FullForm= Hold[Times[a,\[LongDash],b]]
In[2]:= ToHeldExpression["a\[LongDash]b"]//FullForm
Out[2]//FullForm= Hold[a\[LongDash]b]
```

!!! caution
    "What is a valid identifier in Mathematica?" is currently an open question. All known methods of determining this, 
    including `SymbolNameQ` and ` UnicodeCharacters.tr`, do not provide correct answers.

### Parsing expressions involving `;;`

ToDo: Is this caused by differences in precedence or by incorrect input parsing? 

```wl
In[15]:= FullForm[a;;\[Intersection]a\[SquareIntersection];;a]
Syntax::sntxf: "a;;\[Intersection]a\[SquareIntersection]" cannot be followed by ";;a".

In[13]:= ToExpression["a;;\[Intersection]a\[SquareIntersection];;a", StandardForm, Hold]//FullForm
Out[13]//FullForm= Hold[SquareIntersection[Intersection[Span[a,All],a],Span[1,a]]]

In[15]:= FullForm[a;;\[Intersection]b]
Syntax::sntxf: "a;;" cannot be followed by "\[Intersection]b".

In[14]:= ToExpression["a;;\[Intersection]b", StandardForm, Hold]//FullForm
Out[14]//FullForm= Hold[Intersection[Span[a,All],b]]
```

### Expressions involving `.`

```wl
b=...1
(* Times[Repeated[Unset[b]], 1] *)
(* Syntax::sntxf: "b=" cannot be followed by "...1". *)


```

The operators (each written as an example here) that DO NOT steal the `.` from a trailing digit are `a/.1`, 
`a/:b=.1`, and `a=.1`. As noted, `//.` is inconsistent with `/.`, and the `Dot` operator `(a.b)` needs to be 
treated as a special case. This places the “precedence” of a leading decimal point between `//.` and `/.`, which is
 consistent with everything except the `Dot` operator. 

### Obscure grouping symbols

The obscure grouping symbols in `UnicodeCharacters.tr` are sometimes treated as parentheses, sometimes as symbols,
but don’t go away in the output. Other times they aren't parsed at all.
```wl
4*〔3+2〕 (* Cannot be copy+pasted into my terminal without special chars disappearing. *)
(* 14 *)
(* 20 〔 〕*)

4*\:3014 3+2 \:3015                                                     
(* 20 〔 〕 *)
(* 12 〔 + 2 *)

FullForm[Hold[4*\:3014 3+2 \:3015 ]  (* Note the inconsistency of the CL, which cannot parse this.. *)                 
(* Hold[Times[4,Times[\:3014,Plus[3,2],\:3015]]] *)
(* Syntax::sntxi: Incomplete expression; more input is needed . *)

ToExpression["4*〔3+2〕"]//FullForm  (* Can you spot where the `3` goes? *)
(* Plus[Times[2,\:3015],Times[4,\:30143]] *)

ToExpression["4*〔3+2〕"] (* This is where the 3 goes: The `〔3` is treated as an identifier.  *)
(* ) 2 〕+4 〔3 *)
```

## Differences that are semantically equivalent

### Flattening `#!wl Times` in arithmetic expressions with exact numbers

Command line Mathematica and Notebook Mathematica produce different output for `#!wl FullForm[Hold[-+x 2]]`:

```wl
(Notebook) In[1]:= FullForm[Hold[-+x 2]]
(Notebook) Out[1]//FullForm= Hold[Times[Times[-1,Plus[x]],2]]

(Terminal) In[1]:= FullForm[Hold[-+x 2]]
(Terminal) Out[1]//FullForm= Hold[Times[-1, Plus[x], 2]]

(Definition) In[1]:= FullForm[Hold[-+x 2]]
(Definition) Out[1]//FullForm= Hold[Times[Minus[Plus[x]], 2]]
```

Looks like the notebook doesn't properly flatten `Times[]`. Compare this to `+-x 2` for which both the notebook and the command line give the same result:

```wl
    In[1]:= FullForm[Hold[+-x 2]]
    Out[1]//FullForm= Hold[Times[Plus[Times[-1, x]], 2]]
```

Note that I could have just as easily used `#!wl -+2x` instead but wanted to avoid confusion with the following oddity,
 which is  distinct: Mathematica does not parse subtraction as-is.

```wl
In[1]:= FullForm[Hold[x - 4]]
Out[1]= Hold[Plus[x,-4]]

In[2]:= FullForm[Hold[x-y]]
Out[2]= Hold[Plus[x, Times[-1, y]]]
```

Mathematica's behavior is not entirely consistent when it comes to subtracting a constant. Mathematica interprets 
`#!wl x-4` as `#!wl Plus[x,-4]`, but if the constant is already negative, 
Mathematica doesn't simplify the multiplication by `#!wl -1`:

```wl
In[1]:= FullForm[Hold[x - -4]]
Out[1]= Hold[Plus[x,Times[-1, -4]]]
```



## Bugs

These aren't differences between interfaces. They're just bugs.


This is interpreted incorrectly:
```wl
16^^9fe.c3`\[Minus]7 (* Treated as subtraction. Note: Cannot be copy+pasted into FE. *)
(* 2551.76 *)
```

This is fixed in version 12:
```wl
+;;;

```

Crash the front end:
```wl
FrontEndExecute@ReparseBoxStructurePacket[Cell[1]]
```

(See the sections on number forms above for more ways to crash Mathematica.)

## Other Homeless Quirks

The expression `lhs/.1->2` is division by 0.1,  but `lhs /. 1 -> 2` is `ReplaceAll`. It contradicts two other similar 
forms. Compare
```wl
ToHeldExpression["1/.1"]//FullForm --> Hold[Times[1,Power[0.1`,-1]]]
ToHeldExpression["1//.1"]//FullForm  --> Hold[ReplaceRepeated[1,1]]
ToHeldExpression["1...1"]//FullForm  --> Hold[Times[RepeatedNull[1],1]]
```

Operators greedily consume tokens - except in the case of `/.`.