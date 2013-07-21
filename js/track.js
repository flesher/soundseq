// config
var BAR_CONFIDENCE_THRESHOLD = 0.3;
var BEAT_CONFIDENCE_THRESHOLD = 0.8;
var BEATS_PER_SECTION = 8;
var MINIMUM_SECTIONS = 8;

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
  this.sections = [];

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
          this.init();

          // execute any ready callbacks
          _.each(this.readyFn, function(cb) { cb(); });
        }
      });
    }
  });

}

//
// what data is usable, and format it into something we can use
//
Track.prototype.init = function() {
  this.sections = STRATEGY.all(this.analysis, BEATS_PER_SECTION);
  console.log('found ' + this.sections.length + ' sections');
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
Track.prototype.tempo    = function() { return this.profile.audio_summary.tempo; }

//
// get a track section
//
Track.prototype.section = function(idx) {
  return this.sections[idx];
}

//
// get a normalized beat within a section - [startTime, duration]
//
Track.prototype.beat = function(sectionIdx, beatIdx) {
  var beat = this.sections[sectionIdx].beats[beatIdx];
  return [beat.start * 1000, beat.duration * 1000];
}
