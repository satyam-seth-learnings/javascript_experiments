$(document).ready(function () {
    // Single Select Boxes Example
    $('#example').select2(
        { placeholder: "Select a Car" }
    );

    $('#example').on('change', function () {
        var selectedValue = $(this).val();
        console.log(`Selected Value :- ${selectedValue}`);
        $('span#value').html(`${selectedValue}`);
    });

});