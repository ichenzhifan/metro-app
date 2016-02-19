(function () {
    "use strict";

    var BingSdkData = BingApps.Data;

    // Convert the date time to since format 
    function _timeSince(timeString) {
        var date = timeString;
        if (!(timeString instanceof Date)) {
            var parts = timeString.split(' ');
            date = new Date(parts[0]);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years ago";
        }

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months  ago";
        }

        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days  ago";
        }

        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours  ago";
        }

        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }

        return Math.floor(seconds) + " seconds ago";
    }

    // Define the time span structure
    function _DateTimeSpan(days, hours, mins, seconds) {
        this.days = days;
        this.hours = hours;
        this.mins = mins;
        this.seconds = seconds;
    }

    // Define the result for check feed file
    function _CheckResult(result, feedFile) {
        this.result = result;
        this.feedFile = feedFile;
    }

    // Get the time span between the two date time
    function _dateTimeDiff(date1, date2) {
        var diff = date1.getTime() - date2.getTime();
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        var hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        var mins = Math.floor(diff / (1000 * 60));
        diff -= mins * (1000 * 60);

        var seconds = Math.floor(diff / (1000));

        return new _DateTimeSpan(days, hours, mins, seconds);
    }

    // Replace all matched substring to the replacement in the str
    function _replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    // Get 4 chars string
    function _s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
    };

    // Get a guid
    function _guid() {
        return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' +
         _s4() + '-' + _s4() + _s4() + _s4();
    }

    // Donwlad the file which pointed by url, and save it to the new file
    function _downloadFileAndSave(feedFolder, item, downloader) {
        feedFolder.createFileAsync(item.guid, Windows.Storage.CreationCollisionOption.openIfExists).then(function (newfile) {
            var uri = Windows.Foundation.Uri(item.sourceImageUrl);            
            var download = downloader.createDownload(uri, newfile);
            download.startAsync().done(
                function (complete) {
                    var file = complete;
                },
                function (error) {
                },
                function (progress) {
                }
                );
        });
    }

    // Download the image in the article 
    function _downloadImageAndSave(url, folder, newfileName) {
        folder.createFileAsync(newfileName, Windows.Storage.CreationCollisionOption.openIfExists).then(function (newfile) {
            var uri = Windows.Foundation.Uri(url);
            var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();
            var download = downloader.createDownload(uri, newfile);
            download.startAsync().done(
                function (complete) {
                    var file = complete;
                },
                function (error) {
                },
                function (progress) {
                }
                );
        });
    }

    // Download the artcile and convert it to bing SDK article format
    function _downloadArticle(articleUrl) {
        return WinJS.xhr({ url: articleUrl }).then(
            function completed(request) {
                return BingSdkData.convertToArticleReaderFormat(request.responseText, "html", App.Data.Configs.ArticleReaderConfig);
            });
    }

    // Save feed:(name can be: home/latest/videos)
    function _saveFeed(feedxml, items, name) {
        var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();
        var appData = Windows.Storage.ApplicationData.current;
        appData.localFolder.createFolderAsync("Feeds", Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedsFolder) {
            feedsFolder.createFileAsync(name + ".xml", Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedFile) {
                var today = new Date();

                // Get last modify date time of the file
                var dateModified = "System.DateModified";
                feedFile.properties.retrievePropertiesAsync([dateModified]).done(function (extraProperties) {
                    var dateModifiedTime = extraProperties[dateModified];

                    // If the upate tile is in 1 hours, then skip update it
                    var timeSpan = _dateTimeDiff(new Date(today.toUTCString()), new Date(dateModifiedTime.toUTCString()));
                    var creatTimeSpan = _dateTimeDiff(new Date(today.toUTCString()), new Date(feedFile.dateCreated));
                    if (timeSpan.hours > 1 || timeSpan.days > 1 || (creatTimeSpan.days == 0 && creatTimeSpan.hours == 0 && creatTimeSpan.mins == 0 && creatTimeSpan.seconds < 5)) {

                        // Clean the article 
                        feedsFolder.getFolderAsync(name + "articles").then(function (articlesFolder) {
                            articlesFolder.deleteAsync();
                        });

                        // Save the images in each item and replace the url in the feed xml 
                        feedsFolder.createFolderAsync(name, Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedFolder) {

                            // Clean the old images files
                            feedFolder.deleteAsync().then(function () {

                                // Recreate the feed folder
                                feedsFolder.createFolderAsync(name, Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedFolder) {
                                    // items.forEach(function (item) {
                                    for (var i = 0; i < items.length; i++) {
                                        var item = items[i];
                                        item.guid = _guid() + ".jpg";
                                        if (item.sourceImageUrl) {
                                            feedxml = _replaceAll(item.sourceImageUrl, "ms-appdata:///local/Feeds/" + name + "/" + item.guid, feedxml);

                                            _downloadFileAndSave(feedFolder, item, downloader);
                                        }
                                    }

                                    feedFile.deleteAsync().then(function () {
                                        feedsFolder.createFileAsync(name + ".xml", Windows.Storage.CreationCollisionOption.openIfExists).then(function (newFeedFile) {
                                            Windows.Storage.FileIO.writeTextAsync(newFeedFile, feedxml);
                                        });

                                    });

                                }
                               );
                            });

                        });

                    }
                });

            });
        });
    }

    function _ExtractImages(articleHTML) {
        var reg = new RegExp("<a .*<img .*</a>", "g");
        var matchStr = articleHTML.match(reg);
        var images = [];
        if (matchStr) {
            matchStr.forEach(function (matchedItem) {
                var el = document.createElement('div');
                el.innerHTML = matchedItem;
                var image = el.getElementsByTagName("img");
                if (image) {
                    var src = image[0].href;
                    images.push(src);
                }
            });

            return images;
        }
        else {
            return null;
        }
    }

    // Save article:(name should be the unique id for the article) 
    function _saveArticle(articleHTML, name, item, saveArticleCallBack) {

        var articleFolderPath = "ms-appdata:///local/Feeds/" + name + "articles/";

        // Get feed xml 
        var appData = Windows.Storage.ApplicationData.current;
        appData.localFolder.createFolderAsync("Feeds", Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedsFolder) {
            feedsFolder.createFolderAsync(name + "articles", Windows.Storage.CreationCollisionOption.openIfExists).then(function (articlesFolder) {

                // Extract the images from the articleHTML and download them
                var imagesUrl = _ExtractImages(articleHTML);
                if (imagesUrl) {
                    imagesUrl.forEach(function (imageUrl) {
                        var newFileName = _guid() + ".jpg";
                        articleHTML = _replaceAll(imageUrl, articleFolderPath + newFileName, articleHTML);
                        _downloadImageAndSave(imageUrl, articlesFolder, newFileName);
                    });

                    // Save the html file(include images)
                    var newHtmlFileName = _guid() + ".html";
                    articlesFolder.createFileAsync(newHtmlFileName).then(function (newHtmlFile) {
                        Windows.Storage.FileIO.writeTextAsync(newHtmlFile, articleHTML);
                    });

                    // Read the feed xml
                    feedsFolder.getFileAsync(name + ".xml").then(function (feedfile) {
                        Windows.Storage.FileIO.readTextAsync(feedfile).then(function (fileContent) {

                            // Contact the new file path, and replace it to the feed xml
                            var newFileNmae = articleFolderPath + newHtmlFileName;
                            var newLink = newFileNmae + "$SplitMark$" + item.link;
                            fileContent = _replaceAll(item.link, newLink, fileContent);

                            // Overwite the feed xml                    
                            feedsFolder.createFileAsync(name + ".xml", Windows.Storage.CreationCollisionOption.replaceExisting).then(function (newFeedFile) {
                                Windows.Storage.FileIO.writeTextAsync(newFeedFile, fileContent).then(function () {
                                    saveArticleCallBack();
                                });
                            });
                        });
                    });
                }
            });
        });
    }

    // Get the cached feed (name can be: home/latest/videos)
    function _getCachedFeed(name) {

    }

    // Get the cached article
    function _getCachedArticle(name) {

    }

    // Get the item data template 
    function getDummyECItem() {
        return {
            title: "Dummy title",
            source: "Q13FOX",
            publishTime: "21 minutes ago",
            link: "http://fox40.com",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.The News extension allows a custom excerpt from Special:Recentchanges to be included on a wiki page, or to be published as an RSS or Atom feed. It supports several types of filtering as well as full custom formating of entries, using template syntax.</p>",
            sourceImageUrl: "../../images/fox40.jpg",
            imageAttribution: "© Powerfocusfotografie/Flickr RF/Getty Images",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=8c932869-f9a3-4db2-9d93-edf961398088&w=1024&h=768&so=2",
                height: 480,
                width: 480,
                videoOptions: { videoSource: "" }
            }
        }
    }

    // Search feeds by the queryText
    function _searchFeeds(feed, target, queryText, searchedItems) {
        return App.Data.downloadFeeds(feed, target, -1).then(function (items) {

            queryText = queryText.toLowerCase();

            // Search the the items, and push the matched items into searchItems
            for (var i = 0; i < items.length; i++) {
                var currentItem = items[i];
                if (currentItem.title && currentItem.title.toLowerCase().indexOf(queryText) != -1) {
                    searchedItems.push(currentItem);
                    continue;
                }

                if (currentItem.snippet && currentItem.snippet.toLowerCase().indexOf(queryText) != -1) {
                    searchedItems.push(currentItem);
                    continue;
                }

                if (currentItem.source && currentItem.source.toLowerCase().indexOf(queryText) != -1) {
                    searchedItems.push(currentItem);
                }
            }

        });
    }

    // Get if feed last update date time
    function _isFeedLastUpdateInOneHour(name, result) {
        var appData = Windows.Storage.ApplicationData.current;
        return appData.localFolder.createFolderAsync("Feeds", Windows.Storage.CreationCollisionOption.openIfExists).then(function (feedsFolder) {
            return feedsFolder.getFileAsync(name + ".xml").then(function (feedFile) {
                var dateModified = "System.DateModified";
                return feedFile.properties.retrievePropertiesAsync([dateModified]).done(function (extraProperties) {
                    var dateModifiedTime = extraProperties[dateModified];
                    var today = new Date();

                    // If the upate tile is in 1 hours, then skip update it
                    var timeSpan = _dateTimeDiff(new Date(today.toUTCString()), new Date(dateModifiedTime.toUTCString()));
                    if (timeSpan.days == 0 && timeSpan.hours == 0) {
                        result.result = true;
                        result.file = feedFile;
                        return true;
                    }
                    else {
                        result.result = false;
                        result.file = feedFile;
                        return false;
                    }
                });
            },
             function (err) {
                 result.result = false;
                 return false;
             });
        });
    }

    // Check whether the internet is available
    function _isInternetAvailable() {
        var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
        var internetProfile = networkInfo.getInternetConnectionProfile();
        if (internetProfile) {
            return true;
        }
        else {
            return false;
        }
    }

    // Download Feed
    function _downloadFeeds(feedsUrl, target, topnumber) {
        var feedxml = "";
        var usedCachedFeed = false;
        var checkResult = new _CheckResult(true, null);
        var config = App.Data.Configs.EntityClusterConfig;
        var isInternetAvailable = _isInternetAvailable();

        if (target == "videos" || target === "Videos") {
            config = App.Data.Configs.VedioListConfig;
        }

        return _isFeedLastUpdateInOneHour(target, checkResult).then(function () {

            // If the feed is updated in one hour or the internet is not available, then used the cached feed            
            if (((checkResult.result || !isInternetAvailable) && App.Data.useCache())) {
                // The cached feed file shouldn't been null.           
                if (!checkResult.file) {
                    throw new Error("No cached file and not internet available, please check your network");
                }

                return Windows.Storage.FileIO.readTextAsync(checkResult.file).then(function (fileContent) {
                    usedCachedFeed = true;
                    return BingSdkData.convertToEntityClusterFormat(fileContent, "xml", config);
                }).then(function processItems(sourceitems) {
                    return _processItems(sourceitems, target, feedxml, topnumber, usedCachedFeed)
                });
            }
            else {
                if (!isInternetAvailable) {
                    throw new Error("No cached file and not internet available, please check your network");
                }

                return WinJS.xhr({ url: feedsUrl }).then(
                function completed(request) {
                    feedxml = request.responseText;
                    return BingSdkData.convertToEntityClusterFormat(request.responseText, "xml", config);
                }).then(function processItems(sourceitems) { return _processItems(sourceitems, target, feedxml, topnumber, usedCachedFeed) });
            }
        });
    }

    function _processItems(sourceitems, target, feedxml, topnumber, usedCachedFeed) {
        var items = [];
        var orginalTargetName = target;
        if (target === "latest" || target === "Latest") {
            target = "news";
        } else if (target === "videos" || target === "Videos") {
            target = "video";
        } else if (target === "sports" || target === "Sports") {
            target = "sports-news";
        } else if (target === "images" || target === "Images") {
            target = "images";
        }

        var dateF = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("shortdate");
        var timeF = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("shorttime");

        sourceitems.forEach(function (sourceitem) {
            var item = getDummyECItem();
            if (target != "video" && sourceitem.title.toLowerCase().indexOf("video:") == 0) {

            } else {

                item.guid = sourceitem.id;
                item.title = sourceitem.title;
                if (sourceitem.link)
                    item.link = sourceitem.link;
                item.thumbnail.url = sourceitem.sourceImageUrl;
                var datetime = new Date(sourceitem.publishTime);
                item.publishTime = dateF.format(datetime) + " " + timeF.format(datetime);
                item.snippet = sourceitem.snippet;

                // remove the images from the snippet
                if (item.snippet) {
                    var reg = new RegExp('<img[^>]*\s*=\s*[^>]*>');
                    var matches = reg.exec(item.snippet);
                    item.snippet = item.snippet.replace(reg, "");
                }

                if (target === "video") {
                    item.thumbnail.url = sourceitem.sourceImageUrl;
                    item.thumbnail.videoOptions.videoSource = "http://video.newsinc.com/" + _getUrlParam("vcid", item.link) + ".flv";
                }

                items.push(item);
            }
        });

        if (!usedCachedFeed) {
            _saveFeed(feedxml, sourceitems, orginalTargetName);
        }

        _sortItemsByPublishDate(items);

        // Only need the top number records
        if (topnumber < items.length && topnumber > 0) {
            items.splice(topnumber, items.length - topnumber);
        }

        for (var i = 0; i < items.length; i++) {
            if (items[i].thumbnail.url) {
                items[i].thumbnail.width = 640;
                break;
            }
        }

        return items;
    }

    // sort items by publishdate
    function _sortItemsByPublishDate(items) {
        return items.sort(function (a, b) {
            if (a.thumbnail.url && b.thumbnail.url)
                return a.publishTime - b.publishTime
            if (!a.thumbnail.url)
                return 1;
            else
                return -1;
        });
    }

    function _openECPage(title, feedUrl) {
        WinJS.Navigation.navigate(
            "/pages/entitycluster/entitycluster.html",
            {
                title: title,
                feedUrl: feedUrl,
                feedName: title
            });
    }

    function _getUrlParam(name, url) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (results) {
            return results[1] || 0;
        } else {
            return 0;
        }
    }

    function _showInternetNotAvailable() {
        _showTipMessage("Network Error", "No internet available, please check your network settings", null, Dialog.Icon.NetworkBan);
    }

    function _showTipMessage(errortitle, errormessage, ticks, icon) {
        var tip = Tip.Create(errortitle, errormessage, ticks, icon);
        tip.Show();
    }

    function _messageDialog(title, message, dialogMode, dialogIcon) {
        return Dialog.Create(title, message, dialogMode, dialogIcon);

    }

    function _warningDialog(title, message, dialogIcon) {
        return _messageDialog(title, message, Dialog.Mode.Warning, dialogIcon);
    }

    function _banDialog(title, message, dialogIcon) {
        return _messageDialog(title, message, Dialog.Mode.Ban, dialogIcon);
    }

    // Get the next article item by title
    function _getNextArticle(title, feedName) {
        return _getNextOrPreviousArticle(title, feedName, false);
    }

    // Get the previous article item by title
    function _getPreviousArticle(title, feedName) {
        return _getNextOrPreviousArticle(title, feedName, true);
    }

    function _getNextOrPreviousArticle(title, feedName, isPrevious) {
        var feedUrl = App.Data.getFeed(feedName);
        return _downloadFeeds(feedUrl, feedName, -1).then(function (items) {
            var itemLength = items.length;
            for (var i = 0; i < itemLength; i++) {
                var item = items[i];
                if (item.title == title) {
                    if (i < items.length - 1 && !isPrevious)
                        return items[i + 1];

                    if (i > 0 && isPrevious) {
                        return items[i - 1];
                    }
                }
            }

            return null;
        },
         function (error) {
         },
         function (progress) {
         }
         );
    }

    function _getUseCacheSettingItemValue() {
        var value = Windows.Storage.ApplicationData.current.roamingSettings.values['useCache'];
        if (!value) {
            return false;
        }

        return true;
    }

    WinJS.Namespace.define("App.Data", {
        downloadArticle: _downloadArticle,
        downloadFeeds: _downloadFeeds,
        openECPage: _openECPage,
        timeSince: _timeSince,
        searchFeeds: _searchFeeds,
        saveFeed: _saveFeed,
        saveArticle: _saveArticle,
        getCachedFeed: _getCachedFeed,
        getCachedArticle: _getCachedArticle,
        isInternetAvailable: _isInternetAvailable,
        showInternetNotAvailable: _showInternetNotAvailable,
        showTipMessage: _showTipMessage,
        isFeedUpdatedInOneHour: _isFeedLastUpdateInOneHour,
        messageDialog: _messageDialog,//Create a message dialog
        warningDialog: _warningDialog,//Create a warning dialog
        banDialog: _banDialog,//Create a banDialog
        getNextArticle: _getNextArticle,
        getPreviousArticle: _getPreviousArticle,
        dateTimeDiff: _dateTimeDiff,
        useCache: _getUseCacheSettingItemValue
    });

    // Data configrations
    WinJS.Namespace.define("App.Data.Configs",
    {
        EntityClusterConfig: {
            item: new BingSdkData.CssSelector("rss > channel > item"),
            itemInfo: {
                guid: new BingSdkData.CssSelector("guid"),
                title: new BingSdkData.CssSelector("title"),
                publishDate: new BingSdkData.CssSelector("pubDate"),
                link: new BingSdkData.CssSelector("link"),
                abstract: new BingSdkData.CssSelector("description"),
                snippet: new BingSdkData.CssSelector("description"),
                thumbnail: new BingSdkData.CssSelector("content"),
                video: new BingSdkData.CssSelector("content[type='video/mp4']"),
                source: new BingSdkData.CssSelector('author'),
                sourceImageUrl: new BingSdkData.CssSelector('content', "url")
            }
        },
        ArticleReaderConfig: {
            author: new BingSdkData.CssSelector('div.post-author a[rel="author"]'),
            headline: new BingSdkData.CssSelector('div.recent-title > h2'),
            date: new BingSdkData.CssSelector('div.time-ago'),
            content: new BingSdkData.CssSelector('div.post-entry')
        },
        VedioListConfig: {
            item: new BingSdkData.CssSelector("rss > channel > item"),
            itemInfo: {
                guid: new BingSdkData.CssSelector("guid"),
                title: new BingSdkData.CssSelector("title"),
                publishDate: new BingSdkData.CssSelector("pubDate"),
                link: new BingSdkData.CssSelector("link"),
                abstract: new BingSdkData.CssSelector("description"),
                thumbnail: new BingSdkData.CssSelector("thumbnail", "url"),
                video: new BingSdkData.CssSelector("content[type='video/mp4']"),
                source: new BingSdkData.CssSelector("credit[role='owner']"),
                sourceImageUrl: new BingSdkData.CssSelector("thumbnail", "url")
            }
        }
    });
})();