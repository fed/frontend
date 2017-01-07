
# Lesson 2: OOP, Design patterns & Intro to jQuery

**Previous notes:**
Tools to share our code:

 - http://jsbin.com/
 - http://jsfiddle.net/
 - http://codepen.io/

Using the browser console: **F12**

----------

##Table of contents

 1. [Intro to OOP on JS](#introduction-to-oop-on-js)
	 1. [Custom objects](#custom-objects)
	 2. [The constructor](#the-constructor)
	 3. [The properties](#the-properties)
	 4. [Methods](#methods)
	 5. [Inheritance & encapsulation](#inheritance-encapsulation)
	 6. [Polymorphism](#polymorphism)
 2. [Design Patterns](#desing-patterns)
	 1. [The costructor pattern](#the-constructor-pattern)
	 2. [The module pattern](#the-module-pattern)
	 3. [The singleton pattern](#the-singleton-pattern)
	 4. [The observer pattern](#the-observer-pattern)
	 5. [Revelation pattern](#revelation-pattern)
	 6. [Facade pattern](#facade-pattern)
	 7. [The prototype pattern](#the-prototype-pattern)
 3. [Introduction to jQuery](#introduction-to-jquery)
	 1. [Selectors](#selectors)
	 2. [Others selection methods](#others-selection-methods)
	 3. [Shortcuts selectors](#shortcut-selectors)
	 4. [Accessing to DOM](#accessing-to-dom)
	 5. [Events](#events)
	 6. [CSS Manipulation](#css-manipulation)
	 7. [Ajax](#ajax)
	 8. [Utils](#utils)


----------

## Introduction to OOP on JS

## Standard built-in objects
JavaScript has several objects included in its core, for example, there are objects like Math, Object, Array, Date and String.

## Custom objects
JavaScript uses functions as classes.
Defining a class is as easy as defining a function. In the example below we define a new class called Person.

```javascript
function Person() {
}
```

To create a new instance of an object `Person` we use the statement `new Person`, assigning the result (which is of type obj) to a variable to access it later. 

```javascript
function Person() {
}

var father = new Person();
var son = new Person();
```

## The constructor:
Is not need to explicitly define a constructor method, because is called at the moment of instantiation.
The constructor is used to set the object's properties or to call methods to prepare the object for use. 

```javascript
console.clear();

var Person = function(firstName, lastName) {
  console.log('Initializing ' + firstName + ' ' + lastName);
};

var father = new Person('Homero', 'Simpson');
var son = new Person('Bart', 'Simpson');
```

View online: 
http://jsbin.com/seyuta/4/edit
http://codepen.io/marcelososa/pen/rVyZeK?editors=101

## The properties:
Properties are variables contained in the class; every instance of the object has those properties. Properties are set in the constructor (function) of the class so that they are created on each instance.

Working with properties from within the class is done using the keyword **this**, which refers to the current object.

```javascript
console.clear();

var Person = function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

var father = new Person('Homero', 'Simpson');
var son = new Person('Bart', 'Simpson');

console.log(father.firstName);
console.log(son.firstName);
``` 

View online: 
http://jsbin.com/seyuta/5/edit
http://codepen.io/marcelososa/pen/PqpdzN?editors=101

## Methods:
Methods follow the same logic as properties; the difference is that they are functions and they are defined as functions. 
Calling a method is similar to accessing a property, but you add `()` at the end of the method name, possibly with arguments.

In JavaScript methods are regular function objects that are bound to an object as a property, which means they can be invoked **"out of the context"**. 

```javascript
console.clear();

var Person = function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

Person.prototype.getFullName = function() {
  console.log(this.firstName + ' ' + this.lastName);
};

var father = new Person('Homero', 'Simpson');
var son = new Person('Bart', 'Simpson');

father.getFullName();
son.getFullName();
```

View online: 
http://jsbin.com/seyuta/6/edit
http://codepen.io/marcelososa/pen/aOJaZQ?editors=101


## Inheritance & Encapsulation:

```javascript
console.clear();

var Person = function (firstName, lastName) {
  var _firstName = firstName,
      _lastName = lastName;
  
  this.setFirstName = function(name) {
    _firstName = name;
  };
  
  this.setLastName = function(last) {
    _lastName = last;
  };
  
  this.getFirstName = function() {
    return _firstName;
  };
  
  this.getLastName = function() {
    return _lastName;
  };
};

var Fireman = function (firstName, lastName, age) {
  // calling to constructor root
  Person.call(this, firstName, lastName);
  
  var _age = age;
  
  this.getAge = function() {
    console.log(_age + ' years old');
  };
};

// Inherits from the Person class
Fireman.prototype = Object.create(Person.prototype);

Fireman.prototype.getFullName = function() {
  console.log(this.getFirstName() + ' ' + this.getLastName());
};

var crazyFireman = new Fireman('Cacho', 'Castaña', 66);
crazyFireman.getFullName();
crazyFireman.getAge();
```
View online: 
http://jsbin.com/seyuta/7/edit
http://codepen.io/marcelososa/pen/LVWJZv?editors=101

## Polymorphism:
```javascript
console.clear();

var Person = function (firstName, lastName) {
  var _firstName = firstName,
      _lastName = lastName;
  
  this.setFirstName = function(name) {
    _firstName = name;
  };
  
  this.setLastName = function(last) {
    _lastName = last;
  };
  
  this.getFirstName = function() {
    return _firstName;
  };
  
  this.getLastName = function() {
    return _lastName;
  };
};

Person.prototype.getFullName = function() {
  return this.getLastName() + ', ' + this.getFirstName();
};

var Fireman = function (firstName, lastName, age) {
  // calling to constructor root
  Person.call(this, firstName, lastName);
  
  var _age = age;
  
  this.getAge = function() {
    return _age + ' years old';
  };
};

// Inherits from the Person class
Fireman.prototype = Object.create(Person.prototype);

// We redefined the getFullName method
Fireman.prototype.getFullName = function() {
  return this.getFirstName() + ', ' + this.getLastName();
};

var crazyFireman = new Fireman('Cacho', 'Castaña', 66);

console.log(crazyFireman.getFullName());
console.log(crazyFireman.getAge());
```

View online: 
http://codepen.io/marcelososa/pen/PqpdGN?editors=101

**Exercise 1:** create a new `FireWoman` class that inherits from Fireman class, redefine getAge method to return "Wat!?". 
Add some new properties, setters and getters.

**Exercise 2:** create a new `Glober` class that inherits from `Person` class. Add date of admission in the company, and a new method that returns the seniority in years.

*Tip:* `new Date().getFullYear()` retun the current year.

**References**
[Introduction to Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) 
[OOP In JavaScript: What You NEED to Know](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/) 
[Object-Oriented Javascript](http://nefariousdesigns.co.uk/object-oriented-javascript.html)

----------
## Desing patterns

 - Design patterns are reusable solutions to commonly occurring problems in software design.
 - Design patterns also provide us a common vocabulary to describe solutions.
 - A pattern usually reflects an out of the box solution that can be adapted to suit our own needs.

#### A simple example
Imagine that we have a script where for each DOM element found on a page with class "foo" we wish to increment a counter.
We have 3 different ways to do:

 1. Select all of the elements in the page using regular expressions
 2. Use a modern native browser feature such as `querySelectorAll()` to select all of the elements (<IE9 partial support).
 3. Use a native feature such as `getElementsByClassName()` to similarly get back the desired collection (<IE9 not supported).

**Which is the best solution?**
Developers using jQuery don't have to worry about this problem however, as it's luckily abstracted away for us using the *Facade* pattern. 

Behind the scenes, the library simply opts for the most optimal approach to selecting elements depending on what our current browser supports and we just consume the abstraction layer.

We're probably all also familiar with jQuery's `$("selector")`. This is significantly more easy to use for selecting HTML elements on a page versus having to manually opt for `getElementById()`, `getElementsByClassName()`, `getElementByTagName` and so on.

### Creational Design Patterns
This patterns focus on handling object creation mechanisms where objects are created in a manner suitable for the situation we're working in. 

 - Factory
 - Builder
 - Prototype
 - Singleton

### Structural Design Patterns
This patterns are concerned with object composition and typically identify simple ways to realize relationships between different objects.

 - Adapter
 - Decorator
 - Facade
 - Proxy

### Behavioral Design Patterns
This patterns focus on improving or streamlining the communication between disparate objects in a system.

 - Iterator
 - Mediator
 - Observer
 - Strategy

----------

## JavaScript Design Patterns

### The Constructor Pattern

**Object creation**
The three common ways to create new objects in JavaScript are as follows:

```javascript
    // preferred, object literal
    var person = {
	    name: "Pepe"
    };
    
    var person = Object.create(Object.prototype);
    
    // antipattern
    var person = new Object();
    person.name = "Pepe";
```
View online:
http://codepen.io/marcelososa/pen/WvpgGj?editors=101

**Basic constructors**
As we saw earlier, JavaScript doesn't support the concept of classes but it does support special constructor functions that work with objects.

```javascript
console.clear();

function Person(name, lastName) {
	this.name = name;
	this.lastName = lastName;
	
	this.getFullName = function () {
		return this.name + " " + this.lastName;
	};
}

// usage
var driver = new Person("Cosme", "Fulanito");
console.log(driver.getFullName());
```
View online:
http://codepen.io/marcelososa/pen/ZGeMpo?editors=101

**Constructors with prototypes**
Functions, like almost all objects in JavaScript, contain a "prototype" object. 

```javascript
console.clear();

function Person(name, lastName) {
	this.name = name;
	this.lastName = lastName;
}

Person.prototype.getFullName = function () {
	return this.name + " " + this.lastName;
};

// usage
var driver = new Person("Cosme", "Fulanito");
console.log(driver.getFullName());
```
View online:
http://codepen.io/marcelososa/pen/LVWJRo?editors=101

### The module pattern
Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized.

**Object literals**
Object literals don't require instantiation using the `new` operator.

```javascript
console.clear();

var Person = {
	name: "Cosme",
	lastName: "Fulanito",
	
	getFullName: function() {
		return this.name + " " + this.lastName;
	}
};

// usage
Person.name = "Pepe";
console.log(Person.getFullName());
```
View online: 
http://codepen.io/marcelososa/pen/mJWGOe?editors=101

**Module pattern**
The Module pattern was originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope.

```javascript
console.clear();

var Person = (function () {
	var _name = "Cosme",
		_lastName = "Fulanito";
		
	var	_getFormalName = function () {
			return _lastName + ", " + _name;
		};
	
	return {
		getFullName: function () {
			return _name + " " + _lastName;
		},
		getFormalName: function () {
			return _getFormalName();
		}
	}
})();

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```
View online: 
http://codepen.io/marcelososa/pen/BNWOQQ?editors=101

**Variations**
*Import mixins*

Demonstrates how globals can be passed in as arguments to our module's anonymous function. This effectively allows us to import them and locally alias them as we wish.
```javascript
console.clear();

var name = "Cosme";
var lastName = "Fulanito";
var Person = (function (n, ln) {
	var _name = n,
		_lastName = ln;
		
	var	_getFormalName = function () {
			return _lastName + ", " + _name;
		};
	
	return {
		getFullName: function () {
			return _name + " " + _lastName;
		},
		getFormalName: function () {
			return _getFormalName();
		}
	}
})(name, lastName);

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```
View online:
http://codepen.io/marcelososa/pen/yNMxVv?editors=101

*Export*

Allows us to declare globals without consuming them and could similarly support the concept of global imports.

```javascript
console.clear();

var Person = (function () {
	var objPerson = {};
	
	// Private variables
	var _name = "Cosme",
		_lastName = "Fulanito";

	// Private method
	function _getFormalName() {
		return _lastName + ', ' + _name;
	};
	
	// Public methods
	objPerson.getFullName = function() {
		return _name + ' ' + _lastName;
	};
	
	objPerson.getFormalName = function() {
		return _getFormalName();
	};
	
	return objPerson;
})();

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```
View online:
http://codepen.io/marcelososa/pen/JdWabz?editors=101

###The Singleton Pattern

The Singleton pattern is thus known because it restricts instantiation of a class to a single object. 

```javascript
console.clear();

var Person = (function (){
	var _instance,
		_name = "Cosme",
		_lastName = "Fulanito";

	var objPerson = function() {
		if(_instance){
			return _instance;
		}
		
		this.getFullName = function() {
			return _name + ' ' + _lastName;
		}
		
		this.setName = function(n) {
			_name = n;
		}
		
		_instance = this;
	};
	
	return objPerson;
})();

// usage
var p1 = new Person();
var p2 = new Person();

p2.setName('Pepito');

console.log(p2.getFullName());
console.log(p1.getFullName());
console.log(p1 === p2);
```
View online:
http://codepen.io/marcelososa/pen/RPpYKP?editors=101

###The Observer Pattern

Is a publish/subscribe pattern which allows a number of observer objects to see an event,  automatically notifying them of any changes to state.

```javascript
console.clear();

var pubsub = {};

(function(myObject) {
 
    // Storage for topics that can be broadcast 
    // or listened to
    var topics = {};
 
    // An topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function(topic, args) {
        if (!topics[topic]) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    };
 
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    
    myObject.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
 
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
 
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));

// usage
var messageLogger = function (topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

pubsub.publish("inbox/newMessage", "hello world!");
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);

pubsub.unsubscribe(subscription);

pubsub.publish("inbox/newMessage", "Hello! are you still there?");
```
View online:
http://codepen.io/marcelososa/pen/BNWOpQ?editors=101

###Revelation Pattern
It is about having private methods, which you also expose as public methods.

```javascript
console.clear();

var Person = (function (){
	var _name = "Cosme",
		_lastName = "Fulanito";

	function _getFullName() {
		return _name + ' ' + _lastName;
	};

	function _getFormalName() {
		return _lastName + ', ' + _name;
	};

	return {
		getFullName: _getFullName,
		getFormalName: _getFormalName
	}

})();

// usage
console.log(Person.getFormalName());
console.log(Person.getFullName());
```
View online:
http://codepen.io/marcelososa/pen/pJeORp?editors=101

###Facade Pattern
Provides a simplified interface to a large body of code.

```javascript
console.clear();

var mobileEvent = {
	// ...
	stop:function (e) {
		e.preventDefault();
		e.stopPropagation();
	}
	// ...
};

// usage
var link = document.querySelector('#someAnchorId');
link.addEventListener('click', function(e){
	mobileEvent.stop(e);
});
```
View online:
http://codepen.io/marcelososa/pen/oXZPBr?editors=101

###The Prototype Pattern

The prototype pattern focuses on creating an object that can be used as a blueprint for other objects through prototypal inheritance. This pattern is inherently easy to work with in JavaScript because of the native support for prototypal inheritance in JS which means we don't need to spend time or effort imitating this topology.

Example:
```javascript
console.clear();

var Person = function Person (name, lastName) {
	var _name = name,
		_lastName = lastName;
		
	this.getName = function getName () {
		return _name;
	};
	
	this.getFullName = function getFullName () {
		return _name + ' ' + _lastName;
	};
};

var Profesor = function Profesor () {
	var department = 'Maths';
	
	this.getDepartment = function getDepartment () {
		return department;
	};
};
Profesor.prototype = new Person('Marcos', 'Andrade');

var pf = new Profesor();
console.log(pf.getFullName());
console.log(pf.getDepartment());
```
View online:
http://codepen.io/marcelososa/pen/NqpLpj?editors=101

----------

**References:**
[Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) 
[JS Patterns](http://shichuan.github.io/javascript-patterns/)
[JavaScript Design Patterns](https://carldanley.com/javascript-design-patterns/)

----------
#Introduction to jQuery#

jQuery is just a JavaScript library, or set of helpful add-ons, to the JavaScript programming language. 

Makes it easy to manipulate a page of HTML after it's displayed by the browser. It also provides tools that help you listen for a user to interact with your page, tools that help you create animations in your page, etc.

jQuery provides a simple interface for the underlying JavaScript.

----------

## Selectors

A selector is a function which makes use of expressions to find out matching elements from a DOM based on the given criteria. Simply you can say, selectors are used to select one or more HTML elements. Once an element is selected then we can perform various operations on that selected element.

For a full list of all jQuery selectors, see the following page in the official jQuery documentation: 
[jQuery Selectors](http://api.jquery.com/category/selectors/)

A jQuery selector is a string which specifies which HTML elements to select. The selector string is passed to the $() or jQuery() selection function which returns a collection of the selected elements.
The selector syntax is the same as CSS selectors.

jQuery lets you select elements based on the following criteria:

 - Element name
 - Element id
 - Element CSS class
 - Element attributes
 - Element visibility
 - Element order
 - Form Fields
 - Element parents or children
 - Combinations of the above

###Others selection methods:

**.find():** The selection set returned by the `$()` or `jQuery()` functions contains a function called `find()`. The `find()` function can be used to find descendants of elements in the selection set.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>find demo</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
</head>
<body>
<p class="findExample first">Morbi luctus <strong>lorem in nulla</strong> varius, sit amet egestas felis consectetur.</p>

<p class="findExample second">Duis fermentum euismod orci, nec accumsan velit iaculis quis. <strong>Morbi</strong> a feugiat arcu, ac sagittis nunc. <strong>Curabitur</strong> nec lacinia <strong>diam</strong>.</p>
</body>
</html>
```

Example:
```javascript
$('p.findExample.second').find('strong').css('color','blue');
```
View online:
http://codepen.io/marcelososa/pen/EjWeWG?editors=101

**.parent():** Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
This method is similar to `.parents()`, except `.parent()` only travels a single level up the DOM tree.

Example: 
```javascript
$('strong').parent('.first').css('color', 'red');
```
View online:
http://codepen.io/marcelososa/pen/YXZOVP?editors=101

**.parents():** Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.

Example:

```javascript
$('strong').parents().css('border', '1px solid blue');
```
View online:
http://codepen.io/marcelososa/pen/yNMxbK?editors=101

**.children():** Get the children of each element in the set of matched elements, optionally filtered by a selector.

Example:

```javascript
$('p').children('strong').css('color', 'pink');
```
View online:
http://codepen.io/marcelososa/pen/JdWaNV?editors=101

###Shortcut selectors

**Fom selectors:** jQuery contains a set of form field selectors which makes it easier to select the various different types of form fields from the DOM.

The most common field selectors are:

 - :input
 - :text
 - :radio
 - :checkbox
 - :button

Usage:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>find demo</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <style>
  .font-xxs {font-size: 12px;}
  .font-xs {font-size: 14px;}
  .font-md {font-size: 18px;}
  .color-red {color: red;}
  .color-blue {color: blue;}
  .color-green {color: green;}
  </style>
</head>
<body>

 <form method="post">
	 <fieldset>
		 <legend>Personal data</legend>
		 <label class="font-xs color-blue">First Name<input type="text" name="firstName" placeholder="Your first name"></label>
		 <label class="font-xs color-blue">Last Name<input type="text" name="lastName" placeholder="Your last name"></label>
	 </fieldset>
	 <fieldset>
		 <legend>Preferences</legend>
		 <label class="font-md color-red"><input type="checkbox" name="preference" value="movies"> Movies</label>
		 <label class="font-md color-red"><input type="checkbox" name="preference" value="music" checked> Music</label>
		 <label class="font-md color-red"><input type="checkbox" name="preference" value="dance"> Dance</label>
	 </fieldset>
	 <input type="submit" value="Submit">
 </form>    

</body>
</html>
```

Example:
```javascript
$(':text').css('background-color', 'gray');
```
View online:
http://codepen.io/marcelososa/pen/mJWGwV

*Reference:* [jQuery Selectors](http://api.jquery.com/category/selectors/)

----------

##Accessing to DOM:

JQuery provides methods to manipulate DOM in efficient way. You do not need to write big code to modify the value of any element's attribute or to extract HTML code from a paragraph or division.

We can remove, add or replace a complete DOM element with the specified HTML or DOM elements.

###DOM Manipulation Methods:

**.after():**  Inserts HTML after the selected element (outside the element).

Example: 
```javascript
$(':text[name="firstName"]').after('*');
```
View online:
http://codepen.io/marcelososa/pen/yNMxXK


----------


**.attr():** Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.

Example: 

```javascript
console.clear();

var lastNamePlaceholder = $(':text[name="lastName"]').attr('placeholder');
console.log(lastNamePlaceholder);

$(':text[name="firstName"]').attr('placeholder', 'Please, your first name');
```
View online:
http://codepen.io/marcelososa/pen/EjWeXG


----------


**.append():** Inserts new HTML into the end of the selected HTML element. The new HTML is concatenated with the HTML the element had already.

Example:

```javascript
$('fieldset').append('<p>Pellentesque euismod nunc non convallis mattis.</p>');
```
View online:
http://codepen.io/marcelososa/pen/waJEqJ


----------


**.before():** Inserts HTML before the selected element (outside the element).

Example: 
```javascript
$(':text').before(': ');
```
View online:
http://codepen.io/marcelososa/pen/LVWJjw


----------


**.detach():** Is the same as `.remove()`, except that `.detach()` keeps all jQuery data associated with the removed elements. This method is useful when removed elements are to be reinserted into the DOM at a later time.

Example:

```javascript
console.clear();

// selector caching
var $firstNameField = $(':input[name="firstName"]').parent();

// remove from DOM
$firstNameField.detach();

// remove color blue class and add new class
$firstNameField.removeClass('color-blue').addClass('color-red');

// re-insert into DOM
$(':text[name="lastName"]').parent().after($firstNameField);
```
View online:
http://codepen.io/marcelososa/pen/YXZOrX


----------


**.empty():** Removes all child elements of the selected HTML element.

Example: 
```javascript
$('label.font-xs').empty();
```
View online:
http://codepen.io/marcelososa/pen/waJErd


----------


**.prop():** Get the value of a property for the first element in the set of matched elements or set one or more properties for every matched element. It should be used when properties contain only two possible values true or false, such as "checked", "selected", "disabled", etc.

Example:

```javascript
console.clear();

// selectors caching
var $musicField = $(':checkbox[value="music"]');
var $lastNameField = $(':text[name="lastName"]');

// return checked property
console.log($musicField.prop('checked'));

// disable last name field
$lastNameField.prop('disabled', true);
```
View online:
http://codepen.io/marcelososa/pen/ZGeMXj


----------


**.remove():** Remove the set of matched elements from the DOM. Use `.remove()` when you want to remove the element itself, as well as everything inside it.

Example: 
```javascript
$('label.font-xs').remove();
```
View online:
http://codepen.io/marcelososa/pen/JdWarq


----------


**.removeAttr():** Remove an attribute from each element in the set of matched elements.

Example: 
```javascript
$(':text[name="firstName"]').removeAttr('placeholder');
```
View online:
http://codepen.io/marcelososa/pen/jPBvaY


----------


**.wrap():** The `wrap()` method can wrap the selected HTML element in another HTML element.

Example: 
```javascript
$('label.font-xs').wrap('<div>');
```
View online:
http://codepen.io/marcelososa/pen/LVWJOw

*Reference:* [jQuery Manipulation](http://api.jquery.com/category/manipulation/)

---

##Events
jQuery makes it straightforward to set up event-driven responses on page elements. These events are often triggered by the end user's interaction with the page, such as when text is entered into a form element or the mouse pointer is moved. 

In some cases, such as the page load and unload events, the browser itself will trigger the event.

We could define six major groups related to:

 1. Browser
 2. Document
 3. Handler Attachment
 4. Form
 5. Keyboard
 6. Mouse

###Browser events

**.error():** The `error()` event is sent to elements, such as images, that are referenced by a document and loaded by the browser. It is called if the element was not loaded correctly.

Example HTML:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>find demo</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <style>
	  img {
		width: 85px;
		height: 85px;
		border: 1px solid #E1E1E1;
		padding: 5px;
	}
  </style>
</head>
<body>

<img alt="First image" src="fhfkh.gif">
<img alt="Second image" src="https://www.google.com.ar/images/srpr/logo11w.png">
<img alt="Third image" src="fhfkh.gif">
<p>
	<input id="btnAction" type="button" value="Some action">
</p>

</body>
</html>
```

Usage:

```javascript
console.clear();

$('img').error(function () {
  $(this).attr('src', 'https://browshot.com/static/images/not-found.png');
});
```
View online:
http://codepen.io/marcelososa/pen/PqpdEb


----------


**.resize():** The `resize` event is sent to the window element when the size of the browser window changes.

Example: 

```javascript
console.clear();

$(window).resize(function () {
	console.log('window size changed!');
});
```
View online: 
http://codepen.io/marcelososa/pen/QbpVaO?editors=001


----------


**.scroll():** The scroll event is sent to an element when the user scrolls to a different place in the element.

###Document events

**.load():** The `load` event is sent to an element when it and all sub-elements have been completely loaded. This event can be sent to any element associated with a URL: images, scripts, frames, iframes, and the window object. **Deprecated: use .on('load', handler)**

**.ready():** The document ready event signals that the DOM of the page is now ready, so you can manipulate it without worrying that parts of the DOM has not yet been created. The document ready event fires before all images etc. are loaded, but after the whole DOM itself is ready.

Usage:

``` javascript
console.clear();

$(document).ready(function () {
	console.log('DOM is fully loaded');
});
```

**.unload():** The `unload` event is sent to the window element when the user navigates away from the page. **Deprecated: use .on('unload', handler)**

###Handler Attachment

**on():** jQuery provides this method to respond to any event on the selected elements. This is called an event binding.

The standard events in the Document Object Model are: blur, focus, load, resize, scroll, unload, beforeunload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, and keyup.

Example:
```javascript
console.clear();

$('img').on('click', function () {
	console.log($(this).attr('alt'));
});
```
View online:
http://codepen.io/marcelososa/pen/dovqmP

We can attach multiple event handlers simultaneously using a plain object.

Example:
```javascript
console.clear();

$('img').on({
	click: function () {
		console.log($(this).attr('alt'));
	},
	dblclick: function () {
		console.log($(this).attr('src'));
	}
});
```
View online:
http://codepen.io/marcelososa/pen/NqpLYa


----------


**.off():** The `.off()` method removes event handlers that were attached with `.on()`.

Example:
```javascript
console.clear();

// attach events
$('img').on({
	click: function () {
		console.log($(this).attr('alt'));
	},
	dblclick: function () {
		console.log($(this).attr('src'));
	}
});

// caching selector
var $btn = $('#btnAction');

// change value and attach event to the button
$btn.val('Remove dblclick event!').on('click', function () {
	$('img').off('dblclick');
});
```
View online:
http://codepen.io/marcelososa/pen/eNvLMP


----------


**.one():** This method is identical to `.on()`, except that the handler is unbound after its first invocation.

Example:
```javascript
console.clear();

$('img').one('click', function () {
	console.log($(this).attr('alt'));
});
```
View online:
http://codepen.io/marcelososa/pen/gpmdzL


----------


**.trigger():** jQuery provides a way to trigger the event handlers bound to an element without any user interaction via the `.trigger()` method.

Example:
```javascript
console.clear();

// attach event
$('img').on('click', function () {
	console.log($(this).attr('alt'));
});

// change value and attach event to the button
$('#btnAction').val('Trigger click event on first image').on('click', function () {
	$('img').first().trigger('click');
});
```
View online:
http://codepen.io/marcelososa/pen/NqpLMa

**Note:** The `.trigger()` function cannot be used to mimic native browser events, such as clicking on a file input box or an anchor tag.

**$.proxy():** This method is most useful for attaching event handlers to an element where the context is pointing back to a different object.

Example:
```javascript
console.clear();

var desktop = {
  breakpoints: [640, 768, 960]
};

var mobile = {
  breakpoints: [320, 480]
};

var Utils = {
  getBreakpoints: function () {
    for(var bp in this.breakpoints){
      console.log(this.breakpoints[bp]);
    }
  }
};

$('#btnAction').on('click', $.proxy(Utils.getBreakpoints, desktop));
```
View online:
http://codepen.io/marcelososa/pen/EjWeLJ

----------


###Form events

 - **.blur():** is sent to an element when it loses focus.
 - **.change():** is sent to an element when its value changes.
 - **.focus():** is sent to an element when it gains focus.
 - **.select():** is sent to an element when the user makes a text selection inside it.
 - **.submit():** is sent to an element when the user is attempting to submit a form.

###Keyboad events

 - **.keydown():** is sent to an element when the user first presses a key on the keyboard.
 - **.keypress():** is sent to an element when the browser registers keyboard input. This is similar to the keydown event, except that modifier and non-printing keys such as Shift, Esc, and delete trigger keydown events but not keypress events.
 - **.keyup():** is sent to an element when the user releases a key on the keyboard.

###Mouse events

 - **.click():** is sent to an element when the mouse pointer is over the element, and the mouse button is pressed and released.
 - **.hover():** The `.hover()` method binds handlers for both mouseenter and mouseleave events.
 - **.dbclick():** is sent to an element when the element is double-clicked.
 - **.mouserover():** is sent to an element when the mouse pointer enters the element.

---
##CSS Manipulation

With the JQuery CSS features you can manipulate the HTML element's CSS attributes and classes without worrying about browsers and their versions as long as the browsers have JavaScript enabled, and you can select HTML elements in the document based on their CSS class. 

These methods get and set CSS-related properties of elements:

**.removeClass():** Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

Example:
``` html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>find demo</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <style>
	img {
		  border: 1px solid #E1E1E1;
		  padding: 5px;
	}
	
	.smallWidth {
	  width: 250px;
	}
	
	.mediumWidth {
	  width: 400px;
	}
	
	.strongBorderRed {
	  border: 3px solid red;
	}
	.thinBorderBlue {
	  border: 1px solid blue;
	}
  </style>
</head>
<body>

<img alt="First image" class="mediumWidth" src="https://webtoolfeed.files.wordpress.com/2012/04/curve_0-preview1.jpg">
<img alt="Second image" class="mediumWidth" src="http://webtoolfeed.files.wordpress.com/2012/04/thief_2-preview1.jpg">
<img alt="Third image" class="mediumWidth" src="http://webtoolfeed.files.wordpress.com/2012/04/colgate_0-preview1.jpg">
<p>
	<input id="btnAction" type="button" value="Some action">
</p>

</body>
</html>
```

Usage:
``` javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $('img').removeClass('mediumWidth');
});
```
View online:
http://codepen.io/marcelososa/pen/NqpLzw


----------


**.addClass():** Adds the specified class(es) to each element in the set of matched elements. It simply adds the class, appending it to any which may already be assigned to the elements.

Example:
``` javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $('img').removeClass('mediumWidth').addClass('smallWidth');
});
```
View online:
http://codepen.io/marcelososa/pen/eNvLKQ


----------


**.toggleClass():** Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.

Example: 
```javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $('img').toggleClass('strongBorderRed');
});
```
View online: 
http://codepen.io/marcelososa/pen/EjWeRJ


----------


**.css():** jQuery can also change multiple CSS properties in a single call, by putting them all into a JavaScript object.

Example:

```javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $('img').css({
	  'border': '2px solid black',
	  'background-color': 'black',
	  'padding': '10px'
  });
});
```
View online:
http://codepen.io/marcelososa/pen/YXZOjw

---

##Ajax
The jQuery AJAX features makes it possible and easy use AJAX in your HTML pages. The term AJAX is short for Asynchronous Javascript And XML. AJAX makes it possible to fetch content from a server in the background (asynchronously), and update parts of your page with the new content - all without having to reload the complete HTML page.

**$.ajax():** The `$.ajax()` function returns an object. On this object the example calls three methods: `done()`, `fail()` and `always()`.

Ajax requests are triggered by JavaScript code; your code sends a request to a URL, and when it receives a response, a callback function can be triggered to handle the response. Because the request is asynchronous, the rest of your code continues to execute while the request is being processed, so it's imperative that a callback be used to handle the response.

In general, Ajax does not work across domains. For instance, a webpage loaded from orbitz.com is unable to make an Ajax request to ebookers.com.

Example:

```javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $.ajax({
    // The URL for the request
    url: 'https://api.myjson.com/bins/2aej4',
    // The data to send
    data: {
      city: 'chicago',
      per_page: 4
    },
    // Whether this is a POST or GET request
    type: 'GET',
    // The type of data we expect back
    dataType: 'json'
  })
    .done(function (response) {
      for(var i in response.results) {
        console.log(response.results[i]);
      }
    })
    .fail(function (jqXhr, status) {
      console.log('Request fail!: ' + status);
    })
    .always(function () {
      console.log('Request complete!');
    });
});
```
View online:
http://codepen.io/marcelososa/pen/bdqxjo

jQuery has two functions that can be used to send simplified HTTP GET and HTTP POST requests. These functions are the `$.get()` and `$.post()` functions.

**$.get():** Load data from the server using a HTTP GET request.

Example:
```javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $.get('https://api.myjson.com/bins/2aej4', {
      city: 'chicago',
      per_page: 4
    })
    .done(function (response) {
      for(var i in response.results) {
        console.log(response.results[i]);
      }
    })
    .fail(function (jqXhr, status) {
      console.log('Request fail!: ' + status);
    })
    .always(function () {
      console.log('Request complete!');
    });
});
```
View online:
http://codepen.io/marcelososa/pen/XbMPBO


----------


**$.post():** Load data from the server using a HTTP POST request.

Example:

```javascript
console.clear();

var $btn = $('#btnAction');
$btn.on('click', function() {
  $.post('https://api.myjson.com/bins/2aej4', {
      city: 'chicago',
      per_page: 4
    })
    .done(function (response) {
      for(var i in response.results) {
        console.log(response.results[i]);
      }
    })
    .fail(function (jqXhr, status) {
      console.log('Request fail!: ' + status);
    })
    .always(function () {
      console.log('Request complete!');
    });
});
```
View online: 
http://codepen.io/marcelososa/pen/LVWJJY

----------

##Utils

**$.data():** Return the value at the named data store for the first element in the jQuery collection, as set by data(name, value) or by an HTML5 data-* attribute.

Example: 
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>find demo</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <style>
	img {
		  border: 1px solid #E1E1E1;
		  padding: 5px;
	}
	
	.smallWidth {
	  width: 250px;
	}
	
	.mediumWidth {
	  width: 400px;
	}
	
	.strongBorderRed {
	  border: 3px solid red;
	}
	.thinBorderBlue {
	  border: 1px solid blue;
	}
  </style>
</head>
<body>

<img alt="First image" class="mediumWidth" src="https://webtoolfeed.files.wordpress.com/2012/04/curve_0-preview1.jpg" data-position="1" data-rel="First">
<img alt="Second image" class="mediumWidth" src="http://webtoolfeed.files.wordpress.com/2012/04/thief_2-preview1.jpg" data-position="5" data-rel="Second">
<img alt="Third image" class="mediumWidth" src="http://webtoolfeed.files.wordpress.com/2012/04/colgate_0-preview1.jpg" data-position="3" data-rel="Third">
<p>
	<input id="btnAction" type="button" value="Some action">
</p>

</body>
</html>
```

Usage:
```javascript
console.clear();

$('img').on('click', function() {
  var data = $(this).data();
  console.log(data);
});
```
View online:
http://codepen.io/marcelososa/pen/yNMxxq


----------


**$.each():** A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. 

Example:
```javascript
console.clear();

var breakpoints = [640, 768, 960];
$.each(breakpoints, function (index, value) {
	console.log(index + ': ' + value);
});

var pos = {
	device: 'tablet',
	breakpoints: [640, 768, 960],
	brand: 'Orbitz'
};
$.each(pos, function (index, value) {
	console.log(index + ': ' + value);
});
```
View online:
http://codepen.io/marcelososa/pen/xGqaav


----------


**$.extend():** Merge the contents of two or more objects together into the first object.
Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over. 

Examples:
```javascript
console.clear();

var obj1 = {
	name: "Hilton",
	place: "New York"
};
var obj2 = {
	name: "Ancasti",
	place: "Catamarca"
};
$.extend(obj1, obj2);
console.log(obj1);
```
View online:
http://codepen.io/marcelososa/pen/mJWGzO

```javascript
console.clear();

var obj1 = {
	name: "Hilton",
	place: "New York"
};
var obj2 = {
	name: "Ancasti",
	place: undefined
};
$.extend(obj1, obj2);
console.log(obj1);
```
View online: 
http://codepen.io/marcelososa/pen/pJeOxZ

```javascript
console.clear();

var obj1 = {
	name: "Hilton",
	place: "New York"
};
var obj2 = {
	name: "Ancasti",
	place: undefined
};
var obj3 = $.extend({}, obj1, obj2);
console.log(obj1);
console.log(obj3);
```
View online:
http://codepen.io/marcelososa/pen/XbMPxG


----------


**$.isEmptyObject():** Check to see if an object is empty (contains no enumerable properties).

**$.map():** The `$.map()` method applies a function to each item in an array or object and maps the results into a new array. 

Example:
```javascript
console.clear();

var prices = [10, 12, 23];
prices = $.map(prices, function (value, index) {
	return (value + 5);
});
console.log(prices);
```
View online:
http://codepen.io/marcelososa/pen/VLpGVe


----------


**$.parseHTML():** Parses a string into an array of DOM nodes.

**$.parseJSON():** Takes a well-formed JSON string and returns the resulting JavaScript value.

Example:
```javascript
console.clear();

var text = '{ "name": "Holiday Inn" }';
var obj = jQuery.parseJSON(text);
console.log(obj.name);
```
View online:
http://codepen.io/marcelososa/pen/gpmdQm


----------


**$.parseXML():** Parses a string into an XML document.

Example:
```javascript
console.clear();

var xml = '<results><hotel><name>Continental</name><address>La Posta 30</address></hotel></results>';

var newXml = $.parseXML(xml);
var address = $(newXml).find('address');
console.log(address.text());
```
View online: 
http://codepen.io/marcelososa/pen/ZGeMmm

----------
**References:**
[jQuery Documentation](http://api.jquery.com/)


----------


**jQuery Exercises:**

```html
<!DOCTYPE html>
<html lang=”en”>
<head>
        <meta charset=”utf-8”>
        <title>Awesome HTML5 Webpage</title>
        <meta name=”description” content=”An awesome HTML5 page YOU built from scratch!”>
        <meta name=”author” content=”Udemy”>
        <style>
        .awesomeText {
			border-bottom: 2px solid #E0E0E0;
			color: #E0E0E0;
			font-size: 36px;
			padding-bottom: 5px;
		}
        </style>
</head>
<body>
  <div id="”wrapper”"> 
   <header class="”main_headline”"> 
    <nav> 
     <ul> 
      <li><a href="”#”">About</a></li> 
      <li><a href="”#”">Services</a></li> 
      <li><a href="”#”">Products</a></li> 
      <li><a href="”#”">Contact</a></li> 
     </ul> 
    </nav> 
    <h1 class="awesomeText">Super Duper Awesome Headline! </h1> 
   </header> 
   <div id="”primary_content”"> 
    <section id="”left_column”"> 
     <h3>A Hitchhiker’s Guide!</h3> 
     <p>To the Galaxy!</p> 
    </section> 
    <section id="”right_column”"> 
     <article> 
      <header> 
       <h3>The Answer to Life?</h3> 
				<p>Published: 30 August 2013 <a class="external" title="Go to editorial" href="#">Editorial</a></p> 
      </header> 
      <p>Douglas Adams, when asked: “What is the answer to life, universe and everything”, replied:</p> 
      <blockquote>
       ”42”
      </blockquote> 
     </article> 
    </section> 
   </div> 
   <footer> 
    <p>The Footer is where all useless info goes!</p> 
		 <p>&copy; 2015 - <a class="external" title="Go to Google!" href="google.com">Google</a></p>
   </footer> 
  </div>
 </body>
</html>
```

Select all `<a>` inside of `<li>` elements and add the following attributes: 
color: red
text-decoration: none

Select all `<a class="external">`, bind a "`click`" event, show an alert with the title text and prevent default action.

Replace text within `<h1>` with title text and add the class `awesomeText`

View online:
http://codepen.io/marcelososa/pen/oXZPOj?editors=101