# Method overloading

In Java you can "overload" a method.

Overloading allows you to create multiple methods with the same name.\
These methods can have totally different return types, parameters, and even the functioning.

### When to use overloading?

Overloading can be used when you want a function to allow mulitple types of paramters, or if your function could return multiple types.

### Examples

Let us say you wanted a method to add 1 to the given a number but return 1 if nothing is provided. Then, with method overloading, you can create 3 methods with the name `addOne`, one method having no parameter return just 1, second one taking an `int` parameter returning `number + 1`, and the third one taking a `double` parameter and returning `decimalNumber + 1`.

Let's see the code:

```java
public class MyClass {
    // The first method with no parameters.
    int addOne() {
        return 1; // Simply return 1.
    }
    // Same name but takes in a int type parameter.
    int addOne(int number) {
        return number + 1;
    }
    // Same thing, but type double parameter
    double addOne(double number) {
        return number + 1;
    }
}
```

Now, if you call `addOne`, the function used will depend on **if you pass an argument or not or on the type of argument you pass**.&#x20;

In our case, calling `addOne` with no arguments will result in the calling  of the first implementation of the variable method as it does not require any arguments. Now, if we try to call the method with a integer passed, it will call the second implementation of the method. Same goes for `double`.&#x20;

The compiler will automatically infer the correct method, which is expected to be used.

{% hint style="danger" %}
#### ATTENTION!

You **can't do method overloading with different return type but same number and type of parameters**.

In this case the compiler will get confused on which one to call.
{% endhint %}
