---
description: Before learning about Strings, it's important to know the concept of arrays.
---

# Arrays

Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

To declare an array, define the variable type with **square brackets**:

```java
int[] numbers = {1,2,3,4,5};
```

This is an array of integers, with the first value of 1, second value of 2, and so on...

Arrays can be used with any data type, for eg:

```java
char[] sequence = {'d','e','e','z'};
```

In this case its a array of chars with first value of d, second e, and so on...

## How do we access these values?

You can access these values by this syntax:

```java
variable[Pos]
```

where variable is the name of the variable and Pos is the position.

### How does position work?

If we have such an array:

```java
String anime = {"Dragon Ball Z","Naruto","Death Note","Demon Slayer","One Piece"};
```

The numbering of positions starts from 0. `Dragon Ball Z` will be 0, `Naruto` will be 1, and so on...

| Position | String          |
| -------- | --------------- |
| 0        | `Dragon Ball Z` |
| 1        | `Naruto`        |
| 2        | `Death Note`    |
| 3        | `Demon Slayer`  |
| 4        | `One Piece`     |

Hence to get the value of the string at position 1

```java
String posOne = anime[1];//will be "Naruto"
String posZero = anime[0];//will be "Dragon Ball Z"
String posFour = anime[4];//will be "One Piece"
```

### Length of Arrays.

to get the length of arrays (a.k.a. the number of elements in the array, return type integer) :

```java
int arrLength = anime.length;
```

### Get Last Element of Array.

To get last element of an array, you can access it by getting the value of the element at the position of array length minus 1. Basically:

```java
String lastElem = anime[anime.length-1];//will return "One Piece"
```

### Change Value in an Array.

To change the value of a particular element in an array:

```java
anime[3]="One Punch Man";//will change the element at position 3 aka "Demon Slayer" to new value!
```

### Loop Through Arrays.

It's really easy to loop through all elements in array, all you need to do, is know basics of arrays and for loops.

```java
String anime = {"Dragon Ball Z","Naruto","Death Note","Demon Slayer","One Piece"};
for(int i=0;i<anime.length;i++){
    System.out.println((i)+". "+anime[i]);
    //or
    //System.out.println((i+1)+". "+anime[i]);
}

/*
The output will be
0. Dragon Ball Z
1. Naruto
2. Death Note
3. Demon Slayer
4. One Piece
*/
```

Another easy way to loop over all items would be to use the for-each loop in Java.

Syntax of the for-each loop:

```java
type[] myArray = {...};
for (type i : myArray) {...use `i` here...}
```

An example:

```java
String anime = {"Dragon Ball Z","Naruto","Death Note","Demon Slayer","One Piece"};
int i = 1; // keep track of index (optional)
for (String name : anime) {
    System.out.println(i + ". " + name);
    i++;
}
/*
The output will be
1. Dragon Ball Z
2. Naruto
3. Death Note
4. Demon Slayer
5. One Piece
*/
```
