//
// pollute the global scope with some config variables
//
CONFIG = {
  APIKEY: '2AQJ9UWXKNBMZWHZ0',
  SC_KEY: '9b7291a67b6cf337be413154874a4f90',
  SC_CALLBACK: 'http://cav.is/soundseq/callback.html',
  TRACKS: [
    {
      track_id: 'TRHEAIX13FFDA5F848',
      file:     'music/2-01 Reel 15 Break 5.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 15 Break 5'
    },
    {
      track_id: 'TRWGSLJ13FFEF16087',
      file:     'music/2-02 Reel 5 Break 3.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 5 Break 3'
    },
    {
      track_id: 'TRAYQCS13FFEF2D077',
      file:     'music/2-03 Reel 9 Break 6.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 9 Break 6'
    },
    {
      track_id: 'TRBTRXH13FFEF3AF70',
      file:     'music/2-04 Reel 11 Break 2.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 11 Break 2'
    },
    {
      track_id: 'TRSBNGO13FFEF5751A',
      file:     'music/2-05 Reel 6 Break 4.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 6 Break 4'
    }
  ],
  addTrack: function(id, file, artist, title) {
    var xtra = localStorage.getItem('extraTracks');
    try {
      xtra = JSON.parse(xtra);
    }
    catch (e) {
      xtra = false;
    }
    if (!xtra || !xtra.length) xtra = [];

    // don't push duplicate files
    if (_.where(CONFIG.TRACKS, {track_id: id}).length == 0) {
      obj = { track_id: id, file: file, artist: artist, title: title };
      xtra.push(obj);
      CONFIG.TRACKS.push(obj);
      localStorage.setItem('extraTracks', JSON.stringify(xtra));
    }
  }
};

// add any stored tracks to the list
var extraTracks = localStorage.getItem('extraTracks');
try {
  extraTracks = JSON.parse(extraTracks);
}
catch (e) {
  extraTracks = false;
}
if (extraTracks && extraTracks.length) {
  CONFIG.TRACKS = CONFIG.TRACKS.concat(extraTracks);
}

// localStorage.setItem('extraTracks', null);
console.log("TRACKS", CONFIG.TRACKS);
