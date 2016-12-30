# Making sense out of Scope and Closures in JavaScript

[⟵ Take me back to the homepage](/README.md)

## Scope

* global (`window`) scope
* function scope
* block scope (as of ES6)

```
// Global scope
var country = 'Ireland';
window.anotherCountry = 'Scotland';

// Function scope with var
(function () {
	var country = 'Australia';
  anotherCountry = 'England'; // this will override the global scope
})();

// Block scope with let/const
{
	const country = 'New Zealand';
}

console.log(country); // still Ireland
console.log(anotherCountry); // changed from Scotland to England
```

## Immediately-Invoked Function Expressions

In JavaScript, every function, when invoked, creates a new **execution context**. Because variables and functions defined within a function may only be accessed inside (but not outside) of that context, invoking a function provides a very easy way to create **privacy**. An IIFE is all about that, but also gets immediately invoked after its declaration using some trick to get the parser to do it, wrapping the function with `()`:

```javascript
(function(){ ... }()); // Crockford recommends this one
(function(){ ... })(); // But this one works just as well
```

## Closures

A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created.

Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created.

An important feature of closures is that an inner function still has access to the outer function’s variables even after the outer function has returned. This is because, when functions in JavaScript execute, they use the scope that was in effect when they were created.

```javascript
function Person () {
  var name = 'Unknown';

  return {
    setName: function (newName) {
      name = newName;
    },
    getName: function () {
      console.log(name);
    }
  };
}

var person1 = Person(),
    person2 = Person();

person1.getName(); // "Unknown"
person2.getName(); // "Unknown"

person1.setName('Ned Flanders');
person1.getName(); // "Ned Flanders"
person2.getName(); // "Unknown"

person2.setName('Moe Szyslak');
person1.getName(); // "Ned Flanders"
person2.getName(); // "Moe Szyslak"
```

## Emulating private variables

One of JavaScript's most powerful features is the availability of closures. With closures, scopes always keep access to the outer scope, in which they were defined. Since the only scoping that JavaScript has is function scope, all functions, by default, act as closures.

```javascript
function Counter(start) {
  var count = start;

  return {
    increment: function() {
      count++;
    },

    get: function() {
      return count;
    }
  }
}

var foo = Counter(4);
foo.increment();
foo.get(); // 5
```

Both returned functions here keep a reference to the scope of `Counter` and, therefore, always keep access to the `count` variable that was defined in that scope. Since it is not possible to reference or assign scopes in JavaScript, there is no way of accessing the variable count from the outside. The only way to interact with it is via the two closures.

```javascript
var foo = new Counter(4);
foo.hack = function() {
  count = 1337;
};
```

The above code will not change the variable count in the scope of Counter, since `foo.hack` was not defined in that scope. It will instead create - or override - the global variable `count`.

## Singleton

```javascript
var beer = (function () {
  // private variables
  var description = 'This is a beer\'s singleton',
      styles = ['Irish Red Ale', 'Indian Pale Ale', 'Scotch Ale', 'Kölsch'];

  // object containing public properties and methods that will be assigned to the "beer" variable
  return {
    description: description,
    getStyles: function () {
      console.log(styles);
    },
    serve: function (style) {
      var isStyle = false;

      for (var i = 0; i < styles.length; i++) {
        if (style === styles[i]) {
          isStyle = true;
          break;
        }
      }

      if (isStyle) {
        console.log('Here\'s your ' + style + ', my friend!');
      } else {
        console.log('Sorry, we don\'t have any ' + style + ' left.');
      }
    }
  };
})();

console.log(beer.styles); // "undefined"
console.log(beer.description); // "This is a beer's singleton"
beer.getStyles(); // ["Irish Red Ale", "Indian Pale Ale", "Scotch Ale", "Kölsch"]
beer.serve('IPA'); // "Sorry, we don't have any IPA left."
beer.serve('Indian Pale Ale'); // "Here's your Indian Pale Ale, my friend!"
```
