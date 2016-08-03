# Responsive Web Design

[← Take me back to the homepage](/README.md)

## What's RWD?

Read Ethan Marcotte's [original definition](http://alistapart.com/article/responsive-web-design/).

RWD foundations for crafting multi-device web experiences are:

* fluid grids
* flexible media
* media queries

Responsive web design does not need to stop at making squishy layouts. This isn't a one-size-fits-all solution. [Responsive design is very much an extension of progressive enhancement](http://bradfrost.com/blog/post/the-principles-of-adaptive-design/), so don't get hung up thinking that media queries are the only tool in your toolbox:

* Recognize that the Web is a continuum, not a platform.
* Use feature detection to capitalize on device/browser capabilities so that we can support more devices while still optimizing for the the best of the best.
* No one knows what the Web and device landscape is going to look like in a couple years, but there's a good chance the gadgets sitting underneath Christmas trees a few years from now will have access to the Web. The key aspect of future-friendly thinking is to acknowledge and embrace unpredictability. Think in a future-friendly way by focusing on what really matters, creating portable data, and getting your content ready to go anywhere.
* Be present friendly. When it comes to the Web, the more backward-compatible you are, the more forward-compatible you're likely to be.
* Don't just create myopic buckets ("phone", "tablet", and "desktop"). Rather consider the entire resolution spectrum and all the devices–both present and future–that will access your experience.
* Embrace conditional loading, as this crucial technique helps us deliver highly-performant and fully-featured experiences to our users.
* Get into the browser sooner and test early and often. Performance is invisible, so testing is essential to help us catch performance-hurting decisions.

## Responsive vs Adaptive web design

**Responsive Web Design** provides the optimal viewing experience of a website, no matter what type of device the user is seeing it on. Wikipedia describes it as "an approach aimed at crafting sites to provide an optimal viewing experience (easy reading and navigation with a minimum of resizing, panning, and scrolling) across a wide range of devices from mobile phones to desktop computer monitors". This is done by using fluid grids, which is a term for a design that works no matter what the screen size is. So no matter how much you resize the screen, that same layout will automatically respond to that size.

**Adaptive Web Design** is different from Responsive Design in that there isn't one layout that always changes. Instead, there are several distinct layouts for multiple screen sizes, and the layout used depends on the screen size used. For example, there could be a specific layout for mobile phones, tablets, and desktop computers – each of which are made in advance. These three designs wait on standby until someone visits the site; the site detects the type of device used, and delivers the pre-set layout for that device.

* *Responsive is Harder to Make*: Responsive design is the most difficult choice to pull off since it requires extra attention to the site's CSS and organization to make sure it works well at **any** possible size. It's easier to make a few specific layouts for your website instead of making one layout that can work in any screen size. While this means that each Adaptive layout needs a bit of flexibility to work on several screen sizes, it is easier than making one layout that works for all of them.

* *Adaptive is Less Flexible:* As the last point showed, one drawback of Adaptive design's easier approach is that the final results don't always display the best for a wide variety of screen sizes. While Responsive site designs are guaranteed to work well on any screen size, including new ones continually coming out, Adaptive designs only work on as many screens as its layouts are able to. So if a new device with a new screen size is released, you may find out that none of your Adaptive layouts fit with it well, so you'll have to edit them or add a new one. Responsive sites are flexible enough to keep working on their own, but Adaptive sites will likely need some occasional maintenance.

## What's a media query?

Conditionals... that's what media queries are: logical if statements. If these things are true about the browser, use the CSS inside.

```css
@media (min-width: 600px) and (max-width: 800px) {
  .something { background: red; }
}
```

More info on media queries [here](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries) and also [here](https://css-tricks.com/logic-in-media-queries/).

## What do mobile-first and desktop-first mean? How'd you implement either approach?

For mobile first, your small screen styles are in your regular screen CSS and then as the screen gets larger you override what you need to. That's why we use `min-width` media queries in general.

```css
html { background: red; }

@media (min-width: 600px) {
  html { background: green; }
}
```

On the other hand, for desktop first your large screen styles are in your regular screen CSS and then as the screen gets smaller you override what you need to. So we need to use `max-width` media queries here.

```css
html { background: red; }

@media (max-width: 600px) {
  html { background: green; }
}
```
