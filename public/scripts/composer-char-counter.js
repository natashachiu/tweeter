$(document).ready(function() {

  $("textarea").on("input", function() {
    const charsLeft = 140 - $(this).val().length;
    const $counter = $(this).closest("form").find("output");

    if (charsLeft < 0) {
      $counter.addClass("char-limit");
    } else {
      $counter.removeClass("char-limit");
    }
    $counter.text(charsLeft);
  });
});