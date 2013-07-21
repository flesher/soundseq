//
// strategies for getting sections from a track
//

// take that, global namespace!
STRATEGY = {};

// use the sections returned by echonest
STRATEGY.sections = function(analysis, threshold, numBeats) {

}

// use the bars returned by echonest
STRATEGY.bars = function(analysis, threshold, numBeats) {
  var sections = [], beatIndex = 0;

  _.each(analysis.bars, function(bar, idx) {
    if (bar.confidence >= threshold) {
      var newSection = {
        start: bar.start,
        startBar: idx,
        beats: []
      }

      // find some beats in this section
      for (beatIndex; beatIndex <= analysis.beats.length; beatIndex++) {
        var beat = analysis.beats[beatIndex];
        if (beat.start >= newSection.start) {
          newSection.beats = analysis.beats.slice(beatIndex, beatIndex + numBeats);
          break;
        }
      }

      // must have minimum beats to actually be a section
      if (newSection.beats.length == numBeats) {
        sections.push(newSection);
      }
    }
  });

  return sections;
}

// use the beats returned by echonest
STRATEGY.beats = function(analysis, threshold, numBeats) {
  var sections = [];

  for (var idx=0; idx<analysis.beats.length; idx++) {
    var beat = analysis.beats[idx];

    if (beat.confidence >= threshold) {
      var newSection = {
        start: beat.start,
        startBeat: idx,
        beats: []
      }

      // find some beats in this section
      newSection.beats = analysis.beats.slice(idx, idx + numBeats);

      // must have minimum beats to actually be a section
      if (newSection.beats.length == numBeats) {
        sections.push(newSection);
      }
      idx += (numBeats - 1);
    }
  }

  return sections;
}

// just split the whole stupid thing up
STRATEGY.all = function(analysis, numBeats) {
  var sections = [];

  // which beat does the SECOND section start on?
  var startBeat = 0;
  var secStart = analysis.sections.length > 1 ? analysis.sections[1].start : 0;
  for (var i = 0; i < analysis.beats.length; i++) {
    if (analysis.beats[i].start >= secStart) {
      startBeat = i;
      break;
    }
  }

  // start on a modular of that 2nd section start
  var idx = startBeat % numBeats;
  console.log('starting song on beat ' + idx);

  // break into numBeats groupings
  for (idx; idx < analysis.beats.length; idx += numBeats) {
    var beat = analysis.beats[idx];
    var newSection = {
      start: beat.start,
      startBeat: idx,
      beats: analysis.beats.slice(idx, idx + numBeats)
    }

    // must have minimum beats to actually be a section
    if (newSection.beats.length == numBeats) {
      sections.push(newSection);
    }
  }

  return sections;
}
