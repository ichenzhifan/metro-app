(function () {
    function Tip(title, message, timeticks, dialogicon) {
        var instance = this;
        var ticks = 5000;
        var icon = Dialog.Icon.Message;
        if (timeticks !== null && timeticks !== undefined && !isNaN(timeticks))
            ticks = timeticks;
        if (dialogicon !== null && dialogicon !== undefined && !isNaN(dialogicon))
            icon = dialogicon;
        var control = document.createElement("div");
        control.className = "tip";
        var divicowrap = document.createElement("div");
        var icocss = ["icowrap"];
        switch (icon) {
            case 1: icocss.push("warningico"); break;
            case 2: icocss.push("banico"); break;
            case 3: icocss.push("checkico"); break;
            case 4: icocss.push("setico"); break;
            case 5: icocss.push("networkbanico"); break;
            default: icocss.push("messageico"); break;
        }
        divicowrap.className = icocss.join(" ");
        var spancontent = document.createElement("span");
        spancontent.className = "tipcontent";
        control.appendChild(divicowrap);
        control.appendChild(spancontent);
        var label_title = document.createElement("label");
        label_title.className = "tip_title";
        var label_message = document.createElement("label");
        label_message.className = "tip_message";
        label_title.textContent = title;
        label_message.textContent = message;
        spancontent.appendChild(label_title);
        spancontent.appendChild(label_message);
        document.body.appendChild(control);
        this.Show = function () {
            setTimeout(function () {
                control.className = "tip showtip";
            }, 20);
            return instance;
        };

        this.Dispose = function () {
            control.className = "tip";
            setTimeout(function () {
                control.parentNode.removeChild(control);
            }, 500);
            return instance;
        };

        if (ticks > 0) {
            setTimeout(function () {
                instance.Dispose();
            }, ticks);
        }
    }
    WinJS.Namespace.define("Tip", {
        "Create": function (title, message, ticks, ico) {
            var tip = new Tip(title, message, ticks, ico)
            return tip;
        }
    })
})();
