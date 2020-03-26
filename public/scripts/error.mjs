


import constants from "./constants.mjs";

const DEFAULT_ERROR_MESSAGE     = "NOPE NOPE NOPE";
const DEFAULT_ERROR_DESCRIPTION = "You totally screwed up and you need to apologize.";



const error = {

  EMPTY_TWEET: {
    message:     null,
    description: "Empty tweets not allowed."
  },

  TWEET_TOO_LONG: {
    message:     null,
    description: "Your tweet is waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay too long."
  },

  FIGHT_CLUB: {
    message:     "DO NOT TALK ABOUT FIGHT CLUB",
    description: "There are two rules about this. It's not like they are buried at the end of the list either. They are the first ones."
  },

  showNewTweetError: function(message, description) {

    let err = message;

    if (typeof message !== "object") {
      if (typeof description === "string") {
        err = {
          message:     null,
          description: error
        };
      } else {
        err = {
          message:     error,
          description: description
        };
      }
    }
    $("section.new-tweet .error h1").html((err.message     ? err.message     : DEFAULT_ERROR_MESSAGE));
    $("section.new-tweet .error p") .html((err.description ? err.description : DEFAULT_ERROR_DESCRIPTION));
    $("section.new-tweet .error").slideDown(constants.ANIMATION_DURATION);

  },

  hideNewTweetError: function() {

    $("section.new-tweet .error").slideUp(constants.ANIMATION_DURATION);

  }

};



export default error;



