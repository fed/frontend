# Homework


## Introduction

This is a tetris-like game, done in pure native javascript, using ECMAScript 5 specific methods, which is nice but not compatible with all browsers. The game is also using requirejs and some grunt tools for the development part.

## Tools

As part as your development workflow, it can usefull to use some tool either for the development or staging phase, let's see what we have for this project:
 - **jQuery**: The famous Javascript Library | [homepage](https://jquery.com)
 - **RequireJS**: Javascrit File and Module loader | [homepage](http://requirejs.org)
 - **NodeJS**: Platform built on V8 Javascript Runtime | [homepage](https://nodejs.org/)
 - **Mocha**: Javascrit Test Framework (QA) | [homepage](http://mochajs.org)
 - **Chai**: Assertion Library (QA) | [homepage](http://chaijs.com)
 - **Grunt**: Javascript Task Runner (dev) | [homepage](http://gruntjs.com)
 - **ESLint**: Pluggable Linting (debug) Utility for JavaScript (dev) | [homepage](http://eslint.org)


## Instructions


### Dev's

The files you will be interested in are in the `js/*` folder, especially `js/game.js`.


#### Tasks

 - make the use of jQuery where needed (for cross-browser compatibility).
 - finish the game, there is nothing done about the "game over" case, find the best way to implement it.


#### Start

Make sure you have NodeJS (including its package manager npm) installed.

Run `npm install`, `grunt` and go to the `index.html` in your favorite browser.


### QA's

The files you will be interested in are in the `js/` and `test/` folders. You will actually debug the `js/game.js` file writting test-case scenarios in the `test/test.js` file. This file has already been created with some examples.

The tests will be managed by **mocha** and **chai**.


#### Tasks
 - learn a bit more about [mocha](http://mochajs.org/) and [chai](http://chaijs.com/guide/).
 - choose which test-driven process (**BDD** or **TDD**) better fits you.
 - choose between the assertion interfaces (`assert`, `expect` or `should`) available.
 - write 50 test-cases using everything you learned during the training.


#### Start

Make sure you have NodeJS (including its package manager npm) installed.

Run `npm install`, `grunt` and go to the `test/index.html` in your favorite browser.
