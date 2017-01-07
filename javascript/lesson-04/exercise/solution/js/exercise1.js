/* jshint undef: true, unused: true, jquery: true, strict: false, quotmark:single, curly:true  */
var videosJSON = [{
  'youtubeId': 'TddFnTB_7IM',
  'title': 'Trip through the 80s',
  'author': 'meliberty'
}, {
  'youtubeId': 'oOlDewpCfZQ',
  'title': 'Four Chords',
  'author': 'axisofawesome'
}, {
  'youtubeId': 'il2IrgFHfsg',
  'title': 'The Ooooh Cat',
  'author': 'RnBTree'
}, {
  'youtubeId': 'epUk3T2Kfno',
  'title': 'Otters Holding Hands',
  'author': 'cynthiaholmes'
}];



var videoApp = (function() {
  /* Convenience function to generate an image URL */
  var generateThumbnailUrl = function(youtubeId) {
    return 'http://i3.ytimg.com/vi/' + youtubeId + '/default.jpg';
  };

  /* Convenience function to generate the embed URL
     that we can put in an iframe. */
  var generateEmbedUrl = function(youtubeId) {
    return 'http://www.youtube.com/embed/' + youtubeId;
  };

  /* Adds a video to the list */
  var addVideoToList = function(video) {
    var $videoLink = $('<a>');
    $videoLink.append(video.title);
    var thumbnailUrl = generateThumbnailUrl(video.youtubeId);
    var $thumbnailImg = $('<img>');
    $thumbnailImg.attr('src', thumbnailUrl);
    $videoLink.append($thumbnailImg);

    /* On click, we'll make a modal with the title and video iframe */
    $videoLink.on('click', function(e) {
      e.preventDefault();

      var $videoTitle = $('<h2>');
      $videoTitle.html(video.title + ' <small>' + video.author + '</small>');
      var $videoEmbed = $('<iframe></iframe>');
      $videoEmbed.attr('src', generateEmbedUrl(video.youtubeId));
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
    $('#videos-list').append($videoItem);
  };

  return {
    addVideoToList: addVideoToList
  };
}());

$(document).ready(function() {
  var i;
  for (i = 0; i < videosJSON.length; i++) {
    videoApp.addVideoToList(videosJSON[i]);
  }
});
