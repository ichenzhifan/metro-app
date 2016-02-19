// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    Windows.UI.WebUI.WebUIApplication.onresuming = function () {
        app.queueEvent({ type: "resuming" });
    }

    app.addEventListener("resuming", resuming, false);

    app.addEventListener("activated", function (args) {
        var splashWindow = SplashWindow.Create()
        App.Data.splashWindow = splashWindow;
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.detail.splashScreen.addEventListener("dismissed", function () {
                splashWindow.Show();
            });
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));

            nav.addEventListener("navigated", onNavigated, false);
            document.getElementById("navHome").addEventListener("click", doClickHomeNav, false);
            document.getElementById("navLatest").addEventListener("click", doClickLatestNav, false);
            document.getElementById("navVideos").addEventListener("click", doClickVideosNav, false);
            
            // Register a background task with maintenance trigger(here set 15 mins).
            // Set systemcondition with internet available, means the background task will be trigger when network is available, else don't.
            BackgroundTask.registerBackgroundTask("FOX40Task.LiveTile",
                "FOX40Task LiveTile",
                new Windows.ApplicationModel.Background.MaintenanceTrigger(15, false),               
                new Windows.ApplicationModel.Background.SystemCondition(Windows.ApplicationModel.Background.SystemConditionType.internetAvailable));
        }
    });
   
    // Handle the resuming event
    function resuming(e) {       
        var parameter = e;
        if (app.sessionState.needrefresh) {
            WinJS.Navigation.navigate("/pages/home/home.html", { operatinId: new Date()});
        }
    }
    WinJS.Namespace.define("ArticleData", {
        getThumbnail: WinJS.Binding.converter(function (item) {
            return item.url;
        }),
        showPaly: WinJS.Binding.converter(function (item) {
            return item.videoOptions && item.videoOptions.videoSource ? "block" : "none";
        })
    });

    function getFakeTemp() {
        var to = 100;
        var t = Math.floor(Math.random() * (to - 19 + 1) + 19);
        return Math.floor(Math.random() * (to - t + 1) + t);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function onNavigated(e) {
        
    }


    function doClickHomeNav() {
        WinJS.Navigation.navigate("/pages/home/home.html");
        // Hide the app bars
        document.getElementById("appNavBar").winControl.hide();
    }
    function doClickLatestNav() {
        WinJS.Navigation.navigate("/pages/entitycluster/entitycluster.html",
        {
            title: "Latest",
            feedName: "latest",
            feedUrl: App.Data.getFeed("latest")
        });
        document.getElementById("appNavBar").winControl.hide();
    }
    function doClickVideosNav() {
        WinJS.Navigation.navigate("/pages/entitycluster/entitycluster.html",
            {
                title: "Videos",
                feedName: "videos",
                feedUrl: App.Data.getFeed("videos")
            });
        document.getElementById("appNavBar").winControl.hide();

    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();

    Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().enableNotificationQueue(true);

    // Add the windows 8 setting option on the charm bar
    app.onsettings = function (e) {
        e.detail.applicationcommands = {
            "Cache options": {
                href: "/pages/settings/cacheoptions.html",
                title: "Cache options"
            }
        }

        WinJS.UI.SettingsFlyout.populateSettings(e);
    }
    
})();
