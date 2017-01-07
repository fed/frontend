# Lesson 4: Good Practices & Overview of JS frameworks

## Table of Contents
 1. [Good Practices](#good-practices)
 2. [Code Style and Tools](#code-style-and-tools)
 3. [Overview MV* Frameworks](#overview-mv-frameworks)
 4. [Test libraries](#test)
 
## Good Practices

This list of best practices uses code samples and side-by-side examples to help you write more readable, efficient code.

### General

#### Make it Understandable

Choose easy to understand and short names for variables and functions.

```javascript
// Bad variable names
var x1 fe2 xbqne

// Also bad variable names:
var incrementerForMainLoopWhichSpansFromTenToTwenty
var createNewMemberIfAgeOverTwentyOneAndMoonIsFull

//Avoid describing a value with your variable or function name.
isOverEighteen()

// good!
isLegalAge()

```

Your code is a story - make your storyline easy to follow!

#### Avoid Globals

Global variables are a terribly bad idea.

The reason is that every JavaScript file included in the page runs in the same scope. If you have global variables or functions in your code, scripts included after yours that contain the same variable and function names will overwrite your variables/functions.

There are several workarounds to avoid using globals — we’ll go through them one by one now. Say you have three functions and a variable like this:

```javascript
var current = null;
var labels = {
  'home':'home',
  'articles':'articles',
  'contact':'contact'
};

function init(){

};

function show(){
  current = 1;
};

function hide(){
  show();
};
 ```

**Possible Solution**: *Object Literal*: Everything is contained but can be accessed via the object name.

**Problem**: Repetition of module name leads to huge code and is annoying.

```javascript
demo = {
  current:null,
  labels:{
    'home':'home',
    'articles':'articles',
    'contact':'contact'
  },
  init:function(){
  },
  show:function(){
    demo.current = 1;
  },
  hide:function(){
    demo.show();
  }
}
```

**Module Pattern**: You need to specify what is global and what isnt - switching syntax in between.

```javascript
module = function(){
var labels = {
  'home':'home',
  'articles':'articles',
  'contact':'contact'
};
return {
  current:null,
  init:function(){
  },
  show:function(){
     module.current = 1;
  },
  hide:function(){
     module.show();
  }
}
}();
```

***GOOD!***
**Revealing Module Pattern**: Keep consistent syntax and mix and match what to make global.

```javascript
module = function(){
var current = null;
var labels = {
  'home':'home',
  'articles':'articles',
  'contact':'contact'
};
var init = function(){
};
var show = function(){
  current = 1;
};
var hide = function(){
  show();
}
return{init:init, show:show, current:current}
}();
module.init();

```
#### Document your code

Comment what you consider needed - but don’t tell others your life story.

- Use `/** ... */` for multiline comments. Include a description, specify types and values for all parameters and return values.

```javascript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

  // ...stuff...

  return element;
}
```

- Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment.

```javascript
// bad
var active = true;  // is current tab

// good
// is current tab
var active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}
```

- Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are 
`FIXME -- need to figure this out` or `TODO -- need to implement`.

- Use `// FIXME:` to annotate problems
```javascript
function Calculator() {

  // FIXME: shouldn't use a global here
  total = 0;

  return this;
}
```

- Use `// TODO:` to annotate problems

```javascript
function Calculator() {

  // TODO: total should be configurable by an options param
  this.total = 0;

  return this;
}
```

- [JSDocker Sublime Plugin](https://github.com/spadgos/sublime-jsdocs)
- [JSDoc JavaScript documentation generator](https://github.com/jsdoc3/jsdoc)


#### Use Var to Declare Variables

When declaring a variable, always use the var keyword unless you are specifically attaching the variable to an object. Failure to do so attaches your new variable to the global scope (window if you are in a browser). Here is an example to illustrate how this works:

```javascript
function carDemo() {
   var carMake = 'Dodge';
   carModel = 'Charger';
}

console.log(carMake);  //Undefined, since carMake is defined inside the testing function scope

console.log(carModel); //Charger, since this variable has been implicitly attached to window
```

The declaration of the carModel variable is the equivalent of saying `window.carModel = 'Charger';`. This clogs up the global scope and endangers your other JavaScript code blocks, since you might inadvertently change the value of a variable somewhere else.

#### Avoid Reserved / Special Words

JavaScript is rather flexible with what it allows you to do. This isn't always a good thing. For instance, when you create a function, you can specify that one of the parameters be named arguments. This will overwrite the arguments object that every function is given by inheritance. This is an example of a special word that isn't truly reserved. Here is an example of how it would work:

```javascript
// This function correctly accesses the inherited
// arguments parameter
function CorrectWay() {
   for(var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
   }
}

// You should never name a parameter after 
// a reserved or special word like "arguments"
function WrongWay(arguments) {
   for(var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
   }
}

// Outputs 'hello' and 'hi'
CorrectWay('hello', 'hi');

// Outputs 'h', 'e', 'l', 'l', and 'o'
WrongWay('hello', 'hi');
```

There are also reserved words that will cause you issues when you attempt to run your application. A complete listing of these words can be found at the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords). While there are work-arounds to use some of th ese words, avoid doing so if at all possible. Instead, use key words that won't conflict with current or potential future reserved or special words.

#### Modularize

It is tempting and easy to write one function that does everything. However, as you extend the functionality you will find that you do the same things in several functions.

To prevent that, make sure to write smaller, generic helper functions that fulfill one specific task rather than catch-all methods.

At a later stage you can also expose these functions when using the revealing module pattern to create an API to extend the main functionality.
Good code should be easy to build upon without rewriting the core.

#### Use Linting Tools
Use any listing tools for helping you identify common problems in your JavaScript code. 
On the [following section](#code-style-and-tools) you will learn different listing tools as [JSLint](http://www.javascriptlint.com/online_lint.php) or [JSHLint](http://jshint.com/).

### Place Scripts at the Bottom of Your Page when it is possible

JavaScript introduces a lot of new dependencies between the DOM, CSSOM, and JavaScript execution and can lead to significant delays in how quickly the browser can process and render our page on the screen.

If you have JS files whose only purpose is to add functionality -- for example, after a button is clicked -- go ahead and place those files at the bottom, just before the closing body tag. This is absolutely a best practice.

**NOT recommended**
```javascript
<html>
	<head>
		<script type="text/javascript" src="path/to/file.js"></script>    
    </head>
  
    <body>
        ...
    </body>
</html>
```

**Recommended**

```javascript
  <p>And now you know my favorite kinds of corn. </p>
  <script type="text/javascript" src="path/to/file.js"></script>
  <script type="text/javascript" src="path/to/anotherFile.js"></script>
</body>
</html>
```

### jQuery

#### Prefix jQuery object variables with a `$`.

**BAD**

```javascript
var sidebar = $('.sidebar');
```

**GOOD**

```javascript
var $sidebar = $('.sidebar');
```

#### DOM Manipulation - Cache jQuery lookups.
The DOM is slow so cache elements when they are used often.

[Performance test example](http://jsperf.com/cache-jquery-lookups)

**BAD**

```javascript
function setSidebar() {
  $('.sidebar').hide();


  $('.sidebar').css({
    'background-color': 'pink'
  });
}
```

**GOOD**

```javascript

function setSidebar() {
  var $sidebar = $('.sidebar');
  $sidebar.hide();

  $sidebar.css({
    'background-color': 'pink'
  });
}
```

#### Append Outside of Loops
Touching the DOM comes at a cost. If you're appending a lot of elements to the DOM, you will want to append them all at once, rather than one at a time. 

**BAD**

```javascript

$.each( myArray, function( i, item ) {

	var newListItem = "<li>" + item + "</li>";

	$( "#myList" ).append( newListItem );

});
```

**GOOD**

```javascript
var myHtml = "";
 
$.each( myArray, function( i, item ) {
 
    myHtml += "<li>" + item + "</li>";
 
});
 
$( "#myList" ).html( myHtml );
```

----------

**Reference**

* [http://javascript.crockford.com/code.html](http://javascript.crockford.com/code.html)
* [JavaScript Best Practices](http://www.codeproject.com/Articles/580165/JavaScript-Best-Practices)
* [JQuery Performance](https://learn.jquery.com/performance/)
* [Exercise](http://www.codewars.com/?language=javascript)
* https://www.codementor.io/learn-javascript-online

----------


**[⬆ back to top](#table-of-contents)**


## Code Style and Tools

### Style guides
A coding style is an agreement with yourself and the people involved in a codebase, to keep consistency on a project.

The decisions that you made in JavaScript might not carry over to your CSS. For instance, you might decide JavaScript strings should use double quotes while CSS strings should use single quotes. This isn’t uncommon as we tend to context switch when we switch back and forth between languages. Still, it’s an interesting exercise in self-observation.

In general, be consistent: if you edit code of a project, read the source and use the local style of that project.

Coding style is made up of numerous small decisions based on the language:
- How and when to use comments,
- Tabs or spaces for indentation (and how many spaces),
- Appropriate use of white space,
- Proper naming of variables and functions,
- Code grouping an organization,
- Patterns to be used,
- Patterns to be avoided.

There are a quite a few of them aroud, here are the 2 most common ones in the Javascript world:

- [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

----------

**More References**

  - [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  - [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
  - [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js/)
  - [Naming this in nested functions](https://gist.github.com/4135065) - Christian Johansen
  - [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
  - [Popular JavaScript Coding Conventions on Github](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
  - [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

----------

### Tools

A linting tool helps to avoid silly mistakes when writing JavaScript. 

A good linting tool can also help make sure a project adheres to a coding standard.

There are many linters available for JavaScript. They have a set of rules which they use to analyze and report problems in JavaScript files.

### JSHint

JSHint is a community-driven tool to detect errors and potential problems in JavaScript code and to enforce your team's coding conventions. It is very flexible so you can easily adjust it to your particular coding guidelines and the environment you expect your code to execute in. JSHint is open source and will always stay this way.

[Install and Configure](http://jshint.com/docs/)

[Options](http://jshint.com/docs/options/)


### JSCS — JavaScript Code Style.

It doesn’t do anything unless you give it a configuration file or tell it to use a preset. You can download configurations from their website, so it’s not a big problem, and it has a number of presets, such as the jQuery coding style preset and the Google preset.

It has over 90 different rules, but unfortunately it’s not extensible with custom ones. It does, however, support custom reporters, which makes it easier to integrate with tools that need their input in a specific format.

JSCS is a code style checker. This means it only catches issues related to code formatting, and not potential bugs or errors. As a result, it’s less flexible than the others, but if you need to enforce a specific coding style, it’s a job JSCS does well.


----------

**Reference**
- [JSHint](http://www.jshint.com/) - [Airbnb Style .jshintrc](https://github.com/airbnb/javascript/blob/master/linters/jshintrc)
- [JSCS](https://github.com/jscs-dev/node-jscs) - [Airbnb Style Preset](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json)
- [EditorConfig](http://editorconfig.org/)
- [A Comparison of JavaScript Linting Tools](http://www.sitepoint.com/comparison-javascript-linting-tools/)

----------

### Exercise

[Time to work!](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercises.md)

[Possible solution](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercises_solution.md)

## Overview MV* Frameworks

MVC pattern separates the concerns in an application down into three parts:

- **Models** represent the domain-specific knowledge and data in an application. Think of this as being a ‘type’ of data you can model — like a User, Photo or Note. Models should notify anyone observing them about their current state (e.g Views).
- **Views** are typically considered the User-interface in an application (e.g your markup and templates), but don’t have to be. They should know about the existence of Models in order to observe them, but don’t directly communicate with them.
- **Controllers** handle the input (e.g clicks, user actions) in an application and Views can be considered as handling the output. When a Controller updates the state of a model (such as editing the caption on a Photo), it doesn’t directly tell the View. This is what the observing nature of the View and Model relationship is for.

JavaScript ‘MVC’ frameworks that can help us structure our code don’t always strictly follow the above pattern. Some frameworks will include the responsibility of the Controller in the View (e.g Backbone.js) whilst others add their own opinionated components into the mix as they feel this is more effective.

### The Challenge Of Choice: Too Many Options?
There’s been a huge boom in the number of such MV* frameworks being released over the past few years.

[Backbone.js](http://documentcloud.github.io/backbone/), [Ember.js](http://emberjs.com/), [AngularJS](https://angularjs.org/)...The list of new and stable solutions continues to grow each week and developers can quickly find themselves lost in a sea of options. The question is, what to use and how do you choose?

To help solve this problem, there is a project called [TodoMVC](http://todomvc.com/) which offers the same Todo application implemented in most of the popular JavaScript MV* frameworks of today. Solutions look and feel the same, have a common feature set, and make it easy for them to compare the syntax and structure of different frameworks, so you can select the one you feel the most comfortable with or at least, narrow down your choices.

### Exercise

[Exercise 2](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercise2.md)

[Possible solution](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercise2_solution.md)

[Exercise 3](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercise3.md)

[Possible solution](https://github.com/NicolasRonsmans/globant-js-course/tree/lesson-04/lesson-04/exercise/exercise3_solution.md)
### Reference
[Framework comparation](https://www.airpair.com/js/javascript-framework-comparison)
[TodoMVC](http://todomvc.com/)
[Book Learning JavaScript Design Patterns - Section JavaScript MV* Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp)

## Test
The first hurdle to overcome when trying to write unit tests for client-side code is the lack of any actual units; JavaScript code is written for each page of a website or each module of an application and is closely intermixed with back-end logic and related HTML. In the worst case, the code is completely mixed with HTML, as inline events handlers. For that it is important how you write Javascript when you want to test it.

There are many test framework for client-side JavaScript to choose, and it's tough to decide, since they all do basically the same thing:

- Describe what you're testing
- Set up what you're going to test
- Assert whether the thing did what you expect

[Jasmine](http://jasmine.github.io/) is probably the most popular unit testing framework for JavaScript. But [qUnit](https://qunitjs.com/) and [Mocha](http://mochajs.org/) too.

On the following section you will learn some of them.

[Good Slices to read](http://www.slideshare.net/sethmcl/testing-web-apps-33612391)

### qUnit
QUnit is a powerful, easy-to-use JavaScript unit testing framework. It's used by the jQuery, jQuery UI and jQuery Mobile projects and is capable of testing any generic JavaScript code.

A minimal QUnit test setup:
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.18.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="//code.jquery.com/qunit/qunit-1.18.0.js"></script>
  <script src="tests.js"></script>
</body>
</html>
```
The contents of `tests.js`:

```javascrtipt
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
```

**Reference**
- [Oficial qUnit Site](https://qunitjs.com/)
- [Intro to unit test](http://qunitjs.com/intro/)

### Mocha

Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

Mocha is used in combination with any assertion library. It means that Mocha setups and describes test suites while others libraries as [Chai](http://chaijs.com/)  provides convenient helpers to perform all kinds of assertions against your JavaScript code.

The APIs of these frameworks allows you to write your tests in the describe block format.

```javascrtipt
describe('calculator', function() {
    describe('add()', function() {
        it('should add 2 numbers togoether', function() {
            // assertions here
        });
    });
});
```

Chai Assertion Example: 

```javascript
expect(calculator.add(1, 4)).to.equal(5);
```

----------

**Reference**
- [Oficial Mocha Site](http://mochajs.org/)
- [Chai](http://chaijs.com/):  is a BDD / TDD assertion library for node and the browser.
- [Good Example using Mocha and Chai](https://nicolas.perriault.net/code/2013/testing-frontend-javascript-code-using-mocha-chai-and-sinon/)
- [Complete example using Nightwatch and Mocha](https://github.com/sethmcl/testing_web_applications)
----------

### Jasmine
Jasmine is a behavior-driven development framework for testing your JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM.

----------

**Reference**
[Oficial Jasmine Site](https://github.com/jasmine/jasmine)

----------

### Others E2E testing tool
- [nightwatchjs](http://nightwatchjs.org/):  is an easy to use Node.js based End-to-End (E2E) testing solution for browser based apps and websites. It uses the powerful Selenium WebDriver API to perform commands and assertions on DOM elements.
- [Protractor](http://angular.github.io/protractor/) is for end-to-end testing, and uses Selenium Web Driver to drive tests.


