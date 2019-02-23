(function(){

  $('.accept-tos-and-privacy').validate({
    submitHandler: function(form) {
      addSpinnerMessage('Loading');
      form = $(form).serialize();

      let post_form = $.post('/accept-tos-and-privacy/', form);

      post_form.done(function() {
        window.location = '/';
      });

      post_form.fail(function() {
        console.log('Please retry');
      });
    }
  });
})();