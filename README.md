# Zoom Image

Add mouseover zooming to images.

Support: Chrome, Firefox, Safari, IE9+. Browsers that do not support CSS3 drop transition effects but retain basic functionality.

## Setup

Include the Zoom Image stylesheet and script.

```html
<!-- Zoom Image Stylesheet -->
<link rel="stylesheet" href="zoom-image/zoom-image.css">

<!-- Zoom Image Script -->
<script src="zoom-image/zoom-image.js"></script>
```

Insert an element classified `zoom-image` and add the image that you want to zoom as its `background-image`. This will be used as the initial, zoomed-out version of the image, so a smaller version of the image can be used if desired. Inside of that element, include a `figure` element and add the full-size (zoomed) image as its `background-image`.

```html
<figure class="zoom-image" style="background-image: url( img/zoom.png );">
  <figure style="background-image: url( img/zoom.png );"></figure>
</figure>
```

Call the plugin on the image element.

```javascript
// vanilla JavaScript with default settings
var zoomImage = new ZoomImage( '.zoom-image' );

// vanilla JavaScript with custom settings
var zoomImage = new ZoomImage(
  '.zoom-image',
  {
    touch: true
  }
);

// jQuery (1.7+) with default settings
$( '.zoom-image' ).zoomImage();

// jQuery (1.7+) with custom settings
$( '.zoom-image' ).zoomImage({
  touch: true
});
```

## Settings

There is only one setting: `touch`. If set `true`, the zooming functionality work on touch devices. If `false`, zooming functionality is disabled for touch devices. If unset, the plugin defaults to `true`.

## Scaling Element Dimensions Proportionally

The following information outlines a general CSS trick, not particular to this plugin. But, it may be relevant to your Zoom Image project, and can be used on the `zoom-image` element.

If non-`<img>` elements (like `<figure>`s) need to scale their `width` and `height` proportionally as they resize, like `height: auto` responsive `<img>`s, the following method can be used in lieu of setting up tedious incremental `media-query` rules or a calculation listener.

Often setting a percentage value for an element's `height` is not an option, because that percentage value is relative to the `height` of the element's parent and [if the parent's height is not explicitly set, the percentage will yield a value of `0`.](https://stackoverflow.com/questions/1622027/percentage-height-html-5-css)

Percentage `padding` values, however, are relative to the `width` of their parent element, which usually is set. This includes (perhaps counterintuitively) vertical padding, `padding-top` and `padding-bottom`. This means that in most cases vertical padding can be used to control an element's height in a proportional manner: either by setting vertical padding on the target element and calculating against its parent, or by setting vertical padding on a `block` (pseudo) child of the target element and calculating that padding against the `width` of the target element itself.

For example, if a height of `120px` is desired for an element when its parent container is `600px` wide, assign a `padding-top` value of `20%` to the target element: 120 is 20% of 600. Similarly, if a height of `120px` is desired for an element when it is `200px` wide, assign a `padding-top` value of `60%` to its `block` child or pseudo element: 120 is 60% of 200. Do not set an explicit `height` value, let the `padding` set the height. This element will now flex with the rest of the layout, so the height of the element will be `140px` when the parent container is `700px`, `160px` when the parent container is `800px`, and etc. Obviously, you can fine-tune this scaling with `media-query`s on top of this method if necessary.