


const MAX_TWEET_LENGTH = 140;



$(document).ready(function() {

  const $charsRemaining = $(".new-tweet output");

  $(".new-tweet textarea").bind("input propertychange", function(_event) {
    const charsRemaining = MAX_TWEET_LENGTH - $(this).val().length;
    $charsRemaining.html(charsRemaining).css("color", (charsRemaining >= 0 ? "" : "red"));
  });

});



