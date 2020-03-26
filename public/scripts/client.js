/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import constants from "./constants.mjs";
import error     from "./error.mjs";
import ui        from "./ui.mjs";
import counter   from "./composer-char-counter.mjs";
import tweet     from "./tweet.mjs";




$(document).ready(function() {



  const $window      = $(window);
  const $header      = $("header");
  const $scrollToTop = $("nav #scroll-to-top");
  const $compose     = $("section.new-tweet");
  const $composeForm = $("section.new-tweet form");
  const $composeText = $("section.new-tweet textarea");
  const $error       = $("section.new-tweet .error");



  $compose.hide();
  counter.init();
  ui.showScrollToTopButton($scrollToTop, $header.outerHeight());
  tweet.loadTweets();



  $composeText.on("keydown", function(event) {
    if (event.keyCode === KeyboardEvent.DOM_VK_RETURN) {
      event.preventDefault();
      $composeForm.trigger("submit");
    }
    error.hideNewTweetError();
  });

  $composeForm.on("submit", function(event) {
    const tweetText = $composeText.val().trim();

    event.preventDefault();
    if (!tweetText) {
      error.showNewTweetError(error.EMPTY_TWEET);
    } else if (tweetText.length > constants.MAX_TWEET_LENGTH) {
      error.showNewTweetError(error.TWEET_TOO_LONG);
    } else if (tweetText.toLowerCase().indexOf("fight club") !== -1) {
      error.showNewTweetError(error.FIGHT_CLUB);
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data:   $(this).serialize()
      }).then(function(_data, status, xhr) {
        if (status !== "success") {
          error.showNewTweetError(`${status}: ${JSON.stringify(xhr, null, 2)}`);
        } else {
          // $("section#tweets").prepend(createTweetElement({
          //   "user": {
          //     "name":    $("header div h2").html(),
          //     "avatars": $("header div img").attr("src"),
          //     "handle":  `@${$("header div h2").html()}`
          //   },
          //   "content": {
          //     "text": $("section.new-tweet textarea").val()
          //   },
          //   "created_at": Date.now()
          // }));

          tweet.getTweets((err, data) => {
            if (err) {
              error.showNewTweetError(`Error getting tweet: ${JSON.stringify(err, null, 2)}`);
            } else {
              tweet.renderTweets(data[data.length - 1]);
            }
          });
          $error.hide();
          $composeText.val("").focus();
        }
      });
    }
  });

  $window.on("scroll", function(_event) {
    ui.showScrollToTopButton($scrollToTop, $header.outerHeight());
  });

  $("nav #nav_tweet").on("click", function(event) {
    event.preventDefault();
    ui.scrollToTop();
    if (!$compose.is(":visible")) {
      $compose.slideDown(constants.ANIMATION_DURATION);
      $composeText.focus();
    } else {
      $compose.slideUp(constants.ANIMATION_DURATION);
    }
  });

  $("nav #scroll-to-top").on("click", function(event) {
    event.preventDefault();
    if (!$compose.is(":visible")) {
      $compose.slideDown(constants.ANIMATION_DURATION);
    }
    $composeText.focus();
    ui.scrollToTop();
  });

  $error.on("click", function(event) {
    event.preventDefault();
    error.hideNewTweetError();
  });



});



