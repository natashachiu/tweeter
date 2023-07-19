
$(document).ready((function() {

  $('textarea').on('input', function() {
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).next().children('outpu');

    if (charsLeft < 0) {
      counter.addClass('charLimit');
    } else {
      counter.removeClass('charLimit');
    }
    counter.text(charsLeft);
  });
}));