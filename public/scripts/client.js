/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];



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



$(document).ready(function() {

  renderTweets(tweetData);

});



