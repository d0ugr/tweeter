


const MAX_TWEET_LENGTH = 140;



$(document).ready(function() {

  const $charsRemaining = $(".new-tweet output");

  $(".new-tweet textarea").bind("input propertychange", function(_event) {
    $charsRemaining.html(MAX_TWEET_LENGTH - $(this).val().length);
  });

});



