


const MAX_TWEET_LENGTH = 140;



$(document).ready(function() {

  const $charsRemaining = $(".new-tweet output");

  $(".new-tweet textarea").bind("input change propertychange", function(_event) {
    const charsRemaining = MAX_TWEET_LENGTH - $(this).val().length;
    $charsRemaining.html(charsRemaining).toggleClass("error", charsRemaining < 0);
  });

});



