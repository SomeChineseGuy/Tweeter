


function createTweetElement(tweetData) {
    const $article = $("<article class='tweeting'>");
    const $header = $("<header>");
    const $img = $("<img class='avatar' src='" + tweetData.user.avatars.regular + "'/>");
    const $fullName = $("<h2> "+ tweetData.user.name +" </h2>");
    const $username= $("<span class='user-name'>" + tweetData.user.handle + "</span>");
    const $tweetMsg = $("<p class='tweetmsg'>").text(tweetData.content.text);
    const $footer = $("<footer>");
    const $timeStamp = $("<span class='time-stamp'>" + tweetData.created_at + "</span>");
    const $icons = $("<div class='icons'>");
    const $heartIcon = $("<span class='heart'>");
    const $flagIcon = $("<span class='flag'>");
    const $retweetIcon = $("<span class='retweet'>");

    $header.append($img, $fullName, $username);
    $icons.append($heartIcon, $flagIcon, $retweetIcon);
    $footer.append($timeStamp, $icons);

    $article.append($header, $tweetMsg, $footer);

    return $article;
}

$(function () {
    loadTweets();
})

function checkValidation (input) {
  return !(input.length > 140);
}


function renderTweets(tweets) {
  $("#other-tweets").empty();
  for (var i of tweets) {
    var article = createTweetElement(i);
    $("#other-tweets").prepend(article);
  }
}

function loadTweets (){
  $.ajax ({
    url: "/tweets",
    method: "GET",
  }).done(renderTweets)
}


$(".new-tweet form").on("submit", function(e){
  console.log("my submit");
  e.preventDefault();
  if (checkValidation($(".new-tweet textarea").val())) {
    let tweetData = ($("form").serialize() );
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweetData
    }).done(loadTweets)
  } else {
    console.log("Not working")
  }
});