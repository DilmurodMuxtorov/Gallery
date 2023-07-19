/*
 * several UI improvements
 */
(function($) {
    $(document).ready(function() {


        var resizeProfile = function() {

            var profileInfo = $('.profile-info');
            var maxHeight = 200;
            var profileInfoHeight = profileInfo.height();

            if (profileInfoHeight > maxHeight) {

                var showMorebutton = $('<button class="button more-button" style="width: 100%; margin: .5em 0; box-shadow: -6px -14px 20px white;">read more...</button>');

                // profileInfo.css('height', maxHeight + "px");
                profileInfo.height(maxHeight);
                profileInfo.css('overflow', "hidden");
                profileInfo.parent('.content').append(showMorebutton);

                showMorebutton.on('click', function(e) {
                    // $(this).toggleClass('collapsed');
                    // profileInfo.css('max-height', profileInfoHeight + "px");
                    showMorebutton.hide();
                    profileInfo.animate({
                        height: profileInfoHeight
                    }, 500);
                });
            }
            console.log(profileInfo);

        }

        if ($("body").hasClass("page-user")) {
            resizeProfile();
        }


    });



})(jQuery);