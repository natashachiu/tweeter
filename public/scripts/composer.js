$(document).ready(function() {
  const $newTweet = $(this).find("#new-tweet");
  const $textArea = $(this).find("textarea");
  const $scrollToTop = $(this).find("#scroll-to-top");
  const $navDiv = $(this).find("nav div");

  // new tweet button and compose tweet box sliding
  $("nav button").on("click", function() {
    if ($newTweet.is(":hidden")) {
      $newTweet.slideDown();
      $textArea.focus();
    } else {
      $newTweet.slideUp();
    }
  });

  // scroll to top button
  $("#scroll-to-top").on("click", () => {

    $('html, body').animate({ scrollTop: 0 }, 200);
    $newTweet.show();
    $textArea.focus();
  });

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 550) {
      $scrollToTop.show();
      $navDiv.hide();
    } else {
      $scrollToTop.hide();
      $navDiv.show();
    }
  });
});