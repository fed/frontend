# jQuery vs Vanilla JS: Because you don't always really need jQuery

Surely jQuery is super duper cool but there are some times in which importing and using it is just unnecessary since we can achieve the exact same thing writing pretty much the same amount of code using vanilla JavaScript.

![Imgur](http://i.imgur.com/3FpStxZ.jpg)

## DOM ready

```javascript
$(document).ready(function () {
  // callback
});

document.addEventListener('DOMContentLoaded', function () {
  // callback
});
```

## Selectors

```javascript
var divs = $('div');
var divs = document.querySelectorAll('div'); // get ALL divs
var div = document.querySelector('div'); // get first div only

var title = $('#title');
var title = document.getElementById('title');

var images = $('.image');
var images = document.getElementsByClassName('image');

var articles = $('article');
var articles = element.getElementsByTagName('article');
```

## Creating nodes

```javascript
var newDiv = $('<div />');
var newDiv = document.createElement('div');
```

## Adding, removing and toggling CSS classes

```javascript
newDiv.addClass('foo');
newDiv.classList.add('foo');

newDiv.removeClass('foo');
newDiv.classList.remove('foo');

newDiv.toggleClass('foo');
newDiv.classList.toggle('foo');
```

## Binding events

```javascript
$('a').on('click', function () {
  // event handler
});

[].forEach.call(document.querySelectorAll('a'), function (elem) {
  elem.addEventListener('click', function () {
    // event handler
  });
});
```

## Appending elements

```javascript
$('body').append($('<p/>'));
document.body.appendChild(document.createElement('p'));
```

## Setting attributes

```javascript
$('img').filter(':first').attr('alt', 'My image');
document.querySelector('img').setAttribute('alt', 'My image');
```

## Fetching parent node

```javascript
var parent = $('#about').parent();
var parent = document.getElementById('about').parentNode;
```

## Cloning nodes

```javascript
var clonedElement = $('#about').clone();
var clonedElement = document.getElementById('about').cloneNode(true);
```

## Emptying an element

```javascript
$('#wrap').empty();
var wrap = document.getElementById('wrap');
while(wrap.firstChild) wrap.removeChild(wrap.firstChild);
```

## Checking if node is empty

```javascript
if($('#wrap').is(':empty'))
if(!document.getElementById('wrap').hasChildNodes())
```

## Getting next element

```javascript
var nextElement = $('#wrap').next();
var nextElement = document.getElementById('wrap').nextSibling;
```
