(function(){
  $('.add-toggle').click(function(e) {
    if ($(this).hasClass('toggle-open')) {
      $(this).removeClass('toggle-open');
      $('.add-toggle-form').hide();
    } else {
      $(this).addClass('toggle-open');
      $('.add-toggle-form').show();
    }
    // $('.add-toggle-form').toggle();
    // $(this).toggleClass('toggle-open');
  });

  $('.add-panel .add-button-cancel').click(function(e) {
    e.preventDefault();
    $('.add-toggle-form').hide();
    $('.add-toggle').removeClass('toggle-open');
    $('.add-toggle-form input[type="text"]').each(function() {
      $(this).val('');
    });
    $('.add-toggle-form input[type="radio"]').each(function() {
      this.checked = false;
    });
    $('.add-toggle-form select').each(function() {
      $(this).val('');
    });
  });
})();