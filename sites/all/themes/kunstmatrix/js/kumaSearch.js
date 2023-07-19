(function($) {

    $(document).ready(
        function() {


            /////////////////////////////////////////////////////////////////////////
            // configuration and setup
            /////////////////////////////////////////////////////////////////////////

            // @TODO: on ESC keyup, reset search
            // @TODO: fade in the backgroud
            // @TODO: add a delay to prevent unnecessary search queries

            var baseUrls = Drupal.settings.baseUrls;
            if (!baseUrls) {
                console.error('didn´t find baseUrls in Drupal.settings - check template.php page processing')
            }

            var searchInput = $("#kuma_search_input");
            var searchText = searchInput.val();
            var searchResultsList = $("<div id='kuma_search_results'>");
            var searchrequests = {
                exhibitors: {
                    results: [],
                    url: baseUrls.wwwBaseUrl + "/en/api/search/users?name=",
                    urlAll: "",
                },
                exhibitions: {
                    results: [],
                    url: baseUrls.artspacesBaseUrl + "/en/api/search/exhibitions?title=",
                    urlAll: baseUrls.artspacesBaseUrl + "/exhibitions?title=",
                },
                artworks: {
                    results: [],
                    url: baseUrls.loginBaseUrl + "/en/api/search/artworks?title=",
                    urlAll: baseUrls.loginBaseUrl + "/artworks?title=",
                },
                artists: {
                    results: [],
                    url: baseUrls.loginBaseUrl + "/en/api/search/artists?name=",
                    urlAll: baseUrls.loginBaseUrl + "/artists?name=",
                },
            };
            var maxlimit = 3;

            $("#kuma_search").append(searchResultsList);


            searchInput.bind('input', function() {
                // console.log('this actually works');
                searchText = searchInput.val();
                // console.log('searchText: ', searchText);

                searchInput.addClass('ui-autocomplete-loading');
                // myTimer = setInterval(() => delayFetchResults(), 50);

                if (searchText.length >= 2) {
                    fetchSearchResults(searchText);
                }
                // @NOTE this could eventually break something else...
                $(document).keyup(function(e) {
                    if (e.keyCode == 27) { // escape key maps to keycode `27`
                        resetSearch();
                        resetSearchInput();
                    }
                });

            });



            /////////////////////////////////////////////////////////////////////////
            // private functions
            /////////////////////////////////////////////////////////////////////////

            // delayFetchResults = function () {
            //     delayTimer += 1;
            //     console.log('delayTimer', delayTimer);
            //     if (delayTimer > 10) {
            //         //     clearTimeout(myTimer);
            //         //     clearInterval(myTimer);
            //         fetchSearchResults(searchText);
            //         setTimeout(() => { clearInterval(myTimer); console.log('stop'); }, 0);

            //     }
            // }

            fetchSearchResults = function(searchText) {
                if (searchText == undefined) {
                    searchText = ""
                };
                if (searchText !== "") {
                    $.each(searchrequests, function(index, request) {
                        console.log('request.url + searchText', request.url + searchText);
                        $.ajax({
                            async: true,
                            cache: false,
                            type: "get",
                            url: request.url + searchText,
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function(data) {
                                // console.log(data);
                                onRetrieveData(index, data);
                            },
                            error: function(data) {}
                        });
                    });
                } else {
                    resetSearch();
                }

            }


            onRetrieveData = function(category, data) {
                searchInput.removeClass('ui-autocomplete-loading');
                var i = 0;
                searchrequests[category].results = new Array();
                var pagerCount = data.pager.count - maxlimit
                $.each(data, function(index, item) {
                    var _label = item.name ? item.name : item.title;
                    if (_label != undefined && index < maxlimit) {
                        searchrequests[category].results[i] = {
                            label: _label,
                            value: item.link,
                            image: item.image,
                            category: category,
                            max: maxlimit,
                            count: pagerCount
                        };
                        i++;
                    }
                });
                renderMenu(searchrequests, category);
            };


            renderMenu = function(results, category) {

                // @NOTE: we always completely clear the result div and populate it from scratch
                resetSearch();

                $.each(results, function(category, item) {

                    var categoryWrapper = $("<div id='search_results_" + category + "' class='search-result-category'>")
                        .prependTo(searchResultsList);

                    // console.log(category);
                    // console.log(items);
                    if (item.results.length > 0) {
                        var categoryHtml = "<div class='ui-autocomplete-category'>" + category;

                        var numberOfAdditionalResults = item.results[0].count - maxlimit;
                        // show more of category link
                        if (numberOfAdditionalResults > 0 && searchrequests[category].urlAll) {
                            categoryHtml += "<a href='" + searchrequests[category].urlAll + searchText + "'  class='ui-autocomplete-linkstyle3'>View " + numberOfAdditionalResults + " more</a>";
                        }
                        categoryHtml += "</div>";

                        categoryWrapper.append(categoryHtml);
                        searchResultsList.append(categoryWrapper);
                        $.each(item.results, function(index, item) {

                            if (item.label) {
                                // console.log(item);
                                var titleStringLength = 30;
                                var fullTitle = item.label;
                                var title = fullTitle.length > titleStringLength ? fullTitle.substring(0, titleStringLength) + "..." : fullTitle;
                                var image = item.image;
                                title = __highlight(title, searchText);

                                // @TODO: highlight search string, like so http://jsfiddle.net/UPs3V/291/

                                var searchResultItem = $("<div class='search-result-item'></div>")
                                if (item.image) {
                                    searchResultItem.append("<div class='img-wrapper'><img src='" + image + "'height='30' /></div>")
                                }
                                searchResultItem.append("&nbsp;<a href='" + item.value + "' class='ui-autocomplete-linkstyle'>" + title + "</a>")
                                searchResultItem.appendTo(categoryWrapper);

                            }

                        });
                    }

                });

                // create a show all button at the end
                // $("<div class='autoFooterStyle' ></div>")
                //     .append("<a href='https://www.kunstmatrix.com/search?" + searchText + "' class='ui-autocomplete-linkstyle4'>" + "VIEW ALL RESULTS" + "</a>")
                //     .appendTo(searchResultsList);

                // create background overlay
                var searchBackground = $("<div id='kuma_search_background'></div>");
                searchBackground.insertBefore(searchResultsList);
                searchBackground.on("click", function() {
                    resetSearch();
                    resetSearchInput();
                });
            }


            /////////////////////////////////////////////////////////////////////////
            // helping functions
            /////////////////////////////////////////////////////////////////////////



            function __highlight(src_str, term) {

                term = term.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                var pattern = new RegExp("(" + term + ")", "gi");

                src_str = src_str.replace(pattern, "<mark>$1</mark>");
                src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");

                return src_str;
            }

            resetSearch = function() {
                searchResultsList.empty();
                // console.log('reset search');
                $("#kuma_search_background").remove();
            }

            resetSearchInput = function() {
                $("#kuma_search_input").val("");
            }



        });
})(jQuery);