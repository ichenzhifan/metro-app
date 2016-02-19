(function () {
    "use strict";
    var dialogMode = { Normal: 0, Warning: 1, Ban: 2 };
    var dialogIcon = { Message: 0, Warning: 1, Ban: 2, Set: 3, Check: 4, NetworkBan: 5 };
    WinJS.Namespace.define("Dialog.Mode", dialogMode);
    WinJS.Namespace.define("Dialog.Icon", dialogIcon);

    function MessageDialog(title, message, dialogmode, dialogicon) {
        var instance = this;
        var buttons = [];
        var clickable = true;
        var csses = ["dialog"];
        var icocss = "";
        var icon = Dialog.Icon.Message;
        var mode = Dialog.Mode.Normal;
        if (dialogicon !== null && dialogicon !== undefined && !isNaN(dialogicon))
            icon = dialogicon;
        if (dialogmode !== null && dialogmode !== undefined && !isNaN(dialogmode))
            mode = dialogmode;
        switch (mode) {
            case 1: csses.push("warningdialog"); break;
            case 2: csses.push("bandialog"); break;
            default: csses.push("normaldialog"); break;
        }

        switch (icon) {
            case 1: icocss = "warningico"; break;
            case 2: icocss = "banico"; break;
            case 3: icocss = "checkico"; break;
            case 4: icocss = "setico"; break;
            default: icocss = "messageico"; break;
        }
        var dialogbackground = document.createElement("div");
        dialogbackground.className = "dialogbackground";
        document.body.appendChild(dialogbackground);

        var dialog = document.createElement("div");
        dialogbackground.appendChild(dialog);
        dialog.className = csses.join(" ");
        var dialogleft = document.createElement("div");
        dialogleft.className = "dialogleft";
        dialog.appendChild(dialogleft);
        var dialogcontent = document.createElement("div");
        dialogcontent.className = "dialogcontent";
        dialog.appendChild(dialogcontent);
        var dialogright = document.createElement("div");
        dialogright.className = "dialogright";
        dialog.appendChild(dialogright);
        var dialoglog = document.createElement("div");
        dialoglog.className = "dialoglog";
        dialoglog.innerHTML = "<div class='" + icocss + "'></div><div></div><div></div>";
        dialogcontent.appendChild(dialoglog);
        var dialogtitle = document.createElement("div");
        dialogtitle.className = "dialogtitle";
        var dialogtext = document.createElement("div");
        dialogtext.className = "dialogtext";
        var dialogbuttonbar = document.createElement("div");
        dialogbuttonbar.className = "dialogbuttonbar";
        dialogcontent.appendChild(dialogtitle);
        dialogcontent.appendChild(dialogtext);
        dialogcontent.appendChild(dialogbuttonbar);

        var Button = function (text, handle) {
            var buttoninstance = this;
            var button = document.createElement("button");
            button.textContent = text;
            dialogbuttonbar.appendChild(button);
            this.SetText = function (text) {
                button.textContent = text;
                return buttoninstance;
            };
            this.GetText = function () {
                return button.textContent;
            }
            this.Dispose = function () {
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i] === buttoninstance) {
                        button.parentNode.removeChild(button);
                        buttons.splice(i, 0);
                        break;
                    }
                }
            };
            button.addEventListener("click", function () {
                if (clickable) {
                    clickable = false;
                    handle(buttoninstance);
                }
            });
            buttons.push(buttoninstance);
        };


        this.SetTitle = function (value) {
            dialogtitle.innerHTML = value;
            return instance;
        };

        this.GetTitle = function () {
            return dialogtitle.innerHTML;
        };

        this.SetText = function (value) {
            dialogtext.innerHTML = value;
            resize();
            return instance;
        };

        this.GetText = function () {
            return dialogtext.innerHTML;
        };

        this.AddButton = function (text, handle) {
            return new Button(text, handle);
        };

        this.Show = function () {
            setTimeout(function () {
                dialogbackground.className = "dialogbackground showdialog";
            }, 1);
            return instance;
        };

        this.Dispose = function () {
            dialogbackground.className = "dialogbackground";
            setTimeout(function () {
                dialogbackground.parentNode.removeChild(dialogbackground);
            }, 500);
        };

        var resize = function () {
            dialog.style.marginTop = (window.innerHeight - dialog.clientHeight) / 2 + "px";
        };
        if (title !== null && title !== undefined)
            instance.SetTitle(title);
        if (message !== null && message !== undefined)
            instance.SetText(message);
        window.onresize = resize;

    };

    WinJS.Namespace.define("Dialog", {
        "Create": function (title, message, dialogMode, dialogIcon) {
            return new MessageDialog(title, message, dialogMode, dialogIcon);
        }
    });
})();