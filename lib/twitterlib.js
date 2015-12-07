var FS = require('fs');
var Twitter = require('ntwitter');
var Config = require('./config');

var config = Config.twitter;

var twitterlib = {

  fetchLastTweet: function(screenName, callback) {

    var twclient = new Twitter({
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      access_token_key: config.accessTokenKey,
      access_token_secret: config.accessTokenSecret
    });

    twclient.get('/statuses/user_timeline.json', {
      screen_name: screenName
    }, function(err, data) {
      if (err) {
          return callback(err, null);
      } else {
        return callback(err, data[0]);
      }
    });
  }
}

module.exports = twitterlib;

twitterlib.fetchLastTweet(config.account, function(error, tweet) {
  if (!error)
    FS.writeFileSync('./data/tweet.json', JSON.stringify(tweet, null, 2));
  else {
    FS.mkdirSync('./logs');
    FS.writeFileSync('./logs/twitterlib.log', error.toString());
  }
})
