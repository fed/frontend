# Functional Programming Fundamentals

[← Take me back to the homepage](/README.md)

```
@TODO: Update article based on https://bethallchurch.github.io/JavaScript-and-Functional-Programming/
```

## Minimise Side Effects

A side effect is a change that is not local to the function that caused it. A function might do something like manipulate the DOM, modify the value of a variable in a higher level scope or write data to a database. The results of these actions are side effects.

Side effects are not inherently evil. A program that produced no side effects would not affect the world, and so there would be no point to it (other than perhaps as a theoretical curiousity). They are, however, dangerous and should be avoided wherever they are not strictly necessary.

When a function produces a side effect you have to know more than just its inputs and output to understand what that function does. You need to know about the context and history of the state of the program, which makes the function harder to understand. Side effects can cause bugs by interacting in unpredictable ways, and the functions that produce them are harder to test thanks to their reliance on the context and history of the program’s state.

## What is a pure function anyway?

A pure function is a function in the mathematical sense. That is, a mapping from input to output. **A pure function doesn’t actually do anything observable – it doesn’t talk to any APIs or update the DOM** – it just does some computation and returns a value.

Pure functions are the bread and butter of functional programming, and they have two very important properties compared to “normal functions”:

* Given the same input arguments the function always returns the same value. Another way of saying this is that the function does not depend on any information other than what is passed in as arguments. The program state, cookies, context, session variables, nothing matters here.
* Evaluating the function produces no observable side effects, such as changing state or I/O.


```
function getAge(born) {
    const now = new Date();
    const age = now.getFullYear() - born.getFullYear();
    
    return age;
```

Well it doesn’t do any I/O or mutatation, so it’s ok on that front. But does it always return the same value for the same input? Not really, because of `new Date()`. The reason it’s not pure is because it depends on some mutable information we didn’t pass in: the current date.

Making this function pure is pretty easy, we just need to accept the current date as a parameter. Now it doesn’t matter when we call this function. As long as we call it with the same input it will always return the same value.

```
function getAge(now, born) {
    const age = now.getFullYear() - born.getFullYear();
    
    return age;
```
