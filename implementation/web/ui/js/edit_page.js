// prevents staff from editing form
(function(){
  if ($('.edit-page').length) {

    var is_admin = $('.is-admin').val();

    if (is_admin == false || is_admin == 'false') {
      $('input, textarea, select').each(function() {
        $(this).prop('disabled', true);
      });
    } 
  }
})();