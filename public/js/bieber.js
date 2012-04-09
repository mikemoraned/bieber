function BieberAppModel() {
    this.SECONDS_PER_YEAR = (365 * 24 * 60 * 60);
    this.MILLIS_PER_YEAR = (this.SECONDS_PER_YEAR * 1000.0);

    this.bieberBornAt = Date.parse("Tue, 1 Mar 1994 00:00:00 GMT"); // I honestly don't know what hour
    this.currentTime = new Date();
    this.bieberAge = Math.floor((this.currentTime - this.bieberBornAt) / this.MILLIS_PER_YEAR);

    this.userAge = ko.observable();
    this.haveValidUserAge = ko.observable(false);
    this.validUserAge = ko.computed(function() {
	var validAge = parseFloat(this.userAge());
	if (validAge) {
	    this.haveValidUserAge(true);
	    return validAge;
	} else {
	    this.haveValidUserAge(false);
	}
    }, this)

    this.userAgeInBigBiebers = ko.computed(function() {
	return Math.floor(this.validUserAge() / this.bieberAge);
    }, this);

    this.bieberRate = ko.observable(3);
    this.userAgeInMiniBiebers = ko.computed(function() {
	return Math.floor((this.validUserAge() * this.SECONDS_PER_YEAR) / this.bieberRate());
    }, this);
}

var model = new BieberAppModel();
ko.applyBindings(model);
haveValidUserAge