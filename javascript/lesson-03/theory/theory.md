# Lesson 3: Closures, this, IIFE and jQuery

1. [Strict mode](#strict-mode)
1. [Closures](#closures)
1. [this](#this)
1. [IIFE](#iife-immediately-invoked-function-expression)
1. [jQuery](#jquery)

## Strict mode

```javascript
'use strict';
```

ECMAScript 5 introduced strict mode which is now implemented in all major browsers.
Using it will make the JS compiler more exigent but will also help you write better code and avoid falling into bad practices or JS pitfalls. Still, it's recommended using it but not obligatory.
You can either place it in the beginning of your **.js** file, and it will apply to the whole file, or inside a function and will only apply to its body.

**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


## Closures

Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure "remembers" the environment in which it was created.

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

// "Unknown"
person1.getName();

// "Unknown"
person2.getName();

person1.setName('Michael Jackson');

// "Michael Jackson"
person1.getName();

// "Unknown"
person2.getName();

person2.setName('Elvis');

// "Michael Jackson"
person1.getName();

// "Elvis"
person2.getName();
```

Here is a common issue that occurs with loops. When you declare a variable, it becomes available during the whole time (while looping) for the functions inside the loop, not only for one iteration of the loop. In the following examples, the variable i is only declared once and gets its value updated through the loop, if some functions happen to be executed after the loop is finished, they will get for i its last value assigned.

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log('i: ' + i);
  }, i * 1000);
}

// "i: 3"
// "i: 3"
// "i: 3"
```

A quick fix might be:

```javascript
function callback (i) {
  console.log('i: ' + i);
}

for (var i = 0; i < 3; i++) {
  setTimeout(callback, i * 1000, i);
}

// "i: 0"
// "i: 1"
// "i: 2"
```

Or even simpler:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(console.log, i * 1000, 'i: ' + i);
}

// "i: 0"
// "i: 1"
// "i: 2"
```

### Exercise

Create a function which takes a value as a maximum and returns a function which takes another value to compare with the first one and return true if greater. ([solution](https://github.com/NicolasRonsmans/globant-js-course/blob/lesson-03/lesson-03/exercises/corrected.md#exercise-01))

**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures


## this

```this``` is a read-only keyword used to refer to the context. In JS, the context is either global or related to a function. When inside a function, this will return ```window``` or ```undefined``` (in strict mode). Let's see when and how:

When used outside a function, in the main part of the script:

```javascript
// "Window"
console.log(this);
```

When used inside a function:

```javascript
function showMeThis () {
  console.log(this);
};

// "Window" or "undefined" (strict mode)
showMeThis();
```

When used inside a method:

```javascript
var sun = {
  shine: function () {
    console.log(this);
  }
};

// "[object Object]"
sun.shine();
```

When used inside a function constructor (instantiated with ```new``` keyword):

```javascript
function Game () {
  console.log(this);
}

// "[object Object]"
var game = new Game();
```

But that's not all, JS has 3 interesting methods related to the ```this``` concept.

### .call() & .apply()

These methods, when applied to functions or methods, instantly execute them. They take as arguments, first, the object which is going to represent the ```this```, and optionally argument separated by ',' (for ```call()```) or an array of arguments (for ```apply()```).

```javascript
function timezone () {
  console.log(this.timezone + ' in ' + arguments[1] + ', ' + arguments[0]);
}

var USA = {
      name: 'United States of America',
      capital: 'New York',
      timezone: 'UTC-05:00'
    },
    Japan = {
      name: 'Japan',
      capital: 'Tokyo',
      timezone: 'UTC+09:00'
    };

// "UTC-05:00 in New York, United States of America"
timezone.call(USA, USA.name, USA.capital);

// "UTC+09:00 in Tokyo, Japan"
timezone.apply(Japan, [Japan.name, Japan.capital]);
```

### .bind()

Another way to define the context is using the ```bind()``` method. It became available with ECMAScript 5, but has polyfills to assure cross-browsers/versions support.
Its use is very easy, you just have to define to which element (```object```, ```this```) should a function or method be bound and it will become the context for this function or method. Binding will return a new element with the bound function, which can be stored in a variable or passed as an argument. Unlike ```call()``` or ```apply()```, ```bind()``` doesn't execute the bound function when applied.

If you need full compatibility with all common browsers, using jQuery, ```.bind()``` is known as ```$.proxy(functionOrMethd, objectOrThis)```.

```javascript
function showQuantity () {
  console.log(this.quantity);
}

var daysPerWeek = {
      quantity: 7
    },
    hoursPerDay = {
      quantity: 24
    };

var showDaysPerWeek = showQuantity.bind(daysPerWeek); // $.proxy(showQuantity, daysPerWeek);
var showHoursPerDay = showQuantity.bind(hoursPerDay); // $.proxy(showQuantity, hoursPerDay);

// "7"
showDaysPerWeek();

// "24"
showHoursPerDay();
```

### Exercise

Create a function ```whichColorsIsTheDress()``` that will ```console.log()``` the ```colorsSeen``` var. This function will be bound to 2 objects ```regularGuy``` and ```weirdGuy```, each one having a property ```colorsSeen```. Each result of the bound should be stored into a variable and executed to see the result. ([solution](https://github.com/NicolasRonsmans/globant-js-course/blob/lesson-03/lesson-03/exercises/corrected.md#exercise-06))

**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind<br>
https://api.jquery.com/jQuery.proxy/


## IIFE (Immediately-Invoked Function Expression)

In JavaScript, every function, when invoked, creates a new execution context. Because variables and functions defined within a function may only be accessed inside, but not outside, that context, invoking a function provides a very easy way to create privacy.
An IIFE is all about that, but also gets immediately invoked after its declaration using some trick to get the parser to do it, wrapping the function with ```()```.

```javascript
(function(){ /* ... */ }()); // Crockford recommends this one

// or

(function(){ /* ... */ })(); // But this one works just as well
```

A good example of IIFE:

```javascript
var fernet = (function () {
  // private variables.
  var description = 'This is a fernet\'s singleton',
      brands = ['branca', '1882', 'vitone'];

  // object containing public properties and methods that will be assigned to the "fernet" variable.
  return {
    description: description,
    showMeYourStock: function () {
      console.log(brands);
    },
    pourMeOne: function (brand) {
      var isBrand = false;

      for (var i=0; i<brands.length; i++) {
        if (brand === brands[i]) {
          isBrand = true;
          break;
        }
      }

      if (isBrand) {
        console.log('Your fernet ' + brand + ' is served my dear sir!');
      } else {
        console.log('Sorry we don\'t have fernet ' + brand + ' in stock');
      }
    }
  };
})();

// "Object"
console.log(fernet);

// "Uncaught ReferenceError: brands is not defined"
console.log(brands);

// "undefined"
console.log(fernet.brands);

// "This is a fernet's singleton"
console.log(fernet.description);

// "["branca", "1882", "vitone"]"
fernet.showMeYourStock();

// "Sorry we don't have fernet "banca" in stock"
fernet.pourMeOne('banca');

// "Your fernet "branca" is served my dear sir!"
fernet.pourMeOne('branca');
```

**Reference**<br>
http://en.wikipedia.org/wiki/Immediately-invoked_function_expression<br>
http://benalman.com/news/2010/11/immediately-invoked-function-expression

### Exercise

Create an IIFE which will mimic the jQuery object. We will keep it very basic, the object ```$$$``` will return a function which by default will take as a value a DOM selector (class or id) and return the found (or not) results. Also the ```$$$``` object will have a ```.select()``` to do exactly the same. ([solution](https://github.com/NicolasRonsmans/globant-js-course/blob/lesson-03/lesson-03/exercises/corrected.md#exercise-08))


## jQuery

### AJAX

The jQuery AJAX features makes it possible and easy use AJAX in your HTML pages. The term AJAX is short for Asynchronous Javascript And XML. AJAX makes it possible to fetch content from a server in the background (asynchronously), and update parts of your page with the new content - all without having to reload the complete HTML page.

Ajax requests are triggered by JavaScript code; your code sends a request to a URL, and when it receives a response, a callback function can be triggered to handle the response. Because the request is asynchronous, the rest of your code continues to execute while the request is being processed, so it's imperative that a callback be used to handle the response.

In general, Ajax does not work across domains. For instance, a webpage loaded from orbitz.com is unable to make an Ajax request to ebookers.com.

```javascript
$.ajax({
    url: 'https://api.myjson.com/bins/2aej4',
    data: {
      city: 'chicago',
      per_page: 4
    },
    type: 'GET', // or POST
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
```

**Reference**<br>
http://api.jquery.com/jquery.ajax/

### Crazy Widget

For all this jQuery section, don’t forget to include the library in your html before your script:

```html
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
```

1) To avoid some issue if this script is loaded before the DOM, let's ensure that we'll wait for the document to be ready before doing anything:

```javascript
$(document).ready(function () {
  // ALL THE CODE SHOULD BE PUT HERE
});

// Or even shorter

$(function () {
  // ALL THE CODE SHOULD BE PUT HERE
});
```

2) Create a ```h1#title```... with jQuery of course, append it directly to the ```body```:

```javascript
$('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body');
```

3) You can also add a new DOM element using ```.append()```:

```javascript
$('body').append('<input type="text" name="userEntry">');
```

4) Because we will need to access both elements more than once, it is a good practice to "cache" them into variables:

```javascript
var $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body'),
    $input = $('body').append('<input type="text" name="userEntry">').find('input[name="userEntry"]');
```

5) Like all javascript MV* examples, we couldn't skip the 101 binding part, let's update our title's ```span``` with the value of our input when any key is released:

```javascript
$input.on('keyup', function () {
  $title
    .find('span') // ?
      .text($input.val());
});
```

After some optimization:

```javascript
var $titleSpan = $title.find('span');

function onInputKeyUp () {
  $titleSpan.text($(this).val());
}

$input.on('keyup', onInputKeyUp);
```

6) In order to make the input field match the title we can preset its value:

```javascript
$input.val($titleSpan.text());
```

7) We are not only limited to append things to the ```body```, we can also do it to the ```head```, here is a nice font from google fonts online library:

```html
$('head').append('<link href="//fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">');
```

8) Let's do some crazy inline styling:

