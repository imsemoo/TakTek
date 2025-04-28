$(function() {
    var $slider         = $('.slider-works'),
        $sliderUl       = $slider.find('ul'),
        $originalSlides = $sliderUl.children('li'),
        slideCount      = $originalSlides.length,
        slideWidth      = $originalSlides.first().width(),
        $dots           = $slider.find('ol.dots li'),
        $prevBtn        = $slider.find('.control .prev'),
        $nextBtn        = $slider.find('.control .next'),
        slideTime       = 1000,
        autoPlay;
  
    // infinite‑loop prep
    $sliderUl.prepend( $originalSlides.last().clone() );
    $sliderUl.append(  $originalSlides.first().clone() );
    $sliderUl.css('margin-right', -slideWidth);
  
    function goToSlide(idx) {
      $sliderUl.stop().animate(
        { 'margin-right': -(idx + 1) * slideWidth },
        slideTime
      );
      $dots.removeClass('active').eq(idx).addClass('active');
    }
  
    // dots
    $dots.on('click', function() {
      goToSlide($(this).index());
    });
  
    // prev
    $prevBtn.on('click', function() {
      var current = $dots.filter('.active').index(),
          target  = (current === 0 ? slideCount - 1 : current - 1);
      goToSlide(target);
    });
  
    // next
    $nextBtn.on('click', function() {
      var current = $dots.filter('.active').index(),
          target  = (current === slideCount - 1 ? 0 : current + 1);
      goToSlide(target);
    });
  
    // autoplay
    autoPlay = setInterval(function() { $nextBtn.click(); }, slideTime * 5);
    $slider.hover(
      function() { clearInterval(autoPlay); },
      function() { autoPlay = setInterval(function() { $nextBtn.click(); }, slideTime * 5); }
    );
  
    // keyboard
    $(document).keydown(function(e) {
      if (e.which === 37)   { $prevBtn.click(); }
      else if (e.which === 39) { $nextBtn.click(); }
    });
  
    // init
    $dots.first().click();
  
    // backgrounds
    $slider.find('.view').each(function() {
      $(this).css('background-image', 'url(' + $(this).data('image') + ')');
    });
  });
  