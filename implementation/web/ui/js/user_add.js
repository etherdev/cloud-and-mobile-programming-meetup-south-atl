(function(){
  let users = [];
  $('.user-email').each(function() {
    users.push($(this).text());
  });
})();

// add user
(function() {
    $('.add-user-form').validate({
        submitHandler: function(form) {

          let business = {
            id: $(form).attr('data-id'),
            portal: $(form).attr('data-portal')
          };

          addSpinner();
          form = $(form).serialize();
          let post_form = $.post('/' + business.portal + '/' + business.id + '/users', form);

          post_form.done(function(response) {
              successMessage('User Added!');
              setTimeout(function() {
                   location.reload();
              }, 1500);
          });

          post_form.fail(function(e) {
            console.log(e);
            e.responseText = e.responseText.replace(/['"]+/g, '');
            failureMessage(e.responseText);
          });
        },
        rules: {
          'first-name': {
              required: true,
              minlength: 3
          },
          'last-name': {
              required: true,
              minlength: 3
          },
          'phone-number': {
              minlength: 14,
              maxlength: 14,
              phoneUS: true
          },
          'email': {
            email_dup: true
          }
        },
        messages: {
          'first-name': 'Please enter at least 3 three letters',
          'last-name': 'Please enter at least 3 three letters',
          //'email': 'Please enter a valid email address',
          'phone-number': 'Please enter a valid phone number'
        }
    });
})();