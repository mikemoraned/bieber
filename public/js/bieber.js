function BieberAppModel() {
    this.SECONDS_PER_YEAR = (365 * 24 * 60 * 60);
    this.MILLIS_PER_YEAR = (this.SECONDS_PER_YEAR * 1000.0);

    this.bieberBornAt = Date.parse("Tue, 1 Mar 1994 00:00:00 GMT"); // I honestly don't know what hour
    this.currentTime = new Date();
    this.bieberAge = Math.floor((this.currentTime - this.bieberBornAt) / this.MILLIS_PER_YEAR);

    this.userAge = ko.observable();

    this.haveBigBieberAge = ko.observable(false);
    this.userAgeInBigBiebers = ko.computed(function() {
	var validAge = parseFloat(this.userAge());
	if (validAge) {
	    this.haveBigBieberAge(true);
	    return Math.floor(validAge / this.bieberAge);
	} else {
	    this.haveBigBieberAge(false);
	}
    }, this);

    this.bieberRate = ko.observable(3);
    this.haveMiniBieberAge = ko.observable(false);
    this.userAgeInMiniBiebers = ko.computed(function() {
	var validAge = parseFloat(this.userAge());
	if (validAge) {
	    this.haveMiniBieberAge(true);
	    return Math.floor((validAge * this.SECONDS_PER_YEAR) / this.bieberRate());
	} else {
	    this.haveMiniBieberAge(false);
	}
    }, this);

}

var model = new BieberAppModel();
ko.applyBindings(model);
