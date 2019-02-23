(function(){
  if ($('.setup-logo').length <= 0 && $('.change-password-form').length <= 0 && $('.account-tos').length <= 0 && $('.mrm-accounts').length <= 0) {
    const slideout = new Slideout({
       'panel': document.getElementById('panel_main'),
       'menu': document.getElementById('mobile_nav'),
       'side': 'right',
       'padding': 256,
       'tolerance': 70,
       'touch': false
    });

    document.querySelector('.toggle-button').addEventListener('click', function() {
      slideout.toggle();
    });
  }
})();

(function(){
  $('.mobile-nav-dropdown-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).next('.mobile-nav-dropdown').toggle();
    $(this).find('i').toggleClass('fa-angle-up');
  });

  $('.header-mobile-subnav-toggle').on('click', function(e) {
    e.preventDefault();
    $('.header-mobile-subnav').toggle();
  });
})();
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
(function() {
    $('body').on('click', '#confirmBank', function(e) {
        e.preventDefault();
        $('#result').empty();

        function doLookup(rn) {
            //$("#result").empty().text("Looking up " + rn + "...");
            $.ajax({
                url: "https://routingnumbers.herokuapp.com/api/name.json?rn=" + rn,
                dataType: 'jsonp',
                success: onLookupSuccess
            });
        }

        function onLookupSuccess(data) {
            var bankResponse = $('#result');

            //bankResponse.text('Bank Name: ' + data.name);
            if (data.message !== 'OK') {
                $('#result').append('Please enter a valid routing number');
            } else {
                $("#result").append('Bank Name: ' + data.name);
            }
        }

        doLookup($('input[name="bank-routing-number"]').val());
    });

    // $('#confirmBank').click(function(e) {
    //     e.preventDefault();
    //     $('#result').empty();

    //     function doLookup(rn) {
    //         //$("#result").empty().text("Looking up " + rn + "...");
    //         $.ajax({
    //             url: "https://routingnumbers.herokuapp.com/api/name.json?rn=" + rn,
    //             dataType: 'jsonp',
    //             success: onLookupSuccess
    //         });
    //     }

    //     function onLookupSuccess(data) {
    //         var bankResponse = $('#result');

    //         //bankResponse.text('Bank Name: ' + data.name);
    //         if (data.message !== 'OK') {
    //             $('#result').append('Please enter a valid routing number');
    //         } else {
    //             $("#result").append('Bank Name: ' + data.name);
    //         }
    //     }

    //     doLookup($('input[name="bank-routing-number"]').val());
    // });
})();
// error
$.fn.dataTable.ext.errMode = 'throw';
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
(function(){
    $('.select-hidden').each(function() {
        var value = $(this).val();
        var selectEl = $(this).siblings('select');
        selectEl.children('option[value="' + value + '"]').prop('selected', true);
    });
})();

(function(){
    $('.radio-hidden').each(function() {
        var value = $(this).val();
        var input = $(this).siblings('.radio-group-wrapper');
        input.children('.radio-group').each(function() {
            if ($(this).children('input').val() == value) {
                $(this).children('input').prop('checked', true);
            }
        });
    });
})();

(function() {
    $('body').on('keyup', '#cphone, .cphone', function()  {
        this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'($1) $2-$3');
    });

    // $('#cphone, .cphone').keyup(function() {
    //      this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'($1) $2-$3');
    // });

    $('body').on('keyup', '#ssn, .ssn', function() {
        this.value = this.value.replace(/(\d{3})\-?(\d{2})\-?(\d{4})/,'$1-$2-$3');
    });
})();

(function(){
    $('input[type="text"], select').change(function() {
        $(this).valid();
    });
})();
function notifyMessage(status, message) {
    $('<div class="system-message ' + status  + '"><h1>' + message + '</h1></div>')
        .insertAfter('header')
        .hide()
        .fadeIn(800)
        .fadeOut(3000);
};

function setupNotifyMessage(status, message) {
    $('<div class="setup-system-message ' + status  + '"><h1>' + message + '</h1></div>')
        .insertAfter('.setup-help')
        .hide()
        .fadeIn(800)
        .fadeOut(3000);
};

function setupMessage(status, message) {
    $('<div class="setup-system-message ' + status  + '"><h1>' + message + '</h1></div>')
        .insertBefore('.setup-help')
        .hide()
        .fadeIn(800)
        .fadeOut(3000);
};

function addSpinner() {
    $('body').prepend('\
        <div class="loading-spinner">\
            <div class="wrapper">\
                <div class="spinner"></div>\
                <h2>Saving</h2>\
            </div>\
        </div>');
};

