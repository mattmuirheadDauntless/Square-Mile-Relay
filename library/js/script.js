$(function(){
//===================================
//GENERAL
//===================================

    // Fix cta in header if waypoint hit
    if ($('#ctaBanner').length > 0) {
        new Waypoint({
            element: $('#ctaBanner'),
            handler: function() {
                $('body').toggleClass('cta-fixed');
            },
            offset: function() {
                return -this.element.height();
            }
        });
    }

    // Add class to header on scroll from top
    new Waypoint({
        element: $('body'),
        handler: function() {
            $('.header').toggleClass('fixed-header');
        },
        offset: -60
    });

    // Click to handle mobile menu
    $('.menu-btn').click(function() {
        $('body').toggleClass('menu-open');
        $('.has-child').removeClass('active');
    });

    // Hover to handle dropdown menu
    $('.nav .has-child').hover(function() {
        $('.header').addClass('fixed-logo');
    }, function(){
        $('.header').removeClass('fixed-logo');
    });

    // Mobile Race Locations click from the menu
    $('.nav .has-child').click(function() {
        $('.has-child').toggleClass('active');
    });

    // input validation
    $('input').on('input', function() {
        if ($(this).is(':valid') == true) {
            $(this).removeClass("invalid").addClass("valid");
        } else {
            $(this).removeClass("valid").addClass("invalid");
        }
    });
    //End input validation

    //handle animate links
    $('a[href="#contact"]').click(function(event){
        event.preventDefault();
        $('#contactBtn').trigger('click');
    });

    //handle filters
    $('.filters .filters-btn').click(function() {
       $('.filters').toggleClass('active');
    });

    $('.filter').click(function() {
        var $this = $(this),
            $parent = $this.parent('.filter-group'),
            $selector = $this.attr('data-filter');

        if ($selector == "*"){
            $('.filter').removeClass('active');
            $this.addClass('active');
        } else {
            $selector = "";
            $parent.children('.filter').removeClass('active');
            $this.addClass('active');

            $('.filter.active').each(function(){
                $selector += $(this).attr('data-filter');
            });
        }

        $('.isotope-no-items').addClass('inactive');

        //if news page
        if ($('.news').length > 0) {
            $('.news').isotope({
                filter: $selector
            });
        }

        //if charities page
        if ($('.charities').length > 0) {
            $('.charities').isotope({
                filter: $selector
            });
        }

        //if companies page
        if ($('.companies').length > 0) {
            $('.companies').isotope({
                filter: $selector
            });
        }

        //if partners page
        if ($('.partners').length > 0) {
            var $latestDate = $this.attr('data-latest-event');
            $('.partners .race').addClass('hide');
            $('.partners .race'+$selector).removeClass('hide');
            $('.partners .race').removeClass('fixed');

            if ( $('.filter-group.small .filter.active').length <= 0 ){
                if ($latestDate != "") {
                    $('.filter-group.small .filter[data-filter=".'+ $latestDate +'"]').trigger('click');
                } else {
                    $('.filter-group.small .filter:first-child').trigger('click');
                }
            }

            if ( $('.filter-group.large .filter.active').length <= 0 ){
                $('.filter-group.large .filter:first-child').trigger('click');
            }

            //handle animate links
            $('a[href*=\\#]').click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop: $( $.attr(this, 'href') ).offset().top - 170}, 500);
            });

            $('.slide-nav-section').each(function(){
                var $this = $(this),
                    $id = $this.attr('id'),
                    $slide = $this.attr('data-slide'),
                    $distance = $('#'+$id).offset().top + 250;

                $(window).scroll(function() {
                    if ( ($(window).scrollTop() + $segmentTop) <= $distance && ($(window).scrollTop() + $segmentBottom) >= $distance ) {
                        console.log($distance);


                        if ( $distance > 7500 ) {
                            $('.slide-nav').css('margin-top', '-500px');
                        } else if ( $distance > 6500 ) {
                            $('.slide-nav').css('margin-top', '-400px');
                        } else if ( $distance > 5500 ) {
                            $('.slide-nav').css('margin-top', '-300px');
                        } else if ( $distance > 4500 ) {
                            $('.slide-nav').css('margin-top', '-200px');
                        } else if ( $distance > 3500 ) {
                            $('.slide-nav').css('margin-top', '-100px');
                        } else {
                            $('.slide-nav').css('margin-top', '0px');
                        }

                        $('.slide-nav li').each(function() {
                            $(this).removeClass('active');
                        });

                        $('.' + $id).addClass('active');
                    }
                });
            });

            $('.race.active').each(function() {
                var $this = $(this),
                    $distance = $this.offset().top;

                $(window).scroll(function() {
                    if (($(window).scrollTop() + 140) >= $distance) {
                        $this.addClass('fixed');
                    } else {
                        $this.removeClass('fixed');
                    }
                });
            });
        }

        //if gallery page
        if ($('.gallery-grid').length > 0) {
            $('.gallery-grid').isotope({
                filter: $selector
            });
        }

        //if results page
        if ($('.results-table').length > 0){
            $('.results-table tbody tr').addClass('hide');
            $('.results-table tbody tr'+$selector).removeClass('hide');

            //if no results
            setTimeout(function(){
                if ( $('.results-table table tr:visible').length <= 0 ) {
                    $('.results-table').height($('.isotope-no-items').height() + 200);
                    $('.isotope-no-items').removeClass('inactive');
                }
            }, 500);
        }

        //if single-company page
        if ($('.company-table').length > 0){
            $('.company-table tr').addClass('hide');
            $('.company-table tr'+$selector).removeClass('hide');

            //if no results
            setTimeout(function(){
                if ( $('.company-table tr:visible').length <= 0 ) {
                    $('.table-wrapper').height($('.isotope-no-items').height() + 200);
                    $('.isotope-no-items').removeClass('inactive');
                }
            }, 500);

        }

        //if faqs page
        if ($('.faqs').length > 0) {
            $('.faq').addClass('hide');
            $('.faq'+$selector).removeClass('hide');
        }

        return false;
    });


    //handle tables
    $(".tablesorter").tablesorter();

    //hide notification
    $('.notification .close').click(function() {
        var $this = $(this),
            $notification = $this.parent('.notification');

        $notification.addClass('hide');
    });

    //handle media modals
    $('.vid-modal-link').click(function() {
        var $this = $(this),
            $src = $this.attr('data-src');

        $('.media-modal .img').addClass('hide');
        $('.media-modal .video').removeClass('hide');
        $('.media-modal .slider').addClass('hide');

        $('#videoiFrame').attr('src', $src);
    });

    $('.img-modal-link').click(function() {
        var $this = $(this),
            $src = $this.attr('data-src'),
            $caption = $this.attr('data-caption');

        $('.media-modal .img').removeClass('hide');
        $('.media-modal .video').addClass('hide');
        $('.media-modal .slider').addClass('hide');

        if ($caption.length > 0){
            $('.media-modal .img p').removeClass('hide');
            $('.media-modal .img p').text($caption);
        }
        $('.media-modal .img img').attr('src', $src);
    });

    if ($('.img-slider').length > 0){
        var $sliderModal = $('.img-slider').flickity({
            cellSelector: '.img-cell',
            setGallerySize: false,
            cellAlign: 'left',
            wrapAround: true,
            percentPosition: true,
            lazyLoad: true,
            pageDots: true
        });
    }

    if ( $('.slider-modal-link').length > 0 ) {
        $('.img-item').each(function(){
            var $this = $(this),
                $src = $this.attr('data-src'),
                $caption = $this.attr('data-caption'),
                $item = $('<div class="img-cell"><img data-flickity-lazyload="' + $src + '"><br><p class="caption">' + $caption + '</p></div>');

            $sliderModal.flickity( 'append', $item );
        });
    }

    $('.slider-modal-link').click(function() {
        var $this = $(this),
            $index = $('.slider-modal-link').index(this);

        $('.media-modal .img').addClass('hide');
        $('.media-modal .video').addClass('hide');
        $('.media-modal .slider').removeClass('hide');

        $sliderModal.flickity( 'select', $index );
    });

    $('.modal .close').click(function(){
        $('#videoiFrame').attr('src', "");
    });

