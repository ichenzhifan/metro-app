(function () {
    "use strict";

    var _feeds = {
        latest: "http://q13fox.com/feed",
        videos: "http://syndication.newsinc.com/FeedService.svc/Feed?format=mrss&feedtoken=C74B9BC3-A2E3-4855-BA2C-093753290692&numbertoshow=50&providerid=1461",//"http://channel9.msdn.com/Shows/This+Week+On+Channel+9/RSS",                   
    };

    function _getFeed(name) {
        if (name === "latest") {
            return _feeds.latest;
        } else if (name === "sports") {
            return _feeds.sports;
        } else if (name === "videos") {
            return _feeds.videos;
        } else if (name === "images") {
            return _feeds.images;
        } else {
            return null;
        }
    }

    WinJS.Namespace.define("App.Data", {
        // Advertisement data for article 
        AdGroups: [
           {
               adMetadatas: [
                   {
                       /// The sample adUnitId and applicationId is from 
                       /// http://msdn.microsoft.com/en-us/library/advertising-windows-sdk-api-reference-adcontrol-constructor(v=msads.10).aspx
                       /// You can go to Microsoft Advertising PubCenter to get your own Ids. https://pubcenter.microsoft.com/
                       controlType: "MicrosoftNSJS.Advertising.AdControl",
                       controlOptions: {
                           adUnitId: "10043105",
                           applicationId: "d25517cb-12d4-4699-8bdc-52040c712cab"
                       },
                       height: 250,
                       width: 300,
                       className: "adTypeTile"
                   }
               ],
               type: "inline"
           },
           {
               adMetadatas: [
                   {
                       controlType: "MicrosoftNSJS.Advertising.AdControl",
                       controlOptions: {
                           adUnitId: "10043105",
                           applicationId: "d25517cb-12d4-4699-8bdc-52040c712cab"
                       },
                       height: 600,
                       width: 300,
                       className: "adTypeThin"
                   }
               ],
               type: "end"
           }
        ],
        NavBarConfig: [
          {
              id: "Home",
              title: "Home",
              icon: "iconHome",
              uri: "/pages/home/home.html",
              state: null
          },
          {
              id: "Latest",
              title: "Latest",
              icon: "iconLatest",
              uri: "/pages/entitycluster/entitycluster.html",
              state: {
                  title: "Latest",
                  feedName: "latest",
                  feedUrl: _feeds.latest
              }
          },
          {
              id: "Videos",
              title: "Videos",
              icon: "iconVideos",
              uri: "/pages/entitycluster/entitycluster.html",
              state: {
                  title: "Videos",
                  feedName: "videos",
                  feedUrl: _feeds.videos
              }
          }
        ],      
        Feeds: _feeds,
        getFeed : _getFeed
    });
})();