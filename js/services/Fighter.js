

var Fighter = function($timeout, $q) {

    function fight() {

        return $q(function(resolve, reject) {
            $timeout(function() {
                resolve(Math.round(Math.random()));
            }, parseInt(Math.random() * 3000, 10));
        });

    }

    return {
        fight: fight
    }
};

module.exports = Fighter;