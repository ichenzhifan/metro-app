// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var currentPge = null;
    var usedCached = false;
    var saveFinished = true;

    // article data template
    var ArticleDummyData = {
        metadata: { adGroups: [] },

        title: {
            allowAds: true,
            author: "Author",
            byline: "Byline",
            date: "‎Friday‎, ‎October‎ 26‎, ‎2012",
            headline: "Makena State Park",
            kicker: "",
            lastUpdatedDate: "",
            pgCode: "",
            publisher: {
                favicon: {
                    height: 50,
                    name: "original",
                    url: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
                    width: 50
                },
                name: "Publisher"
            },
            style: 1,
        },

        blocks: [
            {
                type: "SectionBreak",
                attributes:
                {
                    name: "Introduction"
                }
            },
            {
                type: "Content",
                attributes:
                {
                    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae velit magna, id faucibus felis. Praesent et nunc turpis. In pretium feugiat auctor. In egestas urna id tellus sagittis mollis. Duis pharetra nunc ut sapien blandit nec bibendum augue ultrices. Fusce sed eros et mauris sodales sagittis at nec massa. Sed eget risus sit amet nibh consectetur dignissim. Aliquam quam lectus, placerat et semper sed, dictum non orci. Proin ac magna ut enim molestie eleifend vitae nec lorem. Pellentesque hendrerit placerat aliquet. Nunc urna lorem, dictum quis aliquet a, egestas et elit. Nulla quis dignissim tellus. Sed aliquam nulla volutpat dolor pellentesque id auctor lectus vestibulum. Curabitur suscipit elit a enim ullamcorper vulputate. Donec malesuada sagittis neque, lobortis porttitor lacus lacinia et. Duis posuere neque ut orci elementum suscipit. Donec dolor urna, egestas nec posuere a, blandit sed mauris. Suspendisse hendrerit urna erat. Curabitur at aliquam mauris. Aenean facilisis tincidunt urna sodales porta. </p>"
                }
            }
        ]
    }

    var displayProperties = Windows.Graphics.Display.DisplayProperties;
    var displayOrientations = Windows.Graphics.Display.DisplayOrientations;

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;

    var params = null;

    // Get the sub string between start string and end string 
    function GetBetweendContent(str, starstr, endstr) {
        var startIndex = str.indexOf(starstr);
        var endIndex = str.indexOf(endstr);
        return str.substring(startIndex, endIndex + endstr.length);
    }

    // Register share function
    function registerForShare() {
        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", shareLinkHandler);
    }

    // Handle the share link event 
    function shareLinkHandler(e) {
        var request = e.request;
        request.data.properties.title = "Share link from Q13Fox win8 app";
        request.data.properties.description = params.item.title;
        request.data.setUri(new Windows.Foundation.Uri(params.item.sourceLink));
    }

    function _formatAtrcileDataWithADMetaData(rawAtrcileData) {
        ArticleDummyData.title = rawAtrcileData.title;
        ArticleDummyData.blocks = rawAtrcileData.blocks;

        return ArticleDummyData;
    }

    // Register the print function for this page
    function registerForPrint() {
        var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        printManager.onprinttaskrequested = onPrintTaskRequested;

    }

    // Handle the on print task request event
    function onPrintTaskRequested(printEvent) {
        var printTask = printEvent.request.createPrintTask("Print article: " + params.item.title, function (args) {
            args.setSource(MSApp.getHtmlPrintDocumentSource(document));

            // Register the handler for print task completion event
            printTask.oncompleted = onPrintTaskCompleted;
        });
    }

    // Handle the print task complete event
    function onPrintTaskCompleted(printTaskCompletionEvent) {
        // Notify the user about the failure
        if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            WinJS.log && WinJS.log("Failed to print.", params.item.title, "error");
        } else if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.submitted) {
            WinJS.log && WinJS.log("Print task has been submitted", params.item.title, "error");
        }
    }

    // Handle before navigating event(triggered by page navigate evnet) 
    function beforenavigate() {
        // un-register share function
        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        dataTransferManager.removeEventListener("datarequested", shareLinkHandler);

        // un-register print function
        var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        printManager.onprinttaskrequested = null;
    }

    // Call back when save article completing
    function _SaveArticleCallBack() {
        var backbutton = document.getElementById("win-backbutton");
        var loadingIndicator = document.getElementById("loadingIndicator");
        loadingIndicator.style.display = "none";
        backbutton.disabled = false;
        saveFinished = true;
    }

    function _refresh(callback) {
        var isIneternetAvaiable = App.Data.isInternetAvailable();

        // Disable the back button before the article loading to avoid app crash
        var backbutton = document.getElementById("win-backbutton");
        backbutton.disabled = true;

        // Register the share function 
        registerForShare();

        // Register the print function 
        registerForPrint();

        // register the before navigating event, in this event need to un-register share and print function since only article can be shared and print
        WinJS.Navigation.addEventListener("beforenavigate", beforenavigate);

        if (params && params.item && params.item.link) {
            var pagetitle = document.getElementById("pagetitle");
            var articleTitle = document.getElementById("articleTitle");
            var loadingIndicator = document.getElementById("loadingIndicator");
            var articleReader = document.getElementById("articleReader");
            var articleText = document.getElementById("articleText");

            if (appView.value === appViewState.snapped) {
                pagetitle.style.display = "block";
                pagetitle.textContent = "";
                articleTitle.style.display = "block";
                articleTitle.textContent = params.item.title;
                loadingIndicator.style.display = "none";
                articleReader.style.display = "none";
                articleText.style.display = "block";
                articleText.innerHTML = toStaticHTML(params.item.snippet);
                backbutton.disabled = false;
            } else {
                pagetitle.style.display = "none";
                loadingIndicator.style.display = "block";
                articleReader.style.display = "block";
                articleText.style.display = "none";
                articleTitle.style.display = "none";
                if (params.item.link.indexOf('ms-appdata:') != -1) {
                    usedCached = true;
                }

                WinJS.xhr({ url: params.item.link }).then(
                    function completed(request) {
                        var body = GetBetweendContent(request.responseText, "<body", "</body>");

                        var html = "<html><head></head>" + body + "</html>";
                        if (!usedCached) {
                            saveFinished = false;
                            App.Data.saveArticle(html, "latest", params.item, _SaveArticleCallBack);
                        }

                        return BingApps.Data.convertToArticleReaderFormat(html, "html", App.Data.Configs.ArticleReaderConfig);
                    }).then(function (articleData) {
                        articleData = _formatAtrcileDataWithADMetaData(articleData);
                        articleData.title.lastUpdatedDate = params.item.publishTime;

                        // To force the text start a new line after the image 
                        if (articleData.blocks[0]) {
                            var body = articleData.blocks[0].attributes.content;
                            var reg = new RegExp("<a .*<img .*</a>", "g");
                            var matchStr = body.match(reg);
                            if (matchStr) {
                                var str = matchStr[0];
                                var replacedStr = str.replace("<a href=", "<a style=\"display:block; clear:both;\"  href=");
                                body = body.replace(str, replacedStr);
                                articleData.blocks[0].attributes.content = body;
                            }
                        }

                        if (articleData.blocks[0] && articleData.blocks[0].attributes.content.length < 2048) {

                            // If the internet is not avaiable, then don't show the advertising control in the article
                            if (isIneternetAvaiable) {
                                articleData.metadata.adGroups = App.Data.AdGroups;
                            }
                        }

                        var articleReader = document.getElementById("articleReader").winControl;
                        articleReader.articleData = articleData;
                        articleReader.columnCount = (displayProperties.currentOrientation == displayOrientations.landscape ||
                                                        displayProperties.currentOrientation == displayOrientations.landscapeFlipped) ? 3 : 1;
                        articleReader.forceLayout();
                        return articleReader.renderPromise;
                    }).then(function () {
                        if (usedCached) {
                            loadingIndicator.style.display = "none";
                            backbutton.disabled = false;
                        }

                        if (callback) {
                            callback();
                        }
                    });
            }
        }
    }


    // Navigate to previous article
    function _previousArticle() {
        var previousArticle = App.Data.getPreviousArticle(params.item.title, params.feedName).then(function (previousArticle) {

            if (previousArticle) {
                _refreshPageWithNewArticle(previousArticle);
            }
            else {
                App.Data.getPreviousArticle(params.item.title, params.feedName).then(function (previousArticle) {
                    if (previousArticle) {
                        if (currentPge) {
                            currentPge._removeEventListeners();
                        }

                        _refreshPageWithNewArticle(previousArticle);
                    }
                    else {
                        App.Data.showTipMessage("Message", "This is the first article");
                    }
                });

            }
        });

    }

    // Navigate to next article 
    function _nextArticle() {
        var nextArticle = App.Data.getNextArticle(params.item.title, params.feedName).then(function (nextArticle) {

            if (nextArticle) {
                _refreshPageWithNewArticle(nextArticle);
            }
            else {
                // App.Data.showMessage("This is the last article");
                App.Data.getNextArticle(params.item.title, params.feedName).then(function (nextArticle) {
                    if (nextArticle) {
                        if (currentPge) {
                            currentPge._removeEventListeners();
                        }
                        _refreshPageWithNewArticle(nextArticle);
                    }
                    else {
                        App.Data.showTipMessage("Message", "This is the last article");
                    }
                });
            }
        });
    }

    function _refreshPageWithNewArticle(newArticle) {

        // Hide the app bars
        var navBar = document.getElementsByClassName("win-appbar");
        for (var i = 0; i < navBar.length; i++) {
            navBar[i].winControl.hide();
        }

        params.item = newArticle;

        if (currentPge) {
            currentPge.ready(this, { item: newArticle, feedName: params.feedName });

        } else {
            WinJS.Navigation.navigate("/pages/articlereader/articlereader.html", { item: newArticle, feedName: params.feedName });
        }
    }

    // Scroll event can navigate to previous or next artcitle, but only works for mouse wheel(doesn't work for touch slide)
    function _onScrollOnePage(event) {
        // event.direction 2 left, 1 right
        // event.pageCount
        // event.currentPageNumber

        if (event.direction == 2 && event.currentPageNumber == 1 && saveFinished) {
            _previousArticle();
        }
        else if (event.direction == 1 && event.currentPageNumber == event.pageCount && saveFinished) {
            _nextArticle();
        }
    }

    //DOM addEventListener
    function _attachEvent(obj, eventName, handler) {
        obj.addEventListener(eventName, handler, true);
        return obj;
    }

    //DOM removeEventListener
    function _removeEvent(obj, eventName, handler) {
        obj.removeEventListener(eventName, handler, true);
        return obj;
    }


    function getContentDocument(articleReaderControl) {
        var contentDocument = null;
        try {
            contentDocument = articleReaderControl._orchestrator._article.articleReaderLayout._contentFrameManager._getContentDocument();
        }
        catch (ex) {
            // swallow exception. sometimes on navigate away, the iframe can be in a state where there is no content document.
        }
        return contentDocument;
    }

    function getZoomable(articleReaderControl) {
        var zoomable = null;
        try {
            zoomable = articleReaderControl._orchestrator._zoomable;
        }
        catch (ex) {
            // swallow exception. sometimes on navigate away, the iframe can be in a state where there is no zoomable.
        }
        return zoomable;
    }

    WinJS.UI.Pages.define("/pages/articlereader/articlereader.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            currentPge = this;
            currentPge._eventListeners = [];

            params = options;
            var links = params.item.link.split("$SplitMark$");
            if (links && links.length >= 2) {
                params.item.link = links[0];
                params.item.sourceLink = links[1];
            } else {
                params.item.sourceLink = params.item.link;
            }

            _refresh(this._refreshCallBack);
            var previousArticleButton = document.getElementById("previousArticleButton");
            var nextArticleButton = document.getElementById("nextArticleButton");

            if (previousArticleButton) {
                previousArticleButton.onclick = _previousArticle;
            }

            if (nextArticleButton) {
                nextArticleButton.onclick = _nextArticle;
            }

            var articleReader = document.getElementById("articleReader");
            var articleReaderWincontrol = articleReader.winControl;
            currentPge.articleReaderWincontrol = articleReaderWincontrol;
            // Scroll event can navigate to previous or next artcitle, but only works for mouse wheel(donesn't work for touch slide)
            articleReaderWincontrol.onscrollonepage = _onScrollOnePage;


            btnUnsnap.style.display = params.feedName == "videos" ? "none" : "block";
            document.getElementById("btnUnsnap").addEventListener("click", function () {
                this.style.display = "none";
                Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
            });
        },

        unload: function () {
            this._removeEventListeners();
            document.getElementById("articleReader").winControl.dispose();
        },

        updateLayout: function (element, viewState, lastViewState) {
            _refresh();
        },

        _attachEventListeners: function (elt) {
            this._attach(elt, "MSPointerDown", this._pointerDownListener);
            this._attach(elt, "MSPointerUp", this._pointerUpListener);
        },

        _attach: function (elt, name, listener) {
            var l = listener.bind(this);
            elt.addEventListener(name, l);
            this._eventListeners.push({
                elt: elt,
                name: name,
                listener: l,
            });
        },

        _removeEventListeners: function () {
            try {
                for (var i = 0, len = this._eventListeners.length; i < len; i++) {
                    var eventListener = this._eventListeners[i];
                    var elt = eventListener.elt;
                    var name = eventListener.name;
                    var listener = eventListener.listener;
                    elt.removeEventListener(name, listener);
                }
                this._eventListeners = [];
            } catch (ex) {
                //silence exceptions
            }
        },

        _pointerDownListener: function (event) {
            this._pointerPreviousX = event.screenX;

            // block middle mouse button click
            if ((event.buttons & 4) !== 0) {
                event.stopPropagation();
                event.preventDefault();
            }
        },

        _pointerUpListener: function (event) {
            if ((this._pointerPreviousX !== null) && (this._pointerPreviousX !== event.screenX)) {
                var orchestrator = this._orchestrator;
                if (this._pointerPreviousX > event.screenX) {
                    this.articleReaderWincontrol._orchestrator.scrollOnePage(1);
                } else {
                    this.articleReaderWincontrol._orchestrator.scrollOnePage(2);
                }
            }
            this._pointerPreviousX = null;

            // block middle mouse button click
            if ((event.buttons & 4) !== 0) {
                event.stopPropagation();
                event.preventDefault();
            }
        },

        _refreshCallBack: function () {
            var articleReader = document.querySelector("#articleReader");
            if (articleReader) {
                var articleReaderWincontrol = articleReader.winControl;
                var zoomable = getZoomable(articleReaderWincontrol);
                var contentDocument = getContentDocument(articleReaderWincontrol);
                if (zoomable && contentDocument && currentPge) {
                    currentPge._attachEventListeners(zoomable);
                    currentPge._attachEventListeners(contentDocument);
                } else {
                    zoomable.style.overflow = "auto";
                    // articleReaderWincontrol._orchestrator.style.overflowX = "scroll";

                }
            }
        }

    });
})();
