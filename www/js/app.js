	// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('index',{
		url: '/index',
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
		.state('show_admin',{
		url: '/show_admin',
		templateUrl: 'templates/show_admin.html',
		controller: 'PlaylistCtrl'
	})
		.state('history',{
		url: '/history',
		templateUrl: 'templates/history.html',
		controller: 'AppCtrl'
	})
		.state('set',{
		url: '/set',
		templateUrl: 'templates/set.html',
		controller: 'AppCtrl'
	})
		.state('insert_admin',{
		url: '/insert_admin',
			templateUrl: 'templates/insert_admin.html',
		controller: 'AdminCtrl'
	})
	
		.state('insert_list',{
		url: '/insert_list',
			templateUrl: 'templates/insert_list.html',
		controller: 'listCtrl'
	})

		.state('edit_admin',{
		url: '/edit_admin',
			templateUrl: 'templates/edit_admin.html',
		controller: 'EditCtrl'
	})
		.state('del_admin',{
		url: '/del_admin',
			templateUrl: 'templates/del_admin.html',
		controller: 'Ad_delCtrl'
	})
		.state('search_admin',{
		url: '/search_admin',
			templateUrl: 'templates/search_admin.html',
		controller: 'Ad_searchCtrl'
	})
		.state('login',{
		url: '/login',
			templateUrl: 'templates/login.html',
		controller: 'AppCtrl'
	})
		

	$urlRouterProvider.otherwise('/login');
	
	})
		

	/*.controller('AppCtrl',function ($scope,$state,$ionicPopup){
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
*/

.controller('AppCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.login={};

 $scope.doLogin=function(){
      var admin_user=$scope.login.username;
      var admin_password=$scope.login.password;
      console.log(admin_user),console.log(admin_password);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);
				
                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'ล็อกอิน',
                  template:'ยินดีต้อนรับเข้าสู่ระบบ'
                })

                $state.go('show_admin',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'ล็อกอิน',
                template:'ไม่สามารถล็อกอินได้ กรุณาตรวจสอบ'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'ล็อกอิน',
          template:'กรุณากรอกข้อมูลให้ครบ'
        })

      }

  }
})


/*.controller('PlaylistCtrl',function ($scope){
	$scope.datalist=[
	{fname:"IONIC",lname:"Ionic framework",pic:"img/c.jpg"},
	{fname:"EDITPLUS",lname:"Program editplus",pic:"img/a.png"},
	{fname:"VISUAL STUDIO CODE",lname:"Program Visual Studio Code",pic:"img/y.png"},
	{fname:"NOD JS",lname:"Program Nod js",pic:"img/s.png"}
	

];
})*/

.controller('PlaylistCtrl',function($scope,$http){

	$scope.datalist=[];
	$scope.url="http://localhost/ionic_php/admin-show.php";
	$http.get($scope.url)
		.success(function(data){
		$scope.datalist=data;
	})
		.error(function(data){
		console.log("erorr");
	});
})



.controller('AdminCtrl',function($scope,$state,$ionicPopup,$http,$ionicHistory){
var url="http://localhost/ionic_php/";
	$scope.Admindata=[];
	 $scope.creatAdmin=function(){
      var admin_user=$scope.adminData.admin_user;
      var admin_password=$scope.adminData.admin_password;
      console.log(admin_user),console.log(admin_password);
	   
	   
	   if(admin_user && admin_password){
	  str=url+"admin-insert.php?username="+admin_user+"&password="+admin_password;
          

      $http.get(str)
      .success(function(response){

        if(response==true){

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'เพิ่มข้อมูลเรียบร้อย'
          });
          $state.go('tab.admin',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ไม่สามารถทำการเพิ่มข้อมูลได้'
          });
          $state.go('tab.admin-admin',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({
          title:'ข้อมูลผู้ดูแลระบบ',
          template:'ไม่สามารถทำการติดต่อเซิร์ฟเวอร์ได้'
        });

      })

    }else{

      $ionicPopup.alert({
        title:'ข้อมูลผู้ดูแลระบบ',
        template:'กรุณากรอกข้อมูลให้ครบ'
      });

    }

  };
  })
	


.controller('listCtrl',function($scope,$state,$ionicPopup,$http,$ionicHistory){
var url="http://localhost/ionic_php/";
	$scope.Listdata=[];
	 $scope.Listdata=function(){
      var fname=$scope.listData.fname;
      var lname=$scope.listData.lname;
	  var pic=$scope.listData.pic;
      console.log(fname),console.log(lname),console.log(pic);
	  str=url+"list-insert.php?fname="+fname+"&lname="+lname+"&pic="+pic;
       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})

.controller('EditCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.edit={};

    $scope.editAdmin=function(){
    var admin_id = $scope.adminDatas.admin_id;
    var admin_user = $scope.adminDatas.admin_user;
    var admin_password = $scope.adminDatas.admin_password;



    if( admin_id && admin_user && admin_password){
      str= url + "admin-edit.php?user=" + admin_user + "&password=" + admin_password + "&id=" + admin_id;

      $http.get(str)
      .success(function(response){

        if(response==true){

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'แก้ไขข้อมูลเรียบร้อย'
          });
          $state.go('tab.admin',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ไม่สามารถทำการแก้ไข้อมูลได้'
          });
          $state.go('tab.admin-admin',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({
          title:'ข้อมูลผู้ดูแลระบบ',
          template:'ไม่สามารถทำการติดต่อเซิร์ฟเวอร์ได้'
        });

      })

    }else{

      $ionicPopup.alert({
        title:'ข้อมูลผู้ดูแลระบบ',
        template:'กรุณากรอกข้อมูลให้ครบ'
      });

    }

  };
  })


.controller('Ad_delCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.del={};

    $scope.delAdmin=function(){
    var admin_id = $scope.adminDel.admin_id;



    if( admin_id ){
      str= url + "admin-del.php?user=" + admin_id + "&id=" + admin_id;

      $http.get(str)
      .success(function(response){

        if(response==true){

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ลบข้อมูลเรียบร้อย'
          });
          $state.go('tab.admin',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ไม่สามารถทำการแก้ไข้อมูลได้'
          });
          $state.go('tab.admin-admin',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({
          title:'ข้อมูลผู้ดูแลระบบ',
          template:'ไม่สามารถทำการติดต่อเซิร์ฟเวอร์ได้'
        });

      })

    }else{

      $ionicPopup.alert({
        title:'ข้อมูลผู้ดูแลระบบ',
        template:'กรุณากรอกข้อมูลให้ครบ'
      });

    }

  };
  })
  .controller('Ad_searchCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.del={};

    $scope.delAdmin=function(){
    var admin_id = $scope.adminDel.admin_id;



    if( admin_id ){
      str= url + "admin-del.php?user=" + admin_id + "&id=" + admin_id;

      $http.get(str)
      .success(function(response){

        if(response==true){

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ลบข้อมูลเรียบร้อย'
          });
          $state.go('tab.admin',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({
            title:'ข้อมูลผู้ดูแลระบบ',
            template:'ไม่สามารถทำการแก้ไข้อมูลได้'
          });
          $state.go('tab.admin-admin',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({
          title:'ข้อมูลผู้ดูแลระบบ',
          template:'ไม่สามารถทำการติดต่อเซิร์ฟเวอร์ได้'
        });

      })

    }else{

      $ionicPopup.alert({
        title:'ข้อมูลผู้ดูแลระบบ',
        template:'กรุณากรอกข้อมูลให้ครบ'
      });

    }

  };
  })




