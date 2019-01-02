# Table of Wolfram Language Operators

Accurate information about all Mathematica operators is notoriously hard to obtain. Mathematica's [official documentation](https://wolfr.am/wS1xS8bZ) is incomplete, out of date, and occassionally incorrect. So is the undocumented `#!wl Precedence` function.[^findingoperators] Complicating matters is the fact that the frontend does not always agree with the kernel (i.e. the command line interface or `#!wl ToExpression`) about the properties of an operator, and none of these conflicts are documented. Robert Jacobson has compiled a list of all operators and their properties according to the kernel.[^doingfrontend] This information is available in the following machine and human readable formats:

* A [Microsoft Excel spreadsheet](Operator%20Table.xlsx).
* An [html page](OperatorTableHTML.md) suitable for browsing online.
* A [CSV file](Operator%20Table.csv).

If you discover an error, please report it by [creating an issue on GitHub](https://github.com/WLTools/LanguageSpec/issues).

[^findingoperators]: For a detailed discussion of these issues, see
<br> Robert Jacobson, "[Finding All Wolfram Language Operators](https://rljacobson.github.io/defining-the-wolfram-language-part-1-finding-operators)," _After Math_, personal blog, August 16, 2018.

[^doingfrontend]: He is working on doing the same for the frontend.
