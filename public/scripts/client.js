/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// appends tweets to tweets-container section
const renderTweets = (tweets) => {
  $(document).ready(function() {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet); // to see what it looks like
      $('#tweets-container').append($tweet);
    }
  });
};


// creates tweet markup from tweet object
const createTweetElement = (tweet) => {
  const $tweet = `
    <article>
      <header>
        <div>
          <img src="${tweet.user.avatars}">
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>${tweet.created_at}</span>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article> `;
  return $tweet;
};

renderTweets(data);