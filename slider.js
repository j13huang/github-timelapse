var commitData = null;
var changeCommitHash = function() {
  var commitHash = commitData[this.value].sha;
  $("#timelapse-commit").val(commitHash);

  var githubBlameURL = "https://github.com/" + urlData.repo + "/blame/" + commitHash + "/" + urlData.filepath;
  $.ajax(githubBlameURL)
  .then(
    function(data) {
      //console.log('page content: ' + data);
      var blameContents = $(data).find(".file");
      $(".file").replaceWith(blameContents);
      
    }, function(err) {
      console.log("ERROR: " + err);
    }
  );
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
