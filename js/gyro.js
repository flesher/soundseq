window.ondeviceorientation = function(event) {
  var alpha = Math.round(event.alpha);
  var beta = Math.round(event.beta)
  var gamma = Math.round(event.gamma);
  console.log(alpha + ' ' + beta + ' ' + gamma);
}

