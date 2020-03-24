# Exploring Mathematica

This pages points to ways of exploring Mathematica's implementation of Wolfram Language.

# Spelunking
To access the definition of a built-in function, simply use `PrintDefinitions` from the `GeneralUtilities` package. (You don’t need the [Spelunking Tools](https://mathematica.stackexchange.com/questions/1742/what-is-the-most-convenient-way-to-read-definitions-of-in-memory-symbols-when-we/15948#15948) anymore.)

```wl
In[1]:= GeneralUtilities`PrintDefinitions[GeneralUtilities`PrintDefinitions]

Out[1]= NotebookObject[GeneralUtilities`PrintDefinitions]
```

# Parsing Expressions

The FE creates a box representation of your input as you type. The box representation then gets reinterpreted as an expression by the kernel. The FE often interprets input differently from the kernel. In particular, there are many cases of inconsistencies in operator precedence between the FE and `ToExpression` / command line. Therefore, we need ways of explicitly choosing which component parses an expression even if we are working in a notebook.

## Using the kernel to parse an expression

Using `ToExpression` or the command line interface uses the kernel directly to parse the expression, circumventing the FE's parser. To make sure your expression is parsed by the kernel even if you are working in a notebook, do this:

```wl
In[10]:= FullForm[ToExpression["Hold[a|b*c]"]]

Out[10]//FullForm= Hold[Alternatives[a,Times[b,c]]]
```

It matters how you use `ToExpression`. Compare:

```wl
In[1]:= ToExpression["a;;\[Intersection]a\[SquareIntersection];;a", StandardForm, Hold]//FullForm

Syntax::sntxf: "a;; ⋂ a ⊓" cannot be followed by ";;a".

ToExpression::sntx:
   Invalid syntax in or before "\!\(StandardForm\`a;;\:22c2a\:2293;;a\) ".
                                                                       ^
Out[1]//FullForm= $Failed
```

gives a different result from

```wl
In[1]:= ToExpression["Hold[a;;\[Intersection]a\[SquareIntersection];;a]"]//FullForm

Out[1]//FullForm= Hold[Span[SquareIntersection[Intersection[Span[a, All], a], System`Private`DummyId], a]]
```

in both the FE and command line.

## Using the Frontend to parse an expression

To ask the FE to interpret an expression given as a `String`, do this:

```wl
FEToExpression[s_String] :=
 MakeExpression@FrontEndExecute@FrontEnd`ReparseBoxStructurePacket[s]
```

Alternatively, you can use the `UndocumentedTestFEParserPacket` function:

```wl
FEToExpression[s_String] := MakeExpression[
    MathLink`CallFrontEnd[
        FrontEnd`UndocumentedTestFEParserPacket[s, False]
        ][[1]] (* Do not need form annotation. *)
    ]
```

Note that `UndocumentedTestFEParserPacket` returns a list of the form `{boxexpression, form}`, where `form` is usually `StandardForm`.

# Wolfram Virtual Machine

Currently, the `Compile` function produces bytecode for the Wolfram Virtual Machine (WVM), a register machine. This is lightly documented in the official docs:<br>
https://reference.wolfram.com/language/Compile/tutorial/Overview.html<br>
https://reference.wolfram.com/language/Compile/tutorial/Operation.html

[Silvia](https://mathematica.stackexchange.com/users/17/silvia) on [SE](https://mathematica.stackexchange.com/) wrote a [nice pretty printer and control flow analyzer](https://mathematica.stackexchange.com/questions/4343/automatically-generating-a-dependency-graph-of-an-arbitrary-mathematica-function/4346#4346) for the bytecode. (There are other CFG generators for source code.)

Tools to disassemble the bytecode are provided in ``CompiledFunctionTools` ``:

```wl
Needs["CompiledFunctionTools`"];

testCode = Compile[{{data,_Real,1}, {y,_Real,1}},
    Module[{n, z, testdata},
        n = Length[data];
        z = (data-y)/Sqrt[Abs[y]];
        testdata = 1/2 (Erf[#/Sqrt[2]] + 1)& /@ z;
        (Sqrt[n] + .12 + .11 / Sqrt[n]) Max[Abs[Range[n] / n - Sort[testdata]]]
    ]
];

CompilePrint[testCode, ShowInstructions -> True]
```

The above code gives:
d-objdump

```gas 

		2 arguments
		9 Integer registers
		7 Real registers
		7 Tensor registers
		Underflow checking off
		Overflow checking off
		Integer overflow checking on
		RuntimeAttributes -> {}

		T(R1)0 = A1
		T(R1)1 = A2
		I7 = 0
		R6 = 0.11
		I6 = 2
		I4 = 1
		R5 = 0.12
		Result = R2

1	{33, 0, 0}                                    I0 = Length[ T(R1)0]
2	{40, 43, 3, 1, 1, 3, 1, 2}                    T(R1)2 = - T(R1)1
3	{44, 0, 2, 3}                                 T(R1)3 = T(R1)0 + T(R1)2
4	{40, 38, 3, 1, 1, 3, 1, 2}                    T(R1)2 = Abs[ T(R1)1]
5	{40, 57, 3, 1, 2, 3, 1, 4}                    T(R1)4 = Sqrt[ T(R1)2]
6	{40, 60, 3, 1, 4, 3, 1, 2}                    T(R1)2 = Reciprocal[ T(R1)4]
7	{45, 3, 2, 3}                                 T(R1)3 = T(R1)3 * T(R1)2
8	{33, 3, 3}                                    I3 = Length[ T(R1)3]
9	{6, 7, 8}                                     I8 = I7
10	{35, 3, 3, 2}                                 T(R1)2 = Table[ I3]
11	{6, 7, 5}                                     I5 = I7
12	{3, 13}                                       goto 25
13	{10, 6, 2}                                    R2 = I6
14	{40, 60, 3, 0, 2, 3, 0, 0}                    R0 = Reciprocal[ R2]
15	{37, 3, 5, 3, 2}                              R2 = GetElement[ T(R1)3, I5]
16	{10, 6, 3}                                    R3 = I6
17	{40, 57, 3, 0, 3, 3, 0, 4}                    R4 = Sqrt[ R3]
18	{40, 60, 3, 0, 4, 3, 0, 3}                    R3 = Reciprocal[ R4]
19	{16, 2, 3, 2}                                 R2 = R2 * R3
20	{40, 75, 3, 0, 2, 3, 0, 3}                    R3 = Erf[ R2]
21	{10, 4, 2}                                    R2 = I4
22	{13, 3, 2, 3}                                 R3 = R3 + R2
23	{16, 0, 3, 0}                                 R0 = R0 * R3
24	{36, 8, 0, 3, 2}                              Element[ T(R1)2, I8] = R0
25	{4, 5, 3, -12}                                if[ ++ I5 <= I3] goto 13
26	{10, 0, 1}                                    R1 = I0
27	{40, 57, 3, 0, 1, 3, 0, 0}                    R0 = Sqrt[ R1]
28	{40, 60, 3, 0, 0, 3, 0, 2}                    R2 = Reciprocal[ R0]
29	{16, 6, 2, 4}                                 R4 = R6 * R2
30	{13, 0, 5, 4, 2}                              R2 = R0 + R5 + R4
31	{6, 0, 5}                                     I5 = I0
32	{6, 7, 1}                                     I1 = I7
33	{35, 5, 2, 4}                                 T(I1)4 = Table[ I5]
34	{6, 7, 2}                                     I2 = I7
35	{3, 2}                                        goto 37
36	{36, 1, 2, 2, 4}                              Element[ T(I1)4, I1] = I2
37	{4, 2, 5, -1}                                 if[ ++ I2 <= I5] goto 36
38	{10, 0, 4}                                    R4 = I0
39	{40, 60, 3, 0, 4, 3, 0, 1}                    R1 = Reciprocal[ R4]
40	{41, 259, 3, 0, 1, 2, 1, 4, 3, 1, 5}          T(R1)5 = R1 * T(I1)4
41	{42, Sort, 3, 1, 2, 3, 1, 4}                  T(R1)4 = Sort[ T(R1)2]]
42	{40, 43, 3, 1, 4, 3, 1, 6}                    T(R1)6 = - T(R1)4
43	{44, 5, 6, 5}                                 T(R1)5 = T(R1)5 + T(R1)6
44	{40, 38, 3, 1, 5, 3, 1, 6}                    T(R1)6 = Abs[ T(R1)5]
45	{42, MaxRT, 3, 1, 6, 3, 0, 1}                 R1 = MaxRT[ T(R1)6]]
46	{16, 2, 1, 2}                                 R2 = R2 * R1
47	{1}                                           Return

```
