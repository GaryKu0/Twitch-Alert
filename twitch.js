var PastFollowers = [];
//var userID = "254221656";
function init() {
  var url = "https://api.twitch.tv/helix/users/follows?to_id=" + userID;
  var headers = {
    "Client-ID": ClientID,
    Accept: "application/vnd.twitchtv.v5+json",
    Authorization: "Bearer "+Bearer,
  };
  axios.get(url, { headers: headers }).then(function (response) {
    var data = response.data;
    var RecentFollowers = data["data"];
    var followers = [];
    for (var i = 0; i < RecentFollowers.length; i++) {
      followers.push(
        RecentFollowers[i]["from_name"] + "," + RecentFollowers[i]["from_id"]
      );
    }
    console.log(followers);
    //check if new followers have been added
    for (var i = 0; i < followers.length; i++) {
      if (PastFollowers.indexOf(followers[i]) == -1) {
        PastFollowers.push(followers[i]);
      }
    }
    PastFollowers = followers;
  });
}
function getFollowers() {
  var url = "https://api.twitch.tv/helix/users/follows?to_id=" + userID;
  var headers = {
    "Client-ID": ClientID,
    Accept: "application/vnd.twitchtv.v5+json",
    Authorization: "Bearer ih3c2ohybwdp2jkn1u14tgqqhxg3lf",
  };
  axios.get(url, { headers: headers }).then(function (response) {
    var data = response.data;
    var RecentFollowers = data["data"];
    var followers = [];
    for (var i = 0; i < RecentFollowers.length; i++) {
      followers.push(
        RecentFollowers[i]["from_name"] + "," + RecentFollowers[i]["from_id"]
      );
    }
    console.log(followers);
    //check if new followers have been added
    for (var i = 0; i < followers.length; i++) {
      if (PastFollowers.indexOf(followers[i]) == -1) {
        PastFollowers.push(followers[i]);
        console.log(followers[i] + " has followed!");
        twitchAlert(followers[i]);
      }
    }
    PastFollowers = followers;
  });
}

var alertF =
  '<div class="alert" ata-aos="fade-right"><div class="pfp"><img src="profile_image_url" alt="pfp" width="75" height="75"></div><div class="text"><h3>New Follower✨</h3><h2>@Follower</h2></div></div>';

function twitchAlert(follower) {
  //replace @Follower with follower name
  var followerName = follower.split(",")[0];
  var followerID = follower.split(",")[1];
  var alertFf = alertF.replace("@Follower", followerName);
  console.log(alertFf);
  var url = "https://api.twitch.tv/helix/users/?id=" + followerID;
  var headers = {
    "Client-ID": ClientID,
    Accept: "application/vnd.twitchtv.v5+json",
    Authorization: "Bearer ih3c2ohybwdp2jkn1u14tgqqhxg3lf",
  };
  axios.get(url, { headers: headers }).then(function (response) {
    var data = response.data;
    var user = data["data"][0];
    var pfp = user["profile_image_url"];
    alertFf = alertFf.replace("profile_image_url", pfp);
    document.getElementById("main").innerHTML = alertFf+document.getElementById("main").innerHTML;
    //play sound
    var audio = new Audio("./sound/alert-1.wav");
    audio.play();
    try{
        window.clearTimeout(timeoutHandle);
    }
    catch(err){
        //ignore
    }
    var cleanAlert=setTimeout(function () {
        document.getElementById("main").innerHTML = "";
      }, 10000);
  });
}

