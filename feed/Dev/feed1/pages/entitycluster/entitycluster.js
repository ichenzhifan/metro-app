// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var currentFeedUrl = null;
    var currentTitle = null;
    var itemSelectors = null;

    function _refresh(count) {

        if (!currentFeedUrl || !currentTitle) {
            return;
        }

        var backbutton = document.getElementById("win-backbutton");
        backbutton.disabled = true;

        var loadingIndicator = document.getElementById("loadingIndicator");
        loadingIndicator.style.display = "block";
        var entityClusterDom = document.getElementById("entityCluster");
        if (!entityClusterDom) return;
        var entityCluster = entityClusterDom.winControl;

        try {
            App.Data.downloadFeeds(currentFeedUrl, currentTitle, count)
                .then(function (items) {               

                    var ArticleData = {};
                    var listItem = new WinJS.Binding.List(items);
                    var articleData = { articles: items };
                    if (ArticleData.articles) {
                        ArticleData.articles = articleData;
                    } else {
                        WinJS.Namespace.define("ArticleData", articleData);
                    }

                    var snappedEC = document.getElementById("entityECSnapped");
                    if (snappedEC && snappedEC.winControl) {
                        snappedEC.style.height = "100%";
                        snappedEC.style.width = "100%";
                        snappedEC.winControl.forceLayout();

                        snappedEC.winControl.itemDataSource = listItem.dataSource;
                        snappedEC.winControl.forceLayout();
                    }

                    entityCluster.itemDataSource = new WinJS.Binding.List(items).dataSource;
                    return entityCluster.renderPromise;


                }).then(function () {
                    // Hide loading indicator after entity cluster finishes rendering
                    loadingIndicator.style.display = "none";
                    backbutton.disabled = false;
                });
        }
        catch (error) {
            App.Data.showTipMessage("Error", error, null, Dialog.Icon.Warning);
        }
    }

    function _setEntityClusterLayout() {
        var currentViewState = Windows.UI.ViewManagement.ApplicationView.value;
        var snapped = Windows.UI.ViewManagement.ApplicationViewState.snapped;
        var enittyCluster = document.getElementById("entityCluster");
        if (enittyCluster) {
            entityCluster.winControl.maxColumnCount = currentViewState === snapped ? 1 : 200;
        }
    }

    function _reEntityClusterLayout() {
        var entityCluster = document.getElementById("entityCluster");
        if(entityCluster){
            entityCluster.winControl.forceLayout();
        }
    }


    WinJS.UI.Pages.define("/pages/entitycluster/entitycluster.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            if (options) {             
                var pagetitle = document.getElementById("pagetitle");
                pagetitle.textContent = options.title;
                currentFeedUrl = options.feedUrl;
                currentTitle = options.title;
                var currentFeedName = options.feedName;
                var initialCount = Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped ? 20 : -1;
                var entityCluster = document.getElementById("entityCluster").winControl;
                var iteminvokeHandler = function (event) {
                    var isInternetAvaiable = App.Data.isInternetAvaiable();
                    var item = event.item;
                    var listItems = ArticleData.articles;
                    item = event.item || ArticleData.articles[event.detail.itemIndex];

                    if (item) {
                        if (item.videoOptions) {
                            if (isInternetAvaiable) {
                                var videoWrapper = new BingApps.UI.VideoWrapper(eventInfo.srcElement, item.videoOptions);
                                videoWrapper.play();
                                videoWrapper.dispose();
                            }
                            else {
                                App.Data.showInternetNotAvaiable();
                            }
                        } else {
                            if (item.link.indexOf('ms-appdata:') == -1 && !isInternetAvaiable) {
                                App.Data.showInternetNotAvaiable();
                            }
                            else {
                                WinJS.Navigation.navigate("/pages/articlereader/articlereader.html", { item: item, feedName: currentFeedName });
                            }
                        }
                    }
                };

                entityCluster.oniteminvoked = iteminvokeHandler;
                entityECSnapped.winControl.oniteminvoked = iteminvokeHandler;

                currentFeedUrl = options.feedUrl;
                currentTitle = options.title;
                _refresh(initialCount);
            }
        },
        unload: function () {
            document.getElementById("entityCluster").winControl.dispose();
            if (ArticleData.articles) {
                ArticleData.articles = null;
            }
        },

        updateLayout: function (element, viewState, lastViewState) {

            if (Windows.UI.ViewManagement.ApplicationView.value == Windows.UI.ViewManagement.ApplicationViewState.snapped) {
              
                if (entityECSnapped && entityECSnapped.winControl) {
                    entityECSnapped.style.height = "100%";
                    entityECSnapped.style.width = "100%";
                    entityECSnapped.winControl.forceLayout();
                }
            }

            _setEntityClusterLayout();
            _reEntityClusterLayout();
        }
    });
})();
