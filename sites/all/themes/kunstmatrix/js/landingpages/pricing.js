(function($) {
    $(window).load(function() {
        // $(".show-features").click(function () {
        //     $(".show-features").hide();
        //     $(".included").fadeIn(200);
        // });

        function checkEuroZone(code) {
            var countriesInEuroZone = [
                "BE",
                "DE",
                "EE",
                "FI",
                "FR",
                "EL",
                "IE",
                "IT",
                "LV",
                "LT",
                "LU",
                "MT",
                "NL",
                "AT",
                "PT",
                "SK",
                "SI",
                "ES",
                "CY",
            ];
            return countriesInEuroZone.indexOf(code) > -1;
        }
        // on load, check if country is US. If so, toggle to USD
        $.getJSON("https://services.kunstmatrix.info/geoip", function(data) {
            var country = data.country;
            console.log("country: ", data.country);
            if (!checkEuroZone(country)) {
                toggleCurrency();
            }
        });

        function toggleCurrency() {
            var EURToUSDmultiplier = 1.2;
            if ($(".currency-choice").text() == "USD") {
                $(".currency").text("USD");
                $(".currency-choice").text("EUR");
                var prices = $("strong.price");
                prices.each(function(index) {
                    // console.log(index + ": " + $(this).text());
                    var priceInEuro = parseFloat($(this).text());
                    var priceInUSD = priceInEuro * EURToUSDmultiplier;
                    if (!isNaN(priceInUSD)) {
                        $(this).text(priceInUSD.toFixed(0));
                    }
                });
            } else {
                $(".currency").text("€");
                $(".currency-choice").text("USD");
                var prices = $("strong.price");
                prices.each(function(index) {
                    // console.log(index + ": " + $(this).text());
                    var priceInEuro = parseFloat($(this).text());
                    var priceInUSD = priceInEuro / EURToUSDmultiplier;
                    if (!isNaN(priceInUSD)) {
                        $(this).text(priceInUSD.toFixed(0));
                    }
                });
            }
        }
        $("#toggle_currency").click(function() {
            toggleCurrency();
        });
    });
})(jQuery);