### Exercise 01

```javascript
function isGreaterThanMax (max) {
  var max = max;

  return function (val) {
    return val > max;
  };
}

var isGreater = isGreaterThanMax(10);

console.log(isGreater(3));
console.log(isGreater(10));
console.log(isGreater(13));
```

### Exercise 02

```javascript
function santaClaus () {
  var presents = ['Micromachine', 'GI Joe', 'PS 4', 'Barbie'];

  return {
    givePresent: function () {
      if (presents.length) {
        var randomIndex = Math.floor(Math.random() * presents.length);

        return presents.splice(randomIndex, 1).toString();
      }

      return 'No more presents';
    }
  };
}

var santa = santaClaus();

console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());
```

### Exercise 03

```javascript
var timerId = 0,
    timerInterval = 200;

function timer (timerMaxCount) {
  var id = ++timerId,
      count = 0,
      interval = setInterval(function () {
        if (count >= timerMaxCount) {
          clearInterval(interval);
        } else {
          console.log('Timer ' + id + ': ' + count);
          count++;
        }
      }, timerInterval);
}

timer(10);
timer(40);
```

### Exercise 04

```javascript
function pingPongGame (scorePlayer1, scorePlayer2) {
  var minToWin = 21,
      gapToWin = 2,
      player1Points = scorePlayer1,
      player2Points = scorePlayer2,
      gameFinished = false,
      point = function (player) {
        if (!gameFinished) {
          if (player=='player 01') {
            player1Points++;
          } else if (player=='player 02') {
            player2Points++;
          }

          if (Math.max(player1Points, player2Points) >= minToWin && (Math.max(player1Points, player2Points) - Math.min(player1Points, player2Points)) >= gapToWin) {
            gameFinished = true;
          }

          console.log('player 01 ' + player1Points + ' - ' + player2Points + ' player 02');

          if (gameFinished) {
            console.log('Player ' + (player1Points>player2Points ? '01' : '02') + ' won!!');
          }
        }
      };

  return {
    point: point
  };
}

var game = pingPongGame(20, 20);
game.point('player 02');
game.point('player 02');
game.point('player 02');
```

### Exercise 05

```javascript
var person = {
  firstname: 'some',
  lastname: 'guy',
  nowYouAre: function (firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  },
  whoAreYou: function () {
    console.log('I am ' + this.firstname + this.lastname);
  }
};

person.whoAreYou();
person.nowYouAre('Nicolas', 'Ronsmans');
person.whoAreYou();
```

### Exercise 06

```javascript
function whichColorsIsTheDress () {
  console.log('The dress is obviously ' + this.colorsSeen);
}

var regularGuy = {
      colorsSeen: 'blue and black'
    },
    weirdGuy = {
      colorsSeen: 'white and gold'
    },
    regularGuyColorsSeen = whichColorsIsTheDress.bind(regularGuy),
    weirdGuyColorsSeen = whichColorsIsTheDress.bind(weirdGuy);

regularGuyColorsSeen();
weirdGuyColorsSeen();
```

### Exercise 07

```javascript
(function () {
  setInterval(function () {
    var today = new Date();
    console.log(today.getHours() + ':' + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + (today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
  }, 1000);
}());
```

### Exercise 08

```javascript
var $$$ = (function () {
  var select = function (selector) {
    console.log('Looking for ' + selector + ' inside the DOM');
    console.log(document.querySelector(selector));
  };

  function Main (selector) {
    select(selector);
  }

  Main.select = select;

  return Main;
}());

$$$('head');
$$$.select('body');
```

### Exercise 09

```javascript
$(function () {
  var $div = $('<div id="hello">Hello jQuery fans!!</div>')
              .appendTo('body')
              .fadeOut(0),
      windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      divWidth = $div.outerWidth(),
      divHeight = $div.outerHeight();

  $div
    .css({
      left: windowWidth * .5 - divWidth * .5,
      top: windowHeight * .5 - divHeight * .5
    })
    .fadeIn(800);
});
```

### Exercise 10

```javascript
$(function () {
  var updateInfos = function () {
        $infos.html($(window).width() + 'x' + $(window).height() + '<br>(' + mouseCoord[0] + ', ' + mouseCoord[1] + ')');
      },
      updateMouseCoord = function () {
        mouseCoord = [event.clientX || event.pageX, event.clientY || event.pageY];

        updateInfos();
      },
      mouseCoord = [0, 0],
      $infos = $('<div id="infos"><div>').appendTo('body');

  $(window)
    .on('resize', updateInfos)
    .on('mousemove', updateMouseCoord);
});
```

