//
// pollute the global scope with some config variables
//
CONFIG = {
  APIKEY: '2AQJ9UWXKNBMZWHZ0',
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
    },
    {
      track_id: 'TRTNCPI13FFEF66357',
      file:     'music/2-06 Reel 8 Break 2.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 8 Break 2'
    },
    {
      track_id: 'TRWGSYX13FFEF77CFC',
      file:     'music/2-07 Reel 18 Session 1.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 18 Session 1'
    },
    {
      track_id: 'TRXISXD13FFEF86E1C',
      file:     'music/2-08 Reel 17 Break 4.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 17 Break 4'
    },
    {
      track_id: 'TRBZLRH13FFEF952DC',
      file:     'music/2-09 Reel 4 Break 3.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 4 Break 3'
    },
    {
      track_id: 'TRSBELX13FFEFA0C12',
      file:     'music/2-10 Reel 12 Break 2.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 12 Break 2'
    },
    {
      track_id: 'TRWWZBL13FFEFAECC1',
      file:     'music/2-11 Reel 6 Break 5.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 6 Break 5'
    },
    {
      track_id: 'TRFMTHG13FFEFBB2D5',
      file:     'music/2-12 Reel 3 Break 3.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 3 Break 3'
    },
    {
      track_id: 'TRFEDOS13FFEFC8CF7',
      file:     'music/2-13 Reel 7 Break 1.mp3',
      artist:   'Pretty Lights',
      title:    'Reel 7 Break 1'
    },
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

console.log("TRACKS", CONFIG.TRACKS);