```javascript
$title.css('fontFamily', 'Indie Flower');
$title.css({
  'background': '#0e8dbc',
  'color': 'white',
  'fontSize': '48px',
  'fontWeight': 'normal',
  'margin': '0',
  'maxWidth': '100%',
  'padding': '10px 20px',
  'textAlign': 'center',
  'textShadow': '0 1px 0 #ccc,' +
                '0 2px 0 #c9c9c9,' +
                '0 3px 0 #bbb,' +
                '0 4px 0 #b9b9b9,' +
                '0 5px 0 #aaa,' +
                '0 6px 1px rgba(0,0,0,.1),' +
                '0 0 5px rgba(0,0,0,.1),' +
                '0 1px 3px rgba(0,0,0,.3),' +
                '0 3px 5px rgba(0,0,0,.2),' +
                '0 5px 10px rgba(0,0,0,.25),' +
                '0 10px 10px rgba(0,0,0,.2),' +
                '0 20px 20px rgba(0,0,0,.15)',
  'whiteSpace': 'nowrap'
});

$input.css({
  'background': '#ccc',
  'border': '2px solid #0e8dbc',
  'boxSizing': 'border-box',
  'outline': 'none',
  'padding': '5px',
  'width': '100%'
});
```

9) We'd like to wrap both our elements into another one, we can achieve it this way:

