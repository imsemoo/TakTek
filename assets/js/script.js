$(function () {

  $('#clientsCarousel').owlCarousel({
    loop: true,
    margin: 16,                 // space between cards
    stagePadding: 10,
  
    // Navigation
    nav: true,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>'
    ],
    dots: false,
  
    // Autoplay
    autoplay: true,
    autoplayTimeout: 3500,      // 3.5 s
    autoplayHoverPause: true,   // pause on hover
  
    // Animations
    animateIn:  'fadeIn',       // CSS class from Animate.css
    animateOut: 'fadeOut',      //   »»
    smartSpeed: 700,            // ms for any “smart” transition
    slideTransition: 'ease-in-out',  // CSS easing between slides
  
    // Items per breakpoint
    responsive: {
      0:   { items: 1 },
      576: { items: 2 },
      992: { items: 3 }
    }
  });
  

  (() => {
    // ---------- Data for each service (icon, title) ----------
    const SERVICES = {
      graphic: { title: 'Graphic Design', icon: 'assets/img/icons/Graphic_design.svg' },
      identity: { title: 'Visual Identity', icon: 'assets/img/icons/Visual_identity.svg' },
      mobile: { title: 'Mobile Applications', icon: 'assets/img/icons/Mobile_Applications.svg' },
      web: { title: 'Websites', icon: 'assets/img/icons/Internet_sites.svg' },
      marketing: { title: 'Digital Marketing', icon: 'assets/img/icons/Digital_Marketing.svg' },
      hosting: { title: 'Hosting & Servers', icon: 'assets/img/icons/Hosting_servers.svg' },
      development: { title: 'Programming & Development', icon: 'assets/img/icons/Programming_development.svg' },
      video: { title: 'Video Montage', icon: 'assets/img/icons/Digital_Marketing.svg' }
    };

    // ---------- Build modal tabs & panes ----------
    const tabList = document.getElementById('serviceTab');
    const tabContent = document.getElementById('serviceTabContent');

    Object.entries(SERVICES).forEach(([key, svc], idx) => {
      // Tab button
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.innerHTML = `<button class="nav-link${idx === 0 ? ' active' : ''}" id="${key}-tab" data-bs-toggle="tab" data-bs-target="#${key}-pane" type="button" role="tab" aria-controls="${key}-pane" aria-selected="${idx === 0}">` +
        `<img src="${svc.icon}" alt="${svc.title}" width="40" height="40"></button>`;
      tabList.appendChild(li);

      // Tab pane with generic form
      const pane = document.createElement('div');
      pane.className = `tab-pane fade${idx === 0 ? ' show active' : ''}`;
      pane.id = `${key}-pane`;
      pane.setAttribute('role', 'tabpanel');
      pane.setAttribute('aria-labelledby', `${key}-tab`);
      pane.innerHTML = `
        <h3 class="h5 mb-3">${svc.title} Request</h3>
        <form class="service-form needs-validation" novalidate>
          <input type="hidden" name="service" value="${svc.title}">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label">Full Name *</label><input type="text" class="form-control" name="name" required></div>
            <div class="col-md-6"><label class="form-label">Email *</label><input type="email" class="form-control" name="email" required></div>
            <div class="col-md-6"><label class="form-label">Phone</label><input type="tel" class="form-control" name="phone"></div>
            <div class="col-md-6"><label class="form-label">Budget (USD)</label><input type="number" class="form-control" name="budget" min="100"></div>
            <div class="col-12"><label class="form-label">Project Brief *</label><textarea class="form-control" name="brief" rows="4" required></textarea></div>
          </div>
          <button type="submit" class="btn btn-secondary rounded-5 mt-4 text-center m-auto">Submit Request</button>
        </form>`;
      tabContent.appendChild(pane);
    });

    // ---------- Handle card button clicks ----------
    const serviceButtons = document.querySelectorAll('.service__btn');
    const serviceModalEl = document.getElementById('serviceModal');
    const serviceModal = new bootstrap.Modal(serviceModalEl);

    serviceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const svc = btn.dataset.target;
        const tabBtn = document.getElementById(`${svc}-tab`);
        if (tabBtn) new bootstrap.Tab(tabBtn).show();
        serviceModal.show();
      });
    });

    // ---------- Bootstrap validation ----------
    document.addEventListener('submit', e => {
      const form = e.target;
      if (form.classList.contains('service-form')) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          // TODO: integrate with backend / email service
          e.preventDefault();
          form.reset();
          serviceModal.hide();
          alert('Your request has been sent!');
        }
        form.classList.add('was-validated');
      }
    });
  })();
  var $slider = $('.slider-works'),
    $sliderUl = $slider.find('ul'),
    $originalSlides = $sliderUl.children('li'),
    slideCount = $originalSlides.length,
    slideWidth = $originalSlides.first().width(),
    $dots = $slider.find('ol.dots li'),
    $prev = $slider.find('.control i.fa-angle-left'),
    $next = $slider.find('.control i.fa-angle-right'),
    slideTime = 1000,
    autoPlay;

  // Clone first and last slides for infinite loop effect
  $sliderUl.prepend($originalSlides.last().clone());
  $sliderUl.append($originalSlides.first().clone());

  // Position to show the real first slide
  $sliderUl.css('margin-left', -slideWidth);

  function goToSlide(index) {
    $sliderUl.stop().animate(
      { 'margin-left': -(index + 1) * slideWidth },
      slideTime
    );
    $dots.removeClass('active').eq(index).addClass('active');
  }

  // Dot navigation
  $dots.on('click', function () {
    goToSlide($(this).index());
  });

  // Previous arrow
  $prev.on('click', function () {
    var current = $dots.filter('.active').index(),
      target = (current === 0) ? slideCount - 1 : current - 1;
    goToSlide(target);
  });

  // Next arrow
  $next.on('click', function () {
    var current = $dots.filter('.active').index(),
      target = (current === slideCount - 1) ? 0 : current + 1;
    goToSlide(target);
  });

  // Auto‑play
  autoPlay = setInterval(function () { $next.click(); }, slideTime * 5);
  $slider.hover(
    function () { clearInterval(autoPlay); },
    function () { autoPlay = setInterval(function () { $next.click(); }, slideTime * 5); }
  );

  // Keyboard support
  $(document).keydown(function (e) {
    if (e.which === 37) { $prev.click(); }
    else if (e.which === 39) { $next.click(); }
  });

  // Initialize on first dot
  $dots.first().click();

  // Apply background images
  $slider.find('.view').each(function () {
    $(this).css('background-image', 'url(' + $(this).data('image') + ')');
  });
});
