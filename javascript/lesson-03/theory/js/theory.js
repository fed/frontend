'use strict';

console.log('js-course | lesson 03\n-----------------------');

console.log('Intro', '\n\n');


// ----------------------------------------------
var color = 'Red';

// Red
console.log(color);


// ----------------------------------------------
name = 'Fulano';

console.log(name);
console.log(window.name);


// ----------------------------------------------
function opened () {
  console.log(this, 'opened');
}

opened();
window.opened();


// ----------------------------------------------
function trueGod () {
  var name = 'Messi';

  console.log(name);
}

trueGod();


// ----------------------------------------------
function cuarteto () {
  var starOfCuarteto = 'La Mona';

  console.log(starOfCuarteto);
}

cuarteto();

// ----------------------------------------------
var greetings = 'Hi there!';

function greet () {
  console.log(greetings);
}

function salute () {
  var greetings = 'Hello!';

  console.log(greetings);
}

greet();
salute();


// ----------------------------------------------
var beverage = 'cafe';

function drink (beverage) {
  console.log('Hey, do you want some', beverage, '?');
}

drink('mate');


// ----------------------------------------------
var meat = 'chorrizo';

function asado (meat) {
  var meat = 'matambre';

  console.log('Asado\'s ready, do you want some', meat, '?');
}

asado('costilla');


// ----------------------------------------------
var fruit = 'Papaya';

function fruit () {
  return 'Lulo';
}

// "Papaya"
console.log(fruit);

//console.log(fruit());


// ----------------------------------------------
function dessert (dessert) {
  var dessert = 'Lemon pie';

  console.log('My favorite dessert is', dessert);
}

// "Lemon pie"
dessert('Pasta flora');


// ----------------------------------------------
var countries = ['Argentina', 'Brasil', 'USA', 'Belgium'],
    country = function () {
      var randomIndex = Math.floor(Math.random() * countries.length);

      console.log(countries[randomIndex]);
    };

// "Argentina" or "Brasil" or "USA" or "Belgium"
country();


// ----------------------------------------------
var snl = function intro () {
      console.log('.. And live from New York.. it\'s Saturday Night Live!');
    },
    theSimpsons = function () {
      console.log('Playing opening sequence..');
    };

window.snl();
window.theSimpsons();


// ----------------------------------------------
var family = {
  name: 'Fockers',
  meet: function () {
    console.log('Meet the', this.name);
  }
};

// "This is the Fockers family"
console.log('This is the', family.name, 'family');

// "Meet the Fockers"
family.meet();


// ----------------------------------------------
console.log('Closures', '\n\n');

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

for (var i=0; i<10; i++) {
  console.log('i directly inside the loop', i);
}
for (var i=0; i<10; i++) {
  setTimeout(function () { console.log('i inside a callback', i); }, 0);
}

function callback (i) {
  console.log('fixed: i inside a callback', i);
}

for (var i=0; i<10; i++) {
  setTimeout(callback(i), 0);
}


for (var i=0; i<10; i++) {
  setTimeout(console.log('i inside a callback', i), 0);
}


for (var i=0; i<10; i++) {
  (function (j) {
    setTimeout(function () { console.log('fixed: i inside a callback', j); }, 0);
  }(i));
}

var fernet = (function () {
  // private variables.
  var description = 'this is a fernet\'s singleton',
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
        console.log('Your fernet', brand, 'is served my dear sir!');
      } else {
        console.log('Sorry we don\'t have fernet', brand, 'in stock');
      }
    }
  };
})();



console.log(fernet);

//console.log(brands);
console.log(fernet.brands);
console.log(fernet.description);
fernet.showMeYourStock();
fernet.pourMeOne('banca');
fernet.pourMeOne('branca');

console.log('\'this\' in the global scope', '\n', this, '\n\n');

function someGlobalFunction() {
  //this == undefined == false
  if (!this) {
    console.log('\'this\' in a global function', '\n', this, '\n\n');
  } else {
    console.log('\'this\' in a bound function', '\n', this, '\n\n');
  }
}

var someObject = {
  someMethod: function () {
    console.log('\'this\' inside an object\'s method', '\n', this, '\n\n');
  }
};

var showMeThis = function () {
  console.log(this);
};

function showMeThat () {
  console.log(this);
}

showMeThis();
showMeThat();

someGlobalFunction();
someObject.someMethod();
var someBoundFunction = someGlobalFunction.bind(someObject);
someBoundFunction();

function Team (name) {
  // private variable
  var name = name;

  // public method
  this.sayName = function () {
    console.log(name);
  };
}

var team1 = new Team('River Plate'),
    team2 = new Team('Boca Junior');

team1.sayName();
team2.sayName();


