using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Data.Xml.Dom;
using Windows.Networking.BackgroundTransfer;
using Windows.Storage;

namespace FOX40Task
{
    /// <summary>
    /// Declared a class for feed item.
    /// </summary>
    public sealed class FeedItem
    {
        public string Title { get; set; }
        public string Picture { get; set; }       
    }

    /// <summary>
    /// Declared the class for background entry point. 
    /// Note: background class must be declared with sealed.
    /// </summary>
    public sealed class LiveTile : IBackgroundTask
    {
        volatile bool _cancelRequested = false;       
        List<FeedItem> Items = new List<FeedItem>();

        /// <summary>
        /// The method is entry point for background.
        /// </summary>
        /// <param name="taskInstance"></param>
        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            // Associate a cancellation handler with the background task.         
            taskInstance.Canceled += new BackgroundTaskCanceledEventHandler(OnCanceled);

            // Represents a background task deferral.
            BackgroundTaskDeferral _deferral = taskInstance.GetDeferral();

            // Execute background task if it doesn't be canceled.
            if (_cancelRequested == false)
            {               
                // Enable the tile to queue up to five notification.
                Windows.UI.Notifications.TileUpdateManager.CreateTileUpdaterForApplication().EnableNotificationQueue(true);

                // Create a new folder named tiles under app data local folder.
                await Windows.Storage.ApplicationData.Current.LocalFolder.CreateFolderAsync("tiles", CreationCollisionOption.ReplaceExisting);

                // Download the latest five feed items from fox40, since live tile only queue up to five notification.                
                List<FeedItem> items = await GetFeedAsync("http://fox40.com/feed/");

                // Update tile info.
                // If picture value in feed item is not empty or null, then show picture in live tile.
                // else only show feed item tile in live tile.
                int count = items.Count;
                for (int i = 0; i < count; i++)
                {
                    if (string.IsNullOrEmpty(items[i].Picture))
                    {
                        updateTileWideText09(items[i].Title);

                        continue;
                    }

                    updateTileWideImageAndText01(items[i].Title, items[i].Picture);
                }
            }

            _deferral.Complete();
        }        
      