### Exercise 11

```javascript
$(function () {
  var $img = $('<img>').appendTo('body'),
      resizeImg = function () {
        $img
          .width($(window).width())
          .height($(window).height());
      };

  $(window).on('resize', resizeImg);
  $img
    .on('load', resizeImg)
    .attr('src', 'http://wallvolt.com/wp-content/uploads/2015/02/Lionel-Messi-Wallpaper.jpg');
});
```

### Exercise 12

```javascript
$(function () {
  $('<button id="click-me">Click Me!</button>')
    .appendTo('body')
    .on('click', function () {
      $(this).fadeOut();
    });
});
```

### Exercise 13

```javascript
$(function () {
  $('<input id="name" placeholder="write your name in">')
    .appendTo('body')
    .on('change blur', function (e) {
      $(this).removeClass('valid error').addClass($(this).val() ? 'valid' : 'error');
    });
});
```

### Exercise 14

```javascript
$(function () {
  $('<a id="link" href="http://www.globant.com/" title="http://www.globant.com/">http://www.globant.com/</a>')
    .appendTo('body')
    .on('click', function (e) {
      e.preventDefault();

      var $this = $(this),
          removeOnChar = function () {
            var text = $this.text();
            if (text.length) {
              var randomIndex = Math.floor(Math.random() * text.length);

              text = text.substr(0, randomIndex) + text.substr(randomIndex + 1);
              $this.text(text.length ? text : $this.attr('href'));

              setTimeout(removeOnChar, 100);
            }
          };

      removeOnChar();

      return false;
    });
});
```

### Exercise 15

```javascript
$(function () {
  $('<table id="ceo"><thead><tr><th title="Name">Name</th><th title="Gender">Gender</th><th title="Age">Age</th></tr></thead><tbody><tr><td>Marissa Mayer</td><td>Female</td><td>39</td></tr><tr><td>Larry Page</td><td>Male</td><td>41</td></tr><tr><td>Mark Zuckerberg</td><td>Male</td><td>30</td></tr></tbody></table>')
    .appendTo('body')
    .on('click', 'th', function () {
      var index = $(this).index(),
          rows = [],
          thClass = $(this).hasClass('asc')
                  ? 'desc'
                  : 'asc';

      $('#ceo th').removeClass('asc desc');
      $(this).addClass(thClass);

      $('#ceo tbody tr').each(function (index, row) {
        rows.push($(row).detach());
      });

      rows.sort(function (a, b) {
        var aValue = $(a).find('td').eq(index).text(),
            bValue = $(b).find('td').eq(index).text();

        return aValue > bValue
             ? 1
             : aValue < bValue
             ? -1
             : 0;
      });

      if ($(this).hasClass('desc')) {
        rows.reverse();
      }

      $.each(rows, function (index, row) {
        $('#ceo tbody').append(row);
      })
    });
});
```

### Exercise 16

```javascript
$(function () {
  var squareSide = 100;

  for (var i=0; i<Math.ceil($(window).height() / squareSide); i++) {
    for (var j=0; j<Math.ceil($(window).width() / squareSide); j++) {
      $('<div></div>')
        .appendTo('body')
        .css({
          position: 'absolute',
          left: (j * squareSide) + 'px',
          top: (i * squareSide) + 'px',
          width: squareSide + 'px',
          height: squareSide + 'px',
          background: '#fff'
        })
        .on('mouseover', function () {
          $(this).animate({
            opacity: 0
          }, {
            queue: false,
            duration: 100
          });
        })
        .on('mouseout', function () {
          $(this).animate({
            opacity: 1
          }, {
            queue: false,
            duration: 1000
          });
        });
    }
  }
});
```

### Exercise 17

```javascript
$(function () {
  var $filter = $('<select name="filter"><option value="gender">Gender</option><option value="age">Age</option><option value="country">Country</option></select>').appendTo('body'),
      $fake = $('<div id="fake"><span></span><ul></ul></div>').insertAfter($filter);

  $filter
    .find('option')
      .each(function (index, option) {
        $('<li>' + $(option).text() + '</li>').appendTo($fake.find('ul'))
          .on('click', function () {
            $filter
              .find('option')
                .attr('selected', false)
                .eq($(this).index())
                .attr('selected', true)
                .end()
              .trigger('change');
          });
      })
      .end()
    .on('change', function () {
      $fake
        .find('span')
          .text($filter.find('option:selected').text());
    })
    .trigger('change');

  $fake.on('click', function () {
    $(this).toggleClass('opened');
  });
});
```
