var logger = require('winston');

module.exports.wordrate = function(word, source, sink) {
    logger.info("monitoring word-rate for " + word);
    var rate = 0.0;
    var firstTweetSeenAt = undefined;
    source.on('tweet', function(tweet) {
	
    });
}