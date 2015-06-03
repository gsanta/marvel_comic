
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
        templateUrl: 'dist/templates/directives/character_box.html',
        link: function(scope, element, attr) {

            scope.isActionLeftHidden = attr.actionLeft ? false : true;
            scope.isActionRightHidden = attr.actionRight ? false : true;
        }
    }
};

module.exports = CharacterBox;