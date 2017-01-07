var videosJSON = [{
  "youtubeId": "TddFnTB_7IM",
  "title": "Trip through the 80s",
  "author": "meliberty"
}, {
  "youtubeId": "oOlDewpCfZQ",
  "title": "Four Chords",
  "author": "axisofawesome"
}, {
  "youtubeId": "il2IrgFHfsg",
  "title": "The Ooooh Cat",
  "author": "RnBTree"
}, {
  "youtubeId": "epUk3T2Kfno",
  "title": "Otters Holding Hands",
  "author": "cynthiaholmes"
}];

var VideoModel = function(data) {
  this.title = data.title;
  this.author = data.author;
  this.youtubeId = data.youtubeId;
  this.thumbURL = 'http://i3.ytimg.com/vi/' + this.youtubeId + '/default.jpg';
  this.embedURL = 'http://www.youtube.com/embed/' + this.youtubeId;
}

var VideoCollection = function(videosJSON) {
  this.items = [];
  for (var i = 0; i < videosJSON.length; i++) {
    this.items.push(new VideoModel(videosJSON[i]));
  }
};

VideoCollection.prototype.sort = function() {
  this.items.sort(function(videoA, videoB) {
    return videoA.title.localeCompare(videoB.title);
  });
};

/* Adds a video to the list */
var VideoItemView = function(video) {
  var $videoLink = $('<a>');
  $videoLink.append(video.title);
  var $thumbnailImg = $('<img>');
  $thumbnailImg.attr('src', video.thumbURL);
  $videoLink.append($thumbnailImg);

  /* On click, we'll make a modal with the title and video iframe */
  $videoLink.on('click', function(e) {
    e.preventDefault();

    var $videoTitle = $('<h2>');
    $videoTitle.html(video.title + ' <small>' + video.author + '</small>');
    var $videoEmbed = $('<iframe></iframe>');
    $videoEmbed.attr('src', video.embedURL);
    $videoEmbed.attr('width', 560);
    $videoEmbed.attr('height', 315);

    $('.video-modal').remove();
    var $videoModal = $('<div class="video-modal">');
    $videoModal.append($videoTitle);
    $videoModal.append($videoEmbed);
    $('body').append($videoModal);
  });

  var $videoItem = $('<div class="thumbnail">');
  $videoItem.append($videoLink);
  return $videoItem;
};



$(document).ready(function() {

  var videos = new VideoCollection(videosJSON);
  videos.sort();

  for (var i = 0; i < videos.items.length; i++) {
    var videoItem = new VideoItemView(videos.items[i]);
    $('#videos-list').append(videoItem);
  }

});
