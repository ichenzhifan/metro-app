(function () {
    "use strict";
    var fv = null;
    var trigger = null;
    var currentPage = null;
    var lastRefreshDateTime = null;
    var app = WinJS.Application;

    var currentError = null;
    function _setupEC(name, itemNumber) {
        var ec = document.getElementById(name + "EC").winControl;
        ec.templateClass = "Landscape_Image";
        var itemInvoike = function (eventInfo) {
            var isInternetAvaiable = App.Data.isInternetAvailable();
            var item = eventInfo.item;
            var listItems = ArticleData[name + 'EC'];
            item = eventInfo.item || ArticleData[name + 'EC'][eventInfo.detail.itemIndex];

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
                        WinJS.Navigation.navigate("/pages/articlereader/articlereader.html", { item: item, feedName: name });
                    }
                }
            }
        };
        ec.oniteminvoked = itemInvoike;
        var ecTitle = document.getElementById(name + "ECTitle");
        ecTitle.onclick = function () {
            App.Data.openECPage(name, App.Data.getFeed(name));
        };

        return App.Data.downloadFeeds(App.Data.getFeed(name), name, itemNumber)
                .then(function (items) {
                    var ArticleData = {};
                    var listItem = new WinJS.Binding.List(items);
                    var articleData = {};
                    articleData[name + 'EC'] = items;
                    WinJS.Namespace.define("ArticleData", articleData);

                    var snappedEC = document.getElementById(name + "ECSnapped");
                    if (snappedEC && snappedEC.winControl) {
                        snappedEC.style.height = "100%";
                        snappedEC.style.width = "100%";
                        snappedEC.winControl.forceLayout();

                        snappedEC.winControl.itemDataSource = listItem.dataSource;
                        snappedEC.winControl.oniteminvoked = itemInvoike;
                    }

                    ec.itemDataSource = listItem.dataSource;
                    return ec.renderPromise;
                });
    }


    function _unloadEC(name) {
        document.getElementById(name + "EC").winControl.dispose();
    }

    function _updateECLayout(name) {
        document.getElementById(name + "EC").winControl.forceLayout();
    }

    function _countRetrieved(count) {

        var contextControl = document.querySelector(".contextControl");
        if (contextControl) {
            contextControl.parentNode.removeChild(contextControl);
        }
        contextControl = document.createElement("div");
        contextControl.className = "contextControl";
        var isFlipping = false;
        function radioButtonClicked(eventObject) {
            if (eventObject.propertyName !== "checked" || !eventObject.srcElement.checked) {
                return;
            }
            if (isFlipping) {
                var currentPage = fv.currentPage;
                radioButtons[currentPage].checked = true;

            } else {
                var targetPage = eventObject.srcElement.getAttribute("value");
                fv.currentPage = parseInt(targetPage);
            }
        }

        fv.addEventListener("pagevisibilitychanged", function (eventObject) {
            if (eventObject.detail.visible === true) {
                isFlipping = true;
            }
        }, false);

        var radioButtons = [];
        for (var i = 0; i < count; ++i) {

            var radioButton = document.createElement("input");
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("name", "flipperContextGroup");
            radioButton.setAttribute("value", i);
            radioButton.setAttribute("aria-label", (i + 1) + " of " + count);
            radioButton.onpropertychange = radioButtonClicked;
            radioButtons.push(radioButton);
            contextControl.appendChild(radioButton);
        }

        if (count > 0) {
            radioButtons[fv.currentPage].checked = true;
        }

        fv.addEventListener("pageselected", function () {
            isFlipping = false;

            var currentPage = fv.currentPage;
            radioButtons[currentPage].checked = true;
        }, false);

        var contextContainer = document.getElementById("ContextContainer");
        contextContainer.appendChild(contextControl);

        if (trigger) {
            window.clearInterval(trigger);
        }

        trigger = _sliderTrigger();
    }


    function _sliderTrigger() {
        var currentPage = 0;
        return window.setInterval(function () {

            fv.currentPage = currentPage;
            if (currentPage + 1 < fv.count()._value) {
                currentPage++;
            }
            else {
                currentPage = 0;
            }
        }, 3000);
    }

    // hide the advertising control if internet is not available
    function _hideAdvertisingControlIfInternetNotAvailable() {
        var isInternetAvailable = App.Data.isInternetAvailable();
        var ad1 = document.getElementById("ad1");
        var fad1 = document.getElementById("fad1");
        var fad2 = document.getElementById("fad2");
        if (!isInternetAvailable) {
            ad1.style.display = "none";
            fad1.style.display = "none";
            fad1.style.display = "none";
        }
        else {
            ad1.style.display = "";
            fad1.style.display = "";
            fad1.style.display = "";
        }
    }


    // refresh the feeds when user clicking refresh button
    function _refreshData() {

        // Hide the app bars
        var navBar = document.getElementsByClassName("win-appbar");
        for (var i = 0; i < navBar.length; i++) {
            navBar[i].winControl.hide();
        }

        var isInternetAvailable = App.Data.isInternetAvailable();
        var appData = Windows.Storage.ApplicationData.current;
        var today = new Date();
        var currentDateTime = new Date(today.toUTCString());
        if (lastRefreshDateTime) {
            var dateDiff = App.Data.dateTimeDiff(currentDateTime, lastRefreshDateTime);
            if (dateDiff.mins < 10 && !currentError) {
                App.Data.showTipMessage("Warning", "Don't refresh twice in 10 minutes.", null, Dialog.Icon.Warning);
                return;
            }
        }
        if (!isInternetAvailable) {
            App.Data.showInternetNotAvailable();
        }
        else {
            // Clean the cache files           
            appData.localFolder.createFolderAsync("Feeds", Windows.Storage.CreationCollisionOption.replaceExisting).then(function () {

                // Re-binding the data source
                _bindingDataSource(true);
            }, function (error) {
                App.Data.showTipMessage("Refresh Error", "Download news failed, please retry 5 minutes latter.", null, Dialog.Icon.Warning);
                _setVisiableForLoadingIndicator(false);
            }
            );
        }
    }

    function _setVisiableForLoadingIndicator(visiable) {
        var loadingIndicator = document.getElementById("loadingIndicator");
        if (visiable) {
            loadingIndicator.style.display = "block";
        }
        else {
            loadingIndicator.style.display = "none";
        }
    }

    // disable all contorls except refresh button when Network and Cache Error
    function _disableClickableControls() {
        var contorls = ['#latestECDiv', '#videosECDiv', '#sliderView', '#navHome', '#navLatest', '#navVideos', '#featuredStoriesTitle'];
        contorls.forEach(function (controlId) {
            var control = document.querySelector(controlId);
            if (control) {
                if (control.tagName.toLowerCase() === 'button') {
                    control.disabled = true;
                }
                else {
                    control.style.display = "none";
                }
            }
        });
    }

    function _enableClickableControls() {
        var contorls = ['#latestECDiv', '#videosECDiv', '#sliderView', '#navHome', '#navLatest', '#navVideos', '#featuredStoriesTitle'];
        contorls.forEach(function (controlId) {
            var control = document.querySelector(controlId);
            if (control.style.display === "none" || control.disabled) {
                if (control.tagName.toLowerCase() === 'button') {
                    control.disabled = false;
                }
                else {
                    control.style.display = "";
                }
            }
        });
    }


    function _bindingDataSource(refresh) {
        var refreshButton = document.getElementById("navRefreshButton").winControl;
        refreshButton.onclick = _refreshData;
        _setVisiableForLoadingIndicator(true);
        _hideAdvertisingControlIfInternetNotAvailable();

        currentError = null;
        try {
            _setupEC("latest", 10).then(function () {
                // Hide loading indicator after entity cluster finishes rendering              
                var rootDiv = document.getElementById("root");
                rootDiv.style.visibility = "visible";
            }).then(function () {
                return _setupEC("videos", 10);
            }, function (error) {
                App.Data.showTipMessage("Network and Cache Error", "Neither internet nor cached files is avaiable, please repair your network issue and click refresh button in the app bar", null, Dialog.Icon.Warning);

                // disable all contorls except refresh button
                _disableClickableControls();
                currentError = error;
                _setVisiableForLoadingIndicator(false);
                app.sessionState.needrefresh = true;
            }).then(function () {
                var videosECTitle = document.getElementById("videosECTitle");
                if (videosECTitle) {
                    document.getElementById("videosECTitle").style.display = "";
                }

                _setVisiableForLoadingIndicator(false);
                if (refresh) {
                    if (currentPage) {
                        // Refresh the UI
                        currentPage.ready();
                    }

                    if (!currentError) {
                        App.Data.showTipMessage("Message", "Refresh successfully!");
                        var today = new Date();
                        var currentDateTime = new Date(today.toUTCString());
                        lastRefreshDateTime = currentDateTime;
                    }

                    app.sessionState.needrefresh = false;                  
                }

                if (!currentError) {
                    _enableClickableControls();
                }

            },
            function (error) {
                App.Data.showTipMessage("Download new Error", "Download news failed, please try to click refresh button in the app bar latter", null, Dialog.Icon.Warning);
                currentError = error;
                _setVisiableForLoadingIndicator(false);
                app.sessionState.needrefresh = true;
            });

            fv = document.getElementById("basicFlipView").winControl;
            SliderData.downloadFeedsForSlider().then(function () {
                fv.itemDataSource = SliderData.itemList.dataSource;
            });
        }
        catch (error) {
            var msg = new Windows.UI.Popups.MessageDialog("Error", error.message);
            msg.commands.append(new Windows.UI.Popups.UICommand("OK", function (command) { }, 0));
            msg.showAsync();
        }
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            currentPage = this;
            setEntityClusterLayout();
            _bindingDataSource(false);

            fv = document.getElementById("basicFlipView").winControl;
            function imgClickhandler(e) {
                if (trigger) {
                    window.clearInterval(trigger);
                }
                var index = e.srcElement.alt;
                if (!isNaN(parseInt(index))) {
                    WinJS.Navigation.navigate("/pages/articlereader/articlereader.html", { item: SliderData.items[index], feedName: 'latest' });
                }
            }

            window.addEventListener("resize", function (e) {
                setEntityClusterLayout();
            });

            function setEntityClusterLayout() {
                var currentViewState = Windows.UI.ViewManagement.ApplicationView.value;
                var snapped = Windows.UI.ViewManagement.ApplicationViewState.snapped;

                var latestEC = document.getElementById("latestEC");
                var videosEC = document.getElementById("videosEC");

                if (latestEC && videosEC) {
                    latestEC.winControl.maxColumnCount = currentViewState === snapped ? 1 : 4;
                    videosEC.winControl.maxColumnCount = currentViewState === snapped ? 1 : 4;

                    _updateECLayout("latest");
                    _updateECLayout("videos");
                }
            }

            fv.addEventListener("click", imgClickhandler);
            function imgMouseOverHandler(e) {
                if (trigger) {
                    window.clearInterval(trigger);
                    trigger = null;
                }
            }

            function imgMouseLeaveHandler() {
                if (!trigger) {
                    trigger = _sliderTrigger();
                }
            }

            fv.addEventListener("mouseover", imgMouseOverHandler);
            fv.addEventListener("mouseleave", imgMouseLeaveHandler);

            fv.count().done(_countRetrieved);
            fv._pageManager.endAnimatedJump = function (oldCurr, newCurr) {
                if (this._navigationAnimationRecord.oldCurrentPage) {
                    this._navigationAnimationRecord.oldCurrentPage.setElement(oldCurr.element, true);
                } else {
                    if (oldCurr.element.parentNode) {
                        oldCurr.element.parentNode.removeChild(oldCurr.element);
                    }
                }
                this._navigationAnimationRecord.newCurrentPage.setElement(newCurr.element, true);
                this._navigationAnimationRecord = null;
                this._ensureCentered();
                this._itemSettledOn();
            };
        },

        unload: function () {
            _unloadEC("latest");
            _unloadEC("videos");
        },

        updateLayout: function (element, viewState, lastViewState) {
            if (Windows.UI.ViewManagement.ApplicationView.value == Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                var latestECSnapped = document.getElementById("latestECSnapped");
                var videosECSnapped = document.getElementById("videosECSnapped");

                if (latestECSnapped && latestECSnapped.winControl) {
                    latestECSnapped.style.height = "100%";
                    latestECSnapped.style.width = "100%";
                    latestECSnapped.winControl.forceLayout();
                }

                if (videosECSnapped && latestECSnapped.winControl) {
                    videosECSnapped.style.height = "100%";
                    videosECSnapped.style.width = "100%";
                    videosECSnapped.winControl.forceLayout();
                }

            }
            else {
                _updateECLayout("latest");
                _updateECLayout("videos");
            }
        }
    });
})();
