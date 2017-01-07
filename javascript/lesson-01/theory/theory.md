# Lesson 1: Introduction to JavaScript

## Table of Contents

  1. [Types](#types)
  1. [Variables](#variables)
  1. [Objects](#objects)
  1. [Arrays](#arrays)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Properties](#properties) 
  1. [Conditional Expressions & Equality](#conditional-expressions--equality)
  1. [Events](#events)
  1. [Hoisting](#hoisting)
  1. [Debugging](#debugging)

#### Types

  - **Primitives**: When you access a primitive type you work directly on its value

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    var foo = 1;
    var bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```
  - **Complex**: When you access a complex type you work on a reference to its value

    + `object`
    + `array`
    + `function`

    ```javascript
    var foo = [1, 2];
    var bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**

#### Variables

  - Always use `var` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    var superPower = new SuperPower();
    ```

  - Use one `var` declaration per variable.
    It's easier to add new variable declarations this way, and you never have
    to worry about swapping out a `;` for a `,` or introducing punctuation-only
    diffs.

    ```javascript
    // bad
    var items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    var items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    var items = getItems();
    var goSportsTeam = true;
    var dragonball = 'z';
    ```

  - Declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

    ```javascript
    // bad
    var i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    var i;
    var items = getItems();
    var dragonball;
    var goSportsTeam = true;
    var len;

    // good
    var items = getItems();
    var goSportsTeam = true;
    var dragonball;
    var length;
    var i;
    ```

  - Assign variables at the top of their scope. This helps avoid issues with variable declaration and assignment hoisting related issues.

    ```javascript
    // bad
    function() {
      test();
      console.log('doing stuff..');

      //..other stuff..

      var name = getName();

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // good
    function() {
      var name = getName();

      test();
      console.log('doing stuff..');

      //..other stuff..

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // bad
    function() {
      var name = getName();

      if (!arguments.length) {
        return false;
      }

      return true;
    }

    // good
    function() {
      if (!arguments.length) {
        return false;
      }

      var name = getName();

      return true;
    }
    ```

**[⬆ back to top](#table-of-contents)**

#### Objects

  - Use the literal syntax for object creation.

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  - Don't use [reserved words](http://www.ecma-international.org/ecma-262/5.1/#sec-7.6.1) as keys.

    ```javascript
    // bad
    var superman = {
      default: { clark: 'kent' },
      private: true
    };

    // good
    var superman = {
      defaults: { clark: 'kent' },
      hidden: true
    };
    ```

  - Use readable synonyms in place of reserved words.

    ```javascript
    // bad
    var superman = {
      class: 'alien'
    };

    // bad
    var superman = {
      klass: 'alien'
    };

    // good
    var superman = {
      type: 'alien'
    };
    ```

**[⬆ back to top](#table-of-contents)**

#### Arrays

  - Use the literal syntax for array creation

    ```javascript
    // bad
    var items = new Array();

    // good
    var items = [];
    ```

  - If you don't know array length use Array#push.

    ```javascript
    var someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  - When you need to copy an array use Array#slice. [jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

    ```javascript
    var len = items.length;
    var itemsCopy = [];
    var i;

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    itemsCopy = items.slice();
    ```

**[⬆ back to top](#table-of-contents)**


#### Strings

  - Use single quotes `''` for strings

    ```javascript
    // bad
    var name = "Bob Parr";

    // good
    var name = 'Bob Parr';

    // bad
    var fullName = "Bob " + this.lastName;

    // good
    var fullName = 'Bob ' + this.lastName;
    ```

  - Strings longer than 80 characters should be written across multiple lines using string concatenation.
  - Note: If overused, long strings with concatenation could impact performance. [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40)

    ```javascript
    // bad
    var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    var errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    var errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

  - When programmatically building up a string, use Array#join instead of string concatenation. Mostly for IE: [jsPerf](http://jsperf.com/string-vs-array-concat/2).

    ```javascript
    var items;
    var messages;
    var length;
    var i;

    messages = [{
      state: 'success',
      message: 'This one worked.'
    }, {
      state: 'success',
      message: 'This one worked as well.'
    }, {
      state: 'error',
      message: 'This one did not work.'
    }];

    length = messages.length;

    // bad
    function inbox(messages) {
      items = '<ul>';

      for (i = 0; i < length; i++) {
        items += '<li>' + messages[i].message + '</li>';
      }

      return items + '</ul>';
    }

    // good
    function inbox(messages) {
      items = [];

      for (i = 0; i < length; i++) {
        items[i] = messages[i].message;
      }

      return '<ul><li>' + items.join('</li><li>') + '</li></ul>';
    }
    ```

**[⬆ back to top](#table-of-contents)**


#### Functions

  - Function expressions:

    ```javascript
    // anonymous function expression
    var anonymous = function() {
      return true;
    };

    // named function expression
    var named = function named() {
      return true;
    };

    // immediately-invoked function expression (IIFE)
    (function() {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

  - Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.
  - **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    var test;
    if (currentUser) {
      test = function test() {
        console.log('Yup.');
      };
    }
    ```

  - Never name a parameter `arguments`, this will take precedence over the `arguments` object that is given to every function scope.

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```

**[⬆ back to top](#table-of-contents)**



#### Properties

  - Use dot notation when accessing properties.

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    // bad
    var isJedi = luke['jedi'];

    // good
    var isJedi = luke.jedi;
    ```

  - Use subscript notation `[]` when accessing properties with a variable.

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    function getProp(prop) {
      return luke[prop];
    }

    var isJedi = getProp('jedi');
    ```

**[⬆ back to top](#table-of-contents)**


#### Conditional Expressions & Equality
  
  - Conditional expressions are evaluated using coercion with the `ToBoolean` method and always follow these simple rules:

    | Argument Type | Result |
	|-------------- |--------|
	|Undefined      |false |
	|Null	        |false |
	|Boolean	    |The result equals the input argument (no conversion)  |
	|Number	        |The result is false if the argument is +0, −0, or NaN otherwise the result is true
	|String	        |The result is false if the argument is the empty String (its length is zero) otherwise the result is true |
	|Object	        |true |

    ```javascript
    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
    }
    ```
  - Equals operator (==)	
	
	|Type(x)         |Type(y)         |Result               |
	|----------------|----------------|---------------------|
	|null            |Undefined       |true                 |
	|Undefined       |null            |true                 |
	|Number          |String          |x == toNumber(y)     |
	|String          |Number          |toNumber(x) == y     |
	|Boolean         |(any)           |toNumber(x) == y     |
	|(any)           |Boolean         |x == toNumber(y)     |
	|String or Number|Object          |x == toPrimitive(y)  |
	|Object          |String or Number|toPrimitive(x) == y  |
	|otherwise…	     |                |false                |

	Where the result is an expression the algorithm is reapplied until the result is a boolean. 
	toNumber and toPrimitive are internal methods which convert their arguments.
	
	```javascript
	var x = 1;
	
	x == 8;     //false
	x == true;  //true
	x == 1;     //true
	```
	
	```javascript
	//EQUALITY CHECK...
	"potato" == false; 
	 
	//HOW IT WORKS...
	//convert boolean using toNumber
	"potato" == 0;
	//convert string using toNumber
	NaN == 0; //false
	```
	
  - Strict equals operator (===)
   
	|Type(x)                       |Values                             |Result|
	|------------------------------|-----------------------------------|------|
	|Type(x) different from Type(y)|                                   |false |
	|Undefined or Null             |                                   |true  |
	|Number                        |x same value as y (but not NaN)    |true  |
	|String                        |x and y are identical characters   |true  |
	|Boolean                       |x and y are both true or both false|true  |
	|Object                        |x and y reference same object	   |true  |
	|otherwise…                    |                                   |false |

	If the operands are of different types the answer is always false. If they are of the same type: object identifiers must reference the same object, strings must contain  identical character sets, other primitives must share the same value. NaN, null and 	 undefined will never === another type. NaN does not even === itself.		
	
	```javascript
	var x = 1;
	
	x === "1";  //false
	x === true; //false
	x === 1;    //true
	```
    
  - Use shortcuts.

    ```javascript
    // bad
    if (name != '') {
      // ...stuff...
    }

    // good
    if (name) {
      // ...stuff...
    }

    // bad
    if (collection.length > 0) {
      // ...stuff...
    }

    // good
    if (collection.length) {
      // ...stuff...
    }
    ```

  - For more information see [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll

**[⬆ back to top](#table-of-contents)**

#### Events

  - HTML allows event handlers (in JS) to be added to HTML elements. In the following example, an onclick attribute (with code), is added to a button element:

    ```html
    <div id="demo"></div>
	<button onclick='getElementById("demo").innerHTML=Date()'>The time is?</button>
	```
- In the next example, the code changes the content of it's own element (using this.innerHTML):
   
	```html
    <button onclick="this.innerHTML=Date()">The time is?</button>
	```
	
- It is more common to see event attributes calling functions:

 	```html
	<button onclick="displayDate()">The time is?</button>
	<script>
	function displayDate() {
		document.getElementById("demo").innerHTML = Date();
	}
	</script>
    ```

**[⬆ back to top](#table-of-contents)**

#### Hoisting

- Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function). 
A variable can be used before it has been declared.

	```js
    x = 5; // Assign 5 to x

	element = document.getElementById("demo"); // Find an element 
	element.innerHTML = x;                     // Display x in the element

	var x; // Declare x
    ```

**[⬆ back to top](#table-of-contents)**

#### Debugging

- The debugger keyword

	```javascript
    var a = 2;
	var b = 4;	
	var c = a + b;	
	debugger;	
	c = c + 1;
    ```
	
- The console.log method

	```javascript
    var a = 2;
	var b = 4;
	var c = a + b;	
	console.log(c);
    ```
    
- Setting breakpoints

- Browsers' Debugging Tools
	###### Chrome
    * Open the browser
    * From the menu, select tools
    * From tools, choose developer tools
    * Finally, select Console

    ###### Firefox Firebug
    * Open the browser
    * Go to the [web page](http://www.getfirebug.com)
    * Follow the instructions how to install Firebug

    ###### Internet Explorer
    * Open the browser
    * From the menu, select tools
    * From tools, choose developer tools
    * Finally, select Console

    ###### Opera
    * Open the browser.
    * Go to the [web page](http://www.opera.com/dragonfly/documentation/debugger)
    * Learn how Opera Draginfly works

    ###### Safari Firebug
    * Open the browser
    * Go to the [web page](http://extensions.apple.com)
    * Follow the instructions how to install Firebug Lite

    ###### Safari Develop Menu
    * Go to Safari, Preferences, Advanced in the main menu
    * Check "Enable Show Develop menu in menu bar"
    * When the new option "Develop" appears in the menu, choose "Show Error Console"

**[⬆ back to top](#table-of-contents)**
