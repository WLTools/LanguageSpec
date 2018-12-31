# Number Literal Semantics

This section describes the meaning of number literal forms, as distinct from their [[syntax|Number representations]].



## Approximate Numbers (`Real`)

A number representation will be interpreted as a real number if and only if any of the following are true:

1. There is a point `.` in the mantissa, as in `3.2`.
2. The precision pseudo-operator `` ` `` appears in the number literal, regardless of whether or not a numerical precision is given.
3. The accuracy pseudo-operator ``` `` ``` appears in the number literal.

Note that a real number cannot be produced by virtue of the use of the scientific form pseudo-operator '*^'.

### Precision and Accuracy

A `Real` number is not a real number in the mathematical sense. Rather, a `Real` number is what is called a _floating point_ number in other languages. The precision and accuracy of a `Real` number are functionally equivalent notions that can be understood as follows. Suppose $x$ is a `Real` number which represents a real number $\hat{x}\in\mathbb{R}$ up to an error of $\delta_x$, that is, the _true value_  $\hat{x}$ of the number represented by $x$ lies in the interval $(x - \delta_x/2, x + \delta_x/2)$.

* If a `Real` number $x$ has $p$ digits in base $b$ of **_precision_**, then $\delta_x = |x|b^{-p}$.
* Likewise, if a `Real` number $x$ has **_accuracy_** $a$ in base $b$, then $\delta_x = b^{-a}$.

It is clear from the above that precision depends on the magnitude of the number $x$, while accuracy does not. Indeed, we have $p = a + \log_{b}|x|$.

If the precision (or accuracy) of a number literal given with explicit base $b$ is provided, then that precision (repectively accuracy) is interpreted to be the number of _digits in the given base_ $b$ of precision (respectively accuracy).

<span class="compatibility">[[Caution.svg | height=32px]] A number written without an explicit base has base 10. Therefore, whenever a number literal is written without `^^`, Mathematica uses _decimal_ digits of precision/accuracy, that is, base 10, which is only approximate in general on a digital computer. This is why most other numerical computing systems _only_ use base 2 corresponding to _bits_ of precision/accuracy. If we desires $b$ bits of accuracy, then we need $b/\log_2(10)$ decimal digits of accuracy. Said another way, every decimal digit of accuracy requires $\log_2(10) \approx 3.32193$ bits of accuracy.</span>

A number decorated with the precision pseudo-operator `` ` `` that is not immediately followed by an explicit precision is interpreted as having `$MachinePrecision`, regardless of whether or not a point `.` appears in the mantissa, and regardless of how many digits are given explicitly in the number's representation.

<span class="compatibility">[[Caution.svg | height=32px]] Mathematica defines a `$MachinePrecision` `Real` number as a double precision floating point number ("double") as defined by the host platform. On systems with 64-bit IEEE doubles, the IEEE standard reserves 53 bits to the mantissa, which is 53 bits of accuracy or about 15.9546 decimal digits of accuracy.</span>

## Scientific Form

The pseudo-operator `*^` multiplies the given digits by a power of the base. For a number literal of the form `b^^m*^p` with base `b`, mantissa `m`, and power `p`, the `*^p` has the effect of multiplying `b^^m` by `b^p` (`b` raised to the `p` power). If an explicit base is not given using `^^`, then the base is 10, and `*^p` has the effect of multiplying the number by `b^p`.

1. If the number would be an `Integer` without the exponent `*^p`, then the number with the exponent `*^p` is either an `Integer` or a `Rational` according to whether multiplying by `b^p` results in a number greater than or less than 1 respectively.
2. If the number would be a `Real` number without the exponent `*^p`, then the number with the exponent is a `Real` number.
3. The pseudo-operator `*^` never affects the accuracy of a number literal.