        /// <summary>
        /// Handles background task cancellation. 
        /// </summary>
        /// <param name="sender">Background task instance</param>
        /// <param name="reason">The reason with cancellation</param>
        private void OnCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            // Indicate that the background task is canceled.        
            _cancelRequested = true;
        }

        /// <summary>
        /// Download feed item(including picture, tile) with specified feed url.
        /// </summary>
        /// <param name="feedUriString">Feed url</param>
        private async Task<List<FeedItem>> GetFeedAsync(string feedUriString)
        {
            // Declared a variable for storing feed item.
            List<FeedItem> items = new List<FeedItem>();

            // Get feed info from feed url.
            XmlDocument document = new XmlDocument();
            HttpClient client = new HttpClient();
            document.LoadXml(await client.GetStringAsync(feedUriString));
           
            // Download the latest five items.
            XmlNodeList itemsNodes = document.SelectNodes("//channel/item");
            int count = itemsNodes.Count > 5 ? 5 : itemsNodes.Count;
            for (int i = 0; i < count; i++)
            {
                FeedItem feedItem = new FeedItem();
                feedItem.Title = itemsNodes[i].SelectSingleNode("title").InnerText;

                foreach (var child in itemsNodes[i].ChildNodes)
                {
                    if (child.NodeName.Equals("media:content", StringComparison.OrdinalIgnoreCase))
                    {
                        string url = child.Attributes[0].InnerText;

                        // Download picture to local folder under app data.
                        string extension = GetPictureExtension(url);
                        if (!string.IsNullOrEmpty(extension))
                        {
                            feedItem.Picture = await DownloadPicture(url, extension);
                        }

                        break;
                    }
                }

                items.Add(feedItem);
            }

            return items;
        }

        /// <summary>
        /// Download picture with specified url.
        /// </summary>
        /// <param name="pictureUrl">Picture url.</param>
        /// <param name="extension">Original picture extension like .jpg</param>
        /// <returns>The picture GUID name in app data local folder</returns>
        private async Task<string> DownloadPicture(string pictureUrl, string extension)
        {
            // Create a tile folder if doesn't exist.
            var tileFolder = await Windows.Storage.ApplicationData.Current.LocalFolder.CreateFolderAsync("tiles", CreationCollisionOption.OpenIfExists);

            Uri uri = new Uri(pictureUrl);
            var fileName = Guid.NewGuid().ToString() + extension;

            // Download picture to local.
            try
            {
                BackgroundDownloader downloader = new BackgroundDownloader();
                var storageFile = await tileFolder.CreateFileAsync(fileName, CreationCollisionOption.ReplaceExisting);
                DownloadOperation download = downloader.CreateDownload(uri, storageFile);
                await download.StartAsync();
            }
            catch
            {
                return null;
            }

            // Reture the new picture name.
            return fileName;
        }

        /// <summary>
        /// Update live tile with TileWideImageAndText01 template.
        /// </summary>
        /// <param name="text">The title of feed item</param>
        /// <param name="url">The picture url of feed item</param>           
        private void updateTileWideImageAndText01(string text, string url)
        {
            // Set base uri for accessing local app data resource.
            string baseUri = "ms-appdata:///local/tiles/";

            // get a XML DOM version of a specific template by using getTemplateContent
            XmlDocument tileXml = Windows.UI.Notifications.TileUpdateManager.GetTemplateContent(Windows.UI.Notifications.TileTemplateType.TileWideImageAndText01);

            // get the text attributes for this template and fill them in
            XmlNodeList tileTextAttributes = tileXml.GetElementsByTagName("text");
            tileTextAttributes[0].AppendChild(tileXml.CreateTextNode(text));

            // get the image attributes for this template and fill them in
            XmlNodeList tileImageAttributes = tileXml.GetElementsByTagName("image");
            tileImageAttributes[0].Attributes[1].InnerText = baseUri + url;

            //// fill in a version of the square template returned by GetTemplateContent
            XmlDocument squareTileXml = Windows.UI.Notifications.TileUpdateManager.GetTemplateContent(Windows.UI.Notifications.TileTemplateType.TileSquareImage);
            XmlNodeList squareTileImageAttributes = squareTileXml.GetElementsByTagName("image");
            squareTileImageAttributes[0].Attributes[1].InnerText = baseUri + url;//"ms-appx:///images/graySquare.png");

            // include the square template into the notification
            var node = tileXml.ImportNode(squareTileXml.GetElementsByTagName("binding").Item(0), true);
            tileXml.GetElementsByTagName("visual").Item(0).AppendChild(node);

            // create the notification from the XML
            var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);

            // send the notification to the app's application tile   
            Windows.UI.Notifications.TileUpdateManager.CreateTileUpdaterForApplication().Update(tileNotification);
        }

        /// <summary>
        /// Update live tile with TileWideImageAndText01 template.
        /// </summary>
        /// <param name="text">The title of feed item</param>             
        private void updateTileWideText09(string title)
        {
            // get a XML DOM version of a specific template by using getTemplateContent
            XmlDocument tileXml = Windows.UI.Notifications.TileUpdateManager.GetTemplateContent(Windows.UI.Notifications.TileTemplateType.TileWideText04);

            // get the text attributes for this template and fill them in
            XmlNodeList wideTextAttributes = tileXml.GetElementsByTagName("text");
            wideTextAttributes[0].AppendChild(tileXml.CreateTextNode(title));


            //// fill in a version of the square template returned by GetTemplateContent
            XmlDocument squareTileXml = Windows.UI.Notifications.TileUpdateManager.GetTemplateContent(Windows.UI.Notifications.TileTemplateType.TileSquareText02);
            XmlNodeList squareTextAttributes = tileXml.GetElementsByTagName("text");
            squareTextAttributes[0].AppendChild(tileXml.CreateTextNode(title));
            
            // include the square template into the notification
            var node = tileXml.ImportNode(squareTileXml.GetElementsByTagName("binding").Item(0), true);
            tileXml.GetElementsByTagName("visual").Item(0).AppendChild(node);

            // create the notification from the XML
            var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);

            // send the notification to the app's application tile   
            Windows.UI.Notifications.TileUpdateManager.CreateTileUpdaterForApplication().Update(tileNotification);
        }

        /// <summary>
        /// Get Picture extension with specified name.
        /// </summary>
        /// <param name="pictureUrl">Full file name or url</param>
        /// <returns>File extension(eg: .jpg)</returns>
        private string GetPictureExtension(string pictureUrl)
        {
            // Remove query string and split with "."
            string[] items = pictureUrl.Split('?')[0].Split('.');

            // Select the last item should contain extension.
            string extension = items[items.Length - 1];

            // Return correct extension.
            switch (extension.ToLowerInvariant())
            {
                case "jpg":
                    return ".jpg";

                case "png":
                    return ".png";
                case "gif":
                    return ".gif";
                case "tif":
                    return ".tif";
                default:
                    return "";
            }
        }
    }
}
