(function($, Granite) {
    'use strict';
    $(document).on("dialog-ready", function() {
        var fields = $('.coral-Form-field.iconpicker.granite-autocomplete.coral-Autocomplete');
        fields.each(function (i, field) {
            $(field).find('.coral-SelectList').children().each(function(j, item) {
                var icon = item.getAttribute('data-value');
                item.innerHTML = "<img alt='' style='width: 1rem; height: 1rem; margin-right: 1rem;' src='" + icon + "'/>" + item.innerHTML;
            });

        });
    });
})(Granite.$, Granite);

