//! Zoom Image 2.0.0 | MIT
// https://github.com/jpcurrier/zoom-image

function ZoomImage( el, options ){
  this.el = el;
  if( typeof el === 'string' )
    this.el = document.querySelectorAll( el );
  if( el.nodeType === document.ELEMENT_NODE )
    this.el = [ el ];

  this.set( options );

  this.init();
}

ZoomImage.prototype.settings = {
  touch: true
};

ZoomImage.prototype.set = function( options ){
  for( var key in options )
    if( this.settings.hasOwnProperty( key ) )
      this.settings[ key ] = options[ key ];
  return this.settings;
};

ZoomImage.prototype.init = function(){
  for( var i = 0; i < this.el.length; i++ )
    this.build( this.el[ i ] );
};

ZoomImage.prototype.build = function( image ){
  if( this.settings.touch || !( 'ontouchstart' in document.documentElement ) ){
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
};

// jQuery plugin
function jQueryPlugin( namespace, PluginClass ){
  $.fn[ namespace ] = function( options ){
    return this.each( function( i, el ){
      var instance = $.data( el, namespace );
      if( instance ){
        instance.set( options );
        instance.init();
      }
      else{
        // initialize new instance
        instance = new PluginClass( el, options );
        $.data( el, namespace, instance );
      }
    });
  };
}
if( typeof jQuery !== 'undefined' )
  ( function( $ ){
    jQueryPlugin( 'zoomImage', ZoomImage );
  } )( jQuery );

if( typeof module === 'object' )
  module.exports = ZoomImage;