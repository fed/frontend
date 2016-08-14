# Organising CSS

[← Take me back to the homepage](/README.md)

```
**Heads up!** This is a work in progress.
```

## OOCSS

Object oriented CSS is a methodology for writing reusable, scalable and maintainable CSS code. It's done by adhering to two main principles: separating *structure from skin* and *container from content*.

More info and examples of OOCSS [here](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/) and also [here](http://appendto.com/2014/04/oocss/).

### What's a CSS Object?

A CSS object is a repeating visual pattern that can be abstracted into an independent snippet of HTML, CSS, and possibly JavaScript. That object can then be reused throughout a site. In layman's terms, objects in front-end development are simply HTML elements. The CSS is where we make those objects, or elements, modular and location independent to be able to place them anywhere on a page and behave predictably.

### How do you separate the structure from the skin?

This means separating positioning (`position`, `float`, `margin`, etc.) from styling (`background`, `color`, `border`, etc.). In practice, this essentially means not to mix structure / positioning properties with skin / styling properties on the same class definition.

For instance, instead of this:

```css
#button {
  width: 200px;
  height: 50px;
  padding: 10px;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#box {
  width: 400px;
  overflow: hidden;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#widget {
  width: 500px;
  min-height: 200px;
  overflow: auto;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}
```

we could have this:

```css
.button {
  width: 200px;
  height: 50px;
}

.box {
  width: 400px;
  overflow: hidden;
}

.widget {
  width: 500px;
  min-height: 200px;
  overflow: auto;
}

.skin {
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}
```

Now all the elements are using classes, the common styles are combined into a reusable *skin* and nothing is unnecessarily repeated. We just need to apply this skin class to all the elements and the result will be the same as what the first example would produce, except with less code and a possiblity for further reuse.

### How do you separate the container from the content?

Separating container from content is done to allow the re-use of elements and classes no matter where you are in the DOM. A styled element should never be dependent on where it's at in a page. For instance, a latest news module found in a sidebar should not be defined by its current place in the sidebar. It should be movable to a main content area, another module, the footer, so on and so forth.

## What is SMACSS?

SMACSS stands for Scalable and Modular Architecture for CSS. It's a book and a methodology for writing CSS, but its most significant and influential aspect is its organizational system, which is designed to provide a set of buckets into which CSS should be organized. To learn more, check out the [SMACSS web site](https://smacss.com/) and read the book there.

## What's BEM?

BEM – meaning block, element, modifier – is a [front-end naming methodology](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/), a smart way of naming your CSS classes to give them more transparency and meaning to other developers. The naming convention follows this pattern:

* `.block` represents the higher level of an abstraction or component.
* `.block__element` represents a descendent of .block that helps form `.block` as a whole.
* `.block--modifier` represents a different state or version of `.block`.

The reason for double rather than single hyphens and underscores is so that your block itself can be hyphen delimited.

Take this searchform example:

```html
<form class="site-search  full">
    <input type="text" class="field">
    <input type="Submit" value ="Search" class="button">
</form>
```

These classes are fairly loose, and don't tell us much. Even though we can work it out, they're very inexplicit. With BEM notation we would now have:

```html
<form class="site-search  site-search--full">
    <input type="text" class="site-search__field">
    <input type="Submit" value ="Search" class="site-search__button">
</form>
```

We can see that we have a block called `.site-search` which has an element which lives inside it called `.site-search__field`. We can also see that there is a variation of the .site-search called `.site-search--full`. We could even have a christmas variation for this searchform called `.site-search--xmas` to use only on Dec 25th.

When you are using BEM, though, it is important to remember that you don’t need to use it for everything. Take for example:

```css
.caps { text-transform: uppercase; }
```

This CSS would never fall into any BEM category, it’s merely a standalone rule.

## Can we use them all together?

Since OOCSS is an abstract coding methodology, BEM is a concrete application of OOCSS, and SMACSS is an OOCSS-focused organizational structure, they actually play together very nicely, especially when you throw Sass into the mix. Read [this article](https://mattstauffer.co/blog/organizing-css-oocss-smacss-and-bem) for more info on this.

## CSS Modules

```
@TODO
```
