describe("wordrate", function() {
    var fh = require("../../../lib/firehose");
    var ev = require('events');
    var sink;
    var source;
    var notifications = 0;
    var lastRateInfo;

    beforeEach(function () {
	source = new ev.EventEmitter;
	sink = new ev.EventEmitter;
	sink.on('rate-change', function(rateInfo) {
	    notifications += 1;
	    lastRateInfo = rateInfo;
	});
	fh.wordrate('daword', source, sink);
    });

    it("should report rate over multiple tweets in separate seconds", function() {
	source.emit('tweet', { text: "this has daword", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	source.emit('tweet', { text: "daword", date: Date.parse("Tue, 1 Mar 1994 01:00:00 GMT") });
	expect(lastRateInfo.count).toEqual(2);
	expect(lastRateInfo.duration).toEqual(60 * 60);
	expect(notifications).toEqual(1);
    });

    it("duration is based on time all tweets seen, not just matches", function() {
	source.emit('tweet', { text: "this isn't a match", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	source.emit('tweet', { text: "this has daword", date: Date.parse("Tue, 1 Mar 1994 01:00:00 GMT") });
	expect(notifications).toEqual(1);
	source.emit('tweet', { text: "daword", date: Date.parse("Tue, 1 Mar 1994 02:00:00 GMT") });
	expect(notifications).toEqual(2);
	source.emit('tweet', { text: "this isn't a match", date: Date.parse("Tue, 1 Mar 1994 03:00:00 GMT") });
	expect(notifications).toEqual(3);
	expect(lastRateInfo.count).toEqual(2);
	expect(lastRateInfo.duration).toEqual(60 * 60 * 3);
    });

    it("should ignore multiple mentions in a single tweet", function() {
	source.emit('tweet', { text: "this has daword", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	source.emit('tweet', { text: "daword daword daword", date: Date.parse("Tue, 1 Mar 1994 01:00:00 GMT") });
	expect(notifications).toEqual(1);
	expect(lastRateInfo.count).toEqual(2);
	expect(lastRateInfo.duration).toEqual(60 * 60);
    });

    it("should report nothing when nothing is seen", function() {
	expect(notifications).toEqual(0);
    });

    it("should not report rate on single tweet, when tweet contains word", function() {
	source.emit('tweet', { text: "this contains daword", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	expect(notifications).toEqual(0);
    });

    it("should ignore tweets that don't contain the word", function() {
	source.emit('tweet', { text: "this doesn't contain the right word", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	source.emit('tweet', { text: "neither does this", date: Date.parse("Tue, 1 Mar 1994 01:00:00 GMT") });
	expect(notifications).toEqual(0);
    });

    it("should only match when word is on it's own (ignore as substring)", function() {
	source.emit('tweet', { text: "this has dawordatstart", date: Date.parse("Tue, 1 Mar 1994 00:00:00 GMT") });
	source.emit('tweet', { text: "this is endedwithdaword", date: Date.parse("Tue, 1 Mar 1994 01:00:00 GMT") });
	source.emit('tweet', { text: "this is containsdawordwithin", date: Date.parse("Tue, 1 Mar 1994 02:00:00 GMT") });
	expect(notifications).toEqual(2);
	expect(lastRateInfo.count).toEqual(0);
	expect(lastRateInfo.duration).toEqual(60 * 60 * 2);
    });
});