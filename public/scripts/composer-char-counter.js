


const MAX_TWEET_LENGTH = 140;



$(document).ready(() => {

  const $textInput      = $(".new-tweet textarea");
  const $charsRemaining = $(".new-tweet output");

  $textInput.bind("input propertychange", () => {
    $charsRemaining.html(MAX_TWEET_LENGTH - $textInput.val().length);
  });

});