```javascript
var $container = $title.wrap('<div id="container"></div>').parent();

$input.detach().appendTo($container);
```

10) Let's style the container as well:

```javascript
$container.css({
  'borderRadius': '10px 10px 0 0',
  'boxShadow': '0 5px 25px rgba(0, 0, 0, 0.46)',
  'cursor': 'default',
  'left': 0,
  'overflow': 'hidden',
  'position': 'absolute',
  'top': 0
});
```

11) We can also add some styling rules instead of inline styles:

```javascript
var styles = 'html, body { height: 100%; margin: 0; overflow: hidden; padding: 0; width: 100%; }';

$('head').append('<style>' + styles + '</style>');
```

12) Add some randomness is very simple, try this:

```javascript
var onInputKeyUp = function () {
  var color = [];

  for (var i = 0; i < 3; i++) {
    color.push(Math.round(Math.random() * 255));
  }

  color = 'rgb(' + color.join(',') + ')';

  $title.css('background', color);
  $titleSpan.text($(this).val());
  $input.css('borderColor', color);
};
```

13) To push the user interaction a step ahead, let's capture its mouse position each time he moves it, and make our container following it:

```javascript
var mouseX = 0,
    mouseY = 0,
    onMouseMove = function (event) {
      mouseX = event.clientX || event.pageX;
      mouseY = event.clientY || event.pageY;

      $container.css({
        'left': mouseX + 'px',
        'top': mouseY  + 'px'
      });
    };

$(window).on('mousemove', onMouseMove);
```

