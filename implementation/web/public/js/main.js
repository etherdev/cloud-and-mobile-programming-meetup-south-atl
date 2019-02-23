
(function() {
	$('.setup-toggle').hide();

	$('#signupStep1').text('Hide Details');
	
	$('.setup-step-1').toggle(function() {
		$('#about-you-indicator').addClass('current');
	});

	$('#signupStep1').click(function() {
		var button = $('#signupStep1');

		$('.setup-step-1').toggle(function() {
			if ($(this).is(':visible')) {
				button.text('Hide Details');
				$('.progress-indicator').removeClass('current');
				$('#about-you-indicator').addClass('current');
			} else {
				button.text('Show Details');
				$('#about-you-indicator').removeClass('current');
			}
		});


	});

	$('#signupStep2').click(function() {
		var button = $('#signupStep2');

		$('.setup-step-2').toggle(function() {
			if ($(this).is(':visible')) {
				button.text('Hide Details');
				$('.progress-indicator').removeClass('current');
				$('#deposits-indicator').addClass('current');
			} else {
				button.text('Show Details');
			}
		});
	});

	$('#signupStep3').click(function() {
		var button = $('#signupStep3');

		$('.setup-step-3').toggle(function() {
			if ($(this).is(':visible')) {
				button.text('Hide Details');
				$('.progress-indicator').removeClass('current');
				$('#terms-indicator').addClass('current');
			} else {
				button.text('Show Details');
			}
		});

	});

	$('#about-you-indicator').click(function() {
		var button = $('#signupStep1');
	});

	$('#deposits-indicator').click(function() {
		var button = $('#signupStep2');

		if ($('.setup-step-2').is(':visible')) {
			button.text('Show Details')
		} else {
			button.text('Hide Details');
		}
	});

	$('#terms-indicator').click(function() {
		var button = $('#signupStep3');

		if ($('.setup-step-3').is(':visible')) {
			button.text('Show Details')
		} else {
			button.text('Hide Details');
		}
	});

	$('.setup-step-details-button').each(function() {
		$(this).click(function() {
			$('.progress-indicator').removeClass('current');
			$(this).addClass('current');
		})
	});


})();





(function() {
	$('#cphone').keyup(function()
	  {
	     this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'($1) $2-$3');
	    //alert ("OK");
	  });
})();


(function() {
	$('#confirmBank').click(function() {
		doLookup($("#rn").val());

			function doLookup(rn) {
				$("#result").empty().text("Looking up " + rn + "...");
				$.ajax({
					url: "https://routingnumbers.herokuapp.com/api/name.json?rn=" + rn,
					dataType: 'jsonp',
					success: onLookupSuccess
				});
			}

			function onLookupSuccess(data) {
				console.log(data.name);
				var bankResponse = $("<p>").attr("class", "bank-response");

				bankResponse.append($("<p>")
					// shows category
					// .append($("<td>").text(member))
					// shows data
					.append($("<p>").text(data.name))
				);

				$("#result").empty().append(bankResponse);
			}
	})
})();

(function() {

	$('#setupSubmit').click(function() {
		$('.setup-step-1').show();
		$('.setup-step-2').show();
		$('.setup-step-3').show();
		$('#signupStep1, #signupStep2, #signupStep3').text('Hide Details');
		$('#setupForm').validate({
			submitHandler: function(form) {
				$('#setupSubmit').attr('disabled', true);
				form.submit();
			},
			rules: {
				'bank-routing-number': {
					minlength: 9
				},
				account_number_confirmation: {
					equalTo: '#deposit-account-number'
				}
			},
			messages: {
				account_number_confirmation: "Account numbers do not match"
			},
			invalidHandler: function(event, validator) {
			    // 'this' refers to the form
			    var errors = validator.numberOfInvalids();
			    if (errors) {
			      $('.setup-step-1').show();
			      $('.setup-step-2').show();
			      $('.setup-step-3').show();
			      $('#signupStep1, #signupStep2, #signupStep3').text('Hide Details');
			    } else {
			      $("div.error").hide();
			    }
			}
		});
	});

})();

(function() {

	$('.progress-indicator').each(function() {
		$(this).click(function() {
			$('.progress-indicator').removeClass('current');
			$(this).addClass('current');
		})
	});

	$('#about-you-indicator').click(function() {
		$('.setup-step-1').toggle();
	});

	$('#deposits-indicator').click(function() {
		$('.setup-step-2').toggle();
	});

	$('#terms-indicator').click(function() {
		$('.setup-step-3').toggle();
	});

})();

(function() {
	$('#accountSubmit').click(function() {
		$('#accountForm').validate({
			submitHandler: function(form) {
				form.submit();
			},
			rules: {
				'bank-routing-number': {
					digits: true,
					minlength: 9,
					maxlength: 9
				}
			},
			messages: {
				'bank-routing-number': 'Routing number must be 9 digits'
			}
		});
	});
})();
(function() {
	$('#fundSearch').DataTable({
		'language': {
			'zeroRecords': 'No funds available.'
		}
	});
})();
(function() {
	$('.add-fund-form').hide();
	$('.add-fund-button').click(function() {
		$('.add-fund-form').toggle();
	});
})();


(function() {
	$('#addFund').click(function() {
		$('.add-fund-form').validate({
			submitHandler: function(form) {
				form.submit();
			},
			rules: {
			},
			messages: {
			}
		})
	});
})();







(function() {
	$('#changePassword').click(function() {
		$('.change-password-form').validate({
			submitHandler: function(form) {
				form.submit();
			},
			rules: {
				'#confirmNewPassword': {
					equalTo: '#new-password'
				}
			},
			messages: {
				'#confirm-new-password': "New password does not match"
			}
		});
	})
})();
(function() {
	$( ".month-picker" ).menu({
		icons: { submenu: "ui-icon-carat-1-s" }
	});
})();
(function() {

	var slideout = new Slideout({
	    'panel': document.getElementById('panel'),
	    'menu': document.getElementById('menu'),
	    'padding': 256,
	    'tolerance': 70
	});

	if ($('.slideout-panel')) {
		if(Modernizr.touch === false) {
			// it's a desktop
			slideout.open();

			document.querySelector('.toggle-button').addEventListener('click', function() {
			    slideout.toggle();

			    if (slideout.isOpen()) {
					$('.site-panel').addClass('body-open');
				} else {
					$('.site-panel').removeClass('body-open');
				}
			});
		} else {
			// closes on touch devices
			slideout.close();

			document.querySelector('.toggle-button').addEventListener('click', function() {
			    slideout.toggle();

			    if (slideout.isOpen()) {
					$('.site-panel').addClass('body-open');
				} else {
					$('.site-panel').removeClass('body-open');
				}
			});
		}
	}
	
})();
(function() {
	$('.add-user-form').hide();
	$('.add-user-button').click(function() {
		$('.add-user-form').toggle();
	});
})();




$('#addUser').click(function() {
	$('.add-user-form').validate({
			submitHandler: function(form) {
				form.submit();
			},
			rules: {
				'first-name': {
					required: true,
					minlength: 3
				},
				'last-name': {
					required: true,
					minlength: 3
				}
			},
			messages: {
				'first-name': 'Please enter at least 3 three letters',
				'last-name': 'Please enter at least 3 three letters',
				'email': 'Please enter a valid email address'
			}
		});
})();


(function() {
	$('.delete-user').click(function() {
		
		var r = confirm('Delete this user?');

		if (r) {
			
		} else {
			return false;
		}

	});
})();