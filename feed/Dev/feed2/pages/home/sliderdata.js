(function () {
    "use strict";
    var feedsname = "latest";
    var sliderData = null;
    var dataArray = [];
    var fv = null;
    for (var i = 0; i < 5; i++) {
        dataArray.push({
            id: i,
            type: "item",
            title: "",
            picture: "/images/logo.png",
            link: ""
        })
    }

    var dataList = new WinJS.Binding.List(dataArray);

    WinJS.Namespace.define("SliderData", {
        itemList: dataList,
        items: null,
        downloadFeedsForSlider: _downloadFeedsForSlider
    });

    function _downloadFeedsForSlider() {
        return App.Data.downloadFeeds(App.Data.getFeed(feedsname), feedsname, 5).then(function (items) {
            dataArray = [];
            for (var i = 0; i < items.length; i++) {
                dataArray.push({
                    id: i,
                    type: "item",
                    title: items[i].title,
                    picture: items[i].thumbnail.url,
                    link: items[i].link
                })
            }

            var dataList = new WinJS.Binding.List(dataArray);
            WinJS.Namespace.define("SliderData", { itemList: dataList, items: items });
            var fvElement = document.getElementById("basicFlipView");
            if (fvElement) {
                var fv = fvElement.winControl;
                fv.itemDataSource = SliderData.itemList.dataSource;
                return fv;
            }
            else {
                return null;
            }
        });
    }
})();
