# String class

In Java, string is basically an object that represents sequence of char values. An array[^1] of characters works same as Java string. For example:

```java
String str = "Some String Here";
//what the compiler looks at it as:
char[] str = {"S","o","m","e"," ","S","t","r","i","n","g"," ","H","e","r","e"};
```

Because the base is same as arrays, it has similar functions to arrays. String is a special type of class and does not need to be initialized with the `new` keyword.

The `java.lang.String` class provides many useful methods to perform operations on sequence of char values, but it is imported by default and does not need to be explicitly imported.

Some useful string functions:

<table><thead><tr><th width="74.33333333333331">No.</th><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>1</td><td>char charAt(int index)</td><td>It returns char value for the particular index (this index system works same as array indexes)</td></tr><tr><td>2</td><td>int length()</td><td>It returns string length</td></tr><tr><td>3</td><td>String replace(char old, char new)</td><td>It replaces all occurrences of the specified char value.</td></tr><tr><td>4</td><td>int indexOf(int ch)</td><td>It returns the specified char value index.</td></tr><tr><td>5</td><td>String toLowerCase()</td><td>It returns a string in lowercase.</td></tr><tr><td>6</td><td>String toUpperCase()</td><td>It returns a string in uppercase.</td></tr><tr><td>7</td><td>String trim()</td><td>It removes beginning and ending spaces of this string.</td></tr></tbody></table>

### Example Usages:

```java
String str = "Some String Here";
str.charAt(0);//returns 'S'
str.charAt(12);//returns 'H'
str.length();//returns 16
str.replace('o','a');//returns "Same String Here"
str.indexOf('o');//returns 1
str.toLowerCase();//returns "some string here"
str.toUpperCase();//returns "SOME STRING HERE"
```

[^1]: You will learn about this later!