function timezone () {
  console.log(this.timezone, 'in', arguments[1] + ', ' + arguments[0]);
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


function anotherGlobalFunction () {
  console.log(this.x);
}

var anotherObject = {
  x: 5,
  somePublicMethod: function () {
    console.log(this.x);
  }
};


function someFunction () {
  console.log(this.someProperty);
}

var someObject = {
  someProperty: 7
};

var anotherObject = {
  someProperty: 24
};

var bound01 = someFunction.bind(someObject);
var bound02 = someFunction.bind(anotherObject);

// 7
bound01();

// 24
bound02();



function haveBreakfast () {
  var defaultProduct = 'Jam';

  console.log('Have some ' + (this && this.traditionalProduct ? this.traditionalProduct : defaultProduct) + ' for breakfast.');
}

var argentine = {
  traditionalProduct: 'Dulce de Leche'
}

var hotel = {
  allIn: function () {
    console.log('Sorry, we don\'t have ' + this.traditionalProduct + ', here we only serve continental breakfast.');
  }
}

var argentineBreakfast = haveBreakfast.bind(argentine),
    allIn = hotel.allIn.bind(argentine);

haveBreakfast();
argentineBreakfast();
allIn();

console.log('jQuery', '\n\n');

// Document ready.
$(document).ready(function () { console.log('Document ready.'); });
$(function () { console.log('Alt. document ready.'); });

// Window loaded.
$(window).load(function () { console.log('Window loaded.'); });

'use strict';

var styles = 'html, body { height: 100%; margin: 0; overflow: hidden; padding: 0; width: 100%; } \n'
           + '.focus { background: white !important; }',
    mouseX = 0,
    mouseY = 0,
    randomMvtXMax = 5,
    randomMvtYMax = 5,
    opacityMaxDist = 500,
    ajaxUrl = 'http://api.randomuser.me/',

    $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body'),
    $titleSpan = $title.find('span'),
    $input = $('<input type="text" name="userEntry">').appendTo('body'),
    $container = $title.wrap('<div id="container"></div>').parent(),

    onInputKeyUp = function () {
      var color = randomColor();

      $title.css('background', color);
      $input.css('borderColor', color);

      updateTitle.call($input);
    },
    onInputFocus = function () {
      $input.addClass('focus');
    },
    onInputBlur = function () {
      $input.removeClass('focus');
    },
    updateTitle = function () {
      $titleSpan.text($(this).val());
    },
    randomColor = function () {
      var color = '#';

      // 3 * random hexadecimal (R, G, B)
      for (var i=0; i<3; i++) {
        color += randomHexa();
      }

      return color;
    },
    randomHexa = function () {
      // converts a random 0 >= number >= 255 to an hexadecimal
      var hexa = (Math.round(Math.random() * 255)).toString(16);

      // if the hexadecimal < 10, we need it to be of 2 chars
      return hexa.length==1
           ? '0' + hexa
           : hexa;
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
          distX = mouseX - containerX - containerWidth * .5, // ... *.5 => center horizontally the container regarding the mouse
          distY = mouseY - containerY - containerHeight * .5, // ... *.5 => center vertically the container regarding the mouse
          randomMvtX = (randomMvtXMax * .5) - Math.round(Math.random() * randomMvtXMax),
          randomMvtY = (randomMvtYMax * .5) - Math.round(Math.random() * randomMvtYMax),
          posX = containerX + (distX * .1) + randomMvtX,
          posY = containerY + (distY * .1) + randomMvtY,
          maxX = $(window).width() - containerWidth,
          maxY = $(window).height() - containerHeight,
          dist = Math.sqrt(Math.pow(mouseX - posX - containerWidth * .5, 2) + Math.pow(mouseY - posY - containerHeight * .5, 2));

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
          'top': posY  + 'px',
          'opacity': dist > opacityMaxDist
                   ? 0
                   : dist < (randomMvtX + randomMvtY) * .5
                   ? 1
                   : 1 - (dist / opacityMaxDist)
        });
      }

      // this will invoke "onEnterFrame" when repaint is done.
      window.requestAnimationFrame(onEnterFrame);
    },
    onClick = function () {
      $input.focus();
    },
    onAjaxDone = function (response) {
      var user = response.results[0].user,
          userName = user.name.first + ' ' + user.name.last;

      $input.val(userName);
      updateTitle.call($input);
    },
    onAjaxFail = function (error) {
      console.log(error);
    };

$('head')
  .append('<link href="//fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">')
  .append('<style>' + styles + '</style>')

$input
  .detach()
  .appendTo($container)
  .css({
    'background': '#ccc',
    'border': '2px solid #0e8dbc',
    'boxSizing': 'border-box',
    'outline': 'none',
    'padding': '5px',
    'width': '100%'
  })
  .on('keyup', onInputKeyUp)
  .on('focus', onInputFocus)
  .on('blur', onInputBlur)
  .val($titleSpan.text());

$title.css({
  'background': '#0e8dbc',
  'color': 'white',
  'fontFamily': 'Indie Flower',
  'fontSize': '48px',
  'fontWeight': 'normal',
  'margin': '0',
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

$container
  .css({
    'position': 'absolute',
    'left': 0,
    'top': 0,
    'overflow': 'hidden',
    'cursor': 'default',
    'borderRadius': '10px 10px 0 0',
    'boxShadow': '0 5px 25px rgba(0, 0, 0, 0.46)'
  })
  .on('click', onClick);

$(window).on('mousemove', onMouseMove);

$.ajax({
    type: 'get',
    url: ajaxUrl,
    dataType: 'json'
  })
  .done(onAjaxDone)
  .fail(onAjaxFail);

onEnterFrame();

console.log('\n\n');
