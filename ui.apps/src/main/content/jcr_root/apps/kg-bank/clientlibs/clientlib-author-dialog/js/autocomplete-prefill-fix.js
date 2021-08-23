(function($, Granite) {
    'use strict';
    $(document).on("dialog-ready", function() {
        var fields = $('.coral-Textfield.js-coral-Autocomplete-textfield');
        fields.each(function (i, field) {
            setTimeout(function(){
                var val = $(field).val();
                var verbose = $(field).parent()
                    .siblings('.js-coral-Autocomplete-selectList')
                    .find("[data-value='" + val + "']");
                if(verbose && verbose.length)
                $(field).val(verbose[0].innerText);
            })
        });
    });
})(Granite.$, Granite);

