
var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

$(document).ready(function() {
  window_width = $(window).width();
  var big_image;

  //  Activate the tooltips
  if ($('[data-toggle="tooltip"]').length != 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //  Activate regular switches
  if ($("[data-toggle='switch']").length != 0) {
    $("[data-toggle='switch']").bootstrapSwitch();
  }

  //  Append modals to <body>
  if ($(".modal").length != 0) {
    $('.modal').appendTo('body');
  }

  // Init noUiSlider
  pk.initSliders();

  // Init popovers
  pk.initPopovers();

  // Activate the image for the navbar-collapse
  pk.initNavbarImage();

  // Navbar color change on scroll
  if ($('.navbar[color-on-scroll]').length != 0) {
    $(window).on('scroll', pk.checkScrollForTransparentNavbar);
  }

  $('.navbar-collapse').click(function() {
    setTimeout(function() {
      if (pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
          $toggle.removeClass('toggled');
        }, 550);
      }
    }, 550);
  });

  // Change the collor of navbar collapse
  $('#navbarToggler').on('show.bs.collapse', function() {
    if ($('nav').hasClass('navbar-transparent') && $(document).scrollTop() < 50) {
      $('.navbar').addClass('no-transition');
      $('nav').removeClass('navbar-transparent');
    }
  }).on('hidden.bs.collapse', function() {
    if ($(document).scrollTop() < 50) {
      $('.navbar').removeClass('no-transition');
      $('nav:first-of-type').addClass('navbar-transparent');
    }
  });

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    pk.checkScrollForTransparentNavbar();
    $(window).on('scroll', pk.checkScroll)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });


  if (window_width >= 768) {
    big_image = $('.page-header[data-parallax="true"]');

    if (big_image.length != 0) {
      $(window).on('scroll', pk.checkScrollForPresentationPage);
    }
  }
  // Activate Carousel
  $('.carousel').carousel({
    interval: 4000
  });

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (pk.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    pk.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      pk.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    pk.misc.navbar_menu_visible = 1;
  }
});

pk = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
      if (background_image != undefined) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      }
    } else if (background_image != undefined) {
      $navbar.css('background', "")
        .attr('data-nav-image', '' + background_image + '')
        .css('background-size', "")
        .removeClass('has-image');
    }
  },

  initPopovers: function() {
    if ($('[data-toggle="popover"]').length != 0) {
      $('body').append('<div class="popover-filter"></div>');

      //    Activate Popovers
      $('[data-toggle="popover"]').popover().on('show.bs.popover', function() {
        $('.popover-filter').click(function() {
          $(this).removeClass('in');
          $('[data-toggle="popover"]').popover('hide');
        });
        $('.popover-filter').addClass('in');
      }).on('hide.bs.popover', function() {
        $('.popover-filter').removeClass('in');
      });

    }
  },

  initSliders: function() {
    // Sliders for demo purpose in refine cards section
    if ($('#sliderRegular').length != 0) {
      var rangeSlider = document.getElementById('sliderRegular');
      noUiSlider.create(rangeSlider, {
        start: [5000],
        range: {
          'min': [2000],
          'max': [10000]
        }
      });
    }
    if ($('#sliderDouble').length != 0) {
      var slider = document.getElementById('sliderDouble');
      noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      });
    }

  },


  // Javascript for the parallax

  checkScroll: debounce(function() {
    big_image = $('.page-header[data-parallax="true"]');
    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });
  }, 4),
}

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

