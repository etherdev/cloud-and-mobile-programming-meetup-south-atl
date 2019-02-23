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