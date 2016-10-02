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


myApp.controller("bioCtrl",["$scope", "dbServices", function($scope, dbServices){

    dbServices.get("applicantList", function(obj){
		
		$scope.$apply(function(){
        	$scope.applicantList = obj;
		
			for( key in $scope.applicantList )
			{
				$scope.applicantList[key].alloted = "Allot";
			}
			
			getAllotedList();
		});
		
    });
	
	var getAllotedList = function(){
		dbServices.get("allotedList", function(obj){
			$scope.$apply(function(){
				$scope.allotedList = obj;

				for( key in $scope.allotedList )
				{	
					if( $scope.applicantList[key] )
					{
						$scope.applicantList[key].alloted = "Alloted";
					}
				}
			});
		});
	};
   
    $scope.allotBtn = function( applicantKey, applicant ){
        if( applicant.alloted == "Alloted" )
        {
            applicant.alloted = "Allot";
            
            dbServices.delete( "allotedList/" + applicantKey );
            dbServices.delete( "generalList/" + applicantKey );
            if(applicant.religion.toUpperCase() == "CHRISTIAN")
                dbServices.delete( "chapelList/" + applicantKey );
        }
        else
        {
            applicant.alloted = "Alloted";
            
            var toSet = {};
            toSet.alloted = "Alloted";
            
			dbServices.set( "allotedList/" + applicantKey , toSet );
            
			
            var general = {};
            general.name = applicant.name;
            general.regNo = applicant.regNo;
            general.phNo = applicant.phNo;
            general.religion = applicant.religion;
            
            dbServices.set( "generalList/" + applicantKey , general );
            
            
            if(applicant.religion.toUpperCase() == "CHRISTIAN")
            {
                var chapel = {};
                chapel.name = applicant.name;
                chapel.regNo = applicant.regNo;
                chapel.phNo = applicant.phNo;
                chapel.isCatholic = applicant.isCatholic;
                
                dbServices.set( "chapelList/" + applicantKey , chapel );
            }
        }
  	};  
}]);


myApp.controller("chapelCtrl",["$scope","$timeout","dbServices" ,function($scope,$timeout,dbServices){
    
    dbServices.get("chapelList", function(obj){
        $timeout(function() {
            $scope.chapelList = obj;
        });
    });
	
	$scope.updateChapel = function()
	{
		dbServices.update( 'chapelList/', $scope.chapelList, function(){} );
	}
	
}]);


myApp.controller("messCtrl",["$scope","$timeout","dbServices" ,function($scope,$timeout,dbServices){
	
    dbServices.get("generalList", function(obj){
        $timeout(function() {
            $scope.messList = obj;
        })
    });
	
	dbServices.get("chapelList", function(obj){
        $timeout(function() {
            $scope.chapelList = obj;
        })
    });
	
	$scope.updateMess = function()
	{
		dbServices.update( 'generalList', $scope.messList, function(){} );
	}
	
	$scope.toggleToMake = function(makerKey)
	{
		makerKey.toMake = !makerKey.toMake;
	}
	
	$scope.toggleHasRead = function(reader)
	{
		reader.hasRead = !reader.hasRead;
	}
    
}]);


myApp.controller('anounCtrl',["$scope","$timeout","dbServices",function($scope,$timeout,dbServices){

	$scope.post = {
	
		title : "",
		content : "" 

	};
	
	$scope.submitPost = function()
	{
		console.log("Clicked");
		dbServices.push( "announcements", $scope.post);
	}
	
}]);