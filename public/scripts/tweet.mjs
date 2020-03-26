


import util  from "./util.mjs";
import error from "./error.mjs";



const tweet = {

  createTweetElement: function(tweet) {

    return $(`
      <article>
        <header>
          <img src="${tweet.user.avatars}"><div class="name">${tweet.user.name}</div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <p>${util.escapeText(tweet.content.text)}</p>
        <footer>
          <span>${Math.floor((Date.now() - tweet.created_at) / 1000 / 86400)} days ago</span>
          <div>
            <img src="/images/preferences-desktop-locale.svg">
            <img src="/images/media-playlist-repeat.svg">
            <img src="/images/dialog-ok.svg">
          </div>
        </footer>
      </article>
    `);

  },

  renderTweets: function(tweets) {

    const $tweetsSection = $("section#tweets");

    if (!Array.isArray(tweets)) {
      $tweetsSection.prepend(this.createTweetElement(tweets));
    } else {
      for (const tweet of tweets) {
        $tweetsSection.prepend(this.createTweetElement(tweet));
      }
    }

  },

  getTweets: function(callback) {

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

  },

  loadTweets: function() {

    this.getTweets((err, data) => {
      if (err) {
        error.showNewTweetError(`Error loading tweets: ${JSON.stringify(err, null, 2)}`);
      } else {
        this.renderTweets(data);
      }
    });

  }

};



export default tweet;



