myApp = angular.module("myApp",['ngRoute','ngMessages']);

myApp.config( function( $routeProvider ) {

    $routeProvider

    .when('/' , {
        templateUrl : 'users/all/login.html',
        controller : "login"
    })

    .when('/applicants/application' , {
        templateUrl : 'users/applicants/application-form.html',
        controller : "application"
    })
    
    .when('/admin/biodata' , {
        templateUrl : 'users/admin/biodata/biodata.html',
        controller : "bioCtrl"
    })
    
    .when('/admin/chapel' , {
        templateUrl : 'users/admin/chapel.html',
        controller : "chapelCtrl"
    })
    
    .when('/admin/mess' , {
        templateUrl : 'users/admin/mess.html',
        controller : "messCtrl"
    })
    
    .when('/admin/announ' , {
        templateUrl : 'users/admin/announcements.html',
        controller : "announCtrl"
    })
    

});