


// tweet.mjs
//
// Tweet-related event handlers and helper functions.



import constants from "./constants.mjs";
import error     from "./error.mjs";

// Tweet box template that is cloned for each tweet displayed on the page:
const $tweetTemplate = $("#templates article");



// Internal functions



//  getTweets performs an AJAX request to retrieve all the tweets to display on the page.
//
//    callback   Function: Callback to execute when the request is complete.
//
//      data   If the request succeeds, the JSON data is returned in the first argument.
//      xhr    If an error occurs, the XHR info is returned in the second argument.

const getTweets = function(callback) {

  $.ajax("/tweets", {
    method:   "GET",
    dataType: "JSON",
    cache:    false
  }).then((data, status, xhr) => {
    if (status !== "success") {
      callback(xhr, null);
    } else {
      callback(null, data);
    }
  });

};

// createTweetElement creates a new tweet box to add the the page.
//    The template is cloned, populated, and returned to the caller.
//    Currently only used by renderTweets below.
//
//    tweet   Object: Data to populate the tweet box with.

const createTweetElement = function(tweet) {

  const $tweet = $tweetTemplate.clone();
  $tweet.find("header img").attr("src", tweet.user.avatars);
  $tweet.find("header .name").text(tweet.user.name);
  $tweet.find("header .handle").text(tweet.user.handle);
  $tweet.find("p").text(tweet.content.text);
  $tweet.find("footer span").html(`${Math.floor((Date.now() - tweet.created_at) / 1000 / 86400)} days ago`);
  return $tweet;

};

// renderTweets prepends tweet boxes to the tweets section.
//
//    tweets   Object/Array: Can be a single tweet data object, or an array of them.

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



// The tweet object exposes exported functions from the module.

const tweet = {

  // init registers the event handler for form submission (sending a new tweet) via AJAX.

  init: function() {

    const $composeForm = $("section.new-tweet form");
    const $composeText = $("section.new-tweet textarea");

    // Handle the new tweet form submission with AJAX and prevent leaving the page:
    //    TODO: Update AJAX error messages to be more user friendly.

    $composeForm.on("submit", (event) => {
      event.preventDefault();
      error.hideError();
      // Sanitize and validate the tweet input:
      const tweetText = $composeText.val().trim();
      if (!tweetText) {
        error.showError(error.EMPTY_TWEET);
      } else if (tweetText.length > constants.MAX_TWEET_LENGTH) {
        error.showError(error.TWEET_TOO_LONG);
      } else if (tweetText.toLowerCase().indexOf("fight club") !== -1) {
        error.showError(error.FIGHT_CLUB);
      } else {
        // POST the new tweet to the server:
        $.ajax("/tweets", {
          method: "POST",
          data:   $(this).serialize()
        }).then((_data, status, xhr) => {
          if (status !== "success") {
            error.showError(`${status}: ${JSON.stringify(xhr, null, 2)}`);
          } else {
            // Retrieve the tweet data from the server to display on the page:
            //    TODO: Have the server return the new tweet data.
            //          This currently uses getTweets which loads all the tweets,
            //          when only the latest one is needed.
            getTweets((err, data) => {
              if (err) {
                error.showError(`Error getting tweet: ${JSON.stringify(err, null, 2)}`);
              } else {
                tweet.renderTweets(data[data.length - 1]);
              }
            });
            $composeText.val("").focus();
          }
        });
      }
    });

  },

  // loadTweets retrieves all the tweets to show via getTweets,
  //    and displays them on the page via renderTweets.

  loadTweets: function() {

    getTweets((err, data) => {
      if (err) {
        error.showError(`Error loading tweets: ${JSON.stringify(err, null, 2)}`);
      } else {
        $("section#tweets").empty();
        renderTweets(data);
      }
    });

  }

};



export default tweet;



