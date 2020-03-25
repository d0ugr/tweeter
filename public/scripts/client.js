/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(tweet) {

  return $(`
    <article>
      <header>
        <img src="${tweet.user.avatars}"><div class="name">${tweet.user.name}</div>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
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

  for (const tweet of tweets) {
    $tweetsSection.prepend(createTweetElement(tweet));
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
      $("section.new-tweet").append(`<br>Error getting tweets: ${JSON.stringify(err, null, 2)}`);
    } else {
      renderTweets(data);
    }
  });

};



$(document).ready(function() {

  loadTweets();

  $("section.new-tweet form").on("submit", function(event) {
    const tweetText = $("section.new-tweet textarea").val().trim();

    event.preventDefault();
    if (!tweetText) {
      alert("Empty tweets not allowed");
    } else if (tweetText.length > MAX_TWEET_LENGTH) {
      alert("Your tweet is waaaaaaaay too long");
    } else if (tweetText.toLowerCase().indexOf("fight club") !== -1) {
      alert("You do not talk about Fight Club.  There are two rules about this.");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data:   $(this).serialize()
      }).then(function(_data, status, xhr) {
        if (status !== "success") {
          $("section.new-tweet").append(`<br>${status}: ${JSON.stringify(xhr, null, 2)}`);
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
              $("section.new-tweet").append(`<br>Error getting tweets: ${JSON.stringify(err, null, 2)}`);
            } else {
              renderTweets([data[data.length - 1]]);
            }
          });
          $("section.new-tweet textarea").val("");
        }
      });
    }
  });

});



