# Style Guide

Use [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Writing Style Guide

Write in [standard written English](https://en.wikipedia.org/wiki/Standard_written_English) in approximation to [Wikipedia's Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style). In particular, "Style and formatting should be consistent within an article."

## Special Symbols

Almost every editor and browser can handle characters outside of the ASCII character set. Feel free to use either an html entity `&sum;`, decimal reference `&#8721;`, hex reference `&#x2211;`, or the character itself ∑.

Note that Mathematica makes use of Unicode code points that do not represent the characters Mathematica displays. For example, `\[WolframLanguageLogo]` is the codepoint `&#61726;` which is marked "for private use"—it is not a valid Unicode character and renders as &#61726;. For these cases, it is best to use the long name: `\[WolframLanguageLogo]`.

## Mathematical Typesetting

GitHub refuses to support mathematical notation. A workaround is to use a Jupyter Notebook which GitHub will happily render complete with mathematics.

## Formal Grammars

The rule of thumb is that formal grammar representations should be considered pseudocode unless explicitly labelled otherwise. We express formal grammars in the usual syntax of Flex and Bison but allow regular expressions to be included within productions. Even so, we may capitalize purely lexical rules as is tradition. Productions end with a semicolon. Following ANTLR4 syntax, productions that can only appear within another production may be marked with `fragment`. This can make complicated productions easier to read while communicating that the `fragment` cannot appear on its own. Thus, a simplified example might be:

```antlr
fragment DIGIT : [0-9];
DecimalNumber : DIGIT+ '.' DIGIT*;
```

On occassions when a pure Bison, Flex, ANTLR4, or other specific grammar syntax is intended, the grammar should be labelled with its specific grammar syntax. Likewise, a pure regular expression should be labelled as such. If you use features in a regular expression that are specific to a particular syntax standard (PCRE, POSIX, Perl), please indicate the syntax standard you are using.


## Code Style Guide

Place code within a code fence with the explicit language identifier. Both `mma` and `mathematica` are be valid language identifiers for WL to be highlighted on GitHub, but your Markdown editor of your choice might have different requirements. (Atom requires `mathematica`.) For example,

    ```mathematica
    StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
    ```

results in the following:

```mathematica
StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
```

A WL expression (almost) always evaluates to another valid WL expression, so it is necessary to distinguish input expressions from output expressions using the `In[1]:= ` and `Out[2]= ` labels respectively, just as the Mathematica command line interface does:

```mathematica
In[1]:= StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]

Out[1]= "MyList"
```

An alternative to the above is to place the expected output of the expression in a code comment immediately below the expression. This has the disadvantage that the output is not syntax highlighted.

```mathematica
StringJoin[Capitalize[ToLowerCase[StringSplit["my list"]]]]
(* "MyList" *)
```

It is often useful to write the output of an evaluation differently from how Mathematica would display it by default. In the examples above, `"MyList"` is written within double quotes, i.e. in `InputForm`, to make it clear that the result is a string. It is not necessary to write `Out[4]//InputForm= "MyList"` in these cases.

GFM does not word-wrap WL code. For long lines of code, adding a linebreak improves readability and prevents an ugly scrollbar from appearing in the code block. Indent the continuation to make it clear that it is a continuation of the expression.

```mathematica
In[1]:= toCamelCase[str_String] :=
            StringJoin[Capitalize[ToLowerCase[StringSplit[str]]]]
```

WL encourages writing code that is difficult to read. A little bit of whitespace can make a big difference.

```mathematica
In[1]:= toCamelCase[str_String] :=
            StringJoin[
                Capitalize[
                    ToLowerCase[
                        StringSplit[str]
                    ]
                ]
            ]
```

Always put code that is included inline in a sentence between backticks: writing \`PrimeQ/@Range[20]\` renders as `PrimeQ/@Range[20]`.
Only short pieces of code should be inlined. For example, `PrimeQ/@Range[20]` is ok, but `toCamelCase[str_String] := StringJoin[Capitalize[ToLowerCase[StringSplit[str]]]]` is too long.

## Authorship
If you author an article, feel free to add a byline. If you add significantly to an article with a byline, feel free to add your name to the byline. Neither is required.
