


const MAX_TWEET_LENGTH = 140;



$(document).ready(function() {

  const $tweetTextarea  = $(".new-tweet textarea");
  const $charsRemaining = $(".new-tweet output");

  $tweetTextarea.on("input change propertychange", function(_event) {
    const charsRemaining = MAX_TWEET_LENGTH - $(this).val().length;
    $charsRemaining.html(charsRemaining).toggleClass("error", charsRemaining < 0);
  });

  $tweetTextarea.trigger("change");

});



