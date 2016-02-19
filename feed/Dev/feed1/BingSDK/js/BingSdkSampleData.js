(function () {
    "use strict";
    WinJS.Namespace.define("SDKSampleApp.Data", {
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
        ArticleData1: {
            metadata: {adGroups: []},

            title: {
                allowAds: true,
                author: "Author",
                byline: "Byline",
                date: "‎Friday‎, ‎October‎ 26‎, ‎2012",
                headline: "Makena State Park",
                kicker: "",
                lastUpdatedDate: "",
                pgCode: "",
                publisher: {
                    favicon: {
                        height: 50,
                        name: "original",
                        url: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
                        width: 50
                    },
                    name: "Publisher"
                },
                style: 2,
                titleImage: {
                    image: {
                        altText: "Makena State Park, Maui, Hawaii, USA",
                        attribution: "© Ocean/Corbis",
                        caption: "Makena State Park, Maui, Hawaii, USA",
                        images: [
                            {
                                height: 546,
                                name: "original",
                                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=b85e8fdf-b2ac-46f6-88a5-0cc5548042aa&w=1190&h=768&so=2",
                                width: 950
                            },
                            {
                                height: 109,
                                name: "lowRes",
                                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=b85e8fdf-b2ac-46f6-88a5-0cc5548042aa&w=1190&h=768&so=2",
                                width: 190
                            }
                        ]
                    },
                    locationHint: "",
                    sizeHint: 2,
                    type: "TitleImage"
                }
            },

            blocks: [
                {
                    type: "SectionBreak",
                    attributes:
                    {
                        name: "Introduction"
                    }
                },
                {
                    type: "Content",
                    attributes:
                    {
                        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae velit magna, id faucibus felis. Praesent et nunc turpis. In pretium feugiat auctor. In egestas urna id tellus sagittis mollis. Duis pharetra nunc ut sapien blandit nec bibendum augue ultrices. Fusce sed eros et mauris sodales sagittis at nec massa. Sed eget risus sit amet nibh consectetur dignissim. Aliquam quam lectus, placerat et semper sed, dictum non orci. Proin ac magna ut enim molestie eleifend vitae nec lorem. Pellentesque hendrerit placerat aliquet. Nunc urna lorem, dictum quis aliquet a, egestas et elit. Nulla quis dignissim tellus. Sed aliquam nulla volutpat dolor pellentesque id auctor lectus vestibulum. Curabitur suscipit elit a enim ullamcorper vulputate. Donec malesuada sagittis neque, lobortis porttitor lacus lacinia et. Duis posuere neque ut orci elementum suscipit. Donec dolor urna, egestas nec posuere a, blandit sed mauris. Suspendisse hendrerit urna erat. Curabitur at aliquam mauris. Aenean facilisis tincidunt urna sodales porta. </p>"
                    }
                },
                {
                    type: "Content",
                    attributes:
                    {
                        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae velit magna, id faucibus felis. Praesent et nunc turpis. Pellentesque hendrerit placerat aliquet. Nunc urna lorem, dictum quis aliquet a, egestas et elit. Nulla quis dignissim tellus. Sed aliquam nulla volutpat dolor pellentesque id auctor lectus vestibulum. Curabitur suscipit elit a enim ullamcorper vulputate. Donec malesuada sagittis neque, lobortis porttitor lacus lacinia et. Duis posuere neque ut orci elementum suscipit. Donec dolor urna, egestas nec posuere a, blandit sed mauris. Suspendisse hendrerit urna erat. Curabitur at aliquam mauris. Aenean facilisis tincidunt urna sodales porta. </p>"
                    }
                },
            ]
        },

        // second sample articleData JSON. 
        // The title image is portrait style 
        // and can be reander using portrait title template when render area larger than 1366*768
        ArticleData2: {
            metadata: { adGroups: [] },
            title: {
                allowAds: true,
                author: "By Author",
                byline: "By Author, Contoso Inc",
                date: "‎Tuesday‎, ‎February‎ ‎5‎, ‎2013",
                headline: "Headline- Article 2",
                kicker: "",
                lastUpdatedDate: "",
                pgCode: "TENUS1X",
                publisher: {
                    favicon: null,
                    name: "Publisher"
                },
                style: 9,
                titleImage: {
                    image: {
                        altText: "Hong Kong Skyline",
                        attribution: "",
                        caption: "Hong Kong Skyline",
                        images: [
                            {
                                height: 1024,
                                name: "original",
                                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=13461949-0764-4345-85a2-e62e6bcf7d52&w=768&h=1024&so=2",
                                width: 768
                            },
                        ]
                    },
                    locationHint: "",
                    sizeHint: 2,
                    type: "TitleImage"
                }
            },
            blocks: [
                {
                    attributes: {
                        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget mi in justo bibendum eleifend a ac massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer est nulla, commodo tristique feugiat vel, mollis ut mi. Sed tempor sollicitudin nisi, vitae feugiat ligula iaculis in. Phasellus consectetur, lacus sit amet venenatis facilisis, diam metus sodales massa, quis bibendum urna turpis non tellus. Nunc a augue id ipsum tempor convallis. Etiam vestibulum, quam vitae vehicula tincidunt, libero nisl sagittis nisi, vitae convallis felis quam nec mauris. Suspendisse pulvinar aliquam sapien nec placerat.</p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris id nisl eget lectus tincidunt tincidunt. Nam tristique imperdiet posuere. Suspendisse tristique faucibus ipsum, vitae vehicula lectus placerat et. Nullam porta leo sit amet velit cursus consequat. Etiam egestas justo eget odio eleifend nec pretium ipsum dignissim. Duis volutpat tristique risus sit amet consequat.</p><p>Praesent volutpat hendrerit nisl. Vivamus velit neque, faucibus in suscipit nec, cursus vel turpis. Sed id massa ligula. Curabitur lectus turpis, placerat vitae faucibus et, hendrerit a orci. Suspendisse congue iaculis justo ut placerat. Vestibulum pulvinar turpis et arcu blandit ornare. Fusce leo metus, volutpat eu tincidunt a, blandit sed odio.</p><p>Sed at leo massa. Suspendisse sagittis metus eget nisi vestibulum id eleifend lectus pharetra. Nunc nec turpis nisl. Maecenas ultrices metus vitae erat consequat dictum. Etiam pretium urna a orci tempor ac dapibus nibh sodales. In pretium feugiat auctor. In egestas urna id tellus sagittis mollis. Duis pharetra nunc ut sapien blandit nec bibendum augue ultrices. Fusce sed eros et mauris sodales sagittis at nec massa. Sed eget risus sit amet nibh consectetur dignissim. Aliquam quam lectus, placerat et semper sed, dictum non orci. Proin ac magna ut enim molestie eleifend vitae nec lorem. Integer lorem est, porttitor a fermentum sed, imperdiet sit amet velit.</p><p>Fusce tincidunt tellus vitae mi rutrum sed sollicitudin lacus hendrerit. Aliquam mollis dui vel metus feugiat faucibus. Fusce viverra libero id purus lacinia sed fermentum quam bibendum. Fusce id dolor risus, et dictum sapien. Morbi sit amet mattis orci. Aenean bibendum rutrum arcu, ut vestibulum ligula interdum a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; viverra fusce.</p>"
                    },
                    type: "Content"
                },
                 {
                     attributes: {
                         image: {
                             altText: "Tahiti in the Pacific Ocean",
                             attribution: "© Powerfocusfotografie/Flickr RF/Getty Images",
                             caption: "Tahiti in the Pacific Ocean",
                             images: [
                                 {
                                     height: 633,
                                     name: "original",
                                     url: "http://img1.catalog.photos.msn.com/image.aspx?uuid=a70e337d-c18f-4fc8-8ce7-2acb77d28e0a&w=1190&h=768&so=2",
                                     width: 950
                                 },
                                 {
                                     height: 127,
                                     name: "lowRes",
                                     url: "http://img1.catalog.photos.msn.com/image.aspx?uuid=a70e337d-c18f-4fc8-8ce7-2acb77d28e0a&w=174&h=116&so=2",
                                     width: 190
                                 }
                             ]
                         },
                         locationHint: "",
                         sizeHint: 2,
                     },
                     type: "InlineImage"
                 },
                {
                    attributes: {
                        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac tellus lectus, vel blandit purus. Aliquam tellus enim, vulputate nec pellentesque at, tincidunt non lectus. Proin orci metus, tincidunt non molestie at, convallis suscipit lacus. Sed nisl nulla, adipiscing nec condimentum in, blandit tempus ligula. Quisque sit amet turpis quam. Phasellus sollicitudin hendrerit semper. Praesent ultrices imperdiet metus, nec tincidunt leo iaculis id. Vivamus vitae augue justo, at varius turpis. Nullam hendrerit dignissim condimentum. Morbi sit amet nulla id neque condimentum consequat sit amet ac leo. Nulla facilisi. Quisque hendrerit libero a eros tristique eu dapibus velit lacinia. Etiam eu sapien neque. Nullam at felis in mi tincidunt varius. Phasellus malesuada velit nec turpis consectetur consectetur.</p><p>Cras non elit eget risus placerat suscipit viverra nec elit. Integer nibh metus, egestas vel pellentesque ut, rutrum non arcu. Duis in eleifend ipsum. Cras scelerisque congue erat mattis interdum. Mauris facilisis placerat consectetur. Ut non est erat, eget condimentum lorem. Suspendisse mattis metus sed eros accumsan at dignissim libero facilisis. Aliquam tempus nibh eu nulla volutpat congue. Nulla bibendum ullamcorper ligula, et aliquam mauris tincidunt quis.</p><p>In hendrerit velit a erat tempor porttitor. Cras posuere dapibus orci sit amet congue. Aliquam magna velit, euismod ut molestie at, consequat sit amet mauris. Mauris commodo, mauris tempor condimentum tristique, neque sapien euismod metus, sed posuere lectus libero id lacus. Cras et commodo mauris. Donec eu massa suscipit ligula vehicula porttitor at nec est. Sed pellentesque magna ante, ac condimentum nulla. In lobortis interdum arcu ut congue. Pellentesque id blandit arcu.</p><p>Sed blandit risus vitae ipsum auctor vitae rutrum ligula iaculis. Morbi faucibus feugiat elit, sed laoreet magna pretium et. Duis eget vulputate nisl. Vivamus tristique ultrices ipsum eget cursus. Sed mollis magna sagittis lectus malesuada fermentum. Nullam hendrerit lorem quis lorem venenatis dignissim. Sed ac elit ante, ac consectetur tellus. Vestibulum nec mi nisi, vitae laoreet tellus. Curabitur et sapien eget mauris dapibus egestas. Nunc sit amet pulvinar diam. Sed tempus iaculis purus, quis porta tellus gravida eleifend.</p><p>Fusce sed ullamcorper nulla. Praesent adipiscing vulputate diam, eget ultricies augue suscipit in. Nunc quis nulla vitae lorem laoreet porta quis nec arcu. Aenean laoreet, purus vel feugiat tempus, magna amet.</p>"
                    },
                    type: "Content"
                },
                 {
                     attributes: {
                         content: "<p xmlns=\"http://www.w3.org/1999/xhtml\"><em>© 2012 Contoso Inc.</em></p>"
                     },
                     type: "Content"
                 },
            ]
        }
    });
}());
(function () {
    "use strict";

    var dataList1 = [
        {
            title: "<p>Tahiti in the Pacific Ocean</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.The News extension allows a custom excerpt from Special:Recentchanges to be included on a wiki page, or to be published as an RSS or Atom feed. It supports several types of filtering as well as full custom formating of entries, using template syntax.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "© Powerfocusfotografie/Flickr RF/Getty Images",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=8c932869-f9a3-4db2-9d93-edf961398088&w=1024&h=768&so=2",
                height: 768,
                width: 1024
            }
        },
        {
            title: "<p>3 This is the headline that might be very long and probably span four, five, six, or even one hundred lines, who knows, really!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Video",
            thumbnail: {
                url: "http://media.ch9.ms/ch9/e4cb/f9cef35c-7371-4fb2-8191-245e460de4cb/20130329TWC9_512.jpg",
                height: 288,
                width: 512,
                videoOptions: {
                    videoSource: "http://media.ch9.ms/ch9/e4cb/f9cef35c-7371-4fb2-8191-245e460de4cb/20130329TWC9.mp4",
                    source: "Channel 9",
                    sourceImageUrl: "http://media.ch9.ms/ch9/e4cb/f9cef35c-7371-4fb2-8191-245e460de4cb/20130329TWC9_512.jpg",
                    title: " This is the headline that might be very long and probably span four, five, six, or even one hundred lines, who knows, really!"
                }
            }
        },
        {
            title: "<p>2 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Portrait_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=0e261b01-e76b-4392-9134-e9213685dcf2&w=1024&h=768&so=2",
                height: 1024,
                width: 768
            }
        },
        {
            title: "<p>Makena State Park, Maui</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "© Ocean/Corbis",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=223b6a30-c164-466e-82be-3a4581d560b7&w=1024&h=768&so=2",
                height: 768,
                width: 1024
            }
        },
        {
            title: "<p>5 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Portrait_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=13461949-0764-4345-85a2-e62e6bcf7d52&w=768&h=1024&so=2",
                height: 1024,
                width: 768
            }
        },
        {
            title: "<p>Tropical Island: Port Antonio, Jamaica</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "© Rick Elkins/Flicker RF/Getty Images",
            templateClass: "Square_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=efd54049-785a-4c3b-ba81-77ffe36ab242&w=950&h=534&so=2",
                height: 534,
                width: 950
            }
        },
        {
            title: "<p>7 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Portrait_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=d5a160ff-1c97-41d5-8d45-f1b9136a9335&w=1190&h=768&so=2",
                height: 800,
                width: 533
            }
        },
        {
            title: "<p>Amazing photo</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "© David Soanes Photography/Flickr RF/Getty Images",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=d5a160ff-1c97-41d5-8d45-f1b9136a9335&w=1190&h=768&so=2",
                height: 599,
                width: 900
            }
        },
    ];

    var dataList2 = [
                {
                    title: "<p>Prague Citiscape</p>",
                    source: "Publisher",
                    publishTime: "21 minutes ago",
                    link: "/pages/ArticleReader/ArticleReaderPage.html",
                    snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
                    sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
                    imageAttribution: "© Jeremy Woodhouse/Photodisc/Getty Images",
                    templateClass: "Portrait_Image",
                    thumbnail: {
                        url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=31ca66e1-a589-4733-8c90-ec2d6f03fd5b&w=553&h=768&so=2",
                        height: 768,
                        width: 553
                    }
                },
        {
            title: "<p>10 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "©Photolink/Getty Images",
            templateClass: "Portrait_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=cca70134-8e51-4d43-9287-0d9961c6b70d&w=632&h=728&so=2",
                height: 728,
                width: 632
            }
        },
        {
            title: "<p>11 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=93bd95f9-51b4-4a10-9fe0-da8c746ce2a1&w=608&h=403&so=2",
                height: 403,
                width: 608
            }
        },
        {
            title: "<p>Portrait in tree image</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Portrait_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=575d0e55-2fbf-43ea-b156-d425e85e891d&w=750&h=600&so=2",
                height: 750,
                width: 600
            }
        },
        {
            title: "<p>13 This headline is very short!</p>",
            source: "Publisher",
            publishTime: "21 minutes ago",
            link: "/pages/ArticleReader/ArticleReaderPage.html",
            snippet: "<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Aenean fermentum quam vel lorem bibendum placerat. Etiam posuere egestas ligula eu ultricies. Nullam imperdiet malesuada leo in aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin placerat, ante a elementum molestie, odio mi fringilla velit, id lobortis velit massa sed nunc. Etiam volutpat ligula eu ipsum posuere id vehicula dui blandit. Suspendisse sit amet cursus dui. In vel lacus felis.</p>",
            sourceImageUrl: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
            imageAttribution: "By John Smith",
            templateClass: "Landscape_Image",
            thumbnail: {
                url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=74a068e8-3a3b-438c-887f-9d41bf161714&w=1024&h=768",
                height: 768,
                width: 1024
            }
        }
    ];

    /// The sample adUnitId and applicationId is from 
    /// "http://msdn.microsoft.com/en-us/library/advertising-windows-sdk-api-reference-adcontrol-constructor(v=msads.10).aspx"
    /// You can go to Microsoft Advertising PubCenter to get your own Ids. https://pubcenter.microsoft.com/
    var adMetadata = {
        controlType: "MicrosoftNSJS.Advertising.AdControl",
        controlOptions: {
            adUnitId: "10043105",
            applicationId: "d25517cb-12d4-4699-8bdc-52040c712cab"
        },
    };

    WinJS.Namespace.define("SDKSampleApp.Data", {
        dataSet1: new WinJS.Binding.List(dataList1),
        dataSet2: new WinJS.Binding.List(dataList2),
        adMetadata: new WinJS.Binding.as(adMetadata)
    }
);
})();
(function () {
    "use strict";

    var favicon = {
        url: "http://res1.windows.microsoft.com/resources/4.0/wol/shared/images/favicon.ico",
        width: 50,
        height: 50
    };

    WinJS.Namespace.define("SDKSampleApp.Data", {
        slideShowData: [
            {
                image: {
                    url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=fd448449-1fa8-4d30-b586-6ea6bf5fa364&w=1190&h=768&so=2",
                    width: 1190,
                    height: 768
                },
                overlayData: {
                    title: "Lake Kirkpatrick, Queenstown, NZ",
                    desc: "Description",
                    attribution: "© Daniel Schwabe/Flickr RF/Getty Images ",
                    favicon: favicon
                }
            },
            {
                image: {
                    url: "http://img1.catalog.photos.msn.com/image.aspx?uuid=a70e337d-c18f-4fc8-8ce7-2acb77d28e0a&w=1190&h=768&so=2",
                    width: 1190,
                    height: 768
                },
                overlayData: {
                    title: "Tahiti in the Pacific Ocean",
                    desc: "This is slide description",
                    attribution: "© Powerfocusfotografie/Flickr RF/Getty Images",
                    favicon: favicon
                }
            },
            {
                image: {
                    url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=d5a160ff-1c97-41d5-8d45-f1b9136a9335&w=1190&h=768&so=2",
                    width: 1190,
                    height: 768
                },
                overlayData: {
                    title: "Reflections of bridge and buildings",
                    desc: "This is slide description",
                    attribution: "© David Soanes Photography/Flickr RF/Getty Images",
                    favicon: favicon
                }
            },
            {
                image: {
                    url: "http://img3.catalog.photos.msn.com/image.aspx?uuid=b85e8fdf-b2ac-46f6-88a5-0cc5548042aa&w=1190&h=768&so=2",
                    width: 1190,
                    height: 768
                },
                overlayData: {
                    title: "Makena State Park, Maui, Hawaii, USA",
                    desc: "This is slide description",
                    attribution: "© Ocean/Corbis",
                    favicon: favicon
                }
            },
        ]
    });

})();
(function () {
    "use strict";
    var videoList = [
        {
            title: "Vishal Joshi Introduces WebMatrix 3 | Web Camps TV",
            source: "Channel9",
            sourceImageUrl: "http://mschnlnine.vo.llnwd.net/d1/Dev/App_Themes/C9/images/feedimage.png",
            thumbnail: "http://media.ch9.ms/ch9/c108/a2ed543d-12c8-42e7-9be6-7e42c886c108/VishalJoshiIntroducesWebMatrix3_512.jpg",
            videoSource: "http://media.ch9.ms/ch9/c108/a2ed543d-12c8-42e7-9be6-7e42c886c108/VishalJoshiIntroducesWebMatrix3.mp4",
        },
        {
            title: "TWC9: Build 2013, Brew, Backbone, Git, YUI and more | This Week On Channel 9",
            source: "Channel9",
            sourceImageUrl: "http://mschnlnine.vo.llnwd.net/d1/Dev/App_Themes/C9/images/feedimage.png",
            thumbnail: "http://media.ch9.ms/ch9/e4cb/f9cef35c-7371-4fb2-8191-245e460de4cb/20130329TWC9_512.jpg",
            videoSource: "http://media.ch9.ms/ch9/e4cb/f9cef35c-7371-4fb2-8191-245e460de4cb/20130329TWC9.mp4",
        },
    ];

    var options = {
        subElement: null,
        currentIndex: 0,
        fullscreenOnly: false,
        videoList: videoList,
        enableContinuousPlayback: true,
        countdownForNextVideo: 30
    };

    WinJS.Namespace.define("SDKSampleApp.Data.Video", {
        options: options,
    }
);
})();
(function () {
    "use strict";

    WinJS.Namespace.define("Application", {
        NavBarConfig: [
          {
              id: "Home",
              title: "Home",
              icon: "iconHome",
              uri: "/pages/home/home.html",
              state: null
          },
          {
              id: "EC",
              title: "Entity Cluster",
              icon: "iconFavourite",
              //icon: "url('http://ts3.mm.bing.net/th?id=H.4807370671456554&pid=1.7&w=239&h=148&c=7&rs=1')",
              uri: "/pages/EntityCluster/EntityClusterPage.html",
              state: null
          },
          {
              id: "ArticleReader",
              title: "Article Reader",
              icon: "iconBook",
              uri: "/pages/ArticleReader/ArticleReaderPage.html",
              state: null,
              subChannels: [
                  {
                      id: "AR1",
                      title: "AR2",
                      uri: "/pages/ArticleReader/ArticleReaderPage.html",
                      state: null,
                  },
              ],
          },
          {
              id: "DC",
              title: "Data Conversion API",
              icon: "iconNews",
              uri: "/pages/DataConversionEntityCluster/DataConversionEntityCluster.html",
              state: null
          },
          {
              id: "SS",
              title: "Slideshow",
              icon: "iconFavourite",
              uri: "/pages/SlideShow/SlideShowPage.html",
              state: null
          },
          {
              id: "VideoControl",
              title: "Video Control",
              icon: "iconVideo",
              uri: "/pages/VideoControl/VideoControlPage.html",
              state: null,
          },
        ],

    });
})();
