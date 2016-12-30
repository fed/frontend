# Context

[⟵ Take me back to the homepage](/README.md)

The `this` keyword is probably one of the most misunderstood aspects of JavaScript.

## About the `this` keyword

The very first thing to understand when we're talking about this-keyword is really understand what's the purpose of the this-keyword is, or why we even have this-keyword in JavaScript.

What the this-keyword allows us to do, is it allows us to reuse functions with different contexts, or in other words it allows us to decide which objects should be focal when invoking a function or a methods. Imagine we had one function, and we had a bunch of objects that had similar properties, we want that function to work throughout all of our objects.

The first thing you need to ask yourself whenever you're trying to figure out what the this-keyword is, is this question. Where is this function invoked?

Because whenever you're trying to figure out what the this-keyword is, you have to look at when the function was invoked. Not when it was defined, but specifically when it was invoked.

Let's say we had a function here called "say-name," that took in a name and then it's going to council that log, "hello," and whatever that name was.

```js
function sayHi(name) {
  console.log('Hello, ' + name);
}
```

If I were to ask you right now what this last function is doing, and specifically what is it console.logging his name, you wouldn't know, because you're not going to understand what name is until the function is invoked. It's the exact same idea with the this-keyword. We won't know what the this-keyword is in a function until that function is invoked.

## Context Bindings

* Implicit Binding
* Explicit Binding
* `new` Binding
* `window` Binding

## Implicit Binding

Implicit binding says that when you call a function and when the function is invoked, look to the left of the dot, and that is what the this-keyword is going to reference.

```js
var me = {
  name: 'Fed',
  age: '26',
  sayName: function () {
    console.log(this.name);
  }
};

me.sayName() // we get Fed
```


```js
var Person = function (name, age) {
  return {
    name: name,
    age: age,
    sayName: function () {
      console.log(this.name);
    },
    mother: {
      name: 'Stacey',
      sayName: function () {
        console.log(this.name);
      }
    }
  }
}

var jim = new Person('Jim', 26);

jim.sayName();
jim.mother.sayName();
```

What if we came in here and had a new object on this other object that also had a name property, and that also had a say-name property?

What do we expect this invocation to give us? If we look, here's the invocation. We look what's to the left of the dot. Here's the dot and it's mother, and does mother have a name property? It does, which is Stacey, so we should expect to see Stacey. There we go.

## Explicit Binding

This is about explicitly setting the value of `this` to a function upon execution.

What if we were to take SayName out of this function? Instead of being a method on the object, now, it's just a function currently on the global scope. Now, what we want to do is we want to somehow call this function in the context of Stacy. What we can do is if we type the function name, every function has a .call property that allows us to do just that.

The very first argument that it takes in is the context that you want to call this function is. Now, what happens is SayName is going to be invoked, and this keyword inside of SayName is going to reference Stacy. If we log this, we should see, "My name is Stacey".

```js
var sayName = function () {
  console.log('My name is ' + this.name);
};

var stacey = {
  name: 'Stacey',
  age: 34
};

sayName.call(stacey);
```

## Using `call` and `apply`

* Call and Apply are the same about the way in which they explicitly set the value of `this` for a function call.
* Call and Apply differ only in the way in which we pass extra arguments to the function invocation: Call -> Comma separated values, Apply -> Array of values. First argument for both cases is always the object we want to bind the function to.
* .bind is almost the exact same thing as .call, except there's one thing that's different: it defers the function invocation! .bind is going to return us a new function instead of invoking the original function. It's just going to bind this to Stacey, passing these arguments, and then, return us a brand-new function which we can call later at some point.

To recap, .call, apply and bind allow us to specifically state what this keyword will be within any given function. .call and .apply behave the same way, they will immediately invoke that function, but with .call, you pass in arguments one-by-one, and with .apply, you pass them in as an array, .bind is the exact same thing as .call, but except for immediately invoking the function, it's going to return you a brand-new function that you can invoke later.

When using the `call` or `apply` methods of `Function.prototype`, the value of `this` inside the called function gets explicitly set to the first argument of the corresponding function called.

```javascript
function timezone () {
  console.log(this.timezone + ' in ' + arguments[1] + ', ' + arguments[0]);
}

var AU = {
  name: 'Australia',
  capital: 'Canberra',
  timezone: 'UTC+10:00'
};

var NZ = {
  name: 'New Zealand',
  capital: 'Wellington',
  timezone: 'UTC+12:00'
};

// The call() method calls a function with a given this value and arguments provided individually.
timezone.call(AU, AU.name, AU.capital); // "UTC+10:00 in Canberra, Australia"

// The apply() method calls a function with a given this value and arguments provided as an array.
timezone.apply(NZ, [NZ.name, NZ.capital]); // "UTC+12:00 in Wellington, New Zealand"
```

## Using `bind`

