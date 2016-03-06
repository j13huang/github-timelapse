var commitData = null;
var changeBlame = function() {
  var currentCommit = commitData[this.value]
  var githubBlameURL = "https://github.com/" + urlData.repo + "/blame/" + currentCommit.sha + "/" + urlData.filepath;
  $.ajax(githubBlameURL)
  .then(
    function(data) {
      var blameContents = $(data).find(".file");
      $(".file").replaceWith(blameContents);
      updateCurrentCommitInfo(currentCommit);
    }, function(err) {
      console.log("ERROR: " + err);
    }
  );
}

var updateCurrentCommitInfo = function(currentCommit) {
  // sample blame commit line info
  /*
<td class="blame-commit-info" rowspan="2">
            <a href="/j13huang/github-timelapse/commit/516709928a5ded837fa2b44a2ba2ec4f8da26c42" class="blame-sha">5167099</a>
            <img alt="@j13huang" class="avatar blame-commit-avatar" height="32" src="https://avatars1.githubusercontent.com/u/1694429?v=3&amp;s=64" width="32">
            <span class="blame-commit-title"><a href="/j13huang/github-timelapse/commit/516709928a5ded837fa2b44a2ba2ec4f8da26c42" class="message" data-pjax="true" title="Initial commit">Initial commit</a></span>
            <div class="blame-commit-meta">
              <a href="/j13huang" class="muted-link" rel="author">j13huang</a> authored
              <time datetime="2015-10-24T06:45:22Z" is="relative-time" title="Oct 23, 2015, 11:45 PM PDT">on Oct 23, 2015</time>
            </div>
          </td>
   */
  $("#timelapse-current-hash").attr("href", currentCommit.html_url);
  $("#timelapse-current-hash").text(currentCommit.sha.slice(0, 7));

  $("#timelapse-current-avatar").attr("alt", "@" + currentCommit.author.login);
  $("#timelapse-current-avatar").attr("src", currentCommit.author.avatar_url);

  $("#timelapse-current-message").attr("href", currentCommit.html_url);
  $("#timelapse-current-message").attr("title", currentCommit.commit.message);
  $("#timelapse-current-message").text(currentCommit.commit.message);

  $("#timelapse-current-user").attr("href", "/" + currentCommit.author.login);
  $("#timelapse-current-user").text(currentCommit.author.login);

  var date = moment.tz(currentCommit.commit.author.date, moment.tz.guess());
  $("#timelapse-current-timestamp").attr("title", date.format("MMM D, YYYY, LT z"));
  if (date.isBefore(moment().subtract(29, 'days'))) {
    $("#timelapse-current-timestamp").text("on " + date.format("MMM D, YYYY"));
  }
  else {
    $("#timelapse-current-timestamp").text(date.fromNow());
  }
}

/*
 * mimic blame-commit-info
 */
var insertCurrentCommitContainer = function() {
  $("<label/>", {
    "for": "timelapse",
    style: "width: 100%",
    text: "Current Commit:"
  }).appendTo("#timelapse");

  $("<div class='blame-commit-info'>" +
      "<a id='timelapse-current-hash' class='blame-sha'/>" +
      "<img id='timelapse-current-avatar' class='blame-commit-avatar' width='32' height='32'/>" +
      "<span class='blame-commit-title'>" +
        "<a id='timelapse-current-message' class='message' data-pjax='true'/>" +
      "</span>" +
      "<div class='blame-commit-meta'>" +
        "<a id='timelapse-current-user' class='muted-link' rel='author'/> authored " +
        "<time id='timelapse-current-timestamp' is='relative-time'/>" +
      "</div>" +
    "</div>").appendTo("#timelapse");
}

var insertSlider = function(data) {
  commitData = data;
  commitData.reverse()
  $("<div/>", {
    id: "timelapse",
  }).insertBefore(".file");

  $("<datalist/>", {
    id: "timelapse-ticks"
  }).appendTo("#timelapse");
  for (var i = 0; i < commitData.length; i++) {
    $("<option/>", {text: i}).appendTo("#timelapse-ticks");
  }
  var slider = $("<input/>", {
    type: "range",
    min: 0,
    max: commitData.length - 1,
    value: commitData.length - 1,
    id: "timelapse-slider",
    list: "timelapse-ticks",
    step: 1,
    style: "width: 100%"
  }).appendTo("#timelapse").on("input", changeBlame);

  insertCurrentCommitContainer();
  var currentCommit = commitData[slider.val()];
  updateCurrentCommitInfo(currentCommit);
}
