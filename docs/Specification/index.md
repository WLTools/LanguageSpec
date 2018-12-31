# Language Specification

Original home:

* https://github.com/WLTools/LanguageSpec.git

The purpose of this wiki is to rigorously describe Wolfram Language to assist authors of WL tools and students of programming languages. It is not intended as user documentation or a programming tutorial.

We invite contributions from anyone. Please read the [[Style Guide]] first. A good place to start is the catch-all page for [[To-Do's and homeless content|Homeless content]].

## Table of Contents
* Language Specification
    * [[Syntax]]
        * [[Primitives]]
            * [[Strings]]
            * [[Number representations]]
            * [[Symbols]] (identifiers)
            * [[Special character representations]]
        * [[Operators]]
            * [[Variadic forms]]
            * [[Operators with a built-in meaning]]
            * [List of all operators with precedence, associativity, affix, and arity](https://rawgit.com/wiki/WLTools/LanguageSpec/OperatorTable.html)
            * [[Two-dimensional "operators"|Two-dimensional operators]]
            * [[FullForm]] (S-expressions)
            * [[Pseudo-operators]]
        * [[Formatting and whitespace]]
        * [[Box sublanguage]]
        * [[Issues and inconsistencies]]
            * [[Precedence]]
            * [[FullForm interpretation]]
            * [[Nonexpression objects]] ("atomic functions")
            * [[Bugs]]
    * [[Semantics]]
        * [[Symbol properties]]
            * [[OwnValues]]
            * [[DownValues, UpValues]]
            * [[DefaultValues]]
            * [[Options]]
            * [[Attributes]]
            * [[Messages]]
            * [[SubValues]]
            * [[NValues]]
            * [[FormatValues]]
        * [[Scoping rules]]
            * [[Scoping operators]]
            * [[Contexts]]
            * [[&lambda; calculus semantics]]
            * [[Packages]]
        * [[Pattern matching]]
            * [[Patterns]]
            * [[Types of equality]]
            * [[Options]]
        * [[Evaluation]]
        * [[Types]]
            - [[Number literal semantics]]
        * [[Messages]]
        * [[Homoiconicity]]
    * [[Built-in Functions / Standard Library|Standard Library]]
        * [[Manipulating primitives and expressions]]
            * [["List" processing and functional programming|List processing]]
            * [[Homoiconic functions]]
            * [[Introspection]]
            * [[Strings]]
            * [[Numbers]]
        * [[Control flow]]
        * [[Controlling evaluation]]
        * [[IO]]
        * [[Mathematics]]
        * [[Graphics]]
        * [[UI]]
        * [[Typesetting]]
        * [[System and Environment]]
            * [[Autoevaluating symbols]]
    * [[Interfaces]]
        * [[Notebook]]
        * [[REPL]]
        * [[Applications]]
        * [[WSTP]]
        * [[WXF]]

* [[Resources for implementors]]
    * [[General advice for implementors]]
    * [[Test suite derived from this wiki]]
    * [[Implementing pattern matching]]
        * [[Python]]
        * [[Go]]
        * [[ML-like languages]]
    * [[Parsing strategies]]
    * [[Functional language implementation]]
    * [[WL code highlighters and editors]]

## Repository Notes
### A Note on Terminology

In this wiki and related resources, a _W Language_ is a language with the syntax of [Wolfram Language](https://www.wolfram.com/language/), the programming language of [Mathematica](http://www.wolfram.com/mathematica/). Thus, Wolfram Language is itself a W Language. Some authors of [[WL tools or implementations|List of W Language Projects]] explicitly describe their projects as targeting Mathematica's Wolfram Language, while other authors choose to call their language by a different name. A language implementation and the abstract concept of the language is a blurry distinction.  The phrase _W Language_—WL for short—is intended to be inclusive of all Wolfram Language implementations out of respect for each author's chosen epithet, while _Wolfram Language_ refers to the programming language in the abstract, and _Mathematica_ refers to the software sold by [Wolfram](http://www.wolfram.com/) which implements Wolfram Language.


### Why two repositories?

The [LanguageSpec.wiki](https://github.com/WLTools/LanguageSpec.wiki.git) repository contains documentation only:

* Human readable documents.
* Images or other files displayed within those documents.

The [LanguageSpec](https://github.com/WLTools/LanguageSpec.git)  repository contains:

* Raw data.
* Example code extracted from this wiki.
* Tools used to extract example code, create language data, or investigate Mathematica's behavior for the purposes of understanding Wolfram Language.

Having two repos provides the following advantages:

1. The wiki is both editable on the web and is a standard git repository compatible with the usual git workflow.
2. Separating the data and tools from the documentation supports the use cases that a user can clone/download one without the other, which we would expect to be a common use case.
