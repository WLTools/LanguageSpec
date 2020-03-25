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
 second form of `#!wl ToExpression` gives a syntax error in both the FE and command line.

### Number forms

These number forms should be accepted but fail differently in the FE vs. CL.

```wl
2``\:22127 (* Differs in command line vs FE vs `ToExpression`. *)
(* 2 *)
(* Syntax::tsntxi: "2.\[Minus]7" is incomplete; more input is needed. *)

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
```
Note that this behavior is inconsistent with the behavior of `#!wl 3``\[Infinity]`, which is also incorrect:
```wl
3`\[Infinity] (* Interpreted as 3.0 * \[Infinity] *)
(* ∞ *)
```


## Differences that are semantically equivalent

### Flattening `#!wl Times` in arithmetic expressions

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

The following should not be accepted: 
```wl
3.000000000000000000`-7
(* 0. *)
```

This is interpreted incorrectly:
```wl
16^^9fe.c3`\[Minus]7 (* Treated as subtraction. *)
(* 2551.76 *)
```

The interpretation of the following is up for debate, but the output given is clearly incorrect:
```wl
3`\[Infinity] (* Interpreted as 3.0 * \[Infinity] *)
(* ∞ *)
```