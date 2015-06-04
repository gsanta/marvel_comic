
var services = {};

var Fighting = function($timeout, $q) {
    services = {
        $timeout: $timeout,
        $q: $q
    };

    return {
        fight: fight
    }
};

function fight() {
    return services.$q( resolve => services.$timeout(() => resolve(getWinner()), getFightDuration()));
}

function getFightDuration() {
    return parseInt(Math.random() * 3000, 10) + 1000;
}

function getWinner() {
    return Math.round(Math.random());
}

module.exports = Fighting;