myApp = angular.module("myApp",['ngRoute','ngMessages']);

myApp.config( function( $routeProvider ) {

    $routeProvider

    .when('/' , {
        templateUrl : 'users/all/login.html',
        controller : "login"
    })

    .when('/applicants/application' , {
        templateUrl : 'users//applicants/application-form.html',
        controller : "application"
    })

});
