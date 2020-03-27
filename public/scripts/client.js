/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import ui    from "./ui.mjs";
import tweet from "./tweet.mjs";



// Initialize stuff and load those all-important tweets:

$(document).ready(() => {

  ui.init();
  tweet.init();
  tweet.loadTweets();

});



