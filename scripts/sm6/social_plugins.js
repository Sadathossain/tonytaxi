if (typeof SM6 === 'undefined') {
    var SM6 = {};
}

SM6.SocialPlugins = (function () {

    var loaded = false;

    return {

    /**
    * Social Widgets initialisation script
    **/
    init : function () {
      if ( loaded ) { return }
      SM6.SocialPlugins.loadFacebook();
      SM6.SocialPlugins.loadTwitter();
      SM6.SocialPlugins.loadPlusOne();
      SM6.SocialPlugins.loadPinit();

      loaded = true;
    },

    loadPinit : function () {
      (function() {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = '//assets.pinterest.com/js/pinit.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
      })();
    },

    loadPlusOne : function () {
      (function() {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
      })();
    },

    loadTwitter : function () {
      (function(d,s,id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if(!d.getElementById(id)) {
          js=d.createElement(s);
          js.type='text/javascript';
          js.async=true;
          js.id=id;
          js.src="//platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js,fjs);
        }
      })(document,"script","twitter-wjs");
    },

    loadFacebook : function () {
      // create fb-root div or return if it exists already
      if ($('#fb-root').length > 0) {
        return;
      }
      var fbBlock = document.createElement("div");
      $(fbBlock).attr('id','fb-root');
      $(fbBlock).css({'position': 'absolute', 'left':"-10000px",'top': '-10000px', 'width': '0px','height': '0px'});
      $(fbBlock).appendTo('body');
      // create new script element
      var fbs = document.createElement('script');
      fbs.id = 'facebook-jssdk';
      fbs.async = true;
      fbs.src = document.location.protocol + '//connect.facebook.net/en_GB/all.js';
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(fbs, s);
      // async initialisation
      window.fbAsyncInit = function() {
        FB.init({
          cookie: true,
          xfbml: true,
          oauth  : true
        });
        window.fbApiInit = true;
      };
    }

    }

})();

SM6.Share = (function () {

    /**
    * load GooglePlus HTML tags dynamically for W3C validation
    **/
    var loadPlusOneHtmlWidget = function () {
      $('#google_plusone_widget').append('<g:plusone size="medium"></g:plusone>');
    };

    /**
    * load Twitter HTML tags dynamically for W3C validation
    **/
    var loadTwitterHtmlWidget = function (partnerCode) {
      $('#twitter_button_widget').append('<a href="https://twitter.com/share" class="twitter-share-button" data-via="'+ partnerCode +'">Tweet</a>');
    };

    /**
    * load facebook HTML tags dynamically for W3C validation
    **/
    var loadFacebookHtmlWidget = function () {
      $('#facebook_like_widget').append(' <fb:like send="false" layout="button_count" width="450" show_faces="false" ></fb:like>');
    };

    var animateDetails = {
      speed: 150,
      easing: 'linear',
      opacity: 'toggle',
      heightStart: '0px',
      heightEnd: '115px'
    };

    var shareMenuShown = false;
    var shareToggle = function(partnerCode) {
      // parse facebook button on first click
      $('#free_share_button').bind('click.free_share_button', function(event) {
        event.preventDefault();
        // unbind click event after parsing fb button
        FB.XFBML.parse($('#facebook_like_widget')[0]);
        $(this).unbind('click.free_share_button');
      });
      $('#free_share_button').click(function(event) {
        event.preventDefault();
        shareMenuShown = !shareMenuShown;
        shareToggleAnimation(shareMenuShown);
      });
    }
    /**
    * shareToggleAnimation sets the event listeners for the share widget animation
    **/
    var shareToggleAnimation = function (showMenu) {
      var freeShareMenu = $('#free_share_menu');
      //toggle animation to display share social widgets
      var toHeight;
      if (showMenu) toHeight = animateDetails.heightEnd
      else          toHeight = animateDetails.heightStart
      freeShareMenu.animate({
        opacity: animateDetails.opacity,
        height: toHeight
      }, animateDetails.speed, animateDetails.easing);
    };

    return {
      init : function (partnerCode) {
        if ($('#free_buttons_section').length > 0) {
            loadPlusOneHtmlWidget();
            loadTwitterHtmlWidget(partnerCode);
            loadFacebookHtmlWidget();
            shareToggle(partnerCode);
        }
      }
    }
})();

$(document).ready(function(){
    SM6.SocialPlugins.init();
});