//===================================
//ENTER RACE MODULE
//===================================

    $('.enter-race-modal').click(function() {
        var $this = $(this),
            $raceLocation = $this.attr('data-city');

        if ( $raceLocation.length > 0 ) {
            $('#enterRaceLocation').val($raceLocation);
            $('.slide[data-slide=1] .next').trigger('click');
            $('.slide[data-city='+ $raceLocation +'] #enterRaceFrame').attr('src', '/commerce/products?city='+$raceLocation);
        }
    });

    // $('#enterRaceLocation').on('change', function() {
    //     var $raceLocation = $(this).val(),
    //         $btn = $(this).parent().parent().find('.btn');
    //    $('.slide[data-city='+ $raceLocation +'] #enterRaceFrame').attr('src', '/commerce/products?city='+$raceLocation);
    //    $btn.removeClass('btn-invalid');
    //    $btn.addClass('btn-orange');
    // });

    //enter race modal controls
    $('.slide .next').click(function() {
        var $this = $(this),
            $activeSlide = $this.parent('.slide').attr('data-slide'),
            $nextSlide = parseFloat($activeSlide, 2) + 1,
            $city = $('#enterRaceLocation').val();

        $('.slide.country').addClass('hidden');
        $('.slide.country[data-city='+$city+']').removeClass('hidden');

        $this.parent('.slide').addClass('completed');
        $this.parent('.slide').removeClass('current');
        $('.slide[data-slide="'+ $nextSlide +'"]').addClass('current');

        $('.stages li[data-slide="'+ $activeSlide +'"]').addClass('completed');
        $('.stages li[data-slide="'+ $activeSlide +'"]').removeClass('current');
        $('.stages li[data-slide="'+ $nextSlide +'"]').addClass('current');

        $('.stages ul').removeClass();
        $('.stages ul').addClass('stage-'+$nextSlide);
    });

    $('.stages ul li').click(function() {
        var $this = $(this),
            $thisSlide = $this.attr('data-slide')
            $currentSlide = $('.slide.current').attr('data-slide');

        if ($this.hasClass('completed')){

            $('.slide[data-slide="'+ $currentSlide +'"]').removeClass('completed');
            $('.slide[data-slide="'+ $currentSlide +'"]').removeClass('current');
            $('.slide[data-slide="'+ $thisSlide +'"]').removeClass('completed');
            $('.slide[data-slide="'+ $thisSlide +'"]').addClass('current');

            $('.stages li[data-slide="'+ $currentSlide +'"]').removeClass('completed');
            $('.stages li[data-slide="'+ $currentSlide +'"]').removeClass('current');
            $('.stages li[data-slide="'+ $thisSlide +'"]').removeClass('completed');
            $('.stages li[data-slide="'+ $thisSlide +'"]').addClass('current');

            $('.stages ul').removeClass();
            $('.stages ul').addClass('stage-'+$thisSlide);
        }
    });

    //Button validation on slide 1
    // $('.slide[data-slide="1"].current .input:not(select)').on('blur', function() {
    //     var $valid = 1;
    //     $('.slide[data-slide="1"].current .input:not(select)').each(function(){
    //         if ($(this).val() == "") {
    //             $valid = 0;
    //         }
    //         if ($(this).is(":valid") != 1){
    //             $valid = 0;
    //         }
    //     });

    //     if ($valid == 1){
    //         $('.slide.current[data-slide="1"] .next.btn').addClass('btn-orange');
    //         $('.slide.current[data-slide="1"] .next.btn').removeClass('btn-invalid');
    //     } else {
    //         $('.slide.current[data-slide="1"] .next.btn').removeClass('btn-orange');
    //         $('.slide.current[data-slide="1"] .next.btn').addClass('btn-invalid');
    //     }
    // });

    //T&C validation on slide 2
    // $('.slide[data-slide="2"] .terms input').click(function() {
    //     console.log(89);
    //     if ($(this).is(':checked')){
    //         $('.slide.current[data-slide="2"] .next.btn').addClass('btn-orange');
    //         $('.slide.current[data-slide="2"] .next.btn').removeClass('btn-invalid');
    //     } else {
    //         $('.slide.current[data-slide="2"] .next.btn').removeClass('btn-orange');
    //         $('.slide.current[data-slide="2"] .next.btn').addClass('btn-invalid');
    //     }
    // });

    //Button validation on slide 3
    // $('.slide[data-slide="3"] .input:not(select)').on('blur', function() {
    //     var $valid = 1;
    //     $('.slide[data-slide="3"] .input:not(select)').each(function(){
    //         if ($(this).val() == "") {
    //             $valid = 0;
    //         }
    //         if ($(this).is(":valid") != 1){
    //             $valid = 0;
    //         }
    //     });

    //     if ($valid == 1){
    //         $('.slide[data-slide="3"] .next.btn').addClass('btn-orange');
    //         $('.slide[data-slide="3"] .next.btn').removeClass('btn-invalid');
    //     } else {
    //         $('.slide[data-slide="3"] .next.btn').removeClass('btn-orange');
    //         $('.slide[data-slide="3"] .next.btn').addClass('btn-invalid');
    //     }
    // });

    $('.finish-payment').click(function() {
        var $page = $('#enterRaceFrame', window.parent.document).parent().parent().parent().parent().parent();

        $page.find('.slide.country[data-slide=2]:not(.hidden)').addClass('completed');
        $page.find('.slide.country[data-slide=2]:not(.hidden)').removeClass('current');
        $page.find('.slide[data-slide=3]').addClass('current');

        $page.find('.modal-footer ul').removeClass();
        $page.find('.modal-footer ul').addClass('stage-3');
        $page.find('.modal-footer ul li[data-slide=2]').removeClass();
        $page.find('.modal-footer ul li[data-slide=2]').addClass('completed');
        $page.find('.modal-footer ul li[data-slide=3]').addClass('current');
    });

    $('.send-to-my-account').click(function() {
        var $this = $(this),
            $href = $this.attr('data-href');

        window.parent.document.location.href = $href;
    });

    $('.send-to-forgot-password').click(function() {
        window.parent.document.location.href = "/forgot-password";
    });

    $('.back-to-cities').click(function() {
        var $page = $('#enterRaceFrame', window.parent.document).parent().parent().parent().parent().parent();
        $page.find('.slide[data-slide=1]').removeClass('completed');
        $page.find('.slide[data-slide=1]').addClass('current');
        $page.find('.slide.country[data-slide=2]:not(.hidden)').removeClass('current');

        $page.find('.modal-footer ul').removeClass();
        $page.find('.modal-footer ul').addClass('stage-1');
        $page.find('.modal-footer ul li[data-slide=2]').removeClass();
        $page.find('.modal-footer ul li[data-slide=1]').addClass('current');

        $('#emptyCart').trigger('click');
    });

    $('#newCompany').on('change', function() {
        $('.new-company-name').toggleClass('hide');
    });

    // $('#terms').on('change', function() {
    //     if ( $(this).prop('checked') ) {
    //         $('.btn-continue').addClass('btn-orange');
    //         $('.btn-continue').removeClass('btn-invalid');
    //     } else {
    //         $('.btn-continue').removeClass('btn-orange');
    //         $('.btn-continue').addClass('btn-invalid');
    //     }

    // });

