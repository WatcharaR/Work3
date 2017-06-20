.controller('AppCtrl',function ($scope,$state,$ionicPopup){

	$scope.login={};
	var user="admin";
	var password="123456";
	$scope.doLogin=function(){	
		console.log("alert");
		console.log(password);
		console.log($scope.login.username);
		console.log($scope.login.password);
		
		
		if ($scope.login.username == 'admin' && $scope.login.password == '123456') {
		$ionicPopup.alert({
			title:'LOGIN',
			template: ' LOGIN Successful'
			})

		$state.go('history');

    }else{
		
		$ionicPopup.alert({
			title:'LOGIN',
			template: 'Incorrectly Check '
			})

		 $state.go("login");
		
	 }
	}
})