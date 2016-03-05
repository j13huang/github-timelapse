var getURLData = function() {
  var permalink = $(".js-permalink-shortcut")[0];
  var urlTokens = permalink.getAttribute("href").split("/");
  return {
    repo: urlTokens.slice(1, 3).join('/'),
    commitHash: urlTokens[4],
    filepath: urlTokens.slice(5).join('/')
    };
}

var urlData = getURLData();
var githubApiUrl = "https://api.github.com/repos/j13huang/github-timelapse/git/commits/" + urlData.commitHash;
var githubBlameURL = "https://github.com/j13huang/github-timelapse/blame/" + urlData.commitHash + "/README.md"
console.log(urlData.commitHash);
$.ajax("https://api.github.com/repos/j13huang/github-timelapse/commits?path=README.md")
.then(
  function(data) {
    //console.log('page content: ' + data);
    console.log(data);
    if (data.length > 0) {
      insertSlider(data);
    }
  }, function(err) {
    console.log("ERROR: " + err);
  }
);
console.log("done");
