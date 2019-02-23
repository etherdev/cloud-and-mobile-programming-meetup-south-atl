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