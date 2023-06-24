# Operators in Java

Operators are used to compare two or more variables or change or increment/decrement the values of variables. A `condition` generally consists of two or more variables with at least one operator. The value of a condition is always `true` / `false`

<table><thead><tr><th width="200.33333333333331">Types of Operators</th><th>Description</th><th>Examples</th></tr></thead><tbody><tr><td>Arithmetic operators</td><td>Used while doing common math operations on number data types like double, int, byte etc.</td><td><code>+</code>: Addition<br><code>-</code>: Subtraction <br><code>*</code>: Multiplication<br><code>/</code>: Division<br><code>%</code>: Modulus (Remainder)</td></tr><tr><td>Relational Operators</td><td>Checks the relation between two variables.</td><td><code>></code>: Greater than.<br><code>&#x3C;</code>: Lesser than.<br><code>>=</code>: Greater than or equal.<br><code>&#x3C;=</code>: Lesser than or equal.<br><code>==</code>: Equal.<br><code>!=</code>: Not equal.</td></tr><tr><td>Logical Operators</td><td>Used while combining and checking multiple conditions.</td><td><code>&#x26;&#x26;</code>: And<br><code>||</code>: Or<br><code>!</code>: Not operator</td></tr><tr><td>Assignment Operators</td><td>Used to assign a value to a variable.</td><td><code>=</code>: Declaring value<br><code>var++</code>: Increment by 1<br><code>var--</code>: Decrement by 1</td></tr></tbody></table>

In the table above, you saw the categorization of different types of operators. Now, let's look at them individually.

### Arithmetic Operators&#x20;

These operators are used in basic mathematical operations.\
Example:

```java
int i = 3 + 9;
```

### Relational Operators

They're used to **compare** two numbers or characters.

<table data-full-width="true"><thead><tr><th width="242">Operator</th><th width="274">Function</th></tr></thead><tbody><tr><td>Greater than (<code>></code>)</td><td> It is used to check where the first value is <strong>greater than</strong> the second value.</td></tr><tr><td>Less than (<code>&#x3C;</code>)</td><td>It is used to check where the first value is <strong>less than</strong> the second value.</td></tr><tr><td>Greater than or equal to (<code>>=</code>)</td><td>It is used to check whether the first value is <strong>greater than or equal</strong> to the other value.</td></tr><tr><td>Less than or equal to (<code>&#x3C;=</code>)</td><td>It is used to check whether the first value is <strong>smaller than or equal</strong> to the other value.</td></tr><tr><td>Equal to (<code>==</code>)</td><td>It is used to check whether the first value is <strong>equal</strong> to the other value.</td></tr><tr><td>Not equal to (<code>!=</code>)</td><td>It is used to check whether the first value is <strong>not equal</strong> to the other value.</td></tr></tbody></table>

Example usage:

```java
boolean a = 3 == 3; // true
boolean b = 3 != 3; // false
boolean c = 3 > 4; // false
```
