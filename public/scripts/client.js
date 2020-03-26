/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import MAX_TWEET_LENGTH from "./composer-char-counter.mjs";



const DEFAULT_ERROR_MESSAGE     = "NOPE NOPE NOPE";
const DEFAULT_ERROR_DESCRIPTION = "You totally screwed up and you need to apologize.";

const ANIMATION_DURATION = "fast";



const escapeText = function(text) {

  let span = document.createElement("span");
  span.appendChild(document.createTextNode(text));
  return span.innerHTML;

};



$(document).ready(function() {



  const $window      = $(window);
  const $header      = $("header");
  const $scrollToTop = $("nav #scroll-to-top");
  const $newTweet    = $("section.new-tweet");
  const $form        = $("section.new-tweet form");
  const $textarea    = $("section.new-tweet textarea");
  const $error       = $("section.new-tweet .error");



  const showScrollToTop = function() {

    if ($window.scrollTop() > $header.outerHeight()) {
      if (!$scrollToTop.is(":visible")) {
        $scrollToTop.fadeIn(ANIMATION_DURATION);
      }
    } else {
      if ($scrollToTop.is(":visible")) {
        $scrollToTop.fadeOut(ANIMATION_DURATION);
      }
    }

  };

  const scrollToTop = function() {

    window.scroll({
      top:      0,
      left:     0,
      behavior: "smooth"
    });

  };

  const showNewTweetError = function(message, description) {

    $("section.new-tweet .error h1").html((message     ? message     : DEFAULT_ERROR_MESSAGE));
    $("section.new-tweet .error p") .html((description ? description : DEFAULT_ERROR_DESCRIPTION));
    $("section.new-tweet .error").slideDown(ANIMATION_DURATION);

  };

  const hideNewTweetError = function() {

    $("section.new-tweet .error").slideUp(ANIMATION_DURATION);

  };



  const createTweetElement = function(tweet) {

    return $(`
      <article>
        <header>
          <img src="${tweet.user.avatars}"><div class="name">${tweet.user.name}</div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <p>${escapeText(tweet.content.text)}</p>
        <footer>
          <span>${Math.floor((Date.now() - tweet.created_at) / 1000 / 86400)} days ago</span>
          <div>
            <img src="/images/profile-hex.png">
            <img src="/images/profile-hex.png">
            <img src="/images/profile-hex.png">
          </div>
        </footer>
      </article>
    `);

  };

  const renderTweets = function(tweets) {

    const $tweetsSection = $("section#tweets");

    if (!Array.isArray(tweets)) {
      $tweetsSection.prepend(createTweetElement(tweets));
    } else {
      for (const tweet of tweets) {
        $tweetsSection.prepend(createTweetElement(tweet));
      }
    }

  };

  const getTweets = function(callback) {

    $.ajax("/tweets", {
      method:   "GET",
      dataType: "JSON",
      cache:    false
    }).then(function(data, status, xhr) {
      if (status !== "success") {
        callback(xhr, null);
      } else {
        callback(null, data);
      }
    });

  };

  const loadTweets = function() {

    getTweets((err, data) => {
      if (err) {
        showNewTweetError(`Error loading tweets: ${JSON.stringify(err, null, 2)}`);
      } else {
        renderTweets(data);
      }
    });

  };



  $newTweet.hide();
  showScrollToTop();
  loadTweets();



  $textarea.on("keydown", function(event) {
    if (event.keyCode === KeyboardEvent.DOM_VK_RETURN) {
      event.preventDefault();
      $form.trigger("submit");
    }
    hideNewTweetError();
  });

  $form.on("submit", function(event) {
    const tweetText = $textarea.val().trim();

    event.preventDefault();
    if (!tweetText) {
      showNewTweetError(null, "Empty tweets not allowed.");
    } else if (tweetText.length > MAX_TWEET_LENGTH) {
      showNewTweetError(null, "Your tweet is waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay too long.");
    } else if (tweetText.toLowerCase().indexOf("fight club") !== -1) {
      showNewTweetError("DO NOT TALK ABOUT FIGHT CLUB", "There are two rules about this. They are the first ones. ");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data:   $(this).serialize()
      }).then(function(_data, status, xhr) {
        if (status !== "success") {
          showNewTweetError(`${status}: ${JSON.stringify(xhr, null, 2)}`);
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

          getTweets((err, data) => {
            if (err) {
              showNewTweetError(`Error getting tweet: ${JSON.stringify(err, null, 2)}`);
            } else {
              renderTweets(data[data.length - 1]);
            }
          });
          $error.hide();
          $textarea.val("").focus();
        }
      });
    }
  });

  $window.on("scroll", function(_event) {
    showScrollToTop();
  });

  $("nav #nav_tweet").on("click", function(event) {
    event.preventDefault();
    if (!$newTweet.is(":visible")) {
      $newTweet.slideDown(ANIMATION_DURATION);
      $textarea.focus();
    } else {
      $textarea.blur();
      $newTweet.slideUp(ANIMATION_DURATION);
    }
    scrollToTop();
  });

  $("nav #scroll-to-top").on("click", function(event) {
    event.preventDefault();
    if (!$newTweet.is(":visible")) {
      $newTweet.slideDown(ANIMATION_DURATION);
    }
    $textarea.focus();
    scrollToTop();
  });

  $error.on("click", function(event) {
    event.preventDefault();
    hideNewTweetError();
  });



});



