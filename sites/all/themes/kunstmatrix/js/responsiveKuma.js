/*
 * several UI improvements
 */
(function($) {
    $(document).ready(function() {
        // detect touch devide in general:
        var supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
        if (supportsTouch == true) {
            $("body").addClass("touchscreen-device");
        } else {
            $("body").addClass("no-touchscreen-device");
        }
        // detect devices that allow AR Preview-use:
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $("body").addClass("ios-device");
        } else {
            //            alert('no ios');
            $("body").addClass("no-ios-device");
        }
        if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
            $("body").addClass("android-device");
        } else {
            $("body").addClass("no-android-device");
        }
        // show menu
        $(".burgermenu-reveal").click(function() {
            // $('.burgerMenu').show();
            $(".burgerMenu").addClass("menu-open");
            $("#content").addClass("menu-open");
            $("#footer").addClass("menu-open");
            $("#banner").addClass("menu-open");
            $(".burgermenu-reveal").hide();
            $(".burgermenu-hide").show();
        });
        // hide menu
        $(".burgermenu-hide").click(function() {
            // $('.burgerMenu').hide();
            $(".burgerMenu").removeClass("menu-open");
            $("#content").removeClass("menu-open");
            $("#footer").removeClass("menu-open");
            $("#banner").removeClass("menu-open");
            $(".burgermenu-hide").hide();
            $(".burgermenu-reveal").show();
        });
        // append appchoice menu to burgermenu, on small screens
        var appchoiceWrapper = $("#appchoice-wrapper");
        var appChoiceMenu = $(".appchoice-loggedin");
        var languageMenu = $(".language-switcher-locale-url");
        var appChoiceMenuHeader =
            '<li id="appChoiceMenuHeader" style="display:none" class="boldLink"><a href="#">My Tools</a></li>';
        appChoiceMenu.prepend(appChoiceMenuHeader);

        var kumaAddResponsiveMenus = function() {
            if (window.innerWidth < 1024) {
                $(".burgerMenu").append(languageMenu);
                $(".burgerMenu").prepend(appChoiceMenu);
                $(".menu-kunstmatrix-tools").hide();
                $("#appChoiceMenuHeader").show();
            } else {
                appchoiceWrapper.prepend(languageMenu);
                appchoiceWrapper.prepend(appChoiceMenu);
                $(".menu-kunstmatrix-tools").show();
                $("#appChoiceMenuHeader").hide();
            }
        };

        var loggedIn = $("body").hasClass("logged-in");
        var isKumaApps = $("body").hasClass("kuma-apps");

        // init on load, if user is logged in
        if (loggedIn && isKumaApps) {
            kumaAddResponsiveMenus();
            // and on every resize
            $(window).resize(function() {
                kumaAddResponsiveMenus();
            });
        }

        $(window).scroll(function() {
            // add a class to header-menu, if page is scrolled
            var height = $(window).scrollTop();
            // console.log(height);
            // console.log(window.innerHeight);
            if (height > 0) {
                $("body").addClass("header-sticky");
            } else {
                $("body").removeClass("header-sticky");
            }
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                $("body").addClass("scrolled-to-bottom");
            } else {
                $("body").removeClass("scrolled-to-bottom");
            }
        });

        var hideDialogButton = $(".dialog .close");
        hideDialogButton.click(function() {
            // console.log('close');
            //            hideDialogButton.parent('div').hide();
            hideDialogButton.parent("div").animate({
                right: "-600px"
            }, 300);
        });

        // fade out notifications after flagging the node as read.
        $(document).bind("flagGlobalAfterLinkUpdate", function(event, data) {
            var parentNodeIDString = "#node-" + data.contentId;
            var node = $(parentNodeIDString);
            if (node.hasClass("node-teaser")) {
                $(parentNodeIDString).fadeOut();
            }
        });
    });
})(jQuery);