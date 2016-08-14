# Functional Programming Fundamentals

[← Take me back to the homepage](/README.md)

```
@TODO: Update article based on https://bethallchurch.github.io/JavaScript-and-Functional-Programming/
```

## Minimise Side Effects

A side effect is a change that is not local to the function that caused it. A function might do something like manipulate the DOM, modify the value of a variable in a higher level scope or write data to a database. The results of these actions are side effects.

Side effects are not inherently evil. A program that produced no side effects would not affect the world, and so there would be no point to it (other than perhaps as a theoretical curiousity). They are, however, dangerous and should be avoided wherever they are not strictly necessary.

When a function produces a side effect you have to know more than just its inputs and output to understand what that function does. You need to know about the context and history of the state of the program, which makes the function harder to understand. Side effects can cause bugs by interacting in unpredictable ways, and the functions that produce them are harder to test thanks to their reliance on the context and history of the program’s state.
