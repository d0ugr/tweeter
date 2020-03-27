


// ui.mjs
//
// UI-related event handlers and helper functions.



import constants from "./constants.mjs";
import error     from "./error.mjs";



// Internal functions.



// updateCharCounter updates the count of characters remaining that are allowed to be tweeted.
//
//    $textInput   Object: jQuery reference to a text input object that supports .val()

const updateCharCounter = function($textInput) {

  const charsRemaining = constants.MAX_TWEET_LENGTH - $textInput.val().length;
  $("section.new-tweet .counter").html(charsRemaining).toggleClass("error-text", charsRemaining < 0);

};

// showScrollToTopButton shows/hides the scroll-to-top button.
//
//    $button   Object: jQuery object for the DOM element to show/hide.

const showScrollToTopButton = function($button) {

  if ($(window).scrollTop() > $("header").outerHeight()) {
    if (!$button.is(":visible")) {
      $button.stop().fadeIn(constants.ANIMATION_DURATION);
    }
  } else {
    if ($button.is(":visible")) {
      $button.stop().fadeOut(constants.ANIMATION_DURATION);
    }
  }

};

// scrollToTop smooth-scrolls the page to the top.

const scrollToTop = function() {

  const body = $("html, body");
  body.stop().animate({ scrollTop: 0 }, constants.ANIMATION_DURATION, "swing");

};



// The ui object exposes exported functions from the module.

const ui = {

  init: function() {

    const $window         = $(window);
    const $body           = $("body");
    const $nav            = $("nav");
    const $compose        = $("section.new-tweet");
    const $composeForm    = $("section.new-tweet form");
    const $composeText    = $("section.new-tweet textarea");
    const $scrollToTop    = $("nav #scroll-to-top");
    const $error          = $("section.new-tweet .error");

    // Update the top body padding that brings the content down below the nav bar:
    //    This can probably be done without JS, but no time now...
    $window.on("resize", function(_event) {
      $body.css("padding-top", `${$nav.outerHeight()}px`);
    });

    // Show/hide the scroll-to-top button if the page has been scrolled down enough:
    $window.on("scroll", function(_event) {
      showScrollToTopButton($scrollToTop);
    });
    // Initialize the scroll-to-top button since the page may already be scrolled down when refreshing:
    showScrollToTopButton($scrollToTop);

    // Scroll to the top of the page and focus the compose tweet box
    //    when the scroll-top-top button is clicked:
    $scrollToTop.on("click", function(event) {
      event.preventDefault();
      if (!$compose.is(":visible")) {
        $compose.slideDown(constants.ANIMATION_DURATION);
      }
      $composeText.focus();
      scrollToTop();
    });

    // Update the characters remaining count whenever the compose input changes:
    $composeText.on("input change propertychange", function(_event) {
      updateCharCounter($composeText);
    });
    // Force a character count update on page load to initialize it:
    //    There could already be text in the compose box on a page refresh.
    updateCharCounter($composeText);

    // Handle the Enter key to cause form submission:
    $composeText.on("keydown", function(event) {
      if (event.keyCode === KeyboardEvent.DOM_VK_RETURN) {
        event.preventDefault();
        $composeForm.trigger("submit");
      }
      error.hideError();
    });

    // Show/hide the compose tweet box:
    $("nav #nav-tweet").on("click", function(event) {
      event.preventDefault();
      error.hideError();
      scrollToTop();
      if (!$compose.is(":visible")) {
        $compose.slideDown(constants.ANIMATION_DURATION);
        $composeText.focus();
      } else {
        $compose.slideUp(constants.ANIMATION_DURATION);
      }
    });

    // Hide the error box when it is clicked:
    $error.on("click", function(event) {
      event.preventDefault();
      error.hideError();
    });

  }

};



export default ui;



