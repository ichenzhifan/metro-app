
(function () {

    "use strict";

    //
    // register all background tasks with given name.
    //
    function _registerBackgroundTask(taskEntryPoint, taskName, trigger, condition) {

        // check whether the background task with given name is registered.
        var taskRegistered = false;
        var iter = Windows.ApplicationModel.Background.BackgroundTaskRegistration.allTasks.first();
        var hascur = iter.hasCurrent;
        while (hascur) {
            var cur = iter.current.value;
            if (cur.name === taskName) {
                taskRegistered = true;               
                break;
            }
            hascur = iter.moveNext();
        }

        // if don't register yet, do it.
        if (taskRegistered != true) {
            var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();

            builder.name = taskName;
            builder.taskEntryPoint = taskEntryPoint;
            builder.setTrigger(trigger);

            if (condition !== null) {
                builder.addCondition(condition);
            }

            var task = builder.register();
          
            // Enable the notification queue
            Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().enableNotificationQueue(true);
        }
    }

    //
    // Unregister all background tasks with given name.   
    // 
    function _unregisterBackgroundTasks(taskName) {

        // Loop through all background tasks and unregister.
        var iter = Windows.ApplicationModel.Background.BackgroundTaskRegistration.allTasks.first();
        var hascur = iter.hasCurrent;
        while (hascur) {
            var cur = iter.current.value;
            if (cur.name === taskName) {
                cur.unregister(true);
            }
            hascur = iter.moveNext();
        }
    } 
    
    WinJS.Namespace.define("BackgroundTask", {
        registerBackgroundTask: _registerBackgroundTask,
        unregisterBackgroundTasks: _unregisterBackgroundTasks       
    });

})();
