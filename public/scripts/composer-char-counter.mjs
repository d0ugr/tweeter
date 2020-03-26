


import constants from "./constants.mjs";



const counter = {

  init: function() {

    $(document).ready(function() {
      const $tweetTextarea  = $(".new-tweet textarea");
      const $charsRemaining = $(".new-tweet .counter");

      $tweetTextarea.on("input change propertychange", function(_event) {
        const charsRemaining = constants.MAX_TWEET_LENGTH - $(this).val().length;
        $charsRemaining.html(charsRemaining).toggleClass("error-text", charsRemaining < 0);
      });

      $tweetTextarea.trigger("change");

    });

  }

};



export default counter;



