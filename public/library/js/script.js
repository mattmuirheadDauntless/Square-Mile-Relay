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

    //date picker init
    $('#dateOfBirth').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        startView: 2
    });

    //handle animate links
    $('a[href="#contact"]').click(function(event){
        event.preventDefault();
        $('#contactBtn').trigger('click');
    });

    $('.partner-filters .filter').click(function() {
        var $this = $(this),
            $parent = $this.parent('.filter-group'),
            $selector = $this.attr('data-filter'),
            $latestDate = $this.attr('data-latest-event');

        if ($selector == "*"){
            $('.filter').removeClass('active');
            $this.addClass('active');
        } else {
            $selector = "";
            $('.filter.active').each(function(){
                $selector += $(this).attr('data-filter');
            });
        }

        $parent.find('.filter.active').removeClass('active');
        $this.addClass('active');

        $('.filter.active').each(function() {
            var $selector =+ $(this).attr('data-filter');
        });

        if ( $('.filter.active:not(.btn)').length > 1 ) {
            var $city = $('.filter-group.large .filter.active').attr('data-filter').replace(".", ""),
                $year = $('.filter-group.small .filter.active').attr('data-filter').replace(".", "");

            $selector = "." + $city + "-" + $year;
        }

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
        $('a[href*=\\#]:not(.link)').click(function(event){
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

    });

    //if faqs page
    if ($('.faqs').length > 0) {
        $('.filter').click(function() {
            var $selector = $(this).attr('data-filter');
            $('.faq').addClass('hide');
            $('.faq'+$selector).removeClass('hide');
        });
    }

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

        $('.loading-icon').remove();
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
                $imgId = $this.attr('data-id'),
                $item = $('<div class="img-cell" data-id="' + $imgId + '"><img src="' + $src + '"><br><p class="caption">' + $caption + '</p></div>');

            $sliderModal.flickity( 'append', $item );
        });
    }

    $('.img-item').click(function() {
        var $this = $(this),
            $id = $this.attr('data-id'),
            $index = $('.slider-modal-link').index(this);

        $('.media-modal .img').addClass('hide');
        $('.media-modal .video').addClass('hide');
        $('.media-modal .slider').removeClass('hide');

        $sliderModal.flickity( 'select', $index );

        // $('.img-cell').removeClass('is-selected').css('left', '100%');
        // $('.img-cell[data-id='+ $id +']').addClass('is-selected').css('left', '0%');
    });

    $('.modal .close').click(function(){
        $('#videoiFrame').attr('src', "");
    });

    //Tab cycles through single form
    $('form input[type=submit]').keydown(function(event) {
        if (event.keyCode == 9){
            event.preventDefault();
            $(this).parent().find('*:input[type!=hidden]:first').focus();
        }
    });