14) This step is a bit complex, basically we want to refresh our container's position, not only when the mouse is moving, but on a repeated interval, or at least something close.

We could use ```setInterval``` but there is a better way, using the ```window.requestAnimationFrame(callback)```. What it does is to wait for the page repaint before executing the callback. This way if there is too much calculation we don't force the browser to execute our callback based on a fixed interval. Nevertheless, when no lag is present, the usual fps of the ```window.requestAnimationFrame()``` is around 60fps.

The following code also present some improvements, like centering the container regarding the mouse's coordinates, blocking it when touching any side of the page and adding an ease to the motion:

```javascript
var onEnterFrame = function () {
  var containerWidth = $container.width(),
      containerHeight = $container.height(),
      containerX = $container.offset().left,
      containerY = $container.offset().top,
      distX = mouseX - containerX - containerWidth * .5, // ... *.5 => center horizontally the container regarding the mouse
      distY = mouseY - containerY - containerHeight * .5, // ... *.5 => center vertically the container regarding the mouse
      posX = containerX + (distX * .1), // "ease" function
      posY = containerY + (distY * .1),
      maxX = $(window).width() - containerWidth,
      maxY = $(window).height() - containerHeight;

  // if the container goes outside the viewport, in the horizontal axis
  if (posX < 0) {
    posX = 0;
  } else if (posX > maxX) {
    posX = maxX;
  }

  // if the container goes outside the viewport, in the vertical axis
  if (posY < 0) {
    posY = 0;
  } else if (posY > maxY) {
    posY = maxY;
  }

  // if new position isn't the same as the current one
  if (containerX != posX || containerY != posY) {
    $container.css({
      'left': posX + 'px',
      'top': posY  + 'px'
    });
  }

  // this will invoke "onEnterFrame" when repaint is done.
  window.requestAnimationFrame(onEnterFrame);
};

onEnterFrame();
```

15) To spice up things, add some vibrations if you want:

Adding some vibration could easily be achieved like this:

```javascript
var randomMvtXMax = 5,
    randomMvtYMax = 5,
    onEnterFrame = function () {
      /* ... */

      var randomMvtX = (randomMvtXMax * .5) - Math.round(Math.random() * randomMvtXMax),
          randomMvtY = (randomMvtYMax * .5) - Math.round(Math.random() * randomMvtYMax),
          posX = containerX + (distX * .1) + randomMvtX,
          posY = containerY + (distY * .1) + randomMvtY,

      /* ... */
    };
```

16) All of this made the input kind of hard to click, to work around this, we can make the whole container clickable and when being clicked, focus the input:

