# Object-Oriented Programming – the JS way

[⟵ Take me back to the homepage](/README.md)

## Class definitions using function constructors

```javascript
var Person = function (firstName, lastName, age) {
  // the function's body is the constructor method itself
  
  // private member properties (only available within the constructor fn)
  var _age = age;
  
  // public properties
  this.firstName = firstName;
  this.lastName = lastName;
  
  // privileged method (have access to private properties)
  this.getAge = function () {
    return this.firstName + ' is ' + _age;
  };
};
```

## Public static methods

```javascript
Person.sayHi = function () {
  return 'Hello world';
};
```

## Public non-static methods

Public methods preserve the context (ie: `this`) of the calling instance.

```javascript
Person.prototype.getName = function () {
  return this.firstName + ' ' + this.lastName;
};

Person.prototype.setName = function (name) {
  this.firstName = name;
};
```

## Inheritance (aka: subclases)

```javascript
var Developer = function (firstName, lastName, age, technologies) {
  // call to super
  Person.call(this, firstName, lastName, age);
  
  this.technologies = technologies;
};
```

## Prototypal inheritance

```javascript
Developer.prototype = Object.create(Person.prototype);

Developer.prototype.getTechnologies = function () {
  return this.firstName + ' knows: ' + this.technologies.toString();
};
```

## Polymorphism

```javascript
Developer.prototype.getName = function () {
  return this.firstName + ' ' + this.lastName + ', Developer';
};
```

## Instantiation

```javascript
var john = new Person('John', 'Doe', 30);
var sheldon = new Developer('Sheldon', 'Cooper', 25, ['HTML', 'CSS', 'JS']);

console.log(john.getName());
console.log(john.firstName);
console.log(Person.sayHi());
console.log(sheldon.getTechnologies());
console.log(sheldon.getName());
console.log(sheldon.getAge());
```

## Gotchas

* If the function that was called has no explicit return statement, then it implicitly returns the value of `this` - the new object.
* When the `new` keyword is omitted, the function will not return a new object and it will use the global object as the value of this:

```javascript
var pirate = Person('Barney', 'Stinson', 30); // pirate is undefined
```
