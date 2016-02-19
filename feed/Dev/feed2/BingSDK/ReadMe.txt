Welcome to the Bing Apps Toolkit

Getting Started
===============

Add references to the BingSDK js and CSS files to your default.html page.

    <script src="/BingSdk/js/BingSdk.js"></script>
    <link href="/BingSdk/css/BingSdk.css" rel="stylesheet" />
    <link href="/BingSdk/css/BingSdkArticle.css" rel="stylesheet" />

    <!-- The following reference is only needed to use the illustrative sample data from the examples below -->
    <script src="/BingSdk/js/BingSdkSampleData.js"></script>


The rest of the readme demonstrates how to declaratively (HTML) & programmatically (JS) instantiate each of the controls.
Insert the HTML snippets below into the page HTML as a child of section[role=main].

The inline CSS below exists purely for ease of demonstration and is not required or recommended in real usage.

Known Issues
============
	* The SDK currently only supports a light theme (ui-light.css). 


NavBar
======

HTML:
-----


In default.html, replace the following: 

    <div id="contenthost" data-win-control="Application.PageControlNavigator" data-win-options="{home: '/pages/home/home.html'}"></div>

with: 

    <div id="contenthost" data-win-control="Application.PageControlNavigator" data-win-options="{home: '/pages/home/home.html'}"></div>
    <div data-win-control="WinJS.UI.AppBar" data-win-options="{placement:'top', layout:'custom'}">
        <div data-win-control="BingApps.UI.NavigationBar" data-win-options="{channels: Application.NavBarConfig}">
        </div>
    </div>


Entity Cluster
==============

 
HTML:
-----

    <div style="overflow-x: auto; height: 100%; width: calc(100% - 120px)" 
         data-win-control="BingApps.UI.EntityCluster" 
         data-win-options="{
                    itemDataSource: SDKSampleApp.Data.dataSet1.dataSource
                }" ></div>
         

JS:
---
    var myEntityCluster = new BingApps.UI.EntityCluster(element, options);


Article Reader
==============

HTML:
-----
    <div style="height: 100%" 
        data-win-control="BingApps.UI.ArticleReader"
        data-win-options="{ 
                    articleData:SDKSampleApp.Data.ArticleData1
            }"></div>

JS:
---
   var articleReader = new BingApps.UI.ArticleReader(element, options);


SlideShow
=========

HTML: 
-----
	<div 
         data-win-control="BingApps.UI.SlideshowControl"
         data-win-options="{
			slideShowData:SDKSampleApp.Data.slideShowData,
         }">
    </div>

JS:
---
	var ss = new BingApps.UI.SlideshowControl(element, options);


Video
=====

HTML:
----
	<div class="VC" id="videoControl" 
		data-win-control="BingApps.UI.VideoWrapper" 
		data-win-options="SDKSampleApp.Data.Video.options">
	</div>

JS:
---
	var video = new BingApps.UI.VideoWrapper(element, options);

More information
================
	- Check out the API Docs distributed along with the Nuget package.
	- Email appexsdkdisc@microsoft.com with any questions.
	- We're currently investigating online blog posts & public forums for the Bing Apps Toolkit.