```javascript
var onClick = function () {
      $input.focus();
    };

$container.on('click', onClick);
```

17) Let's add/remove a class when the input has or not the focus:

```javascript
var styles = 'html, body { height: 100%; margin: 0; overflow: hidden; padding: 0; width: 100%; } \n'
           + '.focus { background: white !important; }'
    onInputFocus = function () {
      $input.addClass('focus');
    },
    onInputBlur = function () {
      $input.removeClass('focus');
    };

$input
  .on('focus', onInputFocus)
  .on('blur', onInputBlur);
```

18) And for the final touch, we are going to prefill the input and update the title with an ajax request to a free online service (https://randomuser.me/documentation):

```javascript
var ajaxUrl = 'http://api.randomuser.me/',
    onAjaxDone = function (response) {
      var user = response.results[0].user,
          userName = user.name.first + ' ' + user.name.last;

      $input.val(userName);
      updateTitle();
    },
    onAjaxFail = function (error) {
      console.log(error);
    };

$.ajax({
    type: 'get',
    url: ajaxUrl,
    dataType: 'json'
  })
  .done(onAjaxDone)
  .fail(onAjaxFail);
```

Final version of our widget (http://jsbin.com/cavoje/2/):

```javascript
$(function () {
  // Constants
  var styles = 'html, body { background: white; height: 100%; margin: 0; overflow: hidden; padding: 0; width: 100%; } .focus { background: white !important; }',
      mouseX = 0,
      mouseY = 0,
      randomMvtXMax = 5,
      randomMvtYMax = 5,
      ajaxUrl = 'http://api.randomuser.me/';

  // $electors
  var $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body'),
      $input = $('body').append('<input type="text" name="userEntry">').find('input[name="userEntry"]'),
      $titleSpan = $title.find('span'),
      $container = $title.wrap('<div id="container"></div>').parent();

  // Functions
  var onInputKeyUp = function () {
        var color = randomColor();

        $title.css('background', color);
        $titleSpan.text($(this).val());
        $input.css('borderColor', color);
      },
      onMouseMove = function (event) {
        mouseX = event.clientX || event.pageX;
        mouseY = event.clientY || event.pageY;
      },
      onEnterFrame = function () {
        var containerWidth = $container.width(),
            containerHeight = $container.height(),
            containerX = $container.offset().left,
            containerY = $container.offset().top,
            distX = mouseX - containerX - containerWidth * 0.5, // ... *.5 => center horizontally the container regarding the mouse
            distY = mouseY - containerY - containerHeight * 0.5, // ... *.5 => center vertically the container regarding the mouse
            randomMvtX = (randomMvtXMax * 0.5) - Math.round(Math.random() * randomMvtXMax),
            randomMvtY = (randomMvtYMax * 0.5) - Math.round(Math.random() * randomMvtYMax),
            posX = containerX + (distX * 0.1) + randomMvtX,
            posY = containerY + (distY * 0.1) + randomMvtY,
            maxX = $(window).width() - containerWidth,
            maxY = $(window).height() - containerHeight;

        // if the container goes outside the viewport, in the horizontal axis
        if (posX < 0) {
          posX = 0;
        } else if (posX > maxX) {
          posX = maxX;
        }

        // if the container goes outside the viewport, in the vertical axis
        if (posY < 0) {
          posY = 0;
        } else if (posY > maxY) {
          posY = maxY;
        }

        // if new position isn't the same as the current one
        if (containerX != posX || containerY != posY) {
          $container.css({
            'left': posX + 'px',
            'top': posY  + 'px'
          });
        }

        // this will invoke "onEnterFrame" when repaint is done.
        window.requestAnimationFrame(onEnterFrame);
      },
      onClick = function () {
        $input.focus();
      },
      onInputFocus = function () {
        $input.addClass('focus');
      },
      onInputBlur = function () {
        $input.removeClass('focus');
      },
      onAjaxDone = function (response) {
        var user = response.results[0].user,
            userName = user.name.first + ' ' + user.name.last;

        $input.val(userName);
        $titleSpan.text(userName);
      },
      onAjaxFail = function (error) {
        console.log(error);
      },
      randomColor = function () {
        var color = [];

        for (var i = 0; i < 3; i++) {
          color.push(Math.round(Math.random() * 255));
        }

        return 'rgb(' + color.join(',') + ')';
      };

  // Main
   $(window).on('mousemove', onMouseMove);

  $('head')
    .append('<link href="//fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">')
    .append('<style>' + styles + '</style>');

  $container
    .css({
      'borderRadius': '10px 10px 0 0',
      'boxShadow': '0 5px 25px rgba(0, 0, 0, 0.46)',
      'cursor': 'default',
      'left': 0,
      'overflow': 'hidden',
      'position': 'absolute',
      'top': 0
    })
    .on('click', onClick);

  $title.css({
    'fontFamily': 'Indie Flower',
    'background': '#0e8dbc',
    'color': 'white',
    'fontSize': '48px',
    'fontWeight': 'normal',
    'margin': '0',
    'maxWidth': '100%',
    'padding': '10px 20px',
    'textAlign': 'center',
    'textShadow': '0 1px 0 #ccc,' +
                  '0 2px 0 #c9c9c9,' +
                  '0 3px 0 #bbb,' +
                  '0 4px 0 #b9b9b9,' +
                  '0 5px 0 #aaa,' +
                  '0 6px 1px rgba(0,0,0,.1),' +
                  '0 0 5px rgba(0,0,0,.1),' +
                  '0 1px 3px rgba(0,0,0,.3),' +
                  '0 3px 5px rgba(0,0,0,.2),' +
                  '0 5px 10px rgba(0,0,0,.25),' +
                  '0 10px 10px rgba(0,0,0,.2),' +
                  '0 20px 20px rgba(0,0,0,.15)',
    'whiteSpace': 'nowrap'
  });

  $input
    .on('keyup', onInputKeyUp)
    .on('focus', onInputFocus)
    .on('blur', onInputBlur)
    .val($titleSpan.text())
    .detach()
    .appendTo($container)
    .css({
      'background': '#ccc',
      'border': '2px solid #0e8dbc',
      'boxSizing': 'border-box',
      'outline': 'none',
      'padding': '5px',
      'width': '100%'
    });

  $.ajax({
      type: 'get',
      url: ajaxUrl,
      dataType: 'json'
    })
    .done(onAjaxDone)
    .fail(onAjaxFail);

  onEnterFrame();
});
```

### Exercise

#### Part-01

Add one of the images below to an HTML page and, when loaded, make it take full width/height of the viewport, also when resizing, no matter if it becomes disproportionated. ([solution](https://github.com/NicolasRonsmans/globant-js-course/blob/lesson-03/lesson-03/exercises/corrected.md#exercise-11))

[Image 01](http://4231.vn/wp-content/uploads/2015/03/priceless-messi.jpg)
[Image 02](http://media1.fcbarcelona.com/media/asset_publics/resources/000/167/436/size_1280x720/2015-06-06_JUVE_-_FCB_015.v1433625289.JPG)
[Image 03](http://wallvolt.com/wp-content/uploads/2015/02/Lionel-Messi-Wallpaper.jpg)
[Image 04](http://41.media.tumblr.com/c0451634f55138cf934df61c8d5b8871/tumblr_nny56gj6by1rjh70yo1_1280.jpg)
[Image 05](http://www.viveocio.com/wp-content/uploads/2015/06/13-memes-de-la-final-de-la-champios-league-14.jpg)

#### Part-02

Fill the full page with empty ```div```'s, position them accordingly and add a rollover effect (opacity) that can be observed. It should either reveal or hide of the image from Part-01. ([solution](https://github.com/NicolasRonsmans/globant-js-course/blob/lesson-03/lesson-03/exercises/corrected.md#exercise-16))
