(function($, Granite) {
    'use strict';

    /*

    # Require if validation #

        This validation makes an input mandatory depends on any other dialog fields, also provides the ability to make an input mandatory depends on the value
        of the target field

        To use this validation you must to add the validation="required-if" attribute to the field you want to convert to mandatory if the validation rules provided
        are met. To add a validation just add a data attribute with the prefix 'required-if-' for example if we would like to convert the imgAlt as mandatory if an
        image is added into file upload field f named './file' we need to add a validation attribute like this 'required-if-image-set="file"'. You could add all the
        validations you want, you only need to use the 'required-if-' prefix for each one. You can change the comparison operator from the default (and) to  'or' by
        adding the data attribute 'comparison-operation', please take a look at the sample for the "imgAlt" field which is added at the end of this documentation.

        The structure of the validation rule is the following

        required-if-{validation-name}="{fieldName}[=value1,value2,value3]"

        {validation-name}           => any descriptive name for you validation
        {fieldName}                 => the field name of any other field at the dialog
        [=value1,value2,value3]     => the field value is optional, to compare the target field value again more than one value separate the values with a commas, if
                                       no value is provided, this validation only check that the target field value is truthy. If you want to check if the field is
                                       empty, please use the special key '[EMPTY]' as value


        SAMPLE

        <items jcr:primaryType="nt:unstructured">
            <image
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/fileupload"
                fieldLabel="Image"
                fileNameParameter="./fileName"
                fileReferenceParameter="./fileReference"
                mimeTypes="image"
                multiple="{Boolean}false"
                allowUpload="{Boolean}false"
                name="./file"
                uploadUrl="${suffix.path}"
                useHTML5="{Boolean}true">
            </image>
            <isImgDecorative
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/form/checkbox"
                name="./isImgDecorative"
                text="Mark image as decorative"
                value="true"/>
            <flexColour
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/form/colorfield"
                fieldLabel="Flex banner colours"
                name="./flexColour">
                <items jcr:primaryType="nt:unstructured">
                    <teal
                        jcr:primaryType="nt:unstructured"
                        name="Teal"
                        value="teal"/>
                    <silver
                        jcr:primaryType="nt:unstructured"
                        name="Silver"
                        value="silver"/>
                    <gold
                        jcr:primaryType="nt:unstructured"
                        name="Gold"
                        value="gold"/>
                </items>
            </flexColour>
            <imgAlt
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                name="./imgAlt"
                validation="required-if"
                fieldLabel="Image alternative text">
                <granite:data
                    jcr:primaryType="nt:unstructured"
                    comparison-operation="or"
                    required-if-image-set="file"
                    required-if-img-not-decorative="isImgDecorative=false"
                    required-if-teal-or-silver="flexColour=teal,silver"/>
                />
            </imgAlt>
        </items>

    # Show if Feature #

        The show if feature makes an any element of the dialog visible or not depending on the value of the any dialog field

        To use this feature you must to add the "cq-dialog-show-if" class to the element you want to show or hide if the validation rules provided are met.
        To add a validation just add a data attribute with the prefix 'show-if-', for example if we would like to show of hide an the `showHideContainerTwo` container
        if an the displayType is equals to `callBackForm`, we need to add a validation attribute like this 'show-if-display-type-is-callback-form="displayType=callBackForm"'.
        You could add all the validations you want, you only need to use the 'show-if-' prefix for each one. You can change the comparison operator from the default (and)
        to  'or' by adding the data attribute 'comparison-operation', please take a look at the sample for the "showHideContainerTwo" container which is added at the end
        of this documentation.

        The structure of the validation rule is the following

        show-if-{validation-name}="{fieldName}[=value1,value2,value3]"

        {validation-name}           => any descriptive name for you validation
        {fieldName}                 => the field name of any other field at the dialog
        [=value1,value2,value3]     => the field value is optional, to compare the target field value again more than one value separate the values with a commas, if
                                       no value is provided, this validation only check that the target field value is truthy. If you want to check if the fields is
                                       empty, please use the special key '[EMPTY]' as value

        SAMPLE
         <displayType
            jcr:primaryType="nt:unstructured"
            sling:resourceType="granite/ui/components/coral/foundation/form/select"
            fieldDescription="Specify the type of content to display below the estimated wait time.	"
            fieldLabel="Select Display Type"
            name="./displayType">
            <items jcr:primaryType="nt:unstructured">
                <buttonCTA
                    jcr:primaryType="nt:unstructured"
                    text="Button CTA"
                    selected="true"
                    value="buttonCTA"/>
                <callBackForm
                    jcr:primaryType="nt:unstructured"
                    text="Call Back Form"
                    value="callBackForm"/>
            </items>
        </displayType>
        <showHideContainerTwo
            granite:class="cq-dialog-show-if"
            jcr:primaryType="nt:unstructured"
            sling:resourceType="granite/ui/components/coral/foundation/container">
            <granite:data
                jcr:primaryType="nt:unstructured"
                show-if-display-type-is-callback-form="displayType=callBackForm"/>
            <items jcr:primaryType="nt:unstructured">
                <unavailableText
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                    fieldDescription="Specify the text to display when the call is not available."
                    fieldLabel="Call Unavailable Text"
                    name="./unavailableText"
                />
            </items>
        </showHideContainerTwo>


     */

    const VALIDATOR_SELECTOR =
        '[data-validation=required-if], [data-foundation-validation=required-if]';
    const REQUIRED_IF_VALIDATION_PREFIX = 'required-if-';
    const SHOW_IF_VALIDATION_PREFIX = 'show-if-';
    const VALIDATION_CHECK_EMPTY_KEY = '[EMPTY]';
    let mutationObserverList = [];

    function getInputValue(element) {
        window.currentCheckBox = element;
        let value = '';
        if (element.attr('type') === 'file') {
            // For the file input we need to validate if the input has any thumbnail, it is because the
            // thumbnail is only added if a file is attached
            const filethumbnailCount = element
                .closest('.cq-FileUpload')
                .find('.cq-FileUpload-thumbnail-img')
                .children().length;
            value = filethumbnailCount === 0 ? '' : 'notEmpty';
        } else if (element.hasClass('coral-PathBrowser')) {
            // For the path browser we need to get the value from the input of the path browser
            value = element.find('.js-coral-pathbrowser-input').val();
        } else if (
            element.hasClass('coral-Checkbox-input') ||
            element.hasClass('coral3-Checkbox-input') ||
            element.prop("tagName").toLowerCase() === 'coral-checkbox'
        ) {
            // For checkbox we check if the checkedbox is checked or not
            value = '' + element.prop('checked');
        } else if (element.hasClass('coral3-Multifield')) {
            // For multifields we check if the multifield has items or not
            value = element.find('coral-multifield-item').length;
            value = value === 0 ? '' : 'notEmpty';
        } else {
            value = element.val();
        }

        return value;
    }

    function validateInput(targetInputName, value, conditionTargetValue) {
        let target = getTargetElement(targetInputName);

        if (target.length === 0) {
            //if there is not target field the validation is not checked
            return false;
        }

        let targetFieldValue = getInputValue(target);

        //enforce conditionTargetValue to be a string
        conditionTargetValue = conditionTargetValue.toString();

        if (conditionTargetValue.length > 0) {
            let conditionTargetValues = conditionTargetValue.split(',');
            // check each conditionTargetValue
            for (var conditionTargetValue of conditionTargetValues) {
                if (conditionTargetValue == VALIDATION_CHECK_EMPTY_KEY) {
                    conditionTargetValue = '';
                }
                if (
                    conditionTargetValue.trim() === targetFieldValue &&
                    (!value || value.trim().length === 0)
                ) {
                    // if the current target value is equal to the condition field value
                    // and the field is empty we need to through a validation error
                    return true;
                }
            }
        } else if (
            //if the there is no conditionTargetValue set we only check if the target field is empty or not
            //if the target field is not empty the currently input value must not be empty
            targetFieldValue.trim().length > 0 &&
            (!value || value.trim().length === 0)
        ) {
            return true;
        }
    }

    function getInputValidations($input, inputPrefix) {
        var validationSourceElement = $input.get(0);
        var validations = {};
        if ($input.hasClass('js-coral-pathbrowser-input')) {
            //fot the pathBrowser the validation rules are set at the span that wrap all the path browser component
            validationSourceElement = $input.closest('.coral-PathBrowser').get(0);
        }

        if (validationSourceElement) {
            const validationAttributes = [].slice
                .call(validationSourceElement.attributes)
                .filter(function(attr) {
                    return attr && attr.name && attr.name.indexOf('data-' + inputPrefix) === 0;
                });

            for (const validationAttribute of validationAttributes) {
                validations[validationAttribute.name] = validationAttribute.value;
            }
        }
        return validations;
    }

    function getTargetValueFieldName(conditionalValidationParts, $input) {
        var fieldName = conditionalValidationParts[0];
        //check if the validation input is part of a coral multifield
        if (!$input.hasClass('coral3-Multifield')) {
            var multifieldContainer = $input.closest('.coral3-Multifield');
            if (multifieldContainer.length >= 1) {
                // the input to validate is part of a multifield group
                var multifieldName = multifieldContainer.data('granite-coral-multifield-name');
                var itemIndex = $input.closest('.coral3-Multifield-item').index();

                fieldName =
                    multifieldName + '/item' + itemIndex + '/./' + conditionalValidationParts[0];
            }
        }
        return fieldName;
    }

    /**
     * This method return a map with each targetFieldName and targetFieldValue for each conditional
     * validation
     * @param $input
     * @param fieldPrefix
     * @returns {{}}
     */
    function getConditionalValidations($input, fieldPrefix) {
        var conditionalValidations = {};
        const validations = getInputValidations($input, fieldPrefix);
        for (var validation in validations) {
            var validationInfo = validations[validation];
            const validationParts = validationInfo.split('='); //0 => targetInputName, 1 => conditionalValue
            var validationValue = '';
            if (validationParts.length === 2) {
                // if there is a conditionalValue then set it as validationValue
                validationValue = validationParts[1];
            }
            var targetFieldName = getTargetValueFieldName(validationParts, $input);
            conditionalValidations[targetFieldName] = validationValue;
        }
        return conditionalValidations;
    }

    function validateField(el, fieldPrefix) {
        var $input = $(el);
        var value = getInputValue($input);

        var conditionalValidations = getConditionalValidations($input, fieldPrefix);

        if ($.isEmptyObject(conditionalValidations)) {
            // if there is no validations, no validation is needed
            return;
        }
        var compareOperation = ($input.data('comparison-operation') || 'and').toLowerCase();

        var isValidField = compareOperation === 'and'; // if compareOperation is and the initial value for the isValidField  must be true otherwise false

        for (const targetInputName in conditionalValidations) {
            var targetValue = conditionalValidations[targetInputName];
            const targetFieldValidation = validateInput(targetInputName, value, targetValue);

            if (compareOperation === 'or') {
                isValidField = isValidField || targetFieldValidation;
            } else {
                isValidField = isValidField && targetFieldValidation;
            }
        }

        return isValidField;
    }

    function showHideHandler(el) {
        el.each(function(i, element) {
            var conditionalValidations = getConditionalValidations(
                $(element),
                SHOW_IF_VALIDATION_PREFIX
            );

            //add a change event for each target Conditional field
            for (const targetInputName in conditionalValidations) {
                var target = getTargetElement(targetInputName);

                // Target Input is a coral 3 input
                if (target.is("[class*='coral3-']")) {
                    // handle Coral3 base drop-down
                    Coral.commons.ready(element, function() {
                        showHide(element);
                    });
                } else if (target.is("[class*='coral-FileUpload-input']")) {
                    // if the target field is a fileUpload we need to listen for any change on the the thumbnails
                    // To know when the file upload input change. So we add an observer here to check the thumbnail changes
                    let fileUploadWrapper = $(target)
                        .closest('.coral-Form-fieldwrapper')
                        .find('.cq-FileUpload-thumbnail-img');
                    if (fileUploadWrapper.length > 0) {
                        // check if thumbnail change, if the thumbnail change the file upload field gets updated
                        let observer = new MutationObserver(function(mutationsList, observer) {
                            showHide(element);
                        });
                        observer.observe(fileUploadWrapper[0], {
                            childList: true,
                            subtree: true
                        });
                        // we add all the observer to the list mutationObserverList to disconnect them
                        // once the dialog gets closed
                        mutationObserverList.push(observer);
                    }
                } else {
                    showHide(element);
                }

                target.on('change', function(event) {
                    showHide(element);
                });
            }
        });
    }

    function showHide(element) {
        let isFieldVisible = validateField(element, SHOW_IF_VALIDATION_PREFIX);
        if (isFieldVisible) {
            $(element).removeClass('hide');
        } else {
            $(element).addClass('hide');
        }
    }

    function dispatchValidation(element) {
        //validate the multifield items too
        if ($(element).hasClass('coral3-Multifield')) {
            //SetTimeout function because Coral.commons.ready doesn't work (they are not coral elements)
            setTimeout(function() {
                let fields = $(element).find("[data-validation='required-if']");
                if (fields.length > 0) {
                    fields.each(function(i, field) {
                        dispatchValidation(field);
                    });
                }
            }, 300);
        }
        var api = $(element).adaptTo('foundation-validation');
        if (api) {
            api.message = null;
            api.checkValidity();
            api.updateUI();
        }
    }

    function addTargetFieldValidationListener(element, validationPrefix) {
        var conditionalValidations = getConditionalValidations($(element), validationPrefix);

        //add a change event for each target Conditional field
        for (const targetInputName in conditionalValidations) {
            var target = getTargetElement(targetInputName);

            if (target.is("[class*='coral-FileUpload-input']")) {
                // if the target field is a fileUpload we need to listen for any change on the the thumbnails
                // To know when the file upload input change. So we add an observer here to check the thumbnail changes
                let fileUploadWrapper = $(target)
                    .closest('.coral-Form-fieldwrapper')
                    .find('.cq-FileUpload-thumbnail-img');
                if (fileUploadWrapper.length > 0) {
                    // check if thumbnail change, if the thumbnail change the file upload field gets updated
                    let observer = new MutationObserver(function(mutationsList, observer) {
                        dispatchValidation(element);
                    });
                    observer.observe(fileUploadWrapper[0], {
                        childList: true,
                        subtree: true
                    });
                    // we add all the observer to the list mutationObserverList to disconnect them
                    // once the dialog gets closed
                    mutationObserverList.push(observer);
                }
            } else {
                target.on('change', { element: element }, targetFieldValidationHandler);
            }
        }
    }

    function getTargetElement(targetInputName) {
        var target = $('[name="' + './' + targetInputName + '"]');
        if (_.isEmpty(target)) {
            target = $('[name="' + targetInputName + '"]');
        }
        if (_.isEmpty(target)) {
            target = $('[data-granite-coral-multifield-name="' + './' + targetInputName + '"]');
        }
        return target;
    }

    // Event handler for the onChange event of the target field
    function targetFieldValidationHandler(e) {
        dispatchValidation(e.data.element);
    }

    $(window)
        .adaptTo('foundation-registry')
        .register('foundation.validation.validator', {
            selector: VALIDATOR_SELECTOR,
            validate: function(el) {
                let isFieldRequired = validateField(el, REQUIRED_IF_VALIDATION_PREFIX);

                if (isFieldRequired) {
                    return Granite.I18n.get('Please fill out this field.');
                }
            }
        });

    $(document).on('foundation-contentloaded', function(e) {
        $(VALIDATOR_SELECTOR).each(function(i, element) {
            addTargetFieldValidationListener(element, REQUIRED_IF_VALIDATION_PREFIX);
        });
        // if there is already an inital value make sure the according target element becomes visible
        setTimeout(function() {
            showHideHandler($('.cq-dialog-show-if', e.target));
        });
    });
    $(document).on('dialog-closed', function() {
        // we need to disconnect  all the Mutation Observer we added
        mutationObserverList.forEach(function(observer) {
            observer.disconnect();
        });
    });
})(Granite.$, Granite);
