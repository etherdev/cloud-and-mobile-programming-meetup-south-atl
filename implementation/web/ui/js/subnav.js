// highlights the current page in subnav
(function(){
    const current_page = $('.page-panel-main').attr('data-page'),
          sub_page = $('.page-panel-main').attr('data-subpage');

    $('.subnav a[data-page=' + current_page + ']').addClass('subnav-active');
    $('.subnav-dropdown a[data-subpage="' + sub_page + '"]').addClass('subpage-active');
    $('.report-dropdown a[data-subpage="' + sub_page + '"]').addClass('subpage-active');
})();