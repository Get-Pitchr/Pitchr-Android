angular.module('app.controllers', [])
   
.controller('BarController', function($scope, $http, $location, $state, TabFactory) {
    $scope.bars = [];
    
    $scope.tabID = TabFactory;
    $scope.openTab = false;
    //$scope.enabled = false;
    $scope.bars.push(
        {
            name: "Paddy's Pub",
            tabOpen: false,
            icon: "http://d3u67r7pp2lrq5.cloudfront.net/product_photos/249707/32088_124310727584087_124309504250876_320070_6945733_n_original.jpg"
        }
    );
    
   $scope.bars.push(
        {
            name: "MacLaren's                   .",
            tabOpen: false,
            icon: "https://s-media-cache-ak0.pinimg.com/736x/6b/71/45/6b7145f52f0d13c0d5e0f4726b32c8d8.jpg"
        }
    );
    
    
    $scope.switchClick = function( enabled ){
        
        if( enabled === true && $scope.openTab === false){
            var tabID = Math.random().toString();
            $scope.tabID = tabID;
            console.log(tabID)
            var postData = {
                tabID : tabID,
                name: "Ray, Arin_DEMO"
            };
            $scope.openTab = true;
            var baseURL = 'https://pitchr-backend-dcxfeujlgz.now.sh/pitchr/openTab';
            console.log("TAB IS OPEN");
            $http.post(baseURL, postData).success(function(data) {
            if(data) {
                console.log(data)
            } else {
                console.log(data)
            }
          }).error(function(error) {
              console.log('ERR')
          });
            
        }else if( enabled === false &&
            $scope.openTab === true){
                console.log("ITS CLOSING TIME");
                $scope.openTab = false;
                console.log('showing the TAB $$');
            console.log($scope.tabID)
                $state.go('closeTab', {tabID: $scope.tabID});
                
        }
    };
    
    $scope.barClick = function (){
        console.log('clicked bar')
        if( $scope.openTab === true ){
            
            console.log('showing the TAB $$');
            console.log($scope.tabID)
            $state.go('showTab', {tabID: $scope.tabID});
        }
    }
}).controller('TabController', function($scope,$http, $state, $ionicPopup, $stateParams){

    console.log('Inside Tab view')
    $scope.drinksOnTab = false;
    var postData = {
        tabID : $stateParams.tabID,
    };
    var baseURL = 'https://pitchr-backend-dcxfeujlgz.now.sh/pitchr/getTab';
    console.log("getting tab: "+ $stateParams.tabID);
    $scope.addTip = function ( num ){
        $scope.tipTotal = $scope.total*(1 + num/100).toFixed(2);
    }
    
    $scope.chargeCard = function ( ){
       
     var confirmPopup = $ionicPopup.confirm({
       title: 'Pay With Credit Card',
       template: 'Are you sure you want charge your card $'+$scope.tipTotal+' ?'
     });
     
     confirmPopup.then(function(res) {
     if(res) {
         $state.go('tabsController.cartTabDefaultPage');
     } else {
       console.log('You are not sure');
     }
   });
    }

     $scope.$on('$ionicView.enter', function() {
        console.log('Opened!')
        var postData = {
            tabID : $stateParams.tabID,
        };
        var baseURL = 'https://pitchr-backend-dcxfeujlgz.now.sh/pitchr/getTab';
            $http.post(baseURL, postData).success(function(data) {
        if(data) {
            console.log(data);
            $scope.items = data.result.drinks;
            
            if($scope.items.length > 0){
                console.log('setting drinks on tab to true');
                $scope.drinksOnTab = true;
            }
            
            $scope.total = data.result.total;
            $scope.tipTotal = data.result.total;
        }
        }).error(function(error) {
            console.log('ERR')
        });
        
  });

    
    
})
.factory('TabFactory', function() {
  tab = {};
  tab.tabID = '';
  return tab;
})

.controller('MainController', function($scope){

        setTimeout(function(){
            document.getElementById("custom-overlay").style.display = "none"; 
            console.log('test')     
        }, 6500);

})
    