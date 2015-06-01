

var MainController = function($scope, $http) {
    $scope.characters = [];

    $scope.getComics = function() {
        $http.get('http://gateway.marvel.com/v1/public/characters?apikey=1eb21a7f360cea33e97b2113fe8a483f').
            success(function(data, status, headers, config) {
                console.log(data)
                $scope.characters = data.data.results;
                console.log("success")
            }).
            error(function(data, status, headers, config) {
                console.log(data)
                console.log("error")
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }

    $scope.filteredTodos = []
    $scope.currentPage = 1
    $scope.numPerPage = 10
    $scope.maxSize = 5;

    $scope.makeTodos = function() {
        $scope.todos = [];
        for (var i=1;i<=1000;i++) {
            $scope.todos.push({ text:"todo "+i, done:false});
        }
    };
    $scope.makeTodos();

    $scope.$watch("currentPage + numPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredTodos = $scope.todos.slice(begin, end);
    });


}

module.exports = MainController;