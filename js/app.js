$(function(){

  var $document = $(document)
  var $window = $(window)
  var $body = $('body')

  var $zuicon = $('.c-zuicon')
  var $zuiClose = $('.u-zui__close')

  /*
  |----------------------------------------------------------------------
  | Load in HTML fragments
  |----------------------------------------------------------------------
  | Loading the content is pretty straightforward using jQuery, but can
  | be done without, of course. The "trick" here is to add a data
  | attribute to the ZUIcon that points to where the page
  | lives and then display it within a preview field.
  |
  | This could be enhanced further by lazy-loading the content only
  | when the particular ZUIcon is in view. Also, you should also
  | lazyload any media that lives within the content fragments
  | after the load has completed.
  */
  $zuicon.each(function(){
    $(this).find('.c-zuicon__preview').load( $(this).data('href') )
  })

  /*
  |----------------------------------------------------------------------
  | Zoom Logic When ZUIcon is interacted with
  |----------------------------------------------------------------------
  */
  var handleZoomingOut = function() {
    $zuiClose.fadeOut()
    $body.addClass('is-zoomed-out')
    $('.c-zuicon.in-focus').removeClass('in-focus')    
  }

  var handleZoomingIn = function(target) {
    $body.removeClass('is-zoomed-out')
    $(target).addClass('in-focus')
    $zuiClose.fadeIn()

    // If we don't scroll the page to the top when zooming in
    // we can end up with opening a page that is scrolled
    // down to the place the user stopped scrolling.
    $window.scrollTop(0)
  }

  // When the user selects a ZUIcon, zoom in on its
  // content and scale it up to full-size.
  $zuicon.on('click', function(){
    handleZoomingIn($(this))
  })

  // Handle zooming out when the user hits the close button.
  $zuiClose.on('click', function(){
    handleZoomingOut()
  })

  // For desktops, allow 'esc' key to trigger zooming out.
  $document.on('keyup', function(event){
    if (event.keyCode == 27) {
      handleZoomingOut()
    }
  })

})