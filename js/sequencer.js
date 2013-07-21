//
// the sequencer
//
function Sequencer(track) {
  self = this;

  // properties
  this.phase    = 0;
  this.track    = track;
  this.handlers = {};

  // init playback
  this.howl = new Howl({
    urls: [track.file],
    autoplay: false,
    onload: function() {
      self._loaded = true;
      if (self.playing) self._playLoop();
    }
  });

  // init sequence/section
  track.ready(function() {
    self.section(0);
    self.sequence(0);
    if (self.playing) self._playLoop();
  });

}

//
// private methods
//

// the main play loop
Sequencer.prototype._playLoop = function() {
  if (this.playing && this._sequence && this._loaded) {
    var beatNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    var beatIdx   = this._sequence[this.phase];
    var beatName  = beatNames[beatIdx];
    var beatDur   = this._sectionBeats[beatName][1];

    // play the sound
    this.howl.play(beatName);
    this.fire('beat', this.phase, beatIdx);

    // increment phase and delay
    this.phase = (this.phase + 1) % 8;
    _.delay(_.bind(this._playLoop, this), beatDur);
  }
}

//
// public methods
//

// event handling (single - TODO multiple)
Sequencer.prototype.on = function(event, callback, scope) {
  this.handlers[event] = _.bind(callback, scope || this);
}
Sequencer.prototype.off = function(event, callback) {
  delete this.handlers[event];
}
Sequencer.prototype.fire = function(event) {
  if (this.handlers[event]) this.handlers[event].apply(this, _.rest(arguments))
}

// get/set the current section
Sequencer.prototype.section = function(idx) {
  if (idx === undefined) {
    return this._sectionIdx;
  }
  else if (idx != this._sectionIdx) {
    this._sectionIdx = idx;
    this._sectionBeats = {
      one:   this.track.beat(idx, 0),
      two:   this.track.beat(idx, 1),
      three: this.track.beat(idx, 2),
      four:  this.track.beat(idx, 3),
      five:  this.track.beat(idx, 4),
      six:   this.track.beat(idx, 5),
      seven: this.track.beat(idx, 6),
      eight: this.track.beat(idx, 7)
    };
    this.howl.sprite(this._sectionBeats);
  }
}

// get/set the current sequence
Sequencer.prototype.sequence = function(idx) {
  if (idx === undefined) {
    return this._sequenceIdx;
  }
  else if (idx != this._sequenceIdx) {
    this._sequenceIdx = idx;

    var sequences = [
      [0,1,2,3,4,5,6,7],
      [0,0,2,2,3,3,4,4],
      [7,6,5,4,3,2,1,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [2,2,2,2,2,2,2,2]
    ];

    this._sequence = sequences[idx];
  }
}

Sequencer.prototype.update = function(part) {
  var phs = this.phase;
  var len = this._sequence.length - part;
  for (var i = phs; i < len; i++){
    this._sequence[i] = part  + (i - phs);
  }

  console.log(this._sequence);
}

// start playback
Sequencer.prototype.play = function() {
  if (!this.playing) {
    this.playing = true;
    this._playLoop();
  }
}

// pause playback
Sequencer.prototype.pause = function() {
  if (this.playing) {
    this.playing = false;
    this.howl.stop();
  }
}
