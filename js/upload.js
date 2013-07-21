//
// jquery fileuploader
//

$(function() {

  // helper to keep calling echonest until a file has been processed
  function uploadToEchonest(fileUrl, trackId) {
    var url = 'http://developer.echonest.com/api/v4/track/' + (trackId ? 'profile' : 'upload');
    var type = trackId ? 'GET' : 'POST';
    var data = { api_key: CONFIG.APIKEY, format: 'json', bucket: 'audio_summary' };
    trackId ? (data.id = trackId) : (data.url = fileUrl);
    console.log(" REQ", url, type, data);
    $.ajax({
        url:  url,
        type: type,
        data: data,
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("WOH THERE!", jqXHR, textStatus);
        },
        success: function(data, textStatus, jqXHR) {
          var track = data.response.track || {};
          if (data.response.track.status == 'pending' && !track.audio_summary) {
            console.log('** ECHONEST PENDING **', data);
            _.delay(uploadToEchonest, 3000, fileUrl, data.response.track.id);
          }
          else if (data.response.track.status == 'error') {
            console.log('** ECHONEST UNABLE TO PROCESS **', data);
          }
          else {
            CONFIG.addTrack(track.id, fileUrl, track.artist, track.title);
            console.log('** ECHONEST COMPLETE **', data, track.audio_summary);

            // play this track
            $('#fileupload').trigger('uploaded', CONFIG.TRACKS.length - 1);
          }
        }
      });
  }

  // upload trigger
  $('#fileupload').fileupload({
    url:       'http://cav.is/hackfest/upload.php',
    type:      'POST',
    dataType:  'json',
    dropZone:  '#container',
    send: function(e, data) {
      window.location = '#sequencer';
      console.log('** UPLOADING FILE **', data);
    },
    fail: function(e, data) {
      console.warn('** UPLOAD FAILED **', data);
    },
    done: function(e, data) {
      console.log('** UPLOADING DONE **', data.result.files[0]);
      uploadToEchonest(data.result.files[0].url);
    }
  });

});
