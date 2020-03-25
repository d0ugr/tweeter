/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name":    "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle":  "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = function(tweet) {

  return $(`
    <article>
      <header class="debug">
        <img src="${tweet.user.avatars}"><div class="name">${tweet.user.name}</div>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>${new Date(1461116232227)}</span>
        <div>
          <img src="/images/profile-hex.png">
          <img src="/images/profile-hex.png">
          <img src="/images/profile-hex.png">
        </div>
      </footer>
    </article>
  `);

};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