function addSpinnerMessage(message) {
    $('body').prepend('\
        <div class="loading-spinner">\
            <div class="wrapper">\
                <div class="spinner"></div>\
                <h2>' + message + '</h2>\
            </div>\
        </div>');
};

function successMessage(message) {
    $('.spinner').remove();
    $('.loading-spinner h2').text(message);
    $('.loading-spinner h2').before('<span class="icon icon-check" style="font-size: 40px; color: green !important;"></span>');
};

// function successMessage(message) {
//     $('.spinner').remove();
//     $('.loading-spinner h2').text(message);
//     $('.loading-spinner h2').before('<span class="icon icon-check" style="font-size: 40px; color: green !important;"></span>');
//     setTimeout(function() {
//         $('.loading-spinner').remove();
//     }, 1500);
// };

function failureMessage(message) {
    $('.spinner').remove();
    $('.loading-spinner h2').text(message);
    $('.loading-spinner h2').before('<span class="icon icon-remove" style="font-size: 40px; color: red !important;"></span>');
    setTimeout(function() {
        $('.loading-spinner').remove();
    }, 1500);
};
(function(){
  $('body').on('click', '.report-title-text', function(e) {
    e.preventDefault();
  });

  $('.report-dropdown-trigger').hover(
    // hover in
    function() {
      $('.report-dropdown').addClass('report-dropdown-visible');
    },
    // hover out
    function() {
      $('.report-dropdown').removeClass('report-dropdown-visible');
    }
  );
})();
// highlights the current page in subnav
(function(){
    const current_page = $('.page-panel-main').attr('data-page'),
          sub_page = $('.page-panel-main').attr('data-subpage');

    $('.subnav a[data-page=' + current_page + ']').addClass('subnav-active');
    $('.subnav-dropdown a[data-subpage="' + sub_page + '"]').addClass('subpage-active');
    $('.report-dropdown a[data-subpage="' + sub_page + '"]').addClass('subpage-active');
})();
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
$.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/(((\(\d{3}\) ?)|(\d{3}-)|(\d{3}\.))?\d{3}(-|\.)\d{4})/g);
}, "Please enter a valid phone number");

$.validator.addMethod("complete_url", function(val, elem) {
  // if no url, don't do anything
  if (val.length == 0) { return true; }

  // if user has not entered http:// https:// or ftp:// assume they mean http://
  if(!/^(https?|ftp):\/\//i.test(val)) {
      val = 'http://'+val; // set both the value
      $(elem).val(val); // also update the form element
  }

  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
});

$.validator.addMethod("currency", function (value, element) {
  return this.optional(element) || /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(value);
}, "Please specify a valid amount (i.e. $1.99)");

