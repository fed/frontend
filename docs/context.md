# Context

[⟵ Take me back to the homepage](/README.md)

This is about explicitly setting the value of `this` to a function upon execution.

## Using `call` and `apply`

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
