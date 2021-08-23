(function($, Granite) {
    'use strict';

    function registerMultifield(validator) {
        $(window).adaptTo('foundation-registry').register('foundation.validation.validator', {
            selector: 'coral-multifield',
            validate: function(input) {
                var $input = $(input);
                var $container = $input.closest('.cq-dialog-show-if.hide');
                if (!$container.length)
                    return validator($input);
            }
        });
    }

// Max
    registerMultifield(function($item) {
        var max = parseInt($item.data('maxitems'), 10);
        if ($item.find('coral-multifield-item').length > max) {
            return 'You must specify a maximum of ' + max + ' items.';
        }
    });
// Min
    registerMultifield(function($item) {
        var min = parseInt($item.data('minitems'), 10) || 0;
        if ($item.find('coral-multifield-item').length < min) {
            return 'You must specify at least ' + min + ' items.';
        }
    });

})(Granite.$, Granite);

