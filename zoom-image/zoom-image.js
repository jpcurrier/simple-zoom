//! Zoom Image 1.1.0 | MIT
// https://github.com/jpcurrier/zoom-image
function zoomImage( el, options ){
  if( typeof el === 'string' )
    el = document.querySelectorAll( el );
  if( el.nodeType === document.ELEMENT_NODE )
    el = [ el ];

  var settings = {
    touch: true
  };
  for( var key in options )
    if( settings.hasOwnProperty( key ) )
      settings[ key ] = options[ key ];

  for( var i = 0; i < el.length; i++ ){
    var image = el[ i ];

    if( settings.touch || !( 'ontouchstart' in document.documentElement ) ){
      image.addEventListener(
        'mousemove',
        function( e ){
          // image + cursor data
          var bounds = {
            width: image.clientWidth,
            height: image.clientHeight
          },
            xPercent = ( e.pageX - image.getBoundingClientRect().left + document.body.scrollLeft ) / bounds.width,
            yPercent = ( e.pageY - image.getBoundingClientRect().top + document.body.scrollTop ) / bounds.height,
            zoom = new Image();
          zoom.src = getComputedStyle( image.children[ 0 ] )[ 'background-image' ].replace(/.*\s?url\([\'\"]?/, '' ).replace( /[\'\"]?\).*/, '' );
          var maxPan = {
            left: -( zoom.naturalWidth - bounds.width ),
            top: -( zoom.naturalHeight - bounds.height )
          };

          // positioning
          image.children[ 0 ].style.backgroundPosition = ( xPercent * maxPan.left ) + 'px ' + ( yPercent * maxPan.top ) + 'px';
        }
      );
    }
  }
}

if( typeof module === 'object' )
  module.exports = zoomImage;