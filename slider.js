var commitData = null;
var changeCommitHash = function() {
  var sha = commitData[this.value].sha;
  $("#timelapse-commit").val(sha);
}

var insertSlider = function(data) {
  commitData = data;
  $("<div/>", {
    id: "timelapse",
  }).insertBefore(".file");

  var slider = $("<input/>", {
    type: "range",
    min: 0,
    max: commitData.length - 1,
    value: commitData.length - 1,
    id: "timelapse-slider",
    step: 1,
    style: "width: 100%"
  }).appendTo("#timelapse");
  slider.on("input", changeCommitHash);

  /*
  $("<label/>", {
    "for": "timelapse",
    text: "commit"
  }).appendTo("#timelapse");
  */
  $("<output/>", {
    "for": "timelapse-slider",
    id: "timelapse-commit",
    text: commitData[0].sha
  }).appendTo("#timelapse");
}
