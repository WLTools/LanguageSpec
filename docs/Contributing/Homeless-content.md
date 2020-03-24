# Homeless Contents

This is a catch-all document for content that should be incorporated somewhere but for one reason or another has not yet found the right place.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Homeless Contents](#homeless-contents)
	- [Documentation, examples, test suites](#documentation-examples-test-suites)
	- [Mathematica behaviors / quirks](#mathematica-behaviors-quirks)
		- [Different behavior between `ToExpression` vs command line](#different-behavior-between-toexpression-vs-command-line)
		- [Frontend](#frontend)
			- [RawEscape is as a letter](#rawescape-is-as-a-letter)

<!-- /TOC -->

## Documentation, examples, test suites

* Cory Walker's [test suite and documentation](https://wolframlanguage.slack.com/archives/CD3MW4V7E/p1540959075045600):
    * [Together Documentation](https://corywalker.github.io/expreduce-docs/builtin/manip/together/)
    * [Together Documentation Source](https://github.com/corywalker/expreduce/blob/master/expreduce/resources/manip.m#L22)

## Mathematica behaviors / quirks

### Different behavior between the kernel and the notebook

The kernel and frontend have different parsers. The differences between them are usually
 semantically equivalent, but that is not always the case. This section collections meaningful
  differences between the two. See also Operator Precedence, which lists differences in operator
   precedence specifically. 

#### `x_.` vs `x_..`

*Notebook:* The expression `x_..` is a syntax error, because `x_.` is first parsed as `Optional
[Pattern[x,Blank[]]]`, and then `.` is encountered as an unexpected character.

*Kernel:* The `..` is recognized as `Repeated`, so `x_..` is parsed as `Repeated[Pattern[x,Blank
[]]]`


### Different behavior between `ToExpression` vs command line

The command line and `ToExpression` nearly always give the same output. Here are two examples where `ToExpression` does not match the command line.

Command line:

```wl
In[1]:= 2``\:22127

Out[1]= 2
```

`ToExpression`:

```wl
In[1]:= ToExpression["2``\\:" <> "22127"]

Out[1]= $Failed
```

On the command line, the following either emits a UTF-8 character encoding error and crashes or else results in the following (notice the skipped `In`/`Out` number):
```wl
In[1]:= 2``\[Minus]7

Out[3]= 2
```

`ToExpression`:
```wl
In[1]:= ToExpression["2``\\[" <> "Minus]7"]

Out[1]= $Failed
```

### Frontend

#### RawEscape is as a letter

From: https://wolframlanguage.slack.com/archives/CDQJUDQ11/p1541094222036400

`\[RawEscape]` is supposed to be a letter-like character. Note also that `\[RawEscape]` is listed as a letter in `UnicodeCharacters.tr`. However, the FE has a hard time with it.

```wl
MathLink`CallFrontEnd[ FrontEnd`UndocumentedTestFEParserPacket["a\[RawEscape]a", False]]
```

The FE allows `\[RawEscape]` to begin a symbol name but not to end a symbol name. The FE interprets as `\[RawEscape]` at the end as implicit multiplication.

The command line does not have this problem, i.e. it treats `\[RawEscape]` as a letter without issue.