The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

```javascript
function showQuantity () {
  console.log(this.quantity);
}

var daysPerWeek = { quantity: 7  },
    hoursPerDay = { quantity: 24 };

// jQuery equivalent: $.proxy(showQuantity, daysPerWeek);
var showDaysPerWeek = showQuantity.bind(daysPerWeek);

// jQuery equivalent: $.proxy(showQuantity, hoursPerDay);
var showHoursPerDay = showQuantity.bind(hoursPerDay);

showDaysPerWeek(); // 7
showHoursPerDay(); // 24
```

## More on `bind`

Right here, I have this function `bark`, which we'll count as [indecipherable 00:09] dog bark noise. :warning: **Bark looks like a free flowing function, but there are actually no free flowing functions in JavaScript. They're all attached to objects.** :warning: In this case, the bark function's currently attached to the global `window` object. Unless that global object has a `barkNoise` property, that's going to be `undefined`. What we want to do is be able the call the `bark` function in the context of `dog` so it actually does say the bark noise.

If I run this without changing the context, you'll see we get `undefined`. But we actually have this `.bind` method on functions that we can use to pass in a different context. `bind` returns a function that we can invoke. Now, if I run it, we get the `bark, bark, bark` string back.

```
var bark = function () {
  console.log(this.barkNoise);
};

var dog = { barkNoise: 'bark bark bark' };

bark.bind(dog);
```

## Recreating `Function.prototype.bind`

```
Function.prototype.bind = function (context) {
  var fn = this;
  var outterArgs = [].slice.call(arguments, 1);
  
  return function () {
    var innerArgs = [].slice.call(arguments, 0);
    fn.apply(context, [].concat(outterArgs, innerArgs));
  };
};
```

## Different type of bindings in JavaScript

* **Implicit Binding:**  which is you look to the left of the dot, at call time.
* **Explicit Binding:** which is telling a function what the context of the this keyword is going to be using `call`, `apply`, or `bind`.
* **`new` operator Binding:** which is whenever you have a function invoked with the `new` keyword, the `this` keyword is bound to the new object being constructed.
* **`window` object Binding:** if none of these rules apply, then the `this` keyword is going to default to the Window object unless you're in strict mode. Then it's just going to be undefined.

### More on `new` Binding

We have capitalized the first letter to express that this is going to be a constructor function, and that should be called with the new keyword. Let's go ahead and have this function take in a color, a name, and a type. Then what we usually do is just go ahead and add those to this.

```js
var Animal = function (color, name, type) {
  // this = {} --> `this` equals to a brand new object being created by the `new` operator
  this.color = color;
  this.name = name;
  this.type = type;
};

var puppy = new Animal('brown', 'chubbs', 'dog');
```
What happens when this function is invoked? Let's make a new zebra. Because we're invoking it with the new keyword, what's going to happen is, behind the scenes here, JavaScript is going to create a brand new object for us and save it as this. It's a little bit more fancy than just a regular object, which we'll talk about in another video.

For now, you can leave out. This in here is just an object. The new binding rule states that when a function is invoked with the new keyword that this keyword inside that function is bound to the new object being constructed, or this object right here.

### More on `window` binding


```js
var sayAge = function () {
  console.log(this.age);
};

var me = {
  age: 26
};
```

What if we just tried to invoke say age and we don't specify what the this keyword is? We're not using `call`. There's also nothing to the left of the dot, so let's see what happens here.

You'll notice we get `undefined`, because what's happening is if you invoke a function that uses the this keyword but doesn't have anything to the left of the dot, it's not using the new binding, and you're not using call, apply, or bind, then the this keyword is going to default to the Window object.

```js
// ------------
// 1: We get `undefined`
// ------------
sayAge();
```

If we add a property of age to the Window object we no longer get `undefined` here:

```js
// ------------
// 2: We get `25`
// ------------
window.age = 25;

sayAge(); // we now get `25`
```

What's interesting, though, is if I run this function in strict mode, what happens is I get an error because strict mode is smart enough to know that, "Hey, you don't want to do what you're doing. You don't want the this key word to be bound to the Window object or to reference the Window object, so I'm not even going to let you do that.". Basically, what strict mode does is it allows us to opt into a more strict version of JavaScript. 

```js
// ------------
// 3: We get an exception thrown
// ------------
var sayAge = function () {
  'use strict';
  console.log(this.age);
};

sayAge();
```

## Arrow functions w/autobinding

Arrow functions are automatically bound to their lexical scope (i.e.: `this` gets passed in from the parent into the arrow function).

```
function () {
	this.greeting = 'G'day mate';
	
	setTimeout(function () {
		console.log(this.greeting);
	}.bind(this)); // If we don't bind it here, it will echo out undefined
	
	setTimeout(() => {
		console.log(this.greeting);
	});
}
```
