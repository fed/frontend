# HTML5

[← Take me back to the homepage](/README.md)

## What are some of the new features provided in HTML5?

* It provides support for local storage
* New form controls, like `calendar`, `date`, `time`, `email`, `url`, `search`
* `canvas` element is provided to facilitate 2D drawing
* The `video` and `audio` elements are provided for media playback
* New content-specific elements are provided: `article`, `header`, `footer`, `nav`, `section`

## What are some markup elements that have been added in HTML5?

* `<article>` - This tag defines an article.
* `<aside>` - It defines content other than the page content
* `<command>` - It defines a command button to be invoked by the user
* `<details>` - It defines additional details that can be viewed or hidden by the user
* `<dialog>` - It defines a dialog box
* `<figure>` - This tag specifies content like illustrations, diagrams, photos, code listings, etc.
* `<figcaption>` - It is used to provide a caption for a <figure> element
* `<footer>` - This tag defines a footer for a document or section
* `<header>` - This tag is used to define a header for a document or section
* `<hgroup>` - When there are multiple levels in a heading, it groups a set of `<h1>` to `<h6>` elements
* `<mark>` - It defines highlighted text
* `<meter>` - It defines a scalar measurement within a known range
* `<nav>` - It defines links for navigation
* `<progress>` - This tag exhibits the progress of a task 
* `<section>` - It defines a section in a document 
* `<summary>` - It provides a visible heading for a `<details>` element 
* `<time>` - This tag defines a date/time 
* `<wbr>` - This tag defines a line break

## Which HTML4 elements are no longer part of HTML5?

These guys here are gone: `<acronym>`, `<applet>`, `<basefont>`, `<big>`, `<center>`, `<dir>`, `<font>`, `<frame>`, `<frameset>`, `<noframes>`, `<strike>`, `<tt>`.

## What are the advantages of SVG over other image format like JPEG or GIF?

* Since they are vector images, it's possible to zoom/resize/scale them with no degradation whatsoever.
* They can be created and edited with any text editor.
* The print quality of these image is always high at any resolution.
* SVG images can be searched for, indexed, scripted and compressed.

## Can HTML5 get the geographical position of a user?

Yes, using the Geolocation API (see the `getCurrentPosition()` method).

## Explain HTML5 web storage, and the differences between localStorage and sessionStorage.

HTML5 allows web pages to locally store data in key/value pairs within the web user’s browser, a quicker and more secure method than cookies. Data stored in the localStorage object has no expiration date, while data stored in the sessionStorage object only lasts a single session; until the user exits their browser.

`localStorage` object example:

```javascript
localStorage.name = 'John Doe';
console.log('Name: ' + localStorage.name);
```

`sessionStorage` example:

```javascript
if (sessionStorage.clickcount) {
  sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
} else {
  sessionStorage.clickcount = 1;
}

console.log('The user has clicked the button ' + sessionStorage.clickcount + ' time(s) during this session.');
```

Before an HTML5 developer uses web storage, they should check the browser support for both the sessionStorage and localStorage objects.

```javascript
if (typeof(Storage) !== 'undefined') {
  // Yay! localStorage and sessionStorage support :D
} else {
  // Sorry, there's no web storage support :(
}
```

## What is the application cache, and what are its benefits?

The application cache generates offline versions of a web application, making it accessible offline. It also improves the site’s performance and speed. To enable the application cache, just add the manifest attribute inside the `<html>` tag and link to the manifest file. If a web user visits a page with the manifest attribute included, that page will be cached.

## What's the manifest file?

The manifest file is a text file that instructs the browser what it should and should not cache when the application cache is enabled. It is made up of three parts:

* **Cache Manifest:** Indicates files to be cached after they are initially downloaded.
* **Network:** Indicates files that require a server connection to load, and will not be cached.
* **Fallback:** Indicates fallback pages in the case a page is not accessible.

The suggested file extension for manifest files is `.appcache`. Here's an example manifest file:

```
CACHE MANIFEST
# 2015-06-01 v1.0.0
/theme.css
/logo.gif
/main.js

NETWORK:
login.asp

FALLBACK:
/html/ /offline.html
```

## How would you embed an audio file using HTML5?

You can easily embed audio files with HTML5 using the convenient new `<audio>` tag. MP3, WAV and OGG files are supported.

```html
<audio controls>
  <source src="examplesong.mp3" type="audio/mpeg">
  Your browser doesn't support audio embedding feature.
</audio>
```
