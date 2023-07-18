
$(document).ready((function() {

  $("textarea").on('input', function() {
    const charCount = $(this).val().length;
    const charsLeft = 140 - charCount;
    const counter = $(this).next().children('output');

    counter.text(charsLeft);

    if (charsLeft < 0) {
      counter.addClass("charLimit");
    }
  });



}));