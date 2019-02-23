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