$(document).ready(function() {

  $("#scroll-to-top").on("click", () => {
    $('html, body').animate({ scrollTop: '0px' }, 300);
    $("#new-tweet").show();
    $("textarea").focus();
  });

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 550) {
      $("#scroll-to-top").show();
      $("nav div").hide();
    } else {
      $("#scroll-to-top").hide();
      $("nav div").show();
    }
  });
});