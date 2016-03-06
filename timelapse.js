var getURLData = function() {
  var permalink = $(".repository-content a")[0];
  var urlTokens = permalink.getAttribute("href").split("/");
  return {
    username: urlTokens[1],
    repo: urlTokens.slice(1, 3).join('/'),
    commitHash: urlTokens[4],
    filepath: urlTokens.slice(5).join('/')
    };
}

var urlData = getURLData();
$.ajax("https://api.github.com/repos/" + urlData.repo + "/commits?path=" + urlData.filepath)
.then(
  function(data) {
    //console.log(data);
    if (data.length > 0) {
      insertSlider(data);
    }
  }, function(err) {
    console.log("ERROR: " + err);
  }
);
