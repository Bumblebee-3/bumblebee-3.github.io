# Methods in Java

### A method is a block of code which only runs when it is called.

Example Method:

{% code lineNumbers="true" %}
```java
void/*(1)*/ /*(2)*/methodName(/*(3)*/){
	//code here (4)
}
```
{% endcode %}

There are four important parts of a method.

1. Type of the method.
2. Name of the method.
3. Input variables of the method.
4. Code of the method

#### Type of the method.

There are different types of methods. The basic one is a void method. It executes a code but does not have a return statement. Ex:

```java
void print(){
    System.out.println("Hello World.");
}//this wont return anything. it will open a popup window saying "Hello World."
```

Then, there are methods that return a variable of a particular data type. For Ex:

```java
int sum(){
    int a = 12;
    int b = 13;
    return a + b;
}//this will return a variable with the type "integer" which will have the value 25
```

The return statement could be anything from [primitive data types](primitive-data-types-in-java.md) to non-primitive classes like `String` and other user defined classes.

> <mark style="color:red;">The value it is returning must be of the type mentioned while creating the method!</mark>

#### Name of the method

Name of the method is the name with which you call the method. Ex:

```java
void someTest(){}//the name of this blank method is "someTest"
```

#### Input Variables

Input variable are certain variables that the user needs to input before the method can be run. Ex:

```java
int sum(int n1, int n2){
    return n1 + n2;
}
```

This will ask for two parameters/input variables "n1" and "n2" of type `integer`.

This method will return the sum of inputted numbers.
