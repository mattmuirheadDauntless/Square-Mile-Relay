$(function(){function e(){$("#team-members tr").each(function(e,a){var t=$("#team-members tr:nth-child("+e+")");t.find(".btn-remove-runner").data("position",e),t.find(".count").text(e)})}function a(e){p.attr("data-search",e),p.attr("data-page",1);var a=p.attr("data-page"),i=p.attr("data-search"),r=p.attr("data-city"),l=p.attr("data-year");if(void 0==i)var i="";if(void 0==r)var r="";if(void 0==l)var l="";$(".grid-item").each(function(){u.isotope("remove",$(this)).isotope("layout")}),$(".loading-icon").removeClass("hide"),t(g,a,i,r,l)}function t(e,a,t,i,r){$(".loading-icon").removeClass("hide"),$(".load-more").addClass("hide"),$.get("/"+e+"/p"+a+"?search="+t+"&city="+i+"&year="+r,function(l){if(console.log("/"+e+"/p"+a+"?search="+t+"&city="+i+"&year="+r),""!=l){var s=$(""+l);u.append(s).isotope("appended",s),u.imagesLoaded().progress(function(){u.isotope("layout")})}else $(".load-more").addClass("hide")}).done(function(){$(".loading-icon").addClass("hide"),$(".load-more").removeClass("hide"),$(".no-results").length>0&&$(".load-more").addClass("hide")})}function i(e,a){a||(a=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),i=t.exec(a);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null}if($("#ctaBanner").length>0&&new Waypoint({element:$("#ctaBanner"),handler:function(){$("body").toggleClass("cta-fixed")},offset:function(){return-this.element.height()}}),new Waypoint({element:$("body"),handler:function(){$(".header").toggleClass("fixed-header")},offset:-60}),$(".menu-btn").click(function(){$("body").toggleClass("menu-open"),$(".has-child").removeClass("active")}),$(".nav .has-child").hover(function(){$(".header").addClass("fixed-logo")},function(){$(".header").removeClass("fixed-logo")}),$(".nav .has-child").click(function(){$(".has-child").toggleClass("active")}),$("input").on("input",function(){1==$(this).is(":valid")?$(this).removeClass("invalid").addClass("valid"):$(this).removeClass("valid").addClass("invalid")}),$("#dateOfBirth").datepicker({format:"dd/mm/yyyy",autoclose:!0,startView:2}),$('a[href="#contact"]').click(function(e){e.preventDefault(),$("#contactBtn").trigger("click")}),$(".partner-filters .filter").click(function(){var e=$(this),a=e.parent(".filter-group"),t=e.attr("data-filter"),i=e.attr("data-latest-event");if("*"==t?($(".filter").removeClass("active"),e.addClass("active")):(t="",$(".filter.active").each(function(){t+=$(this).attr("data-filter")})),a.find(".filter.active").removeClass("active"),e.addClass("active"),$(".filter.active").each(function(){var e=+$(this).attr("data-filter")}),$(".filter.active:not(.btn)").length>1){var r=$(".filter-group.large .filter.active").attr("data-filter").replace(".",""),l=$(".filter-group.small .filter.active").attr("data-filter").replace(".","");t="."+r+"-"+l}$(".partners .race").addClass("hide"),$(".partners .race"+t).removeClass("hide"),$(".partners .race").removeClass("fixed"),$(".filter-group.small .filter.active").length<=0&&(""!=i?$('.filter-group.small .filter[data-filter=".'+i+'"]').trigger("click"):$(".filter-group.small .filter:first-child").trigger("click")),$(".filter-group.large .filter.active").length<=0&&$(".filter-group.large .filter:first-child").trigger("click"),$("a[href*=\\#]:not(.link)").click(function(e){e.preventDefault(),$("html,body").animate({scrollTop:$($.attr(this,"href")).offset().top-170},500)}),$(".slide-nav-section").each(function(){var e=$(this),a=e.attr("id"),t=e.attr("data-slide"),i=$("#"+a).offset().top+250;$(window).scroll(function(){$(window).scrollTop()+m<=i&&$(window).scrollTop()+f>=i&&(console.log(i),i>7500?$(".slide-nav").css("margin-top","-500px"):i>6500?$(".slide-nav").css("margin-top","-400px"):i>5500?$(".slide-nav").css("margin-top","-300px"):i>4500?$(".slide-nav").css("margin-top","-200px"):i>3500?$(".slide-nav").css("margin-top","-100px"):$(".slide-nav").css("margin-top","0px"),$(".slide-nav li").each(function(){$(this).removeClass("active")}),$("."+a).addClass("active"))})}),$(".race.active").each(function(){var e=$(this),a=e.offset().top;$(window).scroll(function(){$(window).scrollTop()+140>=a?e.addClass("fixed"):e.removeClass("fixed")})})}),$(".faqs").length>0&&$(".filter").click(function(){var e=$(this).attr("data-filter");$(".faq").addClass("hide"),$(".faq"+e).removeClass("hide")}),$(".tablesorter").tablesorter(),$(".notification .close").click(function(){$(this).parent(".notification").addClass("hide")}),$(".vid-modal-link").click(function(){var e=$(this),a=e.attr("data-src");$(".media-modal .img").addClass("hide"),$(".media-modal .video").removeClass("hide"),$(".media-modal .slider").addClass("hide"),$("#videoiFrame").attr("src",a)}),$(".img-modal-link").click(function(){var e=$(this),a=e.attr("data-src"),t=e.attr("data-caption");$(".media-modal .img").removeClass("hide"),$(".media-modal .video").addClass("hide"),$(".media-modal .slider").addClass("hide"),t.length>0&&($(".media-modal .img p").removeClass("hide"),$(".media-modal .img p").text(t)),$(".media-modal .img img").attr("src",a),$(".loading-icon").remove()}),$(".img-slider").length>0)var r=$(".img-slider").flickity({cellSelector:".img-cell",setGallerySize:!1,cellAlign:"left",wrapAround:!0,percentPosition:!0,lazyLoad:!0,pageDots:!0});if($(".slider-modal-link").length>0&&$(".img-item").each(function(){var e=$(this),a=e.attr("data-src"),t=e.attr("data-caption"),i=$('<div class="img-cell"><img data-flickity-lazyload="'+a+'"><br><p class="caption">'+t+"</p></div>");r.flickity("append",i)}),$(".slider-modal-link").click(function(){var e=$(this),a=$(".slider-modal-link").index(this);$(".media-modal .img").addClass("hide"),$(".media-modal .video").addClass("hide"),$(".media-modal .slider").removeClass("hide"),r.flickity("select",a)}),$(".modal .close").click(function(){$("#videoiFrame").attr("src","")}),$("form input[type=submit]").keydown(function(e){9==e.keyCode&&(e.preventDefault(),$(this).parent().find("*:input[type!=hidden]:first").focus())}),$(".enter-race-modal").click(function(){var e=$(this),a=e.attr("data-city");if(console.log("I work like wind."),void 0!=a&&a.length>0){$("#enterRaceLocation").val(a),$(".slide[data-slide=1] .next").trigger("click");var t=$("body").data("locale");t=void 0==t||void 0!=t&&t.length<=0?"":"en_gb"==t?"":"/"+t,$(".slide[data-city="+a+"] #enterRaceFrame").attr("src",t+"/commerce/products?city="+a)}}),$(".slide .next").click(function(){var e=$(this),a=e.parent(".slide").attr("data-slide"),t=parseFloat(a,2)+1,i=$("#enterRaceLocation").val();$(".slide.country").addClass("hidden"),$(".slide.country[data-city="+i+"]").removeClass("hidden"),e.parent(".slide").addClass("completed"),e.parent(".slide").removeClass("current"),$('.slide[data-slide="'+t+'"]').addClass("current"),$('.stages li[data-slide="'+a+'"]').addClass("completed"),$('.stages li[data-slide="'+a+'"]').removeClass("current"),$('.stages li[data-slide="'+t+'"]').addClass("current"),$(".stages ul").removeClass(),$(".stages ul").addClass("stage-"+t)}),$(".stages ul li").click(function(){var e=$(this),a=e.attr("data-slide");$currentSlide=$(".slide.current").attr("data-slide"),e.hasClass("completed")&&($('.slide[data-slide="'+$currentSlide+'"]').removeClass("completed"),$('.slide[data-slide="'+$currentSlide+'"]').removeClass("current"),$('.slide[data-slide="'+a+'"]').removeClass("completed"),$('.slide[data-slide="'+a+'"]').addClass("current"),$('.stages li[data-slide="'+$currentSlide+'"]').removeClass("completed"),$('.stages li[data-slide="'+$currentSlide+'"]').removeClass("current"),$('.stages li[data-slide="'+a+'"]').removeClass("completed"),$('.stages li[data-slide="'+a+'"]').addClass("current"),$(".stages ul").removeClass(),$(".stages ul").addClass("stage-"+a))}),$(".finish-payment").click(function(){var e=$("#enterRaceFrame",window.parent.document).parent().parent().parent().parent().parent(),a=$(this).attr("data-user-id");e.find(".slide.country[data-slide=2]:not(.hidden)").addClass("completed"),e.find(".slide.country[data-slide=2]:not(.hidden)").removeClass("current"),e.find(".slide[data-slide=3]").addClass("current"),e.find(".modal-footer ul").removeClass(),e.find(".modal-footer ul").addClass("stage-3"),e.find(".modal-footer ul li[data-slide=2]").removeClass(),e.find(".modal-footer ul li[data-slide=2]").addClass("completed"),e.find(".modal-footer ul li[data-slide=3]").addClass("current"),e.find("#reasonUserID").val(a)}),$(".send-to-my-account").click(function(){var e=$(this),a=e.attr("data-href");window.parent.document.location.href=a}),$(".send-to-forgot-password").click(function(){window.parent.document.location.href="/forgot-password"}),$(".back-to-cities").click(function(){var e=$("#enterRaceFrame",window.parent.document).parent().parent().parent().parent().parent();e.find(".slide[data-slide=1]").removeClass("completed"),e.find(".slide[data-slide=1]").addClass("current"),e.find(".slide.country[data-slide=2]:not(.hidden)").removeClass("current"),e.find(".modal-footer ul").removeClass(),e.find(".modal-footer ul").addClass("stage-1"),e.find(".modal-footer ul li[data-slide=2]").removeClass(),e.find(".modal-footer ul li[data-slide=1]").addClass("current"),$("#emptyCart").trigger("click")}),$("#newCompany").on("change",function(){$(".new-company-name").toggleClass("hide")}),$(".next-races").length>0)var l=$(".races").flickity({cellSelector:".race",cellAlign:"left",wrapAround:!0,groupCells:"100%",prevNextButtons:!1});$("#viewMoreRaces").click(function(){l.flickity("next")}),$(".about-accordion").length>0&&$(window).width()>900&&new Waypoint({element:$("#aboutAccordion"),handler:function(){$(".nav-item").toggleClass("fixed")},offset:"127px"}),$(".about-accordion .nav-items .nav-item").click(function(){var e=$(this),a=e.attr("data-accordion");console.log("test2"),setTimeout(function(){$(".gallery-grid").isotope("layout")},500),$(window).width()>900?($(".about-accordion .nav-items .nav-item").removeClass("active"),$(".about-accordion .main-accordion").removeClass("active"),e.addClass("active"),$('.about-accordion .main-accordion[data-accordion="'+a+'"]').addClass("active"),$("html,body").animate({scrollTop:$(".about-accordion").offset().top-130},500)):(e.toggleClass("active"),$('.about-accordion .main-accordion[data-accordion="'+a+'"]').toggleClass("active"))});var s=$(".accordion-gallery").isotope({layoutMode:"packery",itemSelector:".img-item"});s.imagesLoaded().progress(function(){s.isotope("layout")}),$(".next-accordion").click(function(){var e=$(this),a=e.attr("data-accordion");$(".nav-item[data-accordion="+a+"]").trigger("click")}),$(".race-locations .cities li").click(function(){var e=$(this),a=e.attr("data-city");$(".race-locations .cities li").removeClass("active"),e.addClass("active"),$(".race-locations .city").removeClass("active"),$(".race-locations .city").each(function(){$(this).attr("data-city")==a&&$(this).addClass("active")})}),$(".race-locations .city .timer").each(function(){var e=$(this),a=e.attr("data-date");e.countdown(a,function(a){e.text(a.strftime("%D:%H:%M:%S"))})});var n=$(".news").isotope({itemSelector:".news-item",percentPosition:!0,layoutMode:"fitRows"});n.imagesLoaded().progress(function(){n.isotope("layout")}),$(".related-articles-slider").flickity({cellAlign:"left",pageDots:!1,prevNextButtons:!1,contain:!0,wrapAround:!0,autoPlay:8e3});var o=$(".charities").isotope({itemSelector:".charities-item",percentPosition:!0,layoutMode:"fitRows"});o.imagesLoaded().progress(function(){o.isotope("layout")});var d=$(".companies").isotope({itemSelector:".companies-item",percentPosition:!0,layoutMode:"fitRows"});d.imagesLoaded().progress(function(){d.isotope("layout")});var c=$(".results").isotope({itemSelector:".result-item",percentPosition:!0,layoutMode:"fitRows"});c.imagesLoaded().progress(function(){c.isotope("layout")}),$(".edit-btn").click(function(){$(".my-profile").addClass("edit")}),$(".save-btn").click(function(){var e=0;$(".required").each(function(){(""==$(this).find("input").val()||$(".input").hasClass("invalid"))&&(e=1)})}),$(".btn-invite-member, .resend").click(function(e){e.preventDefault();var a=$(this);a.attr("disabled","disabled"),a.text("please wait"),$teamId=$('#update-team-members input[name="teamId"]').val(),$firstName=a.parent().parent().find("#firstName").val(),$lastName=a.parent().parent().find("#lastName").val(),$email=a.parent().parent().find("#email").val(),$email.length>0&&$.post("/",{action:"squareMileRelay/teamMembers/addTeamMember",firstName:$firstName,lastName:$lastName,email:$email,teamId:$teamId},function(e,a,t){e.includes("Sorry")?alert(e):location.reload()})}),$(".btn-remove-runner").length&&$("#team-members").length&&$("html, body").animate({scrollTop:$("#team-members").offset().top-200},1e3),$("body").on("click",".btn-add-runner",function(a){a.preventDefault();var t=$(this);$teamId=$("#teamId").val(),$userId=t.parent().parent().find("#email").val(),$userId.length>0&&$.post("/",{action:"squareMileRelay/teamMembers/addRunner",userId:$userId,teamId:$teamId},function(a,i,r){if(a.includes("Sorry")){var l=$.parseJSON(a);alert(l.data.error)}else if(a.includes("status")){var l=$.parseJSON(a),s=$("#template-add-runner").clone(),n=s.find("#firstName"),o=s.find("#lastName"),d=s.find("#email"),c=s.find(".btn-remove-runner");c.data("position",l.data.position),c.data("user-id",$userId),c.data("team-id",$teamId);var m=s.find('input[name="teamMembers[]"]');m.val($userId),n.val(l.data.firstName),o.val(l.data.lastName),d.val(l.data.email),console.log(l.data.firstName),$("#team-members tr:last-child").before(s),e(),$("#team-members tr").length>10&&t.closest("tr").addClass("hide")}else location.reload()})}),$("body").on("click",".btn-remove-runner",function(a){a.preventDefault();var t=$(this);t.attr("disabled","disabled"),t.text("please wait"),$teamId=$("#teamId").val(),$userId=t.parent().parent().find("#email").val(),$position=t.data("position"),$userId.length>0&&$.post("/",{action:"squareMileRelay/teamMembers/removeRunner",userId:$userId,teamId:$teamId,position:$position},function(a,i,r){a.includes("Sorry")?alert(a):"1"==a?(t.closest("tr").remove(),e(),$("#team-members tr:last-child").removeClass("hide")):location.reload()})}),$("body").on("click",".btn-remove-member",function(e){var a=$(this),t=a.data("user-id"),i=a.data("team-id");$.post("/",{action:"squareMileRelay/teamMembers/removeTeamMember",userId:t,teamId:i},function(e,t,i){a.parent("td").parent("tr").find(".input").val(""),a.parent("td").parent("tr").find(".user-status").removeClass("confirmed"),a.parent("td").parent("tr").find(".user-status").removeClass("pending"),a.parent("td").parent("tr").find(".user-status").html('<button type="submit" class="btn btn-orange btn-tiny">Send Invitation</button>'),a.parent("td").parent("tr").find(".resend").remove(),a.remove(),location.reload()})});var m=70,f=$(window).height()/5+500;$(".race.active").each(function(){var e=$(this),a=e.offset().top;$(window).scroll(function(){$(window).scrollTop()+140>=a?e.addClass("fixed"):e.removeClass("fixed")})});var v=$(".gallery-grid").isotope({itemSelector:".grid-item",percentPosition:!0,layoutMode:"masonry",stamp:".stamp"});v.imagesLoaded().progress(function(){v.isotope("layout")}),$(".city-cta .close").click(function(){$(this).parent(".city-cta").addClass("hide")}),$("#citySlideNav").length>0&&(new Waypoint({element:$("#citySlideNav"),handler:function(){$("#citySlideNav").toggleClass("fixed")},offset:"180px"}),$("a[href*=\\#]:not(.link)").click(function(e){console.log("test"),e.preventDefault();var a=$($.attr(this,"href")).offset();void 0!=a&&$("html,body").animate({scrollTop:a.top-170},500)})),$(".race-year .section").each(function(){var e=$(this),a=e.attr("id"),t=e.attr("data-slide");new Waypoint({element:$("#"+a),handler:function(){$(".race-year .section").removeClass("active"),$("#"+a).addClass("active"),$(".slide-nav li").removeClass("active"),$(".slide-nav li[data-slide="+t+"]").addClass("active")},offset:"280px"})}),$(".company-table .heading-row").click(function(){var e=$(this),a=e.next(".child-row").find(".table-expander");e.toggleClass("active"),a.toggleClass("active")});var u="";if(d.length>0)var u=d;if(n.length>0)var u=n;if(c.length>0)var u=c;if(v.length>0)var u=v;var p=$(".grid"),h=p.attr("data-page"),g=p.attr("data-section"),C=p.attr("data-search"),y=p.attr("data-city"),b=p.attr("data-year");$(".loading-icon").length>0&&$(".grid").length>0&&$(".loading-icon").addClass("hide"),$(".grid-search input").keyup(function(e){if(13==e.keyCode){a($(this).val())}}),$(".grid .load-more .btn").click(function(){var e=parseFloat(p.attr("data-page"),2)+1,a=p.attr("data-search"),i=p.attr("data-city"),r=p.attr("data-year");if(void 0==a)var a="";if(void 0==i)var i="";if(void 0==r)var r="";p.attr("data-page",e),t(g,e,a,i,r)}),$(".filters:not(.partner-filters) .filter").click(function(){var e=$(this),a=e.parent(".filter-group");if("*"==e.attr("data-filter")){t(g,1,"","",""),$(".grid-search input").val(""),$(".filter").removeClass("active"),e.addClass("active");var i=""}else a.children(".filter").removeClass("active"),e.addClass("active");if($(".isotope-no-items").addClass("inactive"),$(".filter-group.large").length>0)var r=$(".filter-group.large .filter.active").attr("data-filter"),l=$(".filter-group.small .filter.active").attr("data-filter");else var i=$(".filter-group .filter.active").attr("data-filter");if(void 0==i)var i="";if(void 0==r)var r="";if(void 0==l)var l="";if(void 0!=p.attr("data-search"))var i=(p.attr("data-search")+" "+i).trim();p.attr("data-search",i),p.attr("data-year",l),p.attr("data-city",r),p.attr("data-page",1),$(".grid-item").each(function(){u.isotope("remove",$(this)).isotope("layout")}),t(g,1,i,r,l)}),$(".faqs").length>0&&$("ul.filter-group>li:first-child").trigger("click");var k=function(){var e=0;return function(a,t){clearTimeout(e),e=setTimeout(a,t)}}();$enterRace=$("#enterRace");var y=i("city");if(console.log("city: 2"+y),$enterRace.find("select").on("change",function(){if($(this).val().length>0){$enterRace.find("div.next").removeClass("btn-invalid"),$enterRace.find("div.next").addClass("btn-orange");var e=$("body").data("locale");e=void 0==e||void 0!=e&&e.length<=0?"":"en_gb"==e?"":"/"+e,$(".slide[data-city="+$(this).val()+"] #enterRaceFrame").attr("src",e+"/commerce/products?city="+$(this).val()),y=$(this).val()}}),$("#terms").on("click",function(){if($(this).is(":checked")){var e=$(this).parent().parent().find(".btn-continue");e.removeClass("btn-invalid"),e.addClass("btn-orange")}else{var e=$(this).parent().parent().find(".btn-continue");e.addClass("btn-invalid"),e.removeClass("btn-orange")}}),$("#terms").is(":checked")){var w=$(this).parent().parent().find(".btn-continue");w.removeClass("btn-invalid"),w.addClass("btn-orange")}else{var w=$(this).parent().parent().find(".btn-continue");w.addClass("btn-invalid"),w.removeClass("btn-orange")}$(".terms input").each(function(){$(this).is(":checked")&&$(this).prop("checked",!1)}),$(".language-select").on("change",function(){window.location.href=$(this).val()})});