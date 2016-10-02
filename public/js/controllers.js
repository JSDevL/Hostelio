myApp.controller('login', function($scope){
});

myApp.controller('application', function($scope, $http){
    $scope.postForm = function(){
        $http.post('/api', $scope.applicant)
            .then(function(response){
                //if successful
                console.log(response);
            }, function(response){
                //if failed
            });
    };
});
