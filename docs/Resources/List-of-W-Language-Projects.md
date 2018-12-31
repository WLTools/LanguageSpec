## Computer Algebra Systems and Term Rewriters

### Active

* [omath](https://github.com/omath/omath) is similar in spirit to Mathics but is written in Java/Scala and appears to have had a 7 year hiatus from 2005 to 2012. The original parser "is mostly written by Yossi Farjoun, with some help from Scott Morrison" and is a generated parser using JavaCC and JJTree. There seems to be a newer parser written in Scala. The source code is distributed without a license. The historical repository lives at http://svn.omath.org/.
* [Mathics](http://mathics.github.io/): A free, light-weight alternative to Mathematica created by Jan Pöschko. A Mathematica clone written in Python, Mathics includes a complete parser, FullForm emitter, and evaluator. GPL3 license.
* [cas](https://github.com/tthsqe12/cas): A "bare bones cas" and front end that "tries to implement some of the mathematica language. A very limited set of commands is currently implemented." Written in C++. No license is specified.
* [mmaclone](https://github.com/jyh1/mmaclone): "This interpreter is intended to mimic every exact detail of Wolfram Language, including but not limited to its syntax, semantic, expression structure, evaluation details, etc." Written in Haskell by Yonghao Jin. No license is specified.
* [expreduce](https://github.com/corywalker/expreduce): A term rewriter/computer algebra system written in Go by Cory Walker using the WL parser by Jan Mercl. "The term rewriting system and pattern matching engine is fairly advanced. The computer algebra system at this stage is extremely limited, but simple calculus and algebraic manipulation is certainly supported...." MIT license.


### Inactive

* [MockMMA](https://sourceforge.net/projects/mockmma/): By [Richard Fateman](https://people.eecs.berkeley.edu/~fateman/) written in Lisp. This one's an old classic and of historical interest.
* [basicCAS](https://pypi.python.org/pypi/basicCAS/1.0): By Alex Gittens, a python Mathematica parser. It appears to have disappeared from the author's website, but it's still available elsewhere on the net for those interested in looking for it. This project is interesting because it includes Alex's notes regarding implementation.

## Parsers

### Active

* [FoxySheep](https://github.com/rljacobson/FoxySheep). A relatively complete, easy to understand, easy to hack parser and FullForm emitter. Based on ANTLR4, FoxySheep targets Java and Python. Written by Robert Jacobson. BSD license.
* [Mathematica IntelliJ Plugin](http://wlplugin.halirutan.de/). A mature, well-tested Wolfram Language parser capable of emitting FullForm and doing various code analysis.  The parser is a beautiful example of a Pratt parser, a top-down operator precedence parsing strategy first described by Vaughan Pratt in the 70s. MIT license for the code, but also includes proprietary data that is Copyright © 2013 Wolfram Research, Inc., that is distributed under a restricted use license.
* [Symja-parser](https://github.com/axkr/symja-parser) is the Mathematica parser for [Symja - Java Computer Algebra Library](https://bitbucket.org/axelclk/symja_android_library/wiki/Home), "a general purpose Java library for symbolic mathematics" by Axel Kramer. Symja contains a Mathematica parser for a reasonable subset of Mathematica. Apache License.
* [WL](https://github.com/cznic/wl): A lex/yacc based parser written in Go by by Jan Mercl. BSD license.

### Inactive

* [Mateusz Paprocki's Mathematica Parser in Scala](https://github.com/mattpap/mathematica-parser): "A library for parsing Mathematica's programming language written in Scala. It uses parser combinators and packrat parsers from Scala's standard library. Currently only a subset of Mathematica's language is supported." MIT Licensed. 

