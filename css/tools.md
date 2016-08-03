# CSS Tools and Workflows

[← Take me back to the homepage](/README.md)

### What's a CSS pre-processor?

A CSS pre-processor extends the CSS language, adding features that allow **variables**, **mixins**, **functions** and many other techniques that allow you to make CSS that is more maintainable, themable and extendable. Most popular ones are [Less](http://lesscss.org/), [Sass](http://sass-lang.com/) and [Stylus](https://learnboost.github.io/stylus/).

### What's Compass?

[Compass](http://compass-style.org/) is an extension of Sass (as in Compass requires Sass). It has its own compiler and a large collection of mixins and functions that are incredibly useful (while commonly pointed to for generating vendor prefixed CSS3 properties, it can do things like automatically generate spritemaps and the CSS to go with them).

### What's Lesshat?

[Lesshat](http://lesshat.madebysource.com/) is a mixin library for Less.

### What's a CSS Reset?

A CSS Reset is a short set of CSS rules that resets the styling of all HTML elements to a consistent baseline. Every browser has its own default ‘user agent' stylesheet, that it uses to make unstyled websites appear more legible. For example, most browsers by default make links blue and visited links purple, give tables a certain amount of border and padding, apply variable font-sizes to H1, H2, H3 etc. and a certain amount of padding to almost everything. Ever wondered why Submit buttons look different in every browser? Obviously this creates a certain amount of headaches for CSS authors, who can't work out how to make their websites look the same in every browser. Using a CSS Reset, CSS authors can force every browser to have all its styles reset to null, thus avoiding cross-browser differences as much as possible.

### Ever used Normalize.css? How is it different from a CSS Reset?

Resets impose a homogeneous visual style by flattening the default styles for almost all elements. In contrast, normalize.css retains and preserves many useful default browser styles. This means that you don't have to redeclare styles for all the common typographic elements. When an element has different default styles in different browsers, normalize.css aims to make those styles consistent and in line with modern standards when possible.

### Why use CSS sprites?

It may seem counter intuitive to cram smaller images into a larger image. Wouldn't larger images take longer to load? While the total image size (sometimes) goes up with sprites, several images are loaded with a single HTTP request. Browsers limit the number of concurrent requests a site can make and HTTP requests require a bit of handshaking. Thus, sprites are important for the same reasons that minifying and concatinating CSS and JavaScript are important.

The correct image in the map is loaded using the `background-position` property.

[css-sprite](https://github.com/aslansky/css-sprite) is a wonderful node package that creates sprites from a glob of images. You can also [generate sprites using Compass](http://compass-style.org/help/tutorials/spriting/).

### How can you ensure cross-browser compatibility?

Check out [this article](http://www.smashingmagazine.com/2010/06/07/the-principles-of-cross-browser-css-coding/).

### Why are there vendor prefixes?

The short answer is that CSS3 is not a finished product. CSS 2.1 wasn't published until 2011, and only a handful of CSS3 modules have even reached the level of a formal recommendation, so it's premature to talk about a CSS3 specification that is universally implemented. Thankfully, modern browser makers are helping to push things forward and are helping to craft the standard which follows the lead of real-world practice. As they move closer to general standards, the prefixes are dropped.

### What's a CSS Linter?

Getting our code reviewed by a pro is a great way of improving code quality but what happens if you don't have access to a rockstar programmer? You do the next best thing and grab a 'lint' for that language. Basically, a lint looks at our code and checks for bad programming practices. Undefined variables, inefficient constructs, things like that. Probably the most famous one out there is [CSSLint](http://csslint.net/) which is an open source tool that checks your syntax against a set of predefined rules to root out possible inefficiencies and make sure that your presentation works as expected with little surprises.
