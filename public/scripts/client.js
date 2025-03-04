/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  loadTweets();

  // validate data submitted from form, POST to /tweets
  $("form").on("submit", function(event) {
    event.preventDefault();
    const serializedString = $(this).serialize();

    const $textArea = $(this).find("textarea");
    const $errorBox = $(this).find("#error-box");
    const $errorMsg = $(this).find("#error-msg");

    if ($errorBox.is(":visible")) {
      $errorBox.hide();
    }

    const { isValid, error } = validateForm($textArea.val());

    if (isValid) {
      $.post("/tweets", serializedString)
        .then(() => {
          loadTweets();
          $textArea.val("");
          $textArea.trigger("input");
        });

    } else {
      $errorBox.slideDown();
      $errorMsg.text(error);
    }
  });

});

// GET data from /tweets to render tweets
const loadTweets = () => {
  $.get("/tweets").then(data => renderTweets(data));
};

// adds tweets to tweets-container section
const renderTweets = (tweets) => {
  const $tweetsContainer = $("#tweets-container");
  $tweetsContainer.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  }
};


// creates tweet markup from tweet object
const createTweetElement = (tweet) => {
  const { user: { avatars, name, handle },
    content: { text }, created_at } = tweet;

  const $article =
    $("<article>").append(
      $("<header>").append(
        $("<div>").append(
          $("<img>").attr("src", avatars),
          $("<span>").text(name)),
        $("<span>").addClass("handle").text(handle)),
      $("<p>").text(text),
      $("<footer>").append(
        $("<span>").text(timeago.format(created_at)),
        $("<div>").append(
          $("<i>").addClass("fa-solid fa-flag"),
          $("<i>").addClass("fa-solid fa-retweet"),
          $("<i>").addClass("fa-solid fa-heart"))
      )
    );
  return $article;
};

// tweets that are empty or too long are not submitted
const validateForm = (text) => {
  if (!text) {
    return { isValid: false, error: "Tweet cannot be empty." };
  } else if (text.length > 140) {
    return { isValid: false, error: "Tweet has exceeded character limit." };;
  }
  return { isValid: true, error: null };
};