//===================================
//HOME PAGE
//===================================

    if ( $('.next-races').length > 0 ){
        var $racesSlider = $('.races').flickity({
            cellSelector: '.race',
            cellAlign: 'left',
            wrapAround: true,
            groupCells: '100%',
            prevNextButtons: false
        });
    }

    $('#viewMoreRaces').click(function() {
        $racesSlider.flickity('next');
    });

    if ( $('.about-accordion').length > 0 && $(window).width() > 900 ){
        new Waypoint({
            element: $('#aboutAccordion'),
            handler: function() {
                $('.nav-item').toggleClass('fixed');
            },
            offset: '127px'
        });



        // new Waypoint({
        //     element: $('#globalPartners'),
        //     handler: function() {
        //         $('.nav-item').toggleClass('fixed');
        //     },
        //     offset: $(window).height()
        // });
    }

    $('.about-accordion .nav-items .nav-item').click(function() {
        var $this = $(this),
            $accordion = $this.attr('data-accordion');


        console.log('test2');

        setTimeout(function(){
            $('.gallery-grid').isotope('layout');
        }, 500);

        if ( $(window).width() > 900 ) {
            $('.about-accordion .nav-items .nav-item').removeClass('active');
            $('.about-accordion .main-accordion').removeClass('active');
            $this.addClass('active');
            $('.about-accordion .main-accordion[data-accordion="'+ $accordion +'"]').addClass('active');

            $('html,body').animate({scrollTop: $('.about-accordion').offset().top - 130},500);
        } else {
            $this.toggleClass('active');
            $('.about-accordion .main-accordion[data-accordion="'+ $accordion +'"]').toggleClass('active');
        }
    });

    //handle gallery in accordion
    var $imgGrid = $('.accordion-gallery').isotope({
        layoutMode: 'packery',
        itemSelector: '.img-item'
    });

    $imgGrid.imagesLoaded().progress( function() {
         $imgGrid.isotope('layout');
    });

    //handle next accordion btn
    $('.next-accordion').click(function() {
        var $this = $(this),
            $accordion = $this.attr('data-accordion');

        $('.nav-item[data-accordion='+ $accordion +']').trigger('click');
    });

    //handle cities accordion
    $('.race-locations .cities li').click(function() {
        var $this = $(this),
            $city = $this.attr('data-city');

        $('.race-locations .cities li').removeClass('active');
        $this.addClass('active');

        $('.race-locations .city').removeClass('active');
        $('.race-locations .city').each(function(){
            var $thisCity = $(this).attr('data-city');

            if ($thisCity == $city) {
                $(this).addClass('active');
            }

        });
    });

    //handle countdown for homepage
    $('.race-locations .city .timer').each(function(){
        var $this = $(this),
            $date = $this.attr('data-date');
        $this.countdown($date, function(event) {
            $this.text(
                event.strftime('%D:%H:%M:%S')
            );
        });
    });

