# For Loops

```java
for(initialization;condition;update){
    //code here
}
```

In Java, a for loop is like having a robot helper that counts for you. It follows three important steps:

1. **Initialization**: You tell the robot how to start counting. You give it a starting point, like saying, "Start counting from toy number 1." You also tell it how many times to count, like saying, "Count up to 10 toys."
2. **Condition**: The robot checks a condition before each count. It asks itself, "Am I done counting yet?" If the answer is "No," it continues counting. If the answer is "Yes," it stops counting and moves on to the next step.
3. **Update**: After each count, the robot updates the counting number. For example, if it just counted toy number 3, it would say, "Okay, now count toy number 4."

```java
for (int toyNumber = 1; toyNumber <= 10; toyNumber++) {
    System.out.println("Counting toy number: " + toyNumber);
}//this will print all toys from one to ten.
```

### Another example

If you have to print the table of any number:

```java
void tables(int num,int upto){
    for(int i=1;i<=upto;i++){
        System.out.println(num+" x "+i+" is "+(num*i)+".");
    }
}

tables(12,40);//this will print the tables of 12 upto 40!
```
