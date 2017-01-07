#Exercise - Good Practices

In this exercise you will fix javascript errors and apply good practices.

1.Create a `html` file and copy and paste the below code:
```html
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Video Watcher</title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <style type="text/css">
        .video-modal {
            position: absolute;
            top: 100px;
            left: 40%;
            width: auto;
            padding: 10px;
            background: #ffcc00;
            border: 1px solid black;
            border-radius: 3px;
            box-shadow: 0 0 5px #888;
        }
    </style>

</head>

<body>
	<div class="container">

        <div class="row">
            <div class="col-md-12">
                <h2 class="page-header">Best Videos Ever ❤</h1>
            </div>
        </div>

         <div class="row">
             <div class="col-md-3">
                 <div id="videos-list">
                </div>
             </div>
         </div>
    </div>

</body>
</html>
```
2.Create a js file called `exercise1.js` and include it on the html
3.Add in your `exercise1.js` the following code:

```javascript

videosJSON = [
{"youtubeId": "TddFnTB_7IM",
"title": "Trip through the 80s",
"author": "meliberty"
},
{"youtubeId": "oOlDewpCfZQ",
"title": "Four Chords",
"author": "axisofawesome"
},
{"youtubeId": "il2IrgFHfsg",
"title": "The Ooooh Cat",
"author": "RnBTree"
},
{"youtubeId": "epUk3T2Kfno",
"title": "Otters Holding Hands",
"author": "cynthiaholmes"
}
];


/* Convenience function to generate an image URL */
var GenerateThumbnailUrl = function(youtubeId, imageName){
return 'http://i3.ytimg.com/vi/' + youtubeId + '/default.jpg';
};

/* Convenience function to generate the embed URL
   that we can put in an iframe. */
var add = function(youtubeId) 
{
  return 'http://www.youtube.com/embed/' + youtubeId;
};

/* Adds a video to the list */
var addVideoToList = function(video) {
  var videoLink = $('<a>');
  $('<a>').append(video.title);
  var linkUrl = videoLink.attr('href');
  var thumbnailUrl = GenerateThumbnailUrl(video.youtubeId);
  var thumbnailImg = $('<img>');
  thumbnailImg.attr('src', thumbnailUrl);
  $('<a>').append(thumbnailImg);
    
  /* On click, we'll make a modal with the title and video iframe */
  videoLink.on('click', function(e) {
    e.preventDefault();

    var VIDEOTITLE = $('<h2>');
    VIDEOTITLE.html(video.title + ' <small>' + video.author + '</small>');
    var videoEmbed = $('<iframe></iframe>');
    videoEmbed.attr('src', add(video.youtubeId));
    videoEmbed.attr('width', 560);
    videoEmbed.attr('height', 315);

    $('.video-modal').remove();
    var videoModal = $('<div class="video-modal">');
    videoModal.append(videoTitle);
    videoModal.append(videoEmbed);
    $('body').append(videoModal);
  });

  var videoItem = $('<div class="thumbnail">');
  videoItem.append(videoLink);
  $('#videos-list').append(videoItem);
};


$(document).ready(function() {
  for (var i = 0; i < videosJSON.length; i++) {
    addVideoToList(videosJSON[i]);
  }
})

```
4.Fix and improve the code following this style guide:
  - Indentation: 2 spaces
  - Declarations with var: Alway
  - Semicolons: Always use semicolons.
  - JavaScript Style Rules: 
   - Private properties and methods should be named with a trailing underscore.
   - camelCase for function and variables: use functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis 
  - One space between function() and key. Example:
```
    function() {

   }
```

_Note_: Use Jshint to help you to be consistency on the exercises.
/* jshint undef: true, unused: true, jquery: true, strict: false, quotmark:single, curly:true  */