


function createTweetElement(tweetData) {
    const $article = $("<article class='tweeting'>");
    const $header = $("<header>");
    const $img = $("<img class='avatar' src='" + tweetData.user.avatars.regular + "'/>");
    const $fullName = $("<h2> "+ tweetData.user.name +" </h2>");
    const $username= $("<span class='user-name'>" + tweetData.user.handle + "</span>");
    const $tweetMsg = $("<p class='tweetmsg'>").text(tweetData.content.text);
    const $footer = $("<footer>");
    const $timeStamp = $("<span class='time-stamp'>" + timeSince(tweetData.created_at) + "ago" + "</span>");
    const $icons = $("<div class='icons'>");  
    const $heartIcon = $("<i id='heart' class='fa fa-heart' aria-hidden='true'></i>");
    const $flagIcon = $("<i class='fa fa-flag' aria-hidden='true'></i>");
    const $retweetIcon = $("<i id='id' class='fa fa-retweet' aria-hidden='true'></i>");

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
  }).done(renderTweets);
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
      return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
 };

$("nav input").on("click", function(event) { 
  console.log("Click Event", event)
  $(".new-tweet").toggle();
});


$(".new-tweet form").on("submit", function(e){
  e.preventDefault();
  if (checkValidation($(".new-tweet textarea").val())) {
    let tweetData = ($("form").serialize() );
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweetData
    }).done(function(){
      loadTweets()
      $(".new-tweet textarea").val("")
    })
  } else {
    console.log("Not working")
  }
});