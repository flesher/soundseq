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
// what data is usable, and format it into something we can use
//
Track.prototype.init = function() {
  analysis = this.analysis;

  // 1) find usable sections
  var sections = [];
  _.each(analysis.sections, function(sect) {

    // must have high confidence to be usable
    if (sect.confidence > 0.5) {
      sect.end = sect.start + sect.duration;

      // 2) find the beats of this section
      sect.beats = _.filter(analysis.beats, function(beat) {
        beat.end = beat.start + beat.duration;
        return (beat.start >= sect.start && beat.end <= sect.end);
      });

      // use it!
      sections.push(sect);
    }
  });

  // assign it
  this.sections = sections;
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
