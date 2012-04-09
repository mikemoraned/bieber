function BieberAppModel() {
    this.bieberBornAt = Date.parse("Tue, 1 Mar 1994 00:00:00 GMT"); // I honestly don't know what hour
    this.currentTime = new Date();
    this.bieberAge = Math.floor((this.currentTime - this.bieberBornAt) / (365 * 24 * 60 * 60 * 1000.0));
    this.userAge = ko.observable();
    this.userAgeInBigBiebers = ko.computed(function() {
	return Math.floor(parseFloat(this.userAge()) / this.bieberAge);
    }, this);
}

var model = new BieberAppModel();
ko.applyBindings(model);
