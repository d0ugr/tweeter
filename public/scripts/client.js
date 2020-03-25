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
    $tweetsSection.append(createTweetElement(tweet));
  }

};

const loadTweets = function() {

  $.ajax("/tweets", {
    method:   "GET",
    dataType: "JSON",
    cache:    false
  }).then(function(data, status, xhr) {
    if (status !== "success") {
      $("section.new-tweet").append(`<br>${status}: ${JSON.stringify(xhr, null, 2)}`);
    } else {
      renderTweets(data);
    }
  });

};



$(document).ready(function() {

  // renderTweets(tweetData);
  loadTweets();

  $("section.new-tweet form").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data:   $(this).serialize()
    }).then(function(_data, status, xhr) {
      if (status !== "success") {
        $("section.new-tweet textarea").val("");
      }
      $("section.new-tweet").append(`<br>${status}: ${JSON.stringify(xhr, null, 2)}`);
    });
  });

});



