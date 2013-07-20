//
// the track class
//
function Track(index) {

  // properties
  this.readyFn  = [];
  this.track    = CONFIG.TRACKS[index];
  this.track_id = this.track.track_id;
  this.file     = this.track.file;
  this.profile  = {};
  this.analysis = {};

  // load the profile first
  $.ajax({
    url: 'http://developer.echonest.com/api/v4/track/profile',
    type: 'GET',
    context: this,
    data: {
      id: this.track_id,
      api_key: CONFIG.APIKEY,
      bucket:  'audio_summary',
      format:  'json'
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("WOH THERE!", jqXHR, textStatus);
    },
    success: function(data, textStatus, jqXHR) {
      this.profile = data.response.track;

      // load the analysis data
      $.ajax({
        url: this.profile.audio_summary.analysis_url,
        type: 'GET',
        context: this,
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("WOH THERE!", jqXHR, textStatus);
        },
        success: function(data, textStatus, jqXHR) {
          this.analysis = data;

          // execute any ready callbacks, when/if DOM is ready
          callbacks = this.readyFn;
          $(function() {
            for (var i=0; i<callbacks.length; i++) {
              callbacks[i]();
            }
          });
        }
      });
    }
  });

}

//
// public methods
//

// track is loaded, and dom is loaded
Track.prototype.ready = function(callback) {
  this.readyFn.push(callback);
}

// basic track data (also accessible as track.profile.key)
Track.prototype.artist   = function() { return this.profile.artist; }
Track.prototype.duration = function() { return this.profile.duration; }

// advanced track data
// TODO
