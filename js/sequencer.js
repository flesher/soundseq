//
// the sequencer
//
function Sequencer(track) {
  self = this;

  // properties
  this.phase    = 0;
  this._track   = track;
  this.handlers = {};
  this._loaded  = false;
  this._trackReady = false;

  // sequences starter pack
  this._starterPack = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7]
  ];
}

//
// private methods
//

// the main play loop
Sequencer.prototype._playLoop = function() {
  if (this.playing && this._sequence && this._sectionBeats && this._loaded) {
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

// get/set the track
Sequencer.prototype.track = function(idx) {
  if (idx === undefined) {
    return this._trackIdx;
  }
  else if (idx != this._trackIdx) {
    var self = this;
    this._trackIdx    = idx;
    this._loaded      = false;
    this._trackReady  = false;
    this._sectionIdx  = undefined;
    this._sequenceIdx = undefined;

    // load track
    this._track = new Track(idx);
    this._track.ready(function() {
      self._trackReady = true;
      if (self._loaded && self._trackReady) {
        self.section(0);
        self.sequence(0);
        self.fire('ready');
      }
    });

    // init sound
    this.howl = new Howl({
      urls: [this._track.file],
      autoplay: false,
      onload: function() {
        self._loaded = true;
        if (self._loaded && self._trackReady) {
          self.section(0);
          self.sequence(0);
          self.fire('ready');
        }
      }
    });
  }
}

// start/stop recording
Sequencer.prototype.record = function() {
  if (this._armed) {
    this._rec.stop();
    this._armed = false;

    // initialize client with app credentials
    // SC.initialize({
    //   client_id: '9b7291a67b6cf337be413154874a4f90',
    //   redirect_uri: 'http://localhost:8888/music-hack-day/#sequencer'
    // });

    // initiate auth popup
    // SC.connect(function() {
    //   SC.get('/me', function(me) {
    //     alert('Hello, ' + me.username);
    //   });
    // });

    // save the wav file
    this._rec.exportWAV(function(blob) {
      console.log('DONE RECORDING', blob);
    });
  }
  else {
    this._rec = new Recorder(this.howl._audioNode[0]);
    this._rec.record();
    this._armed = true;
  }
}

// get/set the current section
Sequencer.prototype.section = function(idx) {
  if (idx === undefined) {
    return this._sectionIdx;
  }
  else if (idx != this._sectionIdx) {
    this._sectionIdx = idx;
    this._sectionBeats = {
      one:   this._track.beat(idx, 0),
      two:   this._track.beat(idx, 1),
      three: this._track.beat(idx, 2),
      four:  this._track.beat(idx, 3),
      five:  this._track.beat(idx, 4),
      six:   this._track.beat(idx, 5),
      seven: this._track.beat(idx, 6),
      eight: this._track.beat(idx, 7)
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
    if (this._starterPack[this._sequenceIdx]) {
      this._starterPack[this._sequenceIdx] = this._sequence;
    }
    this._sequenceIdx = idx;
    this._sequence = this._starterPack[idx];
  }
}

// reset the current sequence back to default
Sequencer.prototype.reset = function() {
  this._sequence = [0, 1, 2, 3, 4, 5, 6, 7];
  this._starterPack[this._sequenceIdx] = this._sequence;
}

// replace the next phase in the sequence
Sequencer.prototype.replace = function(part) {
  if (this._sequence) {
    this._sequence[this.phase] = part;
    console.log(this._sequence);
  }
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