$.validator.addMethod("email_dup", function (value, element) {
  let email_addresses = [];
  $('.user-email').each(function() {
    email_addresses.push($(this).text());
  });

  if (email_addresses.indexOf(value) >= 0) {
    return false;
  } else {
    return true;
  }
}, 'Email address already used.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9oZWFkZXIuanMiLCJhZGRfcGFuZWwuanMiLCJhc3Npc3RhbnQuanMiLCJiYW5rX2xvb2t1cC5qcyIsImRhdGF0YWJsZXNfZ2VuZXJhbC5qcyIsImVkaXRfcGFnZS5qcyIsImlucHV0X2Zvcm1hdC5qcyIsIm5vdGlmaWNhdGlvbnMuanMiLCJyZXBvcnRfZHJvcGRvd24uanMiLCJzdWJuYXYuanMiLCJ1c2VyX2FkZC5qcyIsInVzZXJfZGVsZXRlLmpzIiwidmFsaWRhdG9yX2N1c3RvbV9tZXRob2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgaWYgKCQoJy5zZXR1cC1sb2dvJykubGVuZ3RoIDw9IDAgJiYgJCgnLmNoYW5nZS1wYXNzd29yZC1mb3JtJykubGVuZ3RoIDw9IDAgJiYgJCgnLmFjY291bnQtdG9zJykubGVuZ3RoIDw9IDAgJiYgJCgnLm1ybS1hY2NvdW50cycpLmxlbmd0aCA8PSAwKSB7XG4gICAgY29uc3Qgc2xpZGVvdXQgPSBuZXcgU2xpZGVvdXQoe1xuICAgICAgICdwYW5lbCc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lbF9tYWluJyksXG4gICAgICAgJ21lbnUnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9iaWxlX25hdicpLFxuICAgICAgICdzaWRlJzogJ3JpZ2h0JyxcbiAgICAgICAncGFkZGluZyc6IDI1NixcbiAgICAgICAndG9sZXJhbmNlJzogNzAsXG4gICAgICAgJ3RvdWNoJzogZmFsc2VcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHNsaWRlb3V0LnRvZ2dsZSgpO1xuICAgIH0pO1xuICB9XG59KSgpO1xuXG4oZnVuY3Rpb24oKXtcbiAgJCgnLm1vYmlsZS1uYXYtZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpLm5leHQoJy5tb2JpbGUtbmF2LWRyb3Bkb3duJykudG9nZ2xlKCk7XG4gICAgJCh0aGlzKS5maW5kKCdpJykudG9nZ2xlQ2xhc3MoJ2ZhLWFuZ2xlLXVwJyk7XG4gIH0pO1xuXG4gICQoJy5oZWFkZXItbW9iaWxlLXN1Ym5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5oZWFkZXItbW9iaWxlLXN1Ym5hdicpLnRvZ2dsZSgpO1xuICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICQoJy5hZGQtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGUtb3BlbicpKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCd0b2dnbGUtb3BlbicpO1xuICAgICAgJCgnLmFkZC10b2dnbGUtZm9ybScpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygndG9nZ2xlLW9wZW4nKTtcbiAgICAgICQoJy5hZGQtdG9nZ2xlLWZvcm0nKS5zaG93KCk7XG4gICAgfVxuICAgIC8vICQoJy5hZGQtdG9nZ2xlLWZvcm0nKS50b2dnbGUoKTtcbiAgICAvLyAkKHRoaXMpLnRvZ2dsZUNsYXNzKCd0b2dnbGUtb3BlbicpO1xuICB9KTtcblxuICAkKCcuYWRkLXBhbmVsIC5hZGQtYnV0dG9uLWNhbmNlbCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmFkZC10b2dnbGUtZm9ybScpLmhpZGUoKTtcbiAgICAkKCcuYWRkLXRvZ2dsZScpLnJlbW92ZUNsYXNzKCd0b2dnbGUtb3BlbicpO1xuICAgICQoJy5hZGQtdG9nZ2xlLWZvcm0gaW5wdXRbdHlwZT1cInRleHRcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH0pO1xuICAgICQoJy5hZGQtdG9nZ2xlLWZvcm0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5hZGQtdG9nZ2xlLWZvcm0gc2VsZWN0JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICB9KTtcbiAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXG4gICQoJy5hY2NlcHQtdG9zLWFuZC1wcml2YWN5JykudmFsaWRhdGUoe1xuICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgIGFkZFNwaW5uZXJNZXNzYWdlKCdMb2FkaW5nJyk7XG4gICAgICBmb3JtID0gJChmb3JtKS5zZXJpYWxpemUoKTtcblxuICAgICAgbGV0IHBvc3RfZm9ybSA9ICQucG9zdCgnL2FjY2VwdC10b3MtYW5kLXByaXZhY3kvJywgZm9ybSk7XG5cbiAgICAgIHBvc3RfZm9ybS5kb25lKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XG4gICAgICB9KTtcblxuICAgICAgcG9zdF9mb3JtLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgcmV0cnknKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJyNjb25maXJtQmFuaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjcmVzdWx0JykuZW1wdHkoKTtcblxuICAgICAgICBmdW5jdGlvbiBkb0xvb2t1cChybikge1xuICAgICAgICAgICAgLy8kKFwiI3Jlc3VsdFwiKS5lbXB0eSgpLnRleHQoXCJMb29raW5nIHVwIFwiICsgcm4gKyBcIi4uLlwiKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vcm91dGluZ251bWJlcnMuaGVyb2t1YXBwLmNvbS9hcGkvbmFtZS5qc29uP3JuPVwiICsgcm4sXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICAgICAgc3VjY2Vzczogb25Mb29rdXBTdWNjZXNzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uTG9va3VwU3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICB2YXIgYmFua1Jlc3BvbnNlID0gJCgnI3Jlc3VsdCcpO1xuXG4gICAgICAgICAgICAvL2JhbmtSZXNwb25zZS50ZXh0KCdCYW5rIE5hbWU6ICcgKyBkYXRhLm5hbWUpO1xuICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSAhPT0gJ09LJykge1xuICAgICAgICAgICAgICAgICQoJyNyZXN1bHQnKS5hcHBlbmQoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHJvdXRpbmcgbnVtYmVyJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoXCIjcmVzdWx0XCIpLmFwcGVuZCgnQmFuayBOYW1lOiAnICsgZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTG9va3VwKCQoJ2lucHV0W25hbWU9XCJiYW5rLXJvdXRpbmctbnVtYmVyXCJdJykudmFsKCkpO1xuICAgIH0pO1xuXG4gICAgLy8gJCgnI2NvbmZpcm1CYW5rJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICAgICQoJyNyZXN1bHQnKS5lbXB0eSgpO1xuXG4gICAgLy8gICAgIGZ1bmN0aW9uIGRvTG9va3VwKHJuKSB7XG4gICAgLy8gICAgICAgICAvLyQoXCIjcmVzdWx0XCIpLmVtcHR5KCkudGV4dChcIkxvb2tpbmcgdXAgXCIgKyBybiArIFwiLi4uXCIpO1xuICAgIC8vICAgICAgICAgJC5hamF4KHtcbiAgICAvLyAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9yb3V0aW5nbnVtYmVycy5oZXJva3VhcHAuY29tL2FwaS9uYW1lLmpzb24/cm49XCIgKyBybixcbiAgICAvLyAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzOiBvbkxvb2t1cFN1Y2Nlc3NcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgZnVuY3Rpb24gb25Mb29rdXBTdWNjZXNzKGRhdGEpIHtcbiAgICAvLyAgICAgICAgIHZhciBiYW5rUmVzcG9uc2UgPSAkKCcjcmVzdWx0Jyk7XG5cbiAgICAvLyAgICAgICAgIC8vYmFua1Jlc3BvbnNlLnRleHQoJ0JhbmsgTmFtZTogJyArIGRhdGEubmFtZSk7XG4gICAgLy8gICAgICAgICBpZiAoZGF0YS5tZXNzYWdlICE9PSAnT0snKSB7XG4gICAgLy8gICAgICAgICAgICAgJCgnI3Jlc3VsdCcpLmFwcGVuZCgnUGxlYXNlIGVudGVyIGEgdmFsaWQgcm91dGluZyBudW1iZXInKTtcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgJChcIiNyZXN1bHRcIikuYXBwZW5kKCdCYW5rIE5hbWU6ICcgKyBkYXRhLm5hbWUpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgZG9Mb29rdXAoJCgnaW5wdXRbbmFtZT1cImJhbmstcm91dGluZy1udW1iZXJcIl0nKS52YWwoKSk7XG4gICAgLy8gfSk7XG59KSgpOyIsIi8vIGVycm9yXG4kLmZuLmRhdGFUYWJsZS5leHQuZXJyTW9kZSA9ICd0aHJvdyc7IiwiLy8gcHJldmVudHMgc3RhZmYgZnJvbSBlZGl0aW5nIGZvcm1cbihmdW5jdGlvbigpe1xuICBpZiAoJCgnLmVkaXQtcGFnZScpLmxlbmd0aCkge1xuXG4gICAgdmFyIGlzX2FkbWluID0gJCgnLmlzLWFkbWluJykudmFsKCk7XG5cbiAgICBpZiAoaXNfYWRtaW4gPT0gZmFsc2UgfHwgaXNfYWRtaW4gPT0gJ2ZhbHNlJykge1xuICAgICAgJCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9IFxuICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoJy5zZWxlY3QtaGlkZGVuJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFyIHNlbGVjdEVsID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Jyk7XG4gICAgICAgIHNlbGVjdEVsLmNoaWxkcmVuKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9KTtcbn0pKCk7XG5cbihmdW5jdGlvbigpe1xuICAgICQoJy5yYWRpby1oaWRkZW4nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLnNpYmxpbmdzKCcucmFkaW8tZ3JvdXAtd3JhcHBlcicpO1xuICAgICAgICBpbnB1dC5jaGlsZHJlbignLnJhZGlvLWdyb3VwJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCdpbnB1dCcpLnZhbCgpID09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgICQoJ2JvZHknKS5vbigna2V5dXAnLCAnI2NwaG9uZSwgLmNwaG9uZScsIGZ1bmN0aW9uKCkgIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUucmVwbGFjZSgvKFxcZHszfSlcXC0/KFxcZHszfSlcXC0/KFxcZHs0fSkvLCcoJDEpICQyLSQzJyk7XG4gICAgfSk7XG5cbiAgICAvLyAkKCcjY3Bob25lLCAuY3Bob25lJykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5yZXBsYWNlKC8oXFxkezN9KVxcLT8oXFxkezN9KVxcLT8oXFxkezR9KS8sJygkMSkgJDItJDMnKTtcbiAgICAvLyB9KTtcblxuICAgICQoJ2JvZHknKS5vbigna2V5dXAnLCAnI3NzbiwgLnNzbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5yZXBsYWNlKC8oXFxkezN9KVxcLT8oXFxkezJ9KVxcLT8oXFxkezR9KS8sJyQxLSQyLSQzJyk7XG4gICAgfSk7XG59KSgpO1xuXG4oZnVuY3Rpb24oKXtcbiAgICAkKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnZhbGlkKCk7XG4gICAgfSk7XG59KSgpOyIsImZ1bmN0aW9uIG5vdGlmeU1lc3NhZ2Uoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgJCgnPGRpdiBjbGFzcz1cInN5c3RlbS1tZXNzYWdlICcgKyBzdGF0dXMgICsgJ1wiPjxoMT4nICsgbWVzc2FnZSArICc8L2gxPjwvZGl2PicpXG4gICAgICAgIC5pbnNlcnRBZnRlcignaGVhZGVyJylcbiAgICAgICAgLmhpZGUoKVxuICAgICAgICAuZmFkZUluKDgwMClcbiAgICAgICAgLmZhZGVPdXQoMzAwMCk7XG59O1xuXG5mdW5jdGlvbiBzZXR1cE5vdGlmeU1lc3NhZ2Uoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgJCgnPGRpdiBjbGFzcz1cInNldHVwLXN5c3RlbS1tZXNzYWdlICcgKyBzdGF0dXMgICsgJ1wiPjxoMT4nICsgbWVzc2FnZSArICc8L2gxPjwvZGl2PicpXG4gICAgICAgIC5pbnNlcnRBZnRlcignLnNldHVwLWhlbHAnKVxuICAgICAgICAuaGlkZSgpXG4gICAgICAgIC5mYWRlSW4oODAwKVxuICAgICAgICAuZmFkZU91dCgzMDAwKTtcbn07XG5cbmZ1bmN0aW9uIHNldHVwTWVzc2FnZShzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAkKCc8ZGl2IGNsYXNzPVwic2V0dXAtc3lzdGVtLW1lc3NhZ2UgJyArIHN0YXR1cyAgKyAnXCI+PGgxPicgKyBtZXNzYWdlICsgJzwvaDE+PC9kaXY+JylcbiAgICAgICAgLmluc2VydEJlZm9yZSgnLnNldHVwLWhlbHAnKVxuICAgICAgICAuaGlkZSgpXG4gICAgICAgIC5mYWRlSW4oODAwKVxuICAgICAgICAuZmFkZU91dCgzMDAwKTtcbn07XG5cbmZ1bmN0aW9uIGFkZFNwaW5uZXIoKSB7XG4gICAgJCgnYm9keScpLnByZXBlbmQoJ1xcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj5cXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+XFxcbiAgICAgICAgICAgICAgICA8aDI+U2F2aW5nPC9oMj5cXFxuICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgPC9kaXY+Jyk7XG59O1xuXG5mdW5jdGlvbiBhZGRTcGlubmVyTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgJCgnYm9keScpLnByZXBlbmQoJ1xcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj5cXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+XFxcbiAgICAgICAgICAgICAgICA8aDI+JyArIG1lc3NhZ2UgKyAnPC9oMj5cXFxuICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgPC9kaXY+Jyk7XG59O1xuXG5mdW5jdGlvbiBzdWNjZXNzTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgJCgnLnNwaW5uZXInKS5yZW1vdmUoKTtcbiAgICAkKCcubG9hZGluZy1zcGlubmVyIGgyJykudGV4dChtZXNzYWdlKTtcbiAgICAkKCcubG9hZGluZy1zcGlubmVyIGgyJykuYmVmb3JlKCc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1jaGVja1wiIHN0eWxlPVwiZm9udC1zaXplOiA0MHB4OyBjb2xvcjogZ3JlZW4gIWltcG9ydGFudDtcIj48L3NwYW4+Jyk7XG59O1xuXG4vLyBmdW5jdGlvbiBzdWNjZXNzTWVzc2FnZShtZXNzYWdlKSB7XG4vLyAgICAgJCgnLnNwaW5uZXInKS5yZW1vdmUoKTtcbi8vICAgICAkKCcubG9hZGluZy1zcGlubmVyIGgyJykudGV4dChtZXNzYWdlKTtcbi8vICAgICAkKCcubG9hZGluZy1zcGlubmVyIGgyJykuYmVmb3JlKCc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1jaGVja1wiIHN0eWxlPVwiZm9udC1zaXplOiA0MHB4OyBjb2xvcjogZ3JlZW4gIWltcG9ydGFudDtcIj48L3NwYW4+Jyk7XG4vLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbi8vICAgICAgICAgJCgnLmxvYWRpbmctc3Bpbm5lcicpLnJlbW92ZSgpO1xuLy8gICAgIH0sIDE1MDApO1xuLy8gfTtcblxuZnVuY3Rpb24gZmFpbHVyZU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICQoJy5zcGlubmVyJykucmVtb3ZlKCk7XG4gICAgJCgnLmxvYWRpbmctc3Bpbm5lciBoMicpLnRleHQobWVzc2FnZSk7XG4gICAgJCgnLmxvYWRpbmctc3Bpbm5lciBoMicpLmJlZm9yZSgnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tcmVtb3ZlXCIgc3R5bGU9XCJmb250LXNpemU6IDQwcHg7IGNvbG9yOiByZWQgIWltcG9ydGFudDtcIj48L3NwYW4+Jyk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmxvYWRpbmctc3Bpbm5lcicpLnJlbW92ZSgpO1xuICAgIH0sIDE1MDApO1xufTsiLCIoZnVuY3Rpb24oKXtcbiAgJCgnYm9keScpLm9uKCdjbGljaycsICcucmVwb3J0LXRpdGxlLXRleHQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICAkKCcucmVwb3J0LWRyb3Bkb3duLXRyaWdnZXInKS5ob3ZlcihcbiAgICAvLyBob3ZlciBpblxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgJCgnLnJlcG9ydC1kcm9wZG93bicpLmFkZENsYXNzKCdyZXBvcnQtZHJvcGRvd24tdmlzaWJsZScpO1xuICAgIH0sXG4gICAgLy8gaG92ZXIgb3V0XG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAkKCcucmVwb3J0LWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ3JlcG9ydC1kcm9wZG93bi12aXNpYmxlJyk7XG4gICAgfVxuICApO1xufSkoKTsiLCIvLyBoaWdobGlnaHRzIHRoZSBjdXJyZW50IHBhZ2UgaW4gc3VibmF2XG4oZnVuY3Rpb24oKXtcbiAgICBjb25zdCBjdXJyZW50X3BhZ2UgPSAkKCcucGFnZS1wYW5lbC1tYWluJykuYXR0cignZGF0YS1wYWdlJyksXG4gICAgICAgICAgc3ViX3BhZ2UgPSAkKCcucGFnZS1wYW5lbC1tYWluJykuYXR0cignZGF0YS1zdWJwYWdlJyk7XG5cbiAgICAkKCcuc3VibmF2IGFbZGF0YS1wYWdlPScgKyBjdXJyZW50X3BhZ2UgKyAnXScpLmFkZENsYXNzKCdzdWJuYXYtYWN0aXZlJyk7XG4gICAgJCgnLnN1Ym5hdi1kcm9wZG93biBhW2RhdGEtc3VicGFnZT1cIicgKyBzdWJfcGFnZSArICdcIl0nKS5hZGRDbGFzcygnc3VicGFnZS1hY3RpdmUnKTtcbiAgICAkKCcucmVwb3J0LWRyb3Bkb3duIGFbZGF0YS1zdWJwYWdlPVwiJyArIHN1Yl9wYWdlICsgJ1wiXScpLmFkZENsYXNzKCdzdWJwYWdlLWFjdGl2ZScpO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgbGV0IHVzZXJzID0gW107XG4gICQoJy51c2VyLWVtYWlsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB1c2Vycy5wdXNoKCQodGhpcykudGV4dCgpKTtcbiAgfSk7XG59KSgpO1xuXG4vLyBhZGQgdXNlclxuKGZ1bmN0aW9uKCkge1xuICAgICQoJy5hZGQtdXNlci1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XG5cbiAgICAgICAgICBsZXQgYnVzaW5lc3MgPSB7XG4gICAgICAgICAgICBpZDogJChmb3JtKS5hdHRyKCdkYXRhLWlkJyksXG4gICAgICAgICAgICBwb3J0YWw6ICQoZm9ybSkuYXR0cignZGF0YS1wb3J0YWwnKVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBhZGRTcGlubmVyKCk7XG4gICAgICAgICAgZm9ybSA9ICQoZm9ybSkuc2VyaWFsaXplKCk7XG4gICAgICAgICAgbGV0IHBvc3RfZm9ybSA9ICQucG9zdCgnLycgKyBidXNpbmVzcy5wb3J0YWwgKyAnLycgKyBidXNpbmVzcy5pZCArICcvdXNlcnMnLCBmb3JtKTtcblxuICAgICAgICAgIHBvc3RfZm9ybS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlKCdVc2VyIEFkZGVkIScpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBvc3RfZm9ybS5mYWlsKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgZS5yZXNwb25zZVRleHQgPSBlLnJlc3BvbnNlVGV4dC5yZXBsYWNlKC9bJ1wiXSsvZywgJycpO1xuICAgICAgICAgICAgZmFpbHVyZU1lc3NhZ2UoZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICdmaXJzdC1uYW1lJzoge1xuICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWlubGVuZ3RoOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnbGFzdC1uYW1lJzoge1xuICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWlubGVuZ3RoOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICAncGhvbmUtbnVtYmVyJzoge1xuICAgICAgICAgICAgICBtaW5sZW5ndGg6IDE0LFxuICAgICAgICAgICAgICBtYXhsZW5ndGg6IDE0LFxuICAgICAgICAgICAgICBwaG9uZVVTOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZW1haWwnOiB7XG4gICAgICAgICAgICBlbWFpbF9kdXA6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgJ2ZpcnN0LW5hbWUnOiAnUGxlYXNlIGVudGVyIGF0IGxlYXN0IDMgdGhyZWUgbGV0dGVycycsXG4gICAgICAgICAgJ2xhc3QtbmFtZSc6ICdQbGVhc2UgZW50ZXIgYXQgbGVhc3QgMyB0aHJlZSBsZXR0ZXJzJyxcbiAgICAgICAgICAvLydlbWFpbCc6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyxcbiAgICAgICAgICAncGhvbmUtbnVtYmVyJzogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHBob25lIG51bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xufSkoKTsiLCIvLyBkZWxldGUgdXNlclxuKGZ1bmN0aW9uKCl7XG5cbiAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZGVsZXRlLXVzZXInLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXNlciA9ICQodGhpcykuY2xvc2VzdCgnLnVzZXInKTtcbiAgICB2YXIgdXNlcl9kZXRhaWxzID0ge1xuICAgICAgYnVzaW5lc3NfaWQ6ICQoJy5hZGQtdXNlci1mb3JtJykuYXR0cignZGF0YS1pZCcpLFxuICAgICAgaWQ6ICQodGhpcykuYXR0cigndmFsdWUnKSxcbiAgICAgIG5hbWU6IHVzZXIuZmluZCgnLnVzZXItbmFtZScpLnRleHQoKSxcbiAgICAgIHBvcnRhbDogJCgnLmFkZC11c2VyLWZvcm0nKS5hdHRyKCdkYXRhLXBvcnRhbCcpXG4gICAgfTtcblxuICAgIHZhciBkZWxldGVfdXNlcl90ZXh0ID0gICc8ZGl2IGNsYXNzPVwidXNlclwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkZWxldGUtdXNlci10ZXh0XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8cD5EZWxldGUgJyArIHVzZXJfZGV0YWlscy5uYW1lICsgJz88L3A+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidXNlci1pY29uc1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiY29uZmlybS1kZWxldGUtdXNlclwiIHZhbHVlPVwiJyArIHVzZXJfZGV0YWlscy5pZCArJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiaWNvbiBpY29uLWNoZWNrXCI+PC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImNhbmNlbC1kZWxldGUtdXNlclwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiaWNvbiBpY29uLXJlbW92ZVwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgIHVzZXIucmVwbGFjZVdpdGgoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJChkZWxldGVfdXNlcl90ZXh0KS5oaWRlKCkuZmFkZUluKDEwMDAsIGZ1bmN0aW9uKCl7fSk7XG4gICAgfSk7XG5cbiAgICAkKCcuY29uZmlybS1kZWxldGUtdXNlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRlbXBfdXNlciA9ICQodGhpcykuY2xvc2VzdCgnLnVzZXInKTtcbiAgICAgIHZhciBwb3N0X2Zvcm0gPSAkLnBvc3QoJy8nICsgdXNlcl9kZXRhaWxzLnBvcnRhbCArICcvJyArIHVzZXJfZGV0YWlscy5idXNpbmVzc19pZCArICcvdXNlci1kZWxldGUvJyArIHVzZXJfZGV0YWlscy5pZCk7XG5cbiAgICAgIGFkZFNwaW5uZXIoKTtcblxuICAgICAgcG9zdF9mb3JtLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlKCdVc2VyIERlbGV0ZWQnKTtcbiAgICAgICAgJCh0ZW1wX3VzZXIpLmZhZGVPdXQoJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy5jYW5jZWwtZGVsZXRlLXVzZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ZW1wX3VzZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy51c2VyJyk7XG5cbiAgICAgIHRlbXBfdXNlci5yZXBsYWNlV2l0aChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICQoJzxkaXYgY2xhc3M9XCJ1c2VyXCI+JyArIHVzZXIuaHRtbCgpICsgJzxkaXY+JylcbiAgICAgICAgICAgICAgICAgLmhpZGUoKVxuICAgICAgICAgICAgICAgICAuZmFkZUluKDEwMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59KSgpOyIsIiQudmFsaWRhdG9yLmFkZE1ldGhvZChcInBob25lVVNcIiwgZnVuY3Rpb24ocGhvbmVfbnVtYmVyLCBlbGVtZW50KSB7XG4gICAgcGhvbmVfbnVtYmVyID0gcGhvbmVfbnVtYmVyLnJlcGxhY2UoL1xccysvZywgXCJcIik7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgcGhvbmVfbnVtYmVyLmxlbmd0aCA+IDkgJiZcbiAgICAgICAgcGhvbmVfbnVtYmVyLm1hdGNoKC8oKChcXChcXGR7M31cXCkgPyl8KFxcZHszfS0pfChcXGR7M31cXC4pKT9cXGR7M30oLXxcXC4pXFxkezR9KS9nKTtcbn0sIFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgcGhvbmUgbnVtYmVyXCIpO1xuXG4kLnZhbGlkYXRvci5hZGRNZXRob2QoXCJjb21wbGV0ZV91cmxcIiwgZnVuY3Rpb24odmFsLCBlbGVtKSB7XG4gIC8vIGlmIG5vIHVybCwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgaWYgKHZhbC5sZW5ndGggPT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIC8vIGlmIHVzZXIgaGFzIG5vdCBlbnRlcmVkIGh0dHA6Ly8gaHR0cHM6Ly8gb3IgZnRwOi8vIGFzc3VtZSB0aGV5IG1lYW4gaHR0cDovL1xuICBpZighL14oaHR0cHM/fGZ0cCk6XFwvXFwvL2kudGVzdCh2YWwpKSB7XG4gICAgICB2YWwgPSAnaHR0cDovLycrdmFsOyAvLyBzZXQgYm90aCB0aGUgdmFsdWVcbiAgICAgICQoZWxlbSkudmFsKHZhbCk7IC8vIGFsc28gdXBkYXRlIHRoZSBmb3JtIGVsZW1lbnRcbiAgfVxuXG4gIHJldHVybiAvXihodHRwcz98ZnRwKTpcXC9cXC8oKCgoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmYW1wOydcXChcXClcXCpcXCssOz1dfDopKkApPygoKFxcZHxbMS05XVxcZHwxXFxkXFxkfDJbMC00XVxcZHwyNVswLTVdKVxcLihcXGR8WzEtOV1cXGR8MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkfFsxLTldXFxkfDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHxbMS05XVxcZHwxXFxkXFxkfDJbMC00XVxcZHwyNVswLTVdKSl8KCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKVxcLikrKChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpXFwuPykoOlxcZCopPykoXFwvKCgoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmYW1wOydcXChcXClcXCpcXCssOz1dfDp8QCkrKFxcLygoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmYW1wOydcXChcXClcXCpcXCssOz1dfDp8QCkqKSopPyk/KFxcPygoKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCglW1xcZGEtZl17Mn0pfFshXFwkJmFtcDsnXFwoXFwpXFwqXFwrLDs9XXw6fEApfFtcXHVFMDAwLVxcdUY4RkZdfFxcL3xcXD8pKik/KFxcIygoKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCglW1xcZGEtZl17Mn0pfFshXFwkJmFtcDsnXFwoXFwpXFwqXFwrLDs9XXw6fEApfFxcL3xcXD8pKik/JC9pLnRlc3QodmFsKTtcbn0pO1xuXG4kLnZhbGlkYXRvci5hZGRNZXRob2QoXCJjdXJyZW5jeVwiLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL15cXCQoXFxkezEsM30oXFwsXFxkezN9KSp8KFxcZCspKShcXC5cXGR7Mn0pPyQvLnRlc3QodmFsdWUpO1xufSwgXCJQbGVhc2Ugc3BlY2lmeSBhIHZhbGlkIGFtb3VudCAoaS5lLiAkMS45OSlcIik7XG5cbiQudmFsaWRhdG9yLmFkZE1ldGhvZChcImVtYWlsX2R1cFwiLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgbGV0IGVtYWlsX2FkZHJlc3NlcyA9IFtdO1xuICAkKCcudXNlci1lbWFpbCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgZW1haWxfYWRkcmVzc2VzLnB1c2goJCh0aGlzKS50ZXh0KCkpO1xuICB9KTtcblxuICBpZiAoZW1haWxfYWRkcmVzc2VzLmluZGV4T2YodmFsdWUpID49IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sICdFbWFpbCBhZGRyZXNzIGFscmVhZHkgdXNlZC4nKTsiXX0=
