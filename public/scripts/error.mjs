


// error.mjs
//
// Error-related constants and helper functions.



import constants from "./constants.mjs";

// Internal constants.

const DEFAULT_ERROR_MESSAGE     = "NOPE NOPE NOPE";
const DEFAULT_ERROR_DESCRIPTION = "You totally screwed up and you need to apologize.";



// The error object exposes exported constants and functions from the module.
//    The error functions are technically UI functions, but are separated out into this module.

const error = {

  // Application errors:

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
    description: "There are two rules about this. It's not like they are buried at the end of the list either. They are the first ones. Read them."
  },

  // showError displays an error message on the page with a slide effect on the error box.
  //
  //    message       String/Object: An error message to display, or an object containing both
  //                                 (i.e. from the constants above).
  //    description   String: A more verbose description of the error.
  //                          Ignored if an error object is passed.

  showError: function(message, description) {

    let err = message;

    if (typeof message !== "object") {
      err = { message, description };
    }
    $("section.new-tweet .error .message")    .html((typeof err.message     === "string" ? err.message     : DEFAULT_ERROR_MESSAGE));
    $("section.new-tweet .error .description").html((typeof err.description === "string" ? err.description : DEFAULT_ERROR_DESCRIPTION));
    $("section.new-tweet .error").stop().slideDown(constants.ANIMATION_DURATION);

  },

  // hideError hides the error box on the page with a slide effect.

  hideError: function() {

    $("section.new-tweet .error").stop().slideUp(constants.ANIMATION_DURATION);

  }

};



export default error;



