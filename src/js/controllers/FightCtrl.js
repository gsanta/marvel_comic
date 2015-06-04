
var services = {};

var FightCtrl = function($interval, Fighter, $routeParams, CharacterApi) {
    services = {
        $interval: $interval,
        Fighting: Fighting,
        $routeParams: $routeParams,
        CharacterApi: CharacterApi
    };

    this.redCorner = {};
    this.blueCorner = {};

    this.leftHighlight = false;
    this.rightHighlight = false;

    this.initController();
};

FightCtrl.prototype.fight = function() {
    this.rightHighlight = this.leftHighlight = false;
    this.rightHighlight = !this.rightHighlight;

    var interval = services.$interval(() => {
        this.rightHighlight = !this.rightHighlight;
        this.leftHighlight = !this.leftHighlight;
    }, 200);

    services.Fighting.fight().then((isWinnerTheLeft) => {
        services.$interval.cancel(interval);
        this.rightHighlight = this.leftHighlight = false;
        isWinnerTheLeft ? this.leftHighlight = true : this.rightHighlight = true;
    });
};

FightCtrl.prototype.initController = function() {
    this.loadCharacter(services.$routeParams.redCornerId).success((data) => {
        this.redCorner = data.data.results[0];
    });
    this.loadCharacter(services.$routeParams.blueCornerId).success((data) => this.blueCorner = data.data.results[0]);
};

FightCtrl.prototype.loadCharacter = function(id) {
    return services.CharacterApi.getById(id);
}

module.exports = FightCtrl;