


import constants from "./constants.mjs";

const $window = $(window);



const ui = {

  showScrollToTopButton: function($button, scrollLimit) {

    if ($window.scrollTop() > scrollLimit) {
      if (!$button.is(":visible")) {
        $button.fadeIn(constants.ANIMATION_DURATION);
      }
    } else {
      if ($button.is(":visible")) {
        $button.fadeOut(constants.ANIMATION_DURATION);
      }
    }

  },

  scrollToTop: function() {

    const body = $("html, body");
    body.stop().animate({ scrollTop: 0 }, constants.ANIMATION_DURATION, "swing");

  }

};



export default ui;



