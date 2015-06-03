
var Fighter = require("../services/Fighter");

var services = {}

var FightCtrl = function(redCorner, blueCorner, $interval, Fighter) {
    services = {
        redCorner: redCorner,
        blueCorner: blueCorner,
        $interval: $interval,
        Fighter: Fighter
    };

    this.redCorner = redCorner.data.data.results[0];
    this.blueCorner = blueCorner.data.data.results[0];

    this.leftHighlight = false;
    this.rightHighlight = false;
};

FightCtrl.prototype.fight = function() {
    this.rightHighlight = this.leftHighlight = false;
    this.rightHighlight = !this.rightHighlight;

    var interval = services.$interval(() => {
        this.rightHighlight = !this.rightHighlight;
        this.leftHighlight = !this.leftHighlight;
    }, 200);

    services.Fighter.fight().then((isWinnerTheLeft) => {
        services.$interval.cancel(interval);
        this.rightHighlight = this.leftHighlight = false;
        isWinnerTheLeft ? this.leftHighlight = true : this.rightHighlight = true;
    });
}

module.exports = FightCtrl;