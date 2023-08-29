/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  var cfg = {
      scrollDuration: 800, // smoothscroll duration
      mailChimpURL:
        "https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc", // mailchimp url
    },
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* Preloader
   * -------------------------------------------------- */
  var clPreloader = function () {
    $("html").addClass("cl-preload");

    $WIN.on("load", function () {
      //force page scroll position to top at page refresh
      // $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("cl-preload");
      $("html").addClass("cl-loaded");
    });
  };

  /* Menu on Scrolldown
   * ------------------------------------------------------ */
  var clMenuOnScrolldown = function () {
    var menuTrigger = $(".header-menu-toggle");

    $WIN.on("scroll", function () {
      if ($WIN.scrollTop() > 150) {
        menuTrigger.addClass("opaque");
      } else {
        menuTrigger.removeClass("opaque");
      }
    });
  };

  /* OffCanvas Menu
   * ------------------------------------------------------ */
  var clOffCanvas = function () {
    var menuTrigger = $(".header-menu-toggle"),
      nav = $(".header-nav"),
      closeButton = nav.find(".header-nav__close"),
      siteBody = $("body"),
      mainContents = $("section, footer");

    // open-close menu by clicking on the menu icon
    menuTrigger.on("click", function (e) {
      e.preventDefault();
      // menuTrigger.toggleClass('is-clicked');
      siteBody.toggleClass("menu-is-open");
    });

    // close menu by clicking the close button
    closeButton.on("click", function (e) {
      e.preventDefault();
      menuTrigger.trigger("click");
    });

    // close menu clicking outside the menu itself
    siteBody.on("click", function (e) {
      if (
        !$(e.target).is(
          ".header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span"
        )
      ) {
        // menuTrigger.removeClass('is-clicked');
        siteBody.removeClass("menu-is-open");
      }
    });
  };

  /* photoswipe
   * ----------------------------------------------------- */
  var clPhotoswipe = function () {
    var items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".item-folio");

    // get items
    $folioItems.each(function (i) {
      var $folio = $(this),
        $thumbLink = $folio.find(".thumb-link"),
        $title = $folio.find(".item-folio__title"),
        $caption = $folio.find(".item-folio__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      var item = {
        src: $href,
        w: $width,
        h: $height,
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        var options = {
          index: i,
          showHideOpacity: true,
        };

        // initialize PhotoSwipe
        var lightBox = new PhotoSwipe(
          $pswp,
          PhotoSwipeUI_Default,
          items,
          options
        );
        lightBox.init();
      });
    });
  };

  /* Stat Counter
   * ------------------------------------------------------ */
  var clStatCount = function () {
    var statSection = $(".about-stats"),
      stats = $(".stats__count");

    statSection.waypoint({
      handler: function (direction) {
        if (direction === "down") {
          stats.each(function () {
            var $this = $(this);

            $({ Counter: 0 }).animate(
              { Counter: $this.text() },
              {
                duration: 4000,
                easing: "swing",
                step: function (curValue) {
                  $this.text(Math.ceil(curValue));
                },
              }
            );
          });
        }

        // trigger once only
        this.destroy();
      },

      offset: "90%",
    });
  };

  /* Masonry
   * ---------------------------------------------------- */
  var clMasonryFolio = function () {
    var containerBricks = $(".masonry");

    containerBricks.imagesLoaded(function () {
      containerBricks.masonry({
        itemSelector: ".masonry__brick",
        resize: true,
      });
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  var clSlickSlider = function () {
    $(".clients").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 2,
      //autoplay: true,
      pauseOnFocus: false,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });

    $(".testimonials").slick({
      arrows: true,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            dots: true,
          },
        },
      ],
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var clSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          // check if menu is open
          if ($("body").hasClass("menu-is-open")) {
            $(".header-menu-toggle").trigger("click");
          }

          window.location.hash = target;
        });
    });
  };

  /* Placeholder Plugin Settings
   * ------------------------------------------------------ */
  var clPlaceholder = function () {
    $("input, textarea, select").placeholder();
  };

  /* Alert Boxes
   * ------------------------------------------------------ */
  var clAlertBoxes = function () {
    $(".alert-box").on("click", ".alert-box__close", function () {
      $(this).parent().fadeOut(500);
    });
  };

  /* Contact Form
   * ------------------------------------------------------ */
  var clContactForm = function () {
    /* local validation */
    $("#contactForm").validate({
      /* submit via ajax */
      submitHandler: function (form) {
        var sLoader = $(".submit-loader");

        $.ajax({
          type: "POST",
          url: "inc/sendEmail.php",
          data: $(form).serialize(),
          beforeSend: function () {
            sLoader.slideDown("slow");
          },
          success: function (msg) {
            // Message was sent
            if (msg == "OK") {
              sLoader.slideUp("slow");
              $(".message-warning").fadeOut();
              $("#contactForm").fadeOut();
              $(".message-success").fadeIn();
            }
            // There was an error
            else {
              sLoader.slideUp("slow");
              $(".message-warning").html(msg);
              $(".message-warning").slideDown("slow");
            }
          },
          error: function () {
            sLoader.slideUp("slow");
            $(".message-warning").html(
              "Something went wrong. Please try again."
            );
            $(".message-warning").slideDown("slow");
          },
        });
      },
    });
  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var clAOS = function () {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  /* AjaxChimp
   * ------------------------------------------------------ */
  var clAjaxChimp = function () {
    $("#mc-form").ajaxChimp({
      language: "es",
      url: cfg.mailChimpURL,
    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
      submit: "Submitting...",
      0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    };
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var clBackToTop = function () {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $(".go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  // ----------------------------------------------------------------

  // Ashir's work starts from here

  // Read more button on click function to expose the entire service text.

  var initialHeightServicetext;


  var mapper = {
    "GulrezMojez": {
      
      "occupation": "Chairman, Partner",
      "details": "Drawing from more than three decades of extensive experience in media and communications, Gulrez holds an impressive history of achievements across diverse domains. These encompass strategic planning, creative advancement, project oversight, team cultivation, and instructional endeavors. Among the array of brands and enterprises that Gulrez has introduced, revitalized, and catered to are notable names such as China Mobile (Zong), Mobilink, Ufone, USAID, Glaxo Kline Beecham, Philip Morris, MCB Bank, Wateen Telecom, Cartoon Network, Engro Foods, and Mayfair.Fishbowl was Gulrez’s brainchild that came into being in 2013."
    },
    "RashidKhan": {
      
      "occupation": "Chief Executive Officer, Partner",
      "details": "Commencing his professional journey over two decades ago, Rashid initiated his career as a journalist, writer, and sub-editor at The News. After spending some time in the creative sector, he transitioned to the corporate realm. His roles encompassed a spectrum, ranging from serving as the Head of Brands at BAT, assuming the position of Marketing Head for the launch of Warid, holding the role of General Manager Marketing at Ufone - Etisalat, taking on the responsibilities of Marketing Director at PMI Pakistan and Malaysia, and culminating in a three-year tenure on the Management Board of FFC. A parallel affair with advertising led to the formulation of Fishbowl in 2013."
    },
    "SairaMasood": {
      
      "occupation": "Chief Operating Officer",
      "details": "Embarking on her advertising journey a decade and a half ago, Saira has remained steadfast in her commitment ever since, drawn by the dynamism and excitement the field entails. Her unyielding determination to challenge conventions and her fervent drive to propel the industry forward while establishing novel benchmarks continue to invigorate and inspire her on a daily basis. With a focal point on communication strategies, she has assumed a pivotal role in the initiation and reinvigoration of numerous brands across telecommunications, banking and finance, FMCG, snacks, beverages, food and dairy, fashion and apparel, and pharmaceutical sectors. Additionally, she has spearheaded numerous campaigns for the public and development sectors, pioneering various industry precedents and achieving accolades along the journey."
    },
    "HamzaIftikhar": {
      
      "occupation": "Business Director – North",
      "details": "A dynamic and motivated professional in corporate communication and client services, possessing nearly 17 years of experience Hamza has effectively engaged with diverse communities, government agencies, and corporate entities, strategically steering marketing and public relations endeavors to foster cross-functional business growth and opportunities. Demonstrated proficiency in advocating for mandates and services within both government and corporate spheres, utilizing astute market trend analysis and dedicated client service.He specializes in the meticulous planning, production, and management of various media formats such as feature films, TV commercials, documentaries, stage dramas, and large-scale events. His expertise lies in crafting comprehensive marketing and brand-building strategies that yield impactful communication. With a decisive and solution-oriented approach, Hamza is results-driven, coupled with robust analytical skills aimed at optimizing outcomes."
    },
    "TaimurAzeem": {
      
      "occupation": "Executive Creative Director",
      "details": "Accumulating a wealth of expertise spanning more than 16 years, Taimur's professional journey encompasses collaborations with Pakistan's premier brands, among them Jazz, Telenor, Ufone, Pepsi, Slice, Aquafina, Nurpur, and Dostea. His innate talent lies in crafting advertisements that daringly redefine the horizons of the Pakistani advertising landscape. Notably, he possesses an insatiable thirst for knowledge, dedicating himself to continuous learning and avid reading. This pursuit enables him to unearth culturally pertinent insights that deeply connect with the local market's sensibilities."
    },
    "HashimBukhari": {
      
      "occupation": "Creative Director",
      "details": "Hashim's initial foray into the creative realm involved the creation of comic books such as 'Paasban,' 'Haider,' and 'Khiladi.' Notably, Pepsi adapted one of these, 'Khiladi,' into an animated comic series for YouTube. This venture paved the way for his transition to the advertising industry, a move he found surprisingly seamless.Highlighting his noteworthy accomplishments, Hashim secured a global distinction in O Level Urdu and orchestrated the triumph of the first hip-hop crew at the LUMS Olympiad in 2009. Beyond this, he boasts an impressive record of having watched over 500 movies. His achievements also extend to silver trophies at the Effies for Jazz in 2022, and bronze awards at the Effies for Nescafé and Jazz in 2018 and 2021 respectively. Moreover, his linguistic finesse shines through, with fluency in three languages and a foundational grasp of Spanish."
    },
    "SyedHamza": {
      
      "occupation": "Creative Director",
      "details": "Landing into the field of marketing by pure coincidence, Syed Hamza has spent every waking hour in an effort to become a better version of himself, both creatively and strategically, all the while waging an all-out-conscious war on mediocrity. A Chartered Accountant by education and an ad man by passion, to be relegated to the pages of history as ‘just another marketeer/creative’ is his one and only true fear. So, hungry and foolish are the words he lives by. Hungry to tell stories, to connect hearts, to make pieces so immortal they are worthy of the Louvre. And wise enough to not be afraid of being foolish, to make mistakes and to learn new ways of telling old stories."
    },
    "ZawaharButt": {
      
      "occupation": "Associate Creative Director",
      "details": "Zawahar, an indie filmmaker and creative graduate in Film and TV from NCA, Lahore, and the University of Texas, USA, holds distinctions in Screenplay Writing. With versatile expertise, she's excelled as an art director, writer, and creative manager, leaving an impact on brands like Pepsi, BOB 5, and Team Up Angels. Her creative leadership extends to iconic brands including Jazz, Aquafina, Telenor, and more. She's also guided campaigns at institutions like Punjab Institute Of Language, Arts & Culture. Notable works include the film 'Sitaron Se Aagy,' music video 'Chamkeeli,' and short film 'Kiran,' alongside collaborations with curators like Sarmad Khoosat and Fawzia Mirza. Zawahar stands as a distinguished creative force, shaping narratives and campaigns with precision."
    },
    "AishaHashir": {
      
      "occupation": "Head of Design",
      "details": "Aisha possesses a steadfast commitment to her profession and boasts a solid educational background, having earned a Bachelor's degree in Mass Media and Advertising. To complement her academic achievements, she undertook a Visual Design certification program at Shlington University London, aimed at elevating her skill set. Garnering a wealth of 8-9 years of hands-on experience in the industry, she has lent her imaginative prowess to multiple advertising agencies in Karachi. Aisha's adeptness spans a wide spectrum of visual design facets, encompassing areas such as packaging design, logos, mascots, and branding. Her enthusiasm for crafting captivating visual narratives that deeply resonate with audiences while enhancing brand identities is truly evident."
    },
  };


  var vids = {
    "grow-green": "https://www.youtube.com/embed/n4t-Boy7hmQ", 
    "guitarist": "https://www.youtube.com/embed/XM0-qDiodN4",
    "the-beetle": "https://www.youtube.com/embed/pYcBioECDOU",
    "palmeira" : "https://www.youtube.com/embed/wuDEL2TQH5M",
    "woodcraft": "https://www.youtube.com/embed/hf2T8fGH5KU",
    "lady-shutterbug": "https://www.youtube.com/embed/OI1izeM2GYQ"  
  }

  var hideServiceText = function () {
    initialHeightServicetext = $(".service-text").first().css("height");
    $(".read-more-btn").prev("div").children("div").toggleClass("overlay-ma");
    $(".read-more-btn").prev("div").toggleClass("service-text-parent");
  };

  var clReadMoreBtn = function () {
    $(".read-more-btn").on("click", function () {
      $(this).prev("div").children("div").toggleClass("overlay-ma");
      $(this).prev("div").toggleClass("service-text-parent");

      $(this).text(function (_, old) {
        if (old == "Read More") {
          return "Minimize";
        } else {
          return "Read More";
        }
      });
    });
  };

  var animeStop = function () {
    $(".anime-element").hover(
      function () {
        // over
        $("#hor-animation").css("animation-play-state", "paused");
        $("#some").toggleClass("hidden");
      },
      function () {
        // out

        $("#some").toggleClass("hidden");
        $("#hor-animation").css("animation-play-state", "running");
      }
    );
  };

  var clCard = function () {
    $(".card").on("click", function () {
      $("#modal").toggleClass("hidden");
      var l = $(this).attr("src").split("/").length
      var src = $(this).attr("src").split("/")[l - 1].split(".")[0];
      var w = $(window).width() * 0.8;
      if ($(window).width() >= 1024) {
        var ifr = `<iframe width="${w}" height="${w / 1.77}" src="${vids[src]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      } else {
        var ifr = `<iframe width="${w}" height="${w * 1.77}" src="${vids[src]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      }
      
      $(".pic").append(ifr);
      
      var text = $(this).next("div").children(".font-bold").text();
      $(".pic-text").append(`<p class="text-white font-bold">${text}</p>`);
      var text2 = $(this).next("div").children(":odd").text();
      $(".pic-text").append(`<p class="text-white">${text2}</p>`);
    });
  };


  var clModalBtn = function() {
    $("#modal-btn").on("click", function() {
      $(".pic").children().remove();
      $(".pic-text").children().remove();
      $("#modal").toggleClass("hidden");
    });
  };


  var AvatarHover = function() {
    $(".avatar").hover(function () {
        // over
        $(".avatar").css("filter", "brightness(0.4)");
        $(this).css("filter", "brightness(1.75)");

      }, function () {
        // out
        $(".avatar").css("filter", "brightness(1)");
      }
    );
  };


  var clAvatar = function() {
    $(".avatar").on("click", function() {
      var name = $(this).children().first().attr("src").split("/")[2].split(".")[0];
      var Name = name.split(/(?=[A-Z])/).join(" ");
      var data = mapper[name];
      var src = $(this).children().first().attr("src");
      $("#avatar-model").children("#avatar-name").text(Name);
      $("#avatar-model").children("#occupation").text(data.occupation);
      $("#avatar-model").children("#details").text(data.details);
      $("#avatar-model").toggleClass("hidden")
    });
  };


  var Avatarbtn = function() {
      $("#avatar-btn").on("click", function() {
        $("#avatar-img").children().remove();
        $("#avatar-name").children().remove();
        $("#occupation").children().remove();
        $("#details").children().remove();
        $("#avatar-model").toggleClass("hidden");
      });
    };
    

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    clPreloader();
    clMenuOnScrolldown();
    clOffCanvas();
    clPhotoswipe();
    clStatCount();
    clMasonryFolio();
    clSlickSlider();
    clSmoothScroll();
    clPlaceholder();
    clAlertBoxes();
    clContactForm();
    clAOS();
    clAjaxChimp();
    clBackToTop();

    // ashir's function

    hideServiceText();
    clReadMoreBtn();
    animeStop();
    clCard();
    clModalBtn();
    AvatarHover();
    clAvatar();
    Avatarbtn();



  })();
})(jQuery);
