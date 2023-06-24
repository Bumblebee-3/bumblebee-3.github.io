# Switch Case

Switch cases are used when there is only one variable.&#x20;

```java
switch(variable){
    case case1:/*code here*/;break;
    case case2:/*code here*/;break;
    default:/*code here*/;break;
}
```

## Switch Case conditions.

It takes in one `variable` parameter of any data type.

\
If `variable` is equal to `case1` : It will run the code that has been assigned to the case.

If `variable` is equal to `case2` : It will run the code that has been assigned to the case.

If `variable` is not equal to anything, It will run the code that has been assigned to default case.

{% hint style="info" %}
You need to use `break;` statement, otherwise the code will go into a `Fall-Through-Error!`
{% endhint %}

Example switch case method:

```java
void caseInTheCourt(String juryStatement){
    String judgeVerdict="";
    switch(juryStatement){
        case "is guilty of murder":judgeVerdict="Guilty! Prison sentence : 7 years. 😬";break;
        case "not sure":judgeVerdict="Benefit of doubt!";break;
        case "innocent":judgeVerdict="No charges against the Defendant!";break;
        default : judgeVerdict="Invalid statement by jury.";break;
    }
    System.out.println(judgeVerdict);
}
```

In the above example, if the `juryStatement` is "is guilty of murder", then verdict will be `Guilty!` If the `juryStatement` is "not sure", the verdict will be `Benifit of doubt!` If the `juryStatement` is "innocent", then the verdict will be `No Charges!` If the `juryStatement` is anything else, it will return `Invalid.`

### Case Chaining:

Two cases that need to execute same code:

```java
switch(variable){
    case case1:
    case case2:/*code for case1 and case2 both, here*/;break;
    default:/*code here*/;break;
}
```
