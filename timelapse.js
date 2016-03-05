var permalink = $(".js-permalink-shortcut")[0];
var urlTokens = permalink.getAttribute("href").split("/");
var commitHash = urlTokens[4];
var filename = urlTokens[5];
var githubApiUrl = "https://api.github.com/repos/j13huang/github-timelapse/git/commits/" + commitHash;
var githubBlameURL = "https://github.com/j13huang/github-timelapse/blame/" + commitHash + "/README.md"
console.log(commitHash);
$.ajax("https://github.com/j13huang/github-timelapse")
.then(
  function(data) {
    console.log('page content: ' + data);
  }, function(err) {
    console.log("ERROR: " + err);
  }
);
console.log("done");

var insertSlider = function () {
  var blameDiv = $(".file");
  //blameDiv.before()
}
