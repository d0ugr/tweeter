


import constants from "./constants.mjs";



$(document).ready(function() {

  const $tweetTextarea  = $(".new-tweet textarea");
  const $charsRemaining = $(".new-tweet output");

  $tweetTextarea.on("input change propertychange", function(_event) {
    const charsRemaining = constants.MAX_TWEET_LENGTH - $(this).val().length;
    $charsRemaining.html(charsRemaining).toggleClass("error-text", charsRemaining < 0);
  });

  $tweetTextarea.trigger("change");

});



