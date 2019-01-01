# Style Guide

Use [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Writing Style Guide

Write in [standard written English](https://en.wikipedia.org/wiki/Standard_written_English) in approximation to [Wikipedia's Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style). In particular, "Style and formatting should be consistent within an article."

## Special Symbols

Almost every editor and browser can handle characters outside of the ASCII character set. Feel free to use either an html entity `&sum;`, decimal reference `&#8721;`, hex reference `&#x2211;`, or the character itself ∑.

Note that Mathematica makes use of Unicode code points that do not represent the characters Mathematica displays. For example, `#!wl \[WolframLanguageLogo]` is the codepoint `&#61726;` which is marked "for private use"—it is not a valid Unicode character and renders as &#61726;. For these cases, it is best to use the long name: `#!wl \[WolframLanguageLogo]`.

## Mathematical Typesetting

Inline math is typeset between single `$`-signs. Thus, `#!latex $\sqrt{1+x^2}$` renders as $\sqrt{1+x^2}$. Likewise, use `$$…$$` or `\[…\]` for displayed math:

```latex
$$
x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}
$$
```
renders as

\[x={\frac {-b\pm {\sqrt {b^{2}-4ac}}}{2a}}.\]

!!! important
    A displayed math equation needs to be surrounded by newlines as if it were in its own paragraph.


## Code Style Guide

Place code within a code fence with the explicit language identifier. For example,

    ```wl
    StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
    ```

results in the following:

```wl
StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
```

Set off code within text by placing it between two backticks (`` ` ``), optionally with an inline language specifier: `` `#!wl f[N@{g/@m}]` `` is rendered as `#!wl f[N@{g/@m}]`.

The language specifiers are typically just the language name (see the [Pygments docs](http://pygments.org/docs/lexers/)): `python`, `c`, `cpp`, `latex`, `perl` (for regexes), `antlr` (for grammars), `python`, `java`. Use `wl`, _not_ `mma` or `mathematica`, as the language identifier for WL.

### Formal Grammars

The rule of thumb is that formal grammar representations should be considered pseudocode unless explicitly labelled otherwise. We express formal grammars in the usual syntax of Flex and Bison but allow regular expressions to be included within productions. Even so, we may capitalize purely lexical rules as is tradition. Productions end with a semicolon. Following [ANTLR4 syntax](https://www.antlr.org/), productions that can only appear within another production may be marked with `#!antlr fragment`. This can make complicated productions easier to read while communicating that the `#!antlr fragment` cannot appear on its own. Thus, a simplified example might be:

```antlr
fragment DIGIT : [0-9];
DecimalNumber : DIGIT+ '.' DIGIT*;
```

On occassions when a pure Bison, Flex, ANTLR4, or other specific grammar syntax is intended, the grammar should be labelled with its specific grammar syntax. Likewise, a pure regular expression should be labelled as such. If you use features in a regular expression that are specific to a particular syntax standard (PCRE, POSIX, Perl), please indicate the syntax standard you are using.

### WL Code

A WL expression (almost) always evaluates to another valid WL expression, so it is necessary to distinguish input expressions from output expressions using the `#!wl In[1]:= ` and `#!wl Out[2]= ` labels respectively, just as the Mathematica command line interface does:

```wl
In[1]:= StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]

Out[1]= "MyList"
```

An alternative to the above is to place the expected output of the expression in a code comment immediately below the expression. This has the disadvantage that the output is not syntax highlighted.

```wl
StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
(* "MyList" *)
```

It is often useful to write the output of an evaluation differently from how Mathematica would display it by default. In the examples above, `#!wl "MyList"` is written within double quotes, i.e. in `#!wl InputForm`, to make it clear that the result is a string. It is not necessary to write `#!wl Out[4]//InputForm= "MyList"` in these cases.

GFM does not word-wrap WL code. For long lines of code, adding a linebreak improves readability and prevents an ugly scrollbar from appearing in the code block. Indent the continuation to make it clear that it is a continuation of the expression.

```wl
In[1]:= toCamelCase[str_String] :=
            StringJoin[Capitalize[ToLowerCase[StringSplit[str]]]]
```

WL encourages writing code that is difficult to read. A little bit of whitespace can make a big difference.

```wl
In[1]:= toCamelCase[str_String] :=
            StringJoin[
                Capitalize[
                    ToLowerCase[
                        StringSplit[str]
                    ]
                ]
            ]
```

Always put code that is included inline in a sentence between backticks: writing `` `#!wl PrimeQ/@Range[20]` `` renders as `#!wl PrimeQ/@Range[20]`.
Only short pieces of code should be inlined. For example, `#!wl PrimeQ/@Range[20]` is ok, but `#!wl toCamelCase[str_String] := StringJoin[Capitalize[ToLowerCase[StringSplit[str]]]]` is too long.

When writing a specification for WL, always make note of where there can be incompatibilities with Mathematica using a "Compatibility Warning" as described in the next section.


## Admonitions

We use the (Admonitions plugin)[https://python-markdown.github.io/extensions/admonition/] for MKDocs which provides the following admonition environments:
`Important`, `Abstract`, `Info`, `Tip`, `Success`, `Question`, `Warning`, `Failure`, `Danger`, `Bug`, `Example`, and `Quote`. Writing

```
!!! warning "Compatibility Warning"
    This is a warning about compatibility with Mathematica.
```

will render as

!!! important "Compatibility Warning"
    This is a warning about compatibility with Mathematica.

## Authorship
If you author an article, feel free to add a byline. If you add significantly to an article with a byline, feel free to add your name to the byline. Neither is required.
