# Primitive Data Types in Java

##

There are different types of variables in java. Different variables have different storage methods, hence, to make storing variables easier, it has been classified into types.

<table data-header-hidden data-full-width="true"><thead><tr><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>Variable Type <code>[IMP]</code></td><td>Description</td><td>Size <code>[IMP]</code></td><td>Example</td></tr><tr><td><code>byte</code></td><td>Byte length integer</td><td>1 byte</td><td>byte b =1;</td></tr><tr><td><code>short</code></td><td>Short integer (whole numbers)</td><td>2 bytes</td><td>short s =5;</td></tr><tr><td><code>int</code></td><td>Integer (whole numbers)</td><td>4 bytes</td><td>int i =4;</td></tr><tr><td><code>long</code></td><td>Bigger integer (whole numbers)</td><td>8 bytes</td><td>long l = 987654321;</td></tr><tr><td><code>float</code></td><td>Fractional numbers (decimals)</td><td>4 bytes</td><td>float f=42.1;</td></tr><tr><td><code>double</code></td><td>Bigger fractional numbers (decimals)</td><td>8 bytes</td><td>double d=69.420024420024;</td></tr><tr><td><code>char</code></td><td>Keyboard characters</td><td>16 bits Unicode</td><td>char c='s';</td></tr><tr><td><code>boolean</code></td><td><code>true</code> or <code>false</code></td><td>1 byte</td><td>boolean b = false;</td></tr></tbody></table>

> `String` is **NOT** a primitive data type. String is an object, it's just an array of chars.

## Number data type ranges

The ranges of number data types vary drastically. They can range from small numbers to super large numbers.

The `int` data type in java and other programming languages are usually 32-bit integers, while `long` is 64-bit.

| Data type | Size (in bits) | Range (min to max)                                      |
| --------- | -------------- | ------------------------------------------------------- |
| byte      | 8              | -128 to 127                                             |
| short     | 16             | -32,768 to 32,767                                       |
| int       | 32             | -2,147,483,648 to 2,147,483,647                         |
| long      | 64             | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |

#### How it works

The ranges can be calculated like this (n = number of bits):

$$
-(2^{n-1}) \leq x \leq 2^{n-1}-1
$$

A bit can either be 0 or 1.

Java does not support unsigned integers directly (they need complex work arounds). What are unsigned integers? They are integers that can only be positive. They are usually used when you don't need negative numbers but want a wider range of positive numbers.

For example, an unsigned byte would have a range from 0 to 255, while a signed byte would be -128 to 127.\


The reason for which we minus 1 from `n` in the above formula is because that one bit is used to denote negative or positive. For negative is denoted with 1 and a positive is denoted with 0. Unsigned integer ranges can be calculated like this:

$$
0 \leq x \leq 2^n - 1
$$
