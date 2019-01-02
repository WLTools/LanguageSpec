# Number Literal Semantics

This section describes the meaning of number literal forms, as distinct from their [syntax](../Syntax/Number-representations.md).



## Approximate Numbers (`#!wl Real`)

### When a Number Literal is`#!wl Real`

A number literal representation will be interpreted as a real number if and only if any of the following are true:

1. There is a point `#!wl .` in the mantissa, as in `#!wl 3.2`.
2. The precision pseudo-operator ``#!wl  ` `` appears in the number literal, regardless of whether or not a numerical precision is given.
3. The accuracy pseudo-operator ```#!wl  `` ``` appears in the number literal.

Note that a real number cannot be produced by virtue of the use of the scientific form pseudo-operator `#!wl *^`. See [Scientific Form](#scientific-form) below.

### Precision and Accuracy

A `#!wl Real` number is not a real number in the mathematical sense. Rather, a `#!wl Real` number is what is called a _floating point_ number in other languages. The precision and accuracy of a `#!wl Real` number are functionally equivalent notions that can be understood as follows. Suppose $x$ is a `#!wl Real` number which represents a real number $\hat{x}\in\mathbb{R}$ up to an error of $\delta_x$, that is, the _true value_  $\hat{x}$ of the number represented by $x$ lies in the interval $(x - \delta_x/2, x + \delta_x/2)$.

* If a `#!wl Real` number $x$ has $p$ digits in base $b$ of **_precision_**, then $\delta_x = |x|b^{-p}$.
* Likewise, if a `#!wl Real` number $x$ has **_accuracy_** $a$ in base $b$, then $\delta_x = b^{-a}$.

It is clear from the above that precision depends on the magnitude of the number $x$, while accuracy does not. Indeed, we have $p = a + \log_{b}|x|$.

If the precision (or accuracy) of a number literal given with explicit base $b$ is provided, then that precision (repectively accuracy) is interpreted to be the number of _digits in the given base_ $b$ of precision (respectively accuracy).

A number written without an explicit base has base $10$. Therefore, whenever a number literal is written without `#!wl ^^`, the exponent represents _decimal_ digits of precision/accuracy, that is, the number of digits in base $10$.

!!! tip
    The number of digits of precision/accuracy in base $10$ is only approximate in general on a digital computer. This is why most other numerical computing systems _only_ use base 2 corresponding to _bits_ of precision/accuracy. If we desire $b$ bits of accuracy, then we need $b/\log_2(10)$ decimal digits of accuracy. Said another way, every decimal digit of accuracy requires $\log_2(10) \approx 3.32193$ bits of accuracy.

!!! warning "Compatibility Warning"
    Syntactically, only undecorated decimal numbers can follow the `#!wl *^` pseudo-operator, which is inconvenient if one wishes to represent a number in base $10$ (or other nonbinary bases) having a precise number of bits of precision/accuracy.

A number decorated with the precision pseudo-operator ``#!wl  ` `` that is not immediately followed by an explicit precision is interpreted as having `#!wl $MachinePrecision`, regardless of whether or not a point `#!wl .` appears in the mantissa, and regardless of how many digits are given explicitly in the number's representation.

!!! info
    Mathematica defines a `#!wl $MachinePrecision` `#!wl Real` number as a double precision floating point number ("double") as defined by the host platform. On systems with 64-bit IEEE doubles, the IEEE standard reserves 53 bits to the mantissa, which is 53 bits of accuracy or about 15.9546 decimal digits of accuracy.</span>

## Scientific Form

The [pseudo-operator](../Syntax/Pseudo-operators.md) `#!wl *^` multiplies the given digits by a power of the base. For a number literal of the form `#!wl b^^m*^p` with base `#!wl b`, mantissa `#!wl m`, and power `#!wl p` (which must be an integer), `#!wl *^p` has the effect of multiplying `#!wl b^^m` by `#!wl b^p` (`#!wl b` raised to the `#!wl p` power). If an explicit base is not given using `#!wl ^^`, then the base is $10$ and `#!wl *^p` has the effect of multiplying the number by `#!wl 10^p`.

The type of the number literal is determined according to the following rules:

1. If the number would be an `#!wl Integer` without the exponent `#!wl *^p`, then the number with the exponent `#!wl *^p` is either an `#!wl Integer` or a `#!wl Rational` according to whether the number is divisible by `#!wl b^p`.
2. If the number would be a `#!wl Real` number without the exponent `#!wl *^p`, then the number with the exponent is a `#!wl Real` number.

 The pseudo-operator `#!wl *^` has no effect on the [accuracy](#precision-and-accuracy) of a number literal.
