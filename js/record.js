var armed      = false;
var rec        = new Recorder(sequencer.howl._audioNode[0]);

function saveWav(blob){
  var soundFile = blob;
  return soundFile;
  console.log(soundFile);
}


//set key event when key is pressed
onKeyDown = function(evt) {
  console.log('down');

  if (evt.keyCode == 82) {
    evt.preventDefault(); 

    if (!armed) {
      rec.record(); 
      armed = true;
      console.log('begin');
    }
    else {
      console.log('end');
      rec.stop();
      rec.exportWAV(saveWav);
      armed = false;

    } 
  }
}

$(document).keydown(onKeyDown);