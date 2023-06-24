---
description: >-
  Difference between If and Switch statements, and how to convert one to the
  other.
---

# Difference & Converting

## Difference between Switch and If statements

| Criteria                  | Switch                                                                                                           | If                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Number of Variables       | Only 1 variable.                                                                                                 | Can have any amount of variables, <mark style="background-color:yellow;">but has to be more than one!</mark> Can have a range of variables/conditions |
| If conditions don't match | In any situation, if the switch statement does not find any match, the default condition is executed if created. | In case, the situation gets false in the if statement, it will automatically execute the else statement.                                              |
|                           |                                                                                                                  |                                                                                                                                                       |

## Converting If to Switch

```java
void methodA(int a){
    if(a==12){
        //code 12 here
    }
    else if(a==42){
        //code 42 here
    }
    else{
        //else code here
    }
}
```

Converting it to switch:

```java
void methodA(int a){
    switch(a){
        case 12:/*code 12 here*/;break;
        case 42:/*code 42 here*/;break;
        default:/*else code here*/;break;
    }
}
```

And similar for converting switch to if.
