# Scanner Class

The `Scanner` class is used to get user input from the console terminal page, and it is found in the `java.util` package.

Examples to import the class from the package:

```java
import java.util.*;//Imports all classes from java util package.
import java.util.Scanner;//Imports only scanner class from the package.
```

Initialize the class:

```java
Scanner sc = new Scanner(System.in);
```

What this does is: It creates a object (in simple terms, a custom variable) by the name `sc`. It initializes the class with `new` keyword and takes in the parameter of `System.in` which handles all the input flow of data. This class has different methods to take in different types of inputs listed below.

| Method          | Description                           |
| --------------- | ------------------------------------- |
| `nextBoolean()` | Reads a `boolean` value from the user |
| `nextByte()`    | Reads a `byte` value from the user    |
| `nextDouble()`  | Reads a `double` value from the user  |
| `nextFloat()`   | Reads a `float` value from the user   |
| `nextInt()`     | Reads a `int` value from the user     |
| `nextLine()`    | Reads a `String` value from the user  |
| `nextLong()`    | Reads a `long` value from the user    |
| `nextShort()`   | Reads a `short` value from the user   |

Example usage of this class :&#x20;

```java
import java.util.*;

public class ExampleScannerClass {
    Scanner sc = new Scanner(System.in);
    void multiply(){
        System.out.print("Enter the first number to multiply: ");
        int a = sc.nextInt();//or any other type of number input
        System.out.print("\nEnter the second number to multiply: ");
        int b = sc.nextInt();//or any other type of number input
        System.out.print("\nThe product is: "+(a*b));
    }
    void stringInput(){
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.print("\nEnter your favourite band/musician: ");
        String favband = sc.nextLine();
        System.out.print("\nYour Data:\nName: "+name+"\n Favourite band/musician: "+favband);        
    }//etc
}
```
