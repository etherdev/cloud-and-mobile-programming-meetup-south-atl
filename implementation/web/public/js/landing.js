(function() {
    $('#confirmBank').click(function(e) {
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
})();
(function(){
  $('.login-form').validate();
})();
(function() {
	$('.change-password-form').validate({
		submitHandler: function(form) {
			form = $(form).serialize();
			addSpinner();

			var post_form = $.post('/change-password/', form);

			post_form.done(function() {
				successMessage('Password Changed');
				setTimeout(function() {
					window.location = '/';
				}, 1500);
			});

			post_form.fail(function() {
				failureMessage('Failed to Change Password');
			});
		},
		rules: {
			'new-password': {
				minlength: 1,
				required: true,
			},
			'confirm-new-password': {
				required: true,
				equalTo: '#newPassword'
			}
		},
		messages: {
			'confirm-new-password': "New password does not match"
		}
	});
})();

(function() {
	$('.password-form-submit').click(function() {
		$('.password-form').validate({
			submitHandler: function(form) {
				form.submit();
			},
			rules: {
				'password': {
					minlength: 1,
					required: true,
				},
				'confirm-password': {
					required: true,
					equalTo: '#password'
				}
			},
			messages: {
				'confirm-password': "New password does not match"
			}
		});
	})
})();
// (function() {

//   var slideout = new Slideout({
//       'panel': document.getElementById('panel'),
//       'menu': document.getElementById('menu'),
//       'padding': 256,
//       'tolerance': 70
//   });

//   if ($('.slideout-panel')) {
//     if(Modernizr.touch === false) {
//       // it's a desktop
//       slideout.open();

//       document.querySelector('.toggle-button').addEventListener('click', function() {
//           slideout.toggle();

//           if (slideout.isOpen()) {
//           $('.site-panel').addClass('body-open');
//           $('.site-panel').removeClass('body-close');
//         } else {
//           $('.site-panel').removeClass('body-open');
//           $('.site-panel').addClass('body-close');
//         }
//       });
//     } else {
//       // closes on touch devices
//       slideout.close();

//       document.querySelector('.toggle-button').addEventListener('click', function() {
//           slideout.toggle();

//           if (slideout.isOpen()) {
//           $('.site-panel').addClass('body-open');
//         } else {
//           $('.site-panel').removeClass('body-open');
//         }
//       });
//     }
//   }
  
// })();
(function(){
  jQuery.validator.addMethod("complete_url", function(val, elem) {
      // if no url, don't do anything
      if (val.length == 0) { return true; }

      // if user has not entered http:// https:// or ftp:// assume they mean http://
      if(!/^(https?|ftp):\/\//i.test(val)) {
          val = 'http://'+val; // set both the value
          $(elem).val(val); // also update the form element
      }
      // now check if valid url
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
  });
})();

(function() {
  $('#cphone, .cphone').keyup(function()
    {
       this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'($1) $2-$3');
      //alert ("OK");
    });
})();

(function() {

  $("#smallBusinessCenterSignup").validate({
    rules: {
      'legal-name': {
        required: true,
        minlength: 3,
        maxlength: 50
      },
      'owner-first-name': {
        required: true          
      },
      'owner-last-name': {
        required: true          
      },
      'owner-email': {
        required: true,
        email: true
      },
      'owner-phone': {
        required: true,
        minlength: 14,
        maxlength: 14
      },
      'bank-account-number': {
        minlength: 4
      },
      'account_number_confirmation': {
        equalTo: '#account_number'
      },
      'bank-routing-number': {
          digits: true,
          minlength: 9,
          maxlength: 9
      },
      'ein': {
          digits: true,
          minlength: 9,
          maxlength: 9
      }
    },
    messages: {
      'legal-name': {
        required: 'Please enter your Business',
        minlength: 'Your Business\'s name must consist of at least 3 characters'
      },
      'owner-first-name': {
        required: 'Please enter your First Name'
      },
      'owner-last-name': {
        required: 'Please enter your Last Name'
      },  
      'owner-email': "Please enter a valid Email Address",
      'owner-phone': 'Please enter a valid phone number',
      'account_number_confirmation': 'Account number does not match',
      'bank-routing-number': 'Please enter a valid routing number',
      'ein': 'Please enter 9 digits'
    }
  });

})();

(function(){
  $('.password-form').validate({
    rules: {
      'confirm-password': {
        equalTo: '#password'
      }
    },
    messages: {
      'confirm-password': 'Passwords do not match'
    }
  });
})();