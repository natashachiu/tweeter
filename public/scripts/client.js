/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // appends tweets to tweets-container section
  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
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



  $("form").on("submit", function(event) {
    event.preventDefault();
    const serializedString = $(this).serialize();

    if ($("#error-box").is(":visible")) {
      $("#error-box").hide();
    }

    const { isValid, error } = validateForm($('textarea').val());
    if (isValid) {
      $.ajax("/tweets", { method: "POST", data: serializedString })
        .then(loadTweets);
    } else {
      $("#error-box").slideDown();
      $("#error-msg").text(error);
    }

    $('textarea').val('');
  });


  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then(renderTweets);
  };
  loadTweets();


  // tweets that are empty or too long are not submitted
  const validateForm = (text) => {
    if (!text) {
      return { isValid: false, error: "Tweet cannot be empty." };
    } else if (text.length > 140) {
      return { isValid: false, error: "Tweet has exceeded character limit." };;
    }
    return { isValid: true, error: null };
  };

  $("nav button").on("click", () => {
    if ($("#new-tweet").is(":hidden")) {
      $("#new-tweet").slideDown();
      $("textarea").focus();
    } else {
      $("#new-tweet").slideUp();
    }
  });

});