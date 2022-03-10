/**
* Template Name: KnightOne - v4.3.0
* Template URL: https://bootstrapmade.com/knight-simple-one-page-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader'); 
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop : true}); //modal show after preload
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
      $('#myModal').modal('show');
      myModal.show();
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
  
  /** Close Modal Button **/
  let close_btn = document.getElementById('close-btn');
  let audio = new Audio('assets/audio/music.mp3');
  close_btn.addEventListener('click', () => {
    myModal.hide();
    audio.play();
    audio.loop = true;
  });
  
  const icon = document.getElementById('audio-icon');
  // const video_btn = document.getElementById('video-btn');
  $('#audio-btn').click(function() {
    // var icon = $("i", this).toggleClass("bi bi-volume-up-fill bi bi-volume-mute-fill");

    const curent_icon = icon.getAttribute('class');
    
    if(curent_icon === 'bi bi-pause-fill') {
      icon.setAttribute('class', 'bi bi-play-fill');
      audio.pause();
    } else {
      icon.setAttribute('class', 'bi bi-pause-fill');
      audio.play();
    }
  });
  
  // video_btn.addEventListener('click', () => {
  //   icon.setAttribute('class', 'bi bi-play-fill');
  //   audio.pause();
  // })
  
  
  var galleries = [
    {
      name : '1',
      url : 'assets/img/gallery/1.jpg',
      class : 'active'
    },
    {
      name : '2',
      url : 'assets/img/gallery/2.jpg',
      class : ''
    },
    {
      name : '3',
      url : 'assets/img/gallery/3.jpg',
      class : ''
    },
    {
      name : '4',
      url : 'assets/img/gallery/4.jpg',
      class : ''
    },
    {
      name : '5',
      url : 'assets/img/gallery/5.jpg',
      class : ''
    },
    {
      name : '6',
      url : 'assets/img/gallery/6.jpg',
      class : ''
    },
    {
      name : '7',
      url : 'assets/img/gallery/7.jpg',
      class : ''
    },
    {
      name : '8',
      url : 'assets/img/gallery/8.jpg',
      class : ''
    },
    {
      name : '9',
      url : 'assets/img/gallery/9.jpg',
      class : ''
    },
    {
      name : '10',
      url : 'assets/img/gallery/10.jpg',
      class : ''
    },
    {
      name : '11',
      url : 'assets/img/gallery/11.jpg',
      class : ''
    },
    {
      name : '12',
      url : 'assets/img/gallery/12.jpg',
      class : ''
    },
    {
      name : '13',
      url : 'assets/img/gallery/13.jpg',
      class : ''
    },
    {
      name : '14',
      url : 'assets/img/gallery/14.jpg',
      class : ''
    },
    {
      name : '15',
      url : 'assets/img/gallery/15.jpg',
      class : ''
    },
    {
      name : '16',
      url : 'assets/img/gallery/16.jpg',
      class : ''
    },
    {
      name : '17',
      url : 'assets/img/gallery/17.jpg',
      class : ''
    },
    {
      name : '18',
      url : 'assets/img/gallery/18.jpg',
      class : ''
    },
  ];
  
  
  let carousel_img = document.getElementById('carousel-img');
  let html = '';
  var myCarousel = document.querySelector('#myCarousel')
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 2000,
      wrap: true
    });
  window.addEventListener('load', () => {
    galleries.forEach(loadData);
    function loadData(item) {
      html += '<div class="carousel-item '+item.class+'"> <img src="'+item.url+'" class="d-block w-100" alt="..."> </div>';
      return carousel_img.innerHTML = html;
    }
  });

})()


/** Count Down **/
(function () {
  
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let birthday = "Dec 23, 2021 18:00:00",
      countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          // let headline = document.getElementById("headline"),
          //     countdown = document.getElementById("countdown"),
          //     content = document.getElementById("content");

          // headline.innerText = "It's my birthday!";
          // countdown.style.display = "none";
          // content.style.display = "block";
          document.getElementById("days").innerText = "00";
          document.getElementById("hours").innerText = "00";
          document.getElementById("minutes").innerText = "00";
          document.getElementById("seconds").innerText = "00";

          clearInterval(x);
        }
        //seconds
      }, 0)
  }());