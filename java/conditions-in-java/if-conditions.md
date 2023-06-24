# If Conditions

To check a condition, you can either use if or switch.

```java
if(condition){
    //code here
}
else if(condition){
    //code here
}
else {
    //code here
}
```

## If conditions

If is used when there are two or more variables. There can be multiple cases to check for. In such a case, you can use `if` , `else if` and `else` .

> <mark style="color:red;">Else does not need a condition!</mark>

Ex with basic `if ... else` :

{% code title="example method" %}
```java
void checkSame(int a, int b){
    if(a==b){
        System.out.println(a+" is equal to "+b);
    }
    else{
        System.out.println(a+" is not equal to "+b);
    }
}//if the two inputs are same it will print "equal to".
```
{% endcode %}

Example with `if ... else if ... else` :

<pre class="language-java"><code class="lang-java"><strong>void checkRelation(int a,int b){
</strong>    if(a==b){
        System.out.println(a+" is equal to "+b);
    }
    else if(a>b){
        System.out.println(a+" is greater than "+b);
    }
    else {
        System.out.println(a+" is less than "+b);
    }
}//based on the input it will check the conditions and print the value.
</code></pre>

If you want to add multiple conditions and check if both are true:

```java
void checkDigits(int a){
    if((a<10)&&(a>=0)){
        System.out.println(a+" is a single positive digit");
    }
    else if((a>10)&&(a<100)){
        System.out.println(a+" is a double digit number");
    }
    else if((a>100)&&(a<1000)){
        System.out.println(a+" is triple digit number");
    }
    else if(a<0){
        System.out.println(a+" is negative");
    }
    else{
        System.out.println(a+" is multidigit");
    }
}
```