//===================================
//NEWS PAGE
//===================================

    //Isotope js, NEWS PAGE:
    var $newsGrid = $('.news').isotope({
        itemSelector: '.news-item',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    $newsGrid.imagesLoaded().progress( function() {
         $newsGrid.isotope('layout');
    });

    if ($newsGrid.length){
        var page = 2,
            noResults = 0;

        loadNewsGrid();

        function loadNewsGrid() {
            $.get( "/news/p"+page, function( data ) {
                if (data.indexOf("no-results") >= 0) {
                    $('.loading-icon').addClass('hide');
                    noResults = 1;
                } else {
                    var $items = $(''+ data +'');
                    $newsGrid.append( $items ).isotope( 'appended', $items );
                    $newsGrid.imagesLoaded().progress( function() {
                        $newsGrid.isotope('layout');
                    });
                }
            })
            .done( function(){
                page++;
                if ( noResults == 0 ){
                    loadNewsGrid();
                }
            });
        }
    }


//===================================
//SINGLE NEWS PAGE
//===================================

    //Flickity
    $('.related-articles-slider').flickity({
        cellAlign: 'left',
        pageDots: false,
        prevNextButtons: false,
        contain: true,
        wrapAround: true,
        autoPlay: 8000
    });

//===================================
//CHARITIES PAGE
//===================================

    //Isotope, CHARITIES PAGE:
    var $charityGrid = $('.charities').isotope({
        itemSelector: '.charities-item',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    //images loaded
    $charityGrid.imagesLoaded().progress( function() {
        $charityGrid.isotope('layout');
    });

//===================================
//COMPANIES PAGE
//===================================

    //Isotope, COMPANIES PAGE:
    var $companiesGrid = $('.companies').isotope({
        itemSelector: '.companies-item',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    $companiesGrid.imagesLoaded().progress( function() {
        $companiesGrid.isotope('layout');
    });

    if ($companiesGrid.length){
        var page = 2,
            noResults = 0;

        loadCompaniesGrid();

        function loadCompaniesGrid() {
            $.get( "/companies/p"+page, function( data ) {
                if (data.indexOf("no-results") >= 0) {
                    $('.loading-icon').addClass('hide');
                    noResults = 1;
                } else {
                    var $items = $(''+ data +'');
                    $companiesGrid.append( $items ).isotope( 'appended', $items );
                    $companiesGrid.imagesLoaded().progress( function() {
                        $companiesGrid.isotope('layout');
                    });
                }
            })
            .done( function(){
                page++;
                if ( noResults == 0 ){
                    loadCompaniesGrid();
                }
            });
        }
    }

//===================================
//RESULTS PAGE
//===================================

    $teamResultsTable = $('.results-table.results-teams table tbody');
    if ($teamResultsTable.length){
        var page = 2,
            noResults = 0;

        loadTeamResults();

        function loadTeamResults() {
            $.get( "/results/teams/p"+page, function( data ) {
                if (data.indexOf("no-results") >= 0) {
                    $('.loading-icon').addClass('hide');
                    noResults = 1;
                } else {
                    $teamResultsTable.append( data );
                }
            })
            .done( function(){
                page++;
                $('.filter.active').trigger('click');
                if ( noResults == 0 ){
                    loadTeamResults();
                }
            });
        }
    }

    $individualResultsTable = $('.results-table.results-individuals table tbody');
    if ($individualResultsTable.length){
        var page = 2,
            noResults = 0;

        loadIndividualResults();

        function loadIndividualResults() {
            $.get( "/results/individuals/p"+page, function( data ) {
                if (data.indexOf("no-results") >= 0) {
                    $('.loading-icon').addClass('hide');
                    noResults = 1;
                } else {
                    $individualResultsTable.append( data );
                }
            })
            .done( function(){
                page++;
                $('.filter.active').trigger('click');
                if ( noResults == 0 ){
                    loadIndividualResults();
                }
            });
        }
    }

    $(".tablesorter").tablesorter();

//===================================
//MY ACCOUNT PAGE
//===================================

$('.edit-btn').click(function() {
    $('.my-profile').addClass('edit');
});

$('.save-btn').click(function() {
    var $required = 0;

    $('.required').each(function() {
        var $this = $(this).find('input');
        if ($this.val() == "" || $('.input').hasClass('invalid')){
            $required = 1;
        }
    });
});

$('.btn-remove-member').click(function(event) {
    var $this = $(this),
        $userId = $this.data('user-id'),
        $teamId = $this.data('team-id');

    $.post(
        '/',
        { action: 'squareMileRelay/teamMembers/removeTeamMember', userId: $userId, teamId: $teamId },
        function(data, textStatus, xhr) {
            $this.parent('td').parent('tr').find('.input').val('');
            $this.parent('td').parent('tr').find('.user-status').removeClass('confirmed');
            $this.parent('td').parent('tr').find('.user-status').removeClass('pending');
            $this.parent('td').parent('tr').find('.user-status').html('<button type="submit" class="btn btn-orange btn-tiny">Send Invitation</button>');
            $this.remove();
    });
});

//===================================
//PARTNERS PAGE
//===================================

    var $segmentTop = 70;
    var $segmentBottom = ($(window).height() / 5) + 500;

    // $('.slide-nav-section').each(function(){
    //     var $this = $(this),
    //         $id = $this.attr('id'),
    //         $slide = $this.attr('data-slide'),
    //         $distance = $('#'+$id).offset().top;

    //     $(window).scroll(function() {
    //         if ( ($(window).scrollTop() + $segmentTop) <= $distance && ($(window).scrollTop() + $segmentBottom) >= $distance ) {
    //             $('#'+$id).addClass('active');
    //             //$('li[data-slide='+ $slide +']').addClass('active');
    //         } else {
    //             $('#'+$id).removeClass('active');
    //             //$('li[data-slide='+ $slide +']').removeClass('active');
    //         }
    //     });
    // });

    $('.race.active').each(function() {
        var $this = $(this),
            $distance = $this.offset().top;

        $(window).scroll(function() {
            if (($(window).scrollTop() + 140) >= $distance) {
                $this.addClass('fixed');
            } else {
                $this.removeClass('fixed');
            }
        });
    });

//===================================
//GALLERY PAGE
//===================================

   //Isotope, GLOBAL-GALLERY PAGE
   var $globalGalleryGrid = $('.gallery-grid').isotope({
       itemSelector: '.grid-item',
       percentPosition: true,
       layoutMode: 'masonry',
       stamp: '.stamp'
   });

   $globalGalleryGrid.imagesLoaded().progress( function() {
        $globalGalleryGrid.isotope('layout');
   });

    if ( $globalGalleryGrid.length && !$globalGalleryGrid.hasClass('no-ajax') ){
        var page = 2,
            noResults = 0;

        loadGallery();

        function loadGallery() {
            $.get( "/gallery/p"+page, function( data ) {
                if (data.indexOf("no-results") >= 0) {
                    $('.loading-icon').addClass('hide');
                    noResults = 1;
                } else {
                    var $items = $(''+ data +'');
                    $globalGalleryGrid.append( $items ).isotope( 'appended', $items );
                    $globalGalleryGrid.imagesLoaded().progress( function() {
                        $globalGalleryGrid.isotope('layout');
                    });

                    $('.img-item.ajax-item').each(function(){
                        var $this = $(this),
                            $src = $this.attr('data-src'),
                            $caption = $this.attr('data-caption'),
                            $item = $('<div class="img-cell"><img data-flickity-lazyload="' + $src + '"><br><p class="caption">' + $caption + '</p></div>');

                        $sliderModal.flickity( 'append', $item );
                        $this.removeClass('ajax-item');
                    });

                    $('.slider-modal-link').click(function() {
                        var $this = $(this),
                            $index = $('.slider-modal-link').index(this);

                        $('.media-modal .img').addClass('hide');
                        $('.media-modal .video').addClass('hide');
                        $('.media-modal .slider').removeClass('hide');

                        $sliderModal.flickity( 'select', $index );
                    });

                }
            })
            .done( function(){
                page++;
                if ( noResults == 0 ){
                    loadGallery();
                }
            });
        }
    }

//===================================
//SINGLE CITY PAGE
//===================================

    //close call to action
    $('.city-cta .close').click(function() {
        $(this).parent('.city-cta').addClass('hide');
    });

    //when list gets to top of screen go fixed
    if ($('#citySlideNav').length > 0) {
        new Waypoint({
            element: $('#citySlideNav'),
            handler: function() {
                $('#citySlideNav').toggleClass('fixed');
            },
            offset: '180px'
        });

        $('a[href*=\\#]').click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop: $( $.attr(this, 'href') ).offset().top - 170}, 500);
        });
    }

    $('.race-year .section').each(function() {
        var $this = $(this),
            $id = $this.attr('id'),
            $slide = $this.attr('data-slide');

        new Waypoint({
            element: $('#'+$id),
            handler: function() {
                $('.race-year .section').removeClass('active');
                $('#'+$id).addClass('active');

                $('.slide-nav li').removeClass('active');
                $('.slide-nav li[data-slide='+ $slide +']').addClass('active');
            },
            offset: '280px'
        });
    });

//===================================
//SINGLE COMPANY PAGE
//===================================

    $('.company-table .heading-row').click(function() {
        var $this = $(this),
            $child = $this.next('.child-row').find('.table-expander');

        $this.toggleClass('active');
        $child.toggleClass('active');
    });

//===================================
//END
//===================================

    if ( $('.faqs').length > 0 ) {
        $('ul.filter-group>li:first-child').trigger('click');
    }

    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    $('.search-results input').on("keyup", function() {
        var self = $(this);
        delay(function(){
            var value = self.val();

            $(".tablesorter tr").each(function(index) {
                if (index != 0) {
                    var id = $(this).find('td:nth-child(3)').text();

                    if (id.indexOf(value) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                }
            });
        }, 1000 );
    });​

    // $('#subForm button').on('click', function(event) {
    //     event.preventDefault();
    //     if ( $('#terms').is(':checked') ) {
    //         $('#subForm').submit();
    //     } else {
    //         alert('Please, before registering your interest you need to accept our Terms & Conditions.');
    //     }
    // });

    $enterRace = $('#enterRace');
    var $city = getParameterByName('city');
    console.log('city: ' + $city);

    $enterRace.find('select').on('change', function() {
        if ( $(this).val().length > 0 ) {
            $enterRace.find('.next').removeClass('btn-invalid');
            $enterRace.find('.next').addClass('btn-orange');
            $('.slide[data-city='+ $(this).val() +'] #enterRaceFrame').attr('src', '/commerce/products?city=' + $(this).val());
            $city = $(this).val();
            console.log($city);
        }
    });

    //on terms toggle
    $('#terms').on('click', function () {
        if ( $(this).is(':checked') ) {
            var button = $(this).parent().parent().find('.btn-continue');
            button.removeClass('btn-invalid');
            button.addClass('btn-orange');
        } else {
            var button = $(this).parent().parent().find('.btn-continue');
            button.addClass('btn-invalid');
            button.removeClass('btn-orange');
        }
    });

    //on load
    if ($('#terms').is(':checked')) {
        var button = $(this).parent().parent().find('.btn-continue');
        button.removeClass('btn-invalid');
        button.addClass('btn-orange');
    } else {
        var button = $(this).parent().parent().find('.btn-continue');
        button.addClass('btn-invalid');
        button.removeClass('btn-orange');
    }

    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $('.terms input').each(function() {
        if ( $(this).is(':checked') ) {
            $(this).prop('checked', false);
        }
    });

    $('.language-select').on('change', function() {
        window.location.href = $(this).val();
    });

});
