// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
 
    function _cacheToggleChanged(e) {
        var useCache = e.currentTarget.winControl.checked;
        Windows.Storage.ApplicationData.current.roamingSettings.values['useCache'] = useCache;
    }

    function _cacheChecked(e) {
        var useCache = e.currentTarget.winControl.checked;
        Windows.Storage.ApplicationData.current.roamingSettings.values['useCache'] = useCache;
    }

    WinJS.Utilities.markSupportedForProcessing(_cacheToggleChanged);
    WinJS.Utilities.markSupportedForProcessing(_cacheChecked);
    WinJS.Namespace.define("Tribune.Settings", {
        cacheToggled: _cacheToggleChanged,
        cacheChecked: _cacheChecked
    });

    WinJS.UI.Pages.define("/pages/settings/cacheoptions.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var useCacheToggle = document.getElementById("useCacheToggle");
            if (useCacheToggle) {
                var useCacheToggleWinControl = useCacheToggle.winControl;
                useCacheToggleWinControl.checked = App.Data.useCache();
            }
        },

        unload: function () {
            
        },

        updateLayout: function (element, viewState, lastViewState) {
            
        }
    });
})();
;