function hasScrolled() {
  var st = $(this).scrollTop();
  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

// on scroll change logo
$(function () { 
  $(window).scroll(function () {
      if ($(this).scrollTop() > 90) { 
          $('.navbar .logo img').attr('src','/assets/img/rizurflogo-color.png');
      }
      if ($(this).scrollTop() < 90) { 
          $('.navbar .logo img').attr('src','/assets/img/rizurflogo-white.png');
      }
  })
});

$( window ).scroll(function() {
  if($(window).scrollTop() > 80){
    $('.shrinklogo').css({'width': '100'}); 
  }else{
      $('.shrinklogo').css({'width': '150'}); 
  }
 
});

// messenger floation orbs


(function($){
  if(!$.kc){
      $.kc = new Object();
  };
  
  $.kc.fab = function(el, links, options){
      var base = this;
      
      base.$el = $(el);
      base.el = el;
      
      base.$el.data("kc.fab", base);
      
      var main_fab_btn;
      var sub_fab_btns;

      base.init = function(){
          if( typeof( links ) === "undefined" || links === null ) {
              links = [
                  {
                      "url":null,
                      "bgcolor":"red",
                      "icon":"+"
                  },
                  {
                      "url":"http://www.example.com",
                      "bgcolor":"orange",
                      "icon":"+"
                  },
                  {
                      "url":"http://www.example.com",
                      "bgcolor":"yellow",
                      "icon":"+"
                  }
              ];
          }


          base.links = links;
          if (base.links.length > 0){
              main_btn = base.links[0];
              color_style = (main_btn.color)? "color:"+main_btn.color+";" : "";
              bg_color_style = (main_btn.bgcolor)? "background-color:"+main_btn.bgcolor+";" : "";
              main_btn_dom = "<button data-link-href='"+((main_btn.url)?main_btn.url:"")+"' data-link-target='"+((main_btn.target)?main_btn.target:"")+"' class='kc_fab_main_btn' style='"+bg_color_style+"'><span style='"+color_style+"'>"+main_btn.icon+"</span></button>";
             

              sub_fab_btns_dom = "";
              base.links.shift();
              /* Loop through the remaining links array */
              for (var i = 0; i < base.links.length; i++) {
                  color_style = (base.links[i].color)? "color:"+base.links[i].color+";" : "";
                  bg_color_style = (base.links[i].bgcolor)? "background-color:"+base.links[i].bgcolor+";" : "";

                  sub_fab_btns_dom += "<div><button data-link-title='"+base.links[i].title+"' data-link-href='"+(base.links[i].url?base.links[i].url:"")+"' data-link-target='"+((base.links[i].target)?base.links[i].target:"")+"' class='sub_fab_btn' style='"+bg_color_style+"'><span style='"+color_style+"'>"+base.links[i].icon+"</span></button></div>";
                  
              };
              sub_fab_btns_dom = "<div class='sub_fab_btns_wrapper'>"+sub_fab_btns_dom+"</div>";
              base.$el.append(sub_fab_btns_dom).append(main_btn_dom);

          }else{
              if (typeof console == "undefined") {
                  window.console = {
                      log: function (msg) {
                          alert(msg);
                      }
                  };
              }
              console.log("Invalid links array param");
          }
          
          base.options = $.extend({},$.kc.fab.defaultOptions, options);


          main_fab_btn = base.$el.find(".kc_fab_main_btn");
          sub_fab_btns = base.$el.find(".sub_fab_btns_wrapper");

          main_fab_btn.click(function(e){
              if ($(this).attr('data-link-href').length > 0){
                  if ($(this).attr('data-link-target')){
                      window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                  }else{
                      window.location.href = $(this).attr('data-link-href');
                  }
              }
            sub_fab_btns.toggleClass('show');

            
            

              if($(this).find(".ink").length === 0){
                  $(this).prepend("<span class='ink'></span>");
              }else{
                  $(this).find(".ink").remove();
                  $(this).prepend("<span class='ink'></span>");
              }
                   
              ink = $(this).find(".ink");
               
              if(!ink.height() && !ink.width()){
                  d = Math.max($(this).outerWidth(), $(this).outerHeight());
                  ink.css({height: d, width: d});
              }
               
              x = e.pageX - $(this).offset().left - ink.width()/2;
              y = e.pageY - $(this).offset().top - ink.height()/2;
               
              ink.css({top: y+'px', left: x+'px'}).addClass("animate");

          });

          sub_fab_btns.find('.sub_fab_btn').on('mousedown', function(e){
              if ($(this).attr('data-link-href').length > 0){
                  if ($(this).attr('data-link-target')){
                      window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                  }else{
                      window.location.href = $(this).attr('data-link-href');
                  }
              }

          });

          main_fab_btn.focusout(function(){
              sub_fab_btns.removeClass('show');
              overlay = $(".kc_fab_overlay");
              overlay.remove();
              
          });
          
          
      };
      base.init();
  };
  
  $.kc.fab.defaultOptions = {};
  
  $.fn.kc_fab = function(links, options){
      return this.each(function(){
          (new $.kc.fab(this, links, options));
      });
  };
  
})(jQuery);


// horizontal scroller

let scrollSpeed = 30;
let scroller = document.getElementById("scroll");

scroller.addEventListener("mousewheel", e=>{
  // block if e.deltaY==0
  if( !e.deltaY ) return;
  // Set scrollDirection (-1 = up // 1 = down)
  let scrollDirection = (e.deltaY > 0) ? 1 : -1;
  // convert vertical scroll into horizontal
  scroller.scrollLeft += scrollSpeed * scrollDirection;
  let scrollLeft = Math.round(scroller.scrollLeft);
  // calculate box total vertical scroll 
  let maxScrollLeft = Math.round( scroller.scrollWidth - scroller.clientWidth );
  // if element scroll has not finished scrolling
  // prevent window to scroll
  if( 
    (scrollDirection === -1  && scrollLeft > 0) ||
    (scrollDirection === 1 && scrollLeft < maxScrollLeft ) 
  ) e.preventDefault()
  // done!
  return true;
}, false);


