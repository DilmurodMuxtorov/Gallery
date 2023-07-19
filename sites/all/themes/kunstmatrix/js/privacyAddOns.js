/*
 * several UI improvements
 */
(function($) {
    $(document).ready(function() {


        var isContactPage = $('body').hasClass('url-contact');
        var lang = $('body').hasClass('i18n-de') ? 'de' : 'en';

        if (isContactPage) {


            var policy = {
                en: {
                    pre: 'By submitting your message, you accept our',
                    title: 'privacy policy',
                    url: 'https://art.kunstmatrix.com/en/info/privacy-policy',
                },
                de: {
                    pre: 'Mit dem Absenden Ihrer Nachricht akzeptieren Sie unsere',
                    title: 'Datenschutzbedingungen',
                    url: 'https://art.kunstmatrix.com/en/info/privacy-policy',
                }
            }

            // find form and Actions-Wrapper
            var contactFormActionsWrapper = $(".contact-form #edit-actions");

            // create checkbox
            var formItem = '<div class="form-item form-type-checkbox">';
            formItem += '<input required="required" type="checkbox" id="edit-submitted-dsgvo" class="form-checkbox">';
            formItem += '<label class="option" for="edit-submitted-dsgvo">';
            formItem += policy[lang].pre + '<a href="' + policy[lang].url + '" target="_blank"> ' + policy[lang].title + '</a>.*';
            formItem += '</label></div>';

            contactFormActionsWrapper.before(formItem);


        }

    });

})(jQuery);