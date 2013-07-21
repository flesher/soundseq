var alpha, beta, gamma;

window.ondeviceorientation = function(event) {
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta) 
  gamma = Math.round(event.gamma);
  console.log(alpha + ' ' + beta + ' ' + gamma);
}

if (beta < 10 && beta > -10) sequencer.sequence(0);
if (beta > 10) sequencer.sequence(1);
if (beta < -10) sequencer.sequence(2);