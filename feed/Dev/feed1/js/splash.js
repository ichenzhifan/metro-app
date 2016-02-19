(function () {
    function SplashWindow() {
        var splashwindow = document.createElement("div");
        splashwindow.className = "splashwindow";
        document.body.appendChild(splashwindow);

        var div_top = document.createElement("div");
        var div_bottom = document.createElement("div");

        var div_content = document.createElement("div");

        splashwindow.appendChild(div_top);
        splashwindow.appendChild(div_content);
        splashwindow.appendChild(div_bottom);
        div_content.className = "div_content";
        for (var i = 0; i < 5; i++) {
            var div_value = document.createElement("div");
            if (i == 2) {
                var div_cut = document.createElement("div");
                div_cut.className = "div_cut";
                var div_orgin = document.createElement("div");
                div_orgin.className = "div_origin";
                div_value.appendChild(div_orgin);
                div_value.appendChild(div_cut);
            }
            div_content.appendChild(div_value);
        }
        var div_subtitle = document.createElement("div");
        div_subtitle.className = "div_subtitle";
        div_subtitle.innerHTML = "Sacramento&nbsp;&nbsp;Stockton&nbsp;&nbsp;Modesto";
        div_content.appendChild(div_subtitle);
        var resize = function () {
            var containerWidth = splashwindow.clientWidth;
            var containerHeight = splashwindow.clientHeight;
            div_bottom.style.height = div_top.style.height = (containerHeight - div_content.clientHeight) / 2 + "px";
            div_top.style.width = div_bottom.style.width = containerWidth * 2 + "px";
            div_bottom.style.marginLeft = div_top.style.marginLeft = (0 - containerWidth) / 2 + "px"
            div_top.style.marginBottom = div_content.clientHeight + "px";
            div_content.style.left = (containerWidth - div_content.clientWidth) / 2 + "px";
            div_content.style.top = (containerHeight - div_content.clientHeight) / 2 + "px";
        };

        resize();
        window.onresize = resize;
        this.Show = function () {
            setTimeout(function () {
                splashwindow.className = "splashwindow showSplashWindow";
            }, 1);

        };

        this.Dispose = function () {
            splashwindow.className = "splashwindow showSplashWindow hideSplashWindow";
            setTimeout(function () {
                splashwindow.parentNode.removeChild(splashwindow);
            }, 900);
        }
    }

    WinJS.Namespace.define("SplashWindow", {
        "Create": function () {
            return new SplashWindow();
        }
    });

})();