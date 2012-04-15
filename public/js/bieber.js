Tangle.formats.sibiebers = function (value) {
    var unitForPower = {
	0: { name: '',      divisor: 1 },
	1: { name: 'deca',  divisor: 10 },
	2: { name: 'hecto', divisor: 100 },
	3: { name: 'kilo',  divisor: 1000 },
	6: { name: 'mega',  divisor: 1000000 },
	9: { name: 'giga',  divisor: 1000000000 }
    };
    var power = Math.floor(Math.log(value) / Math.log(10));
    while (power > 0 && !unitForPower[power]) {
	power -= 1;
    }
    var unit = unitForPower[power];
    return value / unit.divisor + " " + unit.name + "biebers";
}

function setUpTangle() {
    var root = document.getElementById("root");

    var SECONDS_PER_YEAR = (365 * 24 * 60 * 60);
    var MILLIS_PER_YEAR = (SECONDS_PER_YEAR * 1000.0);

    var tangle = new Tangle(root, {
	ageNow: function(bornAt) {
	    var currentTime = new Date();
	    return Math.floor((currentTime - bornAt) / MILLIS_PER_YEAR);
	},

	initialize: function() {
	    this.bieberAge = this.ageNow(Date.parse("Tue, 1 Mar 1994 00:00:00 GMT")); // I honestly don't know what hour
	    this.userAge = this.ageNow(Date.parse("Fri, 14 Jun 1974 00:00:00 GMT"));
	    this.bieberRate = 30;
	},

	update: function() {
	    this.userAgeInBigBiebers = Math.floor(this.userAge / this.bieberAge);
	    this.userAgeInSIBiebers = Math.floor((this.userAge * SECONDS_PER_YEAR) / this.bieberRate);
	}
    });
}
