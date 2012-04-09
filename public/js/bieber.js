function withUnits(num) {
    var unitForPower = {
	0: { name: '',      divisor: 1 },
	1: { name: 'deca',  divisor: 10 },
	2: { name: 'hecto', divisor: 100 },
	3: { name: 'kilo',  divisor: 1000 },
	6: { name: 'mega',  divisor: 1000000 },
	9: { name: 'giga',  divisor: 1000000000 }
    };
    if (num) {
	var power = Math.floor(Math.log(num) / Math.log(10));
	while (power > 0 && !unitForPower[power]) {
	    power = power - 1;
	}
	var unit = unitForPower[power];
	return { value: num / unit.divisor, unit: unit.name };
    }
    else {
	return { value: num, unit: '' };
    }
}

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

    this.bieberRate = ko.observable(30);
    this.userAgeInMiniBiebers = ko.computed(function() {
	var biebers = Math.floor((this.validUserAge() * this.SECONDS_PER_YEAR) / this.bieberRate());
	return withUnits(biebers);
    }, this);
}

ko.applyBindings(new BieberAppModel());
