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