//===================================
//ENTER RACE MODULE
//===================================

    $('.enter-race-modal').click(function() {
        var $this = $(this),
            $raceLocation = $this.attr('data-city');
        console.log('I work like wind.');

        if ( $raceLocation != undefined && $raceLocation.length > 0 ) {
            $('#enterRaceLocation').val($raceLocation);
            $('.slide[data-slide=1] .next').trigger('click');

            var locale = $('body').data('locale');

            if ( locale == undefined || (locale != undefined && locale.length <= 0) ) {
                locale = '';
            } else {
                if ( locale == 'en_gb' ) {
                    locale = '';
                } else {
                    locale = '/' + locale;
                }
            }

            $('.slide[data-city='+ $raceLocation +'] #enterRaceFrame').attr('src', locale + '/commerce/products?city='+$raceLocation);
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

    $('.finish-payment').click(function() {
        var $page = $('#enterRaceFrame', window.parent.document).parent().parent().parent().parent().parent(),
            $userID = $(this).attr('data-user-id');

        $page.find('.slide.country[data-slide=2]:not(.hidden)').addClass('completed');
        $page.find('.slide.country[data-slide=2]:not(.hidden)').removeClass('current');
        $page.find('.slide[data-slide=3]').addClass('current');

        $page.find('.modal-footer ul').removeClass();
        $page.find('.modal-footer ul').addClass('stage-3');
        $page.find('.modal-footer ul li[data-slide=2]').removeClass();
        $page.find('.modal-footer ul li[data-slide=2]').addClass('completed');
        $page.find('.modal-footer ul li[data-slide=3]').addClass('current');

        $page.find('#reasonUserID').val($userID);
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
        var $this = $(this);

        $('.new-company-name').toggleClass('hide').toggleClass('required');
        $('.related-company').toggleClass('disabled').toggleClass('invalid');

        if ( $this.is(':checked') ) {
            $('#relatedCompany').removeAttr('required');
            $('#newCompanyName').attr('required', 'true');
        } else {
            $('#relatedCompany').attr('required', 'true');
            $('#newCompanyName').removeAttr('required');
        }
    });

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
        layoutMode: 'fitRows',
        getSortData: {
            name: '.name'
        }
    });

    $companiesGrid.imagesLoaded().progress( function() {
        $companiesGrid.isotope('layout');
    });

    $companiesGrid.isotope({ sortBy: 'name' });


//===================================
//RESULTS PAGE
//===================================

    //Isotope, RESULTS PAGE:
    var $resultsGrid = $('.results').isotope({
        itemSelector: '.result-item',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    $resultsGrid.imagesLoaded().progress( function() {
        $resultsGrid.isotope('layout');
    });

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

$('.btn-invite-member, .resend').click(function(event) {
    event.preventDefault();
    var $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('please wait');

        $teamId = $('#update-team-members input[name="teamId"]').val();
        $firstName = $this.parent().parent().find('#firstName').val();
        $lastName = $this.parent().parent().find('#lastName').val();
        $email = $this.parent().parent().find('#email').val();

        var locale = $('body').data('locale');

        if ( locale == undefined || (locale != undefined && locale.length <= 0) ) {
            locale = '';
        } else {
            if ( locale == 'en_gb' ) {
                locale = '';
            } else {
                locale = '/' + locale + '/';
            }
        }

        if ( $email.length > 0 ) {
            $.post(
                locale,
                { action: 'squareMileRelay/teamMembers/addTeamMember', firstName: $firstName, lastName: $lastName, email: $email, teamId: $teamId },
                function(data, textStatus, xhr) {
                    if ( data.includes('Sorry') ) {
                        alert(data);
                    } else {
                        location.reload();
                    }
            });
        }
});

function updatePositions() {
    $('#team-members tr').each(function(index, value) {
        var row = $('#team-members tr:nth-child('+ index +')');
        row.find('.btn-remove-runner').data('position', index);
        row.find('.count').text(index);
    });
}

if ( $('.btn-remove-runner').length && $('#team-members').length ) {
    $('html, body').animate({ scrollTop: $('#team-members').offset().top - 200}, 1000);
}

$('body').on('click', '.btn-add-runner', function(event) {
    event.preventDefault();
    var $this = $(this);
        $teamId = $('#teamId').val();
        $userId = $this.parent().parent().find('#email').val();

        if ( $userId.length > 0 ) {
            $.post(
                '/',
                { action: 'squareMileRelay/teamMembers/addRunner', userId: $userId, teamId: $teamId },
                function(data, textStatus, xhr) {
                    if ( data.includes('Sorry') ) {
                        var obj = $.parseJSON(data);
                        alert(obj.data.error);
                    } else if ( data.includes('status') ) {
                        var obj = $.parseJSON(data);
                        var tableRow = $('#template-add-runner').clone();
                        var firstName = tableRow.find('#firstName');
                        var lastName = tableRow.find('#lastName');
                        var email = tableRow.find('#email');
                        var dataUserId = tableRow.find('.btn-remove-runner');
                        dataUserId.data('position', obj.data.position);
                        dataUserId.data('user-id', $userId);
                        dataUserId.data('team-id', $teamId);
                        var hiddenTeamMembers = tableRow.find('input[name="teamMembers[]"]');
                        hiddenTeamMembers.val($userId);

                        firstName.val(obj.data.firstName);
                        lastName.val(obj.data.lastName);
                        email.val(obj.data.email);

                        console.log(obj.data.firstName);

                        $('#team-members tr:last-child').before(tableRow);

                        updatePositions();

                        if ($('#team-members tr').length > 10) {
                            $this.closest('tr').addClass('hide');
                        }
                    } else {
                        location.reload();
                    }
                }
            );
        }
});

$('body').on('click', '.btn-remove-runner', function(event) {
    event.preventDefault();
    var $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('please wait');

        $teamId = $('#teamId').val();
        $userId = $this.parent().parent().find('#email').val();
        $position = $this.data('position');

        if ( $userId.length > 0 ) {
            $.post(
                '/',
                { action: 'squareMileRelay/teamMembers/removeRunner', userId: $userId, teamId: $teamId, position: $position },
                function(data, textStatus, xhr) {
                    if ( data.includes('Sorry') ) {
                        alert(data);
                    } else if ( data == '1' ) {
                        $this.closest('tr').remove();
                        updatePositions();
                        $('#team-members tr:last-child').removeClass('hide');
                    } else {
                        location.reload();
                    }
                });
        }
});

$('body').on('click', '.btn-remove-member', function(event) {
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
            $this.parent('td').parent('tr').find('.resend').remove();
            $this.remove();
            location.reload();
    });

});

//===================================
//PARTNERS PAGE
//===================================

    var $segmentTop = 70;
    var $segmentBottom = ($(window).height() / 5) + 500;

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

        $('a[href*=\\#]:not(.link)').click(function(event){
            console.log('test');
            event.preventDefault();
            var offset = $( $.attr(this, 'href') ).offset();
            if ( offset != undefined ) {
                $('html,body').animate({scrollTop: offset.top - 170}, 500);
            }
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
//GRID LOGIC
//===================================

    //set working grid
    var $workingGrid = "";
    if ( $companiesGrid.length > 0 ){ var $workingGrid = $companiesGrid; }
    if ( $newsGrid.length > 0 ){ var $workingGrid = $newsGrid; }
    if ( $resultsGrid.length > 0 ){ var $workingGrid = $resultsGrid; }
    if ( $globalGalleryGrid.length > 0 ){ var $workingGrid = $globalGalleryGrid; }

    //set grid
    var $grid = $('.grid'),
        $page = $grid.attr('data-page'),
        $section = $grid.attr('data-section'),
        $search = $grid.attr('data-search'),
        $city = $grid.attr('data-city'),
        $year = $grid.attr('data-year');

    //hide loading on init
    if ( $('.loading-icon').length > 0 && $('.grid').length > 0 ) {
        $('.loading-icon').addClass('hide');
    }

    //search
    $('.grid-search input').keyup(function(event){
        if(event.keyCode == 13){
            var $val = $(this).val();
            gridSearch($val);
        }
    });

    // on grid search
    function gridSearch(value) {
        //set search options
        $grid.attr('data-search', value),
        $grid.attr('data-page', 1);

        //get search options
        var $page = $grid.attr('data-page'),
            $search = $grid.attr('data-search'),
            $city = $grid.attr('data-city'),
            $year = $grid.attr('data-year');

        if ( $search == undefined ) {
            var $search = "";
        }

        if ( $city == undefined ) {
            var $city = "";
        }

        if ( $year == undefined ) {
            var $year = "";
        }

        //remove all items
        $('.grid-item').each(function() {
            $workingGrid.isotope( 'remove', $(this) ).isotope('layout');
        });
        //show loading
        $('.loading-icon').removeClass('hide');

        //load next set
        loadEntries($section, $page, $search, $city, $year);
    }

    //on click - load more
    $('.grid .load-more .btn').click(function() {
        //set ajax options
        var $page = parseFloat($grid.attr('data-page'), 2) + 1,
            $search = $grid.attr('data-search'),
            $city = $grid.attr('data-city'),
            $year = $grid.attr('data-year');

        if ( $search == undefined ) {
            var $search = "";
        }

        if ( $city == undefined ) {
            var $city = "";
        }

        if ( $year == undefined ) {
            var $year = "";
        }

        //set the new page number
        $grid.attr('data-page', $page);

        //load next set
        loadEntries($section, $page, $search, $city, $year);
    });

    //on filter
    $('.filters:not(.partner-filters) .filter').click(function() {
        var $this = $(this),
            $parent = $this.parent('.filter-group'),
            $selector = $this.attr('data-filter');

        if ($selector == "*"){
            loadEntries($section, 1, "", "", "");
            $('.grid-search input').val("");
            $('.filter').removeClass('active');
            $this.addClass('active');
            var $search = "";
        } else {
            $parent.children('.filter').removeClass('active');
            $this.addClass('active');
        }

        $('.isotope-no-items').addClass('inactive');

        if ( $('.filter-group.large').length > 0 ){
            var $city = $('.filter-group.large .filter.active').attr('data-filter'),
                $year = $('.filter-group.small .filter.active').attr('data-filter');
        } else {
            var $search = $('.filter-group .filter.active').attr('data-filter');
        }

        if ( $search == undefined ) {
            var $search = "";
        }

        if ( $city == undefined ) {
            var $city = "";
        }

        if ( $year == undefined ) {
            var $year = "";
            if ($('.companies-filter').length) {
                $year = $this.attr('data-latest-event');
                $('.companies-filter .filter-group.small .filter[data-filter='+ $year +']').trigger('click');
            }
        }

        if ($grid.attr('data-search') != undefined) {
            var $search = ($grid.attr('data-search') + " " + $search).trim();
        }

        //set search options
        $grid.attr('data-search', $search),
        $grid.attr('data-year', $year),
        $grid.attr('data-city', $city),
        $grid.attr('data-page', 1);

        //remove all items
        $('.grid-item').each(function() {
            $workingGrid.isotope( 'remove', $(this) ).isotope('layout');
        });

        //load next set
        loadEntries($section, 1, $search, $city, $year);

    });

    //load entries
    function loadEntries(section, page, search, city, year) {
        //hide load more - show loading
        $('.loading-icon').removeClass('hide');
        $('.load-more').addClass('hide');
        $.get( "/"+section+"/p"+page+"?search="+search+"&city="+city+"&year="+year, function( data ) {
            console.log("/"+section+"/p"+page+"?search="+search+"&city="+city+"&year="+year);
            if ( data != "" ) {
                var $items = $(''+ data +'');
                //append new items
                $workingGrid.append( $items ).isotope( 'appended', $items );
                $workingGrid.imagesLoaded().progress( function() {
                    $workingGrid.isotope('layout');
                });
            } else {
                $('.load-more').addClass('hide');
            }
        })
        .done( function(){
            //hide loading
            $('.loading-icon').addClass('hide');
            //show load more
            $('.load-more').removeClass('hide');

            if ( $('.no-results').length > 0 ) {
                $('.load-more').addClass('hide');
            }

            if ( $('.companies.grid').length > 0 ) {
                $companiesGrid.isotope({ sortBy: 'name' });
            }

            if ( $('.gallery-grid').length > 0 ) {
                $('.img-cell').each(function() {
                    var $this = $(this);

                    $sliderModal.flickity( 'remove', $this );
                });

                $('.img-item').each(function(){
                    var $this = $(this),
                        $src = $this.attr('data-src'),
                        $caption = $this.attr('data-caption'),
                        $imgId = $this.attr('data-id'),
                        $item = $('<div class="img-cell" data-id="' + $imgId + '"><img src="' + $src + '"><br><p class="caption">' + $caption + '</p></div>');

                    $sliderModal.flickity( 'append', $item );
                });

                $('.img-item').click(function() {
                    var $this = $(this),
                        $id = $this.attr('data-id'),
                        $index = $('.slider-modal-link').index(this);

                    $('.media-modal .img').addClass('hide');
                    $('.media-modal .video').addClass('hide');
                    $('.media-modal .slider').removeClass('hide');

                    $sliderModal.flickity( 'select', $index );

                });
            }

        });
    }

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
      }
    })();

    $enterRace = $('#enterRace');
    var $city = getParameterByName('city');
    console.log('city: 2' + $city);

    $enterRace.find('select').on('change', function() {
        if ( $(this).val().length > 0 ) {
            $enterRace.find('div.next').removeClass('btn-invalid');
            $enterRace.find('div.next').addClass('btn-orange');

            var locale = $('body').data('locale');

            if ( locale == undefined || (locale != undefined && locale.length <= 0) ) {
                locale = '';
            } else {
                if ( locale == 'en_gb' ) {
                    locale = '';
                } else {
                    locale = '/' + locale;
                }
            }

            $('.slide[data-city='+ $(this).val() +'] #enterRaceFrame').attr('src', locale + '/commerce/products?city=' + $(this).val());

            $city = $(this).val();
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
