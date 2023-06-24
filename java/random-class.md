# Random Class

Random class is used to generate random numbers in java. This class provides various method calls to generate different random data types such as float, double, int.

Importing the class from util package:

```java
import java.util.*;
//or
import java.util.Random;
```

Initializing the random class (NOTE: it has no parameters/input)

```java
Random rd = new Random();
```

This class also has a `nextInt()` function which helps generate a random integer. It is a overloaded method, which takes in a parameter, maxvalue, if the value is not specified, it will return random range.

```java
rd.nextInt();
```

Example usage:

```java
import java.util.*;

public class TestClass {
    Random rd = new Random();
    Scanner sc = new Scanner(System.in);
    void testRandom(){
        System.out.println(rd.nextInt());
    }
    void random(){
        System.out.println("Enter max value:");
        int nv = sc.nextInt();
        int rdv = sc.nextInt(nv);
        System.out.println("Your new number is "+rdv);
    }
}

```
