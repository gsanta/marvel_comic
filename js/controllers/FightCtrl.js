
var Fighter = require("../services/Fighter");

var FightCtrl = function(redCorner, blueCorner, $interval, Fighter) {

    this.redCorner = redCorner.data.data.results[0];
    this.blueCorner = blueCorner.data.data.results[0];

    this.leftHighlight = false;
    this.rightHighlight = false;

    this.fight = function() {
        this.rightHighlight = this.leftHighlight = false;
        this.rightHighlight = !this.rightHighlight;

        var interval = $interval(() => {
            this.rightHighlight = !this.rightHighlight;
            this.leftHighlight = !this.leftHighlight;
        }, 200);

        Fighter.fight().then((isWinnerTheLeft) => {
            $interval.cancel(interval);
            this.rightHighlight = this.leftHighlight = false;
            isWinnerTheLeft ? this.leftHighlight = true : this.rightHighlight = true;
        });
    }
};

module.exports = FightCtrl;