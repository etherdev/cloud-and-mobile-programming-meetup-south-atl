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