
var CharacterBox = function() {
    return {
        restrict: 'E',
        scope: {
            actionLeft: '&',
            actionRight: '&',
            imgUrl: "=",
            description: "=",
            data: "="
        },
        templateUrl: 'templates/directives/character_box.html',
        link: function(element, attr) {

        }
    }
};

module.exports = CharacterBox;