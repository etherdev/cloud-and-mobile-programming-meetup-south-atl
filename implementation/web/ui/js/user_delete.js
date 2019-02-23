// delete user
(function(){

  $('body').on('click', '.delete-user', function() {
    var user = $(this).closest('.user');
    var user_details = {
      business_id: $('.add-user-form').attr('data-id'),
      id: $(this).attr('value'),
      name: user.find('.user-name').text(),
      portal: $('.add-user-form').attr('data-portal')
    };

    var delete_user_text =  '<div class="user">' +
                              '<div class="delete-user-text">' +
                                '<p>Delete ' + user_details.name + '?</p>' +
                                '<div class="user-icons">' +
                                  '<button class="confirm-delete-user" value="' + user_details.id +'">' +
                                    '<i class="icon icon-check"></i>' +
                                  '</button>' +
                                  '<button class="cancel-delete-user">' +
                                    '<i class="icon icon-remove"></i>' +
                                  '</button>' +
                                '</div>' +
                              '</div>' +
                            '</div>';

    user.replaceWith(function() {
      return $(delete_user_text).hide().fadeIn(1000, function(){});
    });

    $('.confirm-delete-user').click(function() {
      var temp_user = $(this).closest('.user');
      var post_form = $.post('/' + user_details.portal + '/' + user_details.business_id + '/user-delete/' + user_details.id);

      addSpinner();

      post_form.done(function() {
        successMessage('User Deleted');
        $(temp_user).fadeOut('slow', function() {
          $(this).remove();
        });
        setTimeout(function() {
          location.reload();
        }, 1500);
      });
    });

    $('.cancel-delete-user').click(function() {
      var temp_user = $(this).closest('.user');

      temp_user.replaceWith(function() {
        return $('<div class="user">' + user.html() + '<div>')
                 .hide()
                 .fadeIn(1000, function() {});
      });
    });

  });
})();