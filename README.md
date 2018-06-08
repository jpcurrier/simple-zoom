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

## Scaling Image Elements

The following is a general trick, not particular to this plugin. But, it may be relevant to your Zoom Image project, and can be used on the `zoom-image` element.

If non-`<img>` elements (like `<figure>`s) need to scale proportionally as they resize, like responsive `<img>` elements that scale their `width` and `height` proportionally, the following method can be used in lieu of setting up tedious incremental `media-query` rules or a calculation listener.

Setting a percentage value for an element's `height` is often not an option, because that percentage is relative to the `height` of that element's parent. [If the parent's height is not explicitly set, the percentage will yield a height of `0`.](https://stackoverflow.com/questions/1622027/percentage-height-html-5-css)

Percentage `padding` values are relative to the `width` of their parent element, which usually is set. This includes (perhaps counterintuitively) vertical padding (`padding-top` and `padding-bottom`). So, vertical padding can be used to set height proportional to a parent element's `width`, which is usually set and scaling in a responsive layout.

If you want the height of an element to be `120px` when the parent container element is `600px` wide, assign a `padding-top` value to your target element of `20%` (120 is 20% of 600). Do not set an explicit `height` value, let the `padding` set the height. This element will now flex with the rest of the layout, so the height of the element will be `140px` when the parent container is `700px`, `160px` when the parent container is `800px`, and etc. Obviously, you can fine-tune this scaling with `media-query`s on top of this method if necessary.