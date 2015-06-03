
var Router = {
    list: {
        templateUrl: 'dist/templates/character_selection.html',
        controller: 'CharacterSelectionCtrl',
        controllerAs: 'characters'
    },

    fight: {
        templateUrl: 'dist/templates/fight.html',
        controller: 'FightCtrl',
        controllerAs: 'fight'
    }
};

module.exports = Router;
