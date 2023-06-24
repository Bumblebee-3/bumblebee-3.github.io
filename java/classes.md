# Classes

## A Basic Class

While learning to use the interface, you saw how to create a new Class. In Java, a class is a blueprint or template for creating objects that share common properties and methods. In simple terms, lets say "Car" is a class.

```java
public class Car {
    public String objective = "Transport people from one place to another";
    public String features = "Basic features, gears, steering wheel, accelerators and brakes";
    void accelerate(){
        //power motors.
    }
    void changeGear(int gear){
        //set gear to "gear" value.
    }
    void brake(boolean handbrake){
        //stop the car
    }
    void turn(String direction){
        //turn the car in direction inputted
    }
}
```

This is a basic class, with variables and certain methods which are BASIC necessities in cars like drive, brake, change gear.\
A basic car's objective is to transport people. It does NOT necessarily need to have luxury features. It has basic methods (or objectives) such as accelerate, change Gear, brake, turn, etc.

> This is just an analogy to cars, to make it simpler to understand.&#x20;

## Polymorphism

Now, what about a Rolls Royce? It is known as one of the most luxurious car manufacturing companies. But still, It's a Car.

Polymorphism means having "many forms".\
Polymorphism allows us to extend the features of a base class.\
In our case Rolls Royce "extends" a car, as it is a car.\
\
A Rolls Royce **extends** the car class. An example class extending a main class would be:

```java
public class RollsRoyce extends Car {
    RollsRoyce() {
        objective += " and provide luxury.";
        features += "Real leather seats, ebony interiors, more space, faster engine, e.t.c."
    }
 
    void luxury(){
        //add more features
    }
}
```

The Rolls Royce class will be able to access the basic methods defined in Car class like change gear, brake, turn, accelerate, etc. But Car class won't be able to access features of Rolls Royce.

### Actual Example of a Class

```java
public class TestClass {
    void print(String txt){
        System.out.println(txt);
    }
}
```

After compiling this class, and running it, the print method will ask for a string input. Enter a string input, and Enter; A new window will open, which would show your inputted text.

```java
public class Test extends TestClass {
    void a(){
        print("Hello World");//this method can be accessed by this class from TestClass
    }
}
```

### Creating an instance of a class

Obviously, the classes we made above are unused, i.e. they're not used by us.

To actually put them to use, we can simply use the `new` keyword.

The `new` keyword allocates the class/object on the memory (Heap memory). Now, this `object` is utilizable.

You can now use the methods and attributes of the class in your code, for example:

```java
public class Dog {
    String breed;
    Dog(String breed){
        this.breed = breed;
    }
    void bark(){
        System.out.println("Woof!");
    }
}
```

The class can be accessed from another external class:

<pre class="language-java"><code class="lang-java"><strong>public class a extends Dog {
</strong><strong>    void methodA(){
</strong><strong>        Dog dog = new Dog("German Shepherd");
</strong>        System.out.println(dog.breed); // Prints "German Shepherd"
        dog.bark(); // prints out "Woof!"
    }
}
</code></pre>
