angular.module('app.controllers', [])


.controller('referCtrl', ['$scope', '$state', '$cordovaGeolocation', '$locationProperties', '$http', '$infoProperties', 'Camera', '$ionicPlatform', '$ionicPopup',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $cordovaGeolocation, $locationProperties, $http, $infoProperties, Camera, $ionicPlatform ,$ionicPopup) {
var options = {timeout: 10000, enableHighAccuracy: true};
  var marker;
  var latLng;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    latLng = $locationProperties.getLoc();
	if(!latLng){
		latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	}
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false,
	  mapTypeControl: false,
	  streetViewControl: false,
      styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1e7185"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"44"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-89"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#95ff00"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd7da"}]}]
        
    };
    $scope.map = new google.maps.Map(document.getElementById("refermap"), mapOptions);
	google.maps.event.addListener($scope.map, 'idle', function(event) {
		placeMarker($scope.map.getCenter());
	});
	function placeMarker(location) {
		  $locationProperties.setLoc(location);
	}
 
  }, function(error){
    $scope.showLocerror();
  });
	$infoProperties.setGender('M');
	$infoProperties.setEnv('outdoor');
	$infoProperties.setInv('adult');
	$scope.submitPrompt = "submithidden";
	$scope.formID;
	$scope.submitForm = function(){
	var latlng = $locationProperties.getLoc();
	var name = $infoProperties.getName();
	var gender = $infoProperties.getGender();
	var description = $infoProperties.getDesc();
	var environment = $infoProperties.getEnv();
	var adult = $infoProperties.getAdult();
	var child = $infoProperties.getChild();
	var isgroup = $infoProperties.getisGroup();
	var agegroup = $infoProperties.getInv();
	var lat = latlng.lat();
	var lng = latlng.lng();
	var method = 'POST';
  var subemail = $infoProperties.getEmail();
  var subphone = $infoProperties.getPhone();
	  var url = 'http://test.appkauhale.com/postReferral.php';
	  $scope.codeStatus = "";
	    if (isgroup == 0){
			var data = {
			  lat: lat,
			  lng: lng,
			  name: name,
			  gender: gender,
			  description: description,
			  environment: environment,
			  isgroup: isgroup,
			  agegroup: agegroup
			};
		}else{
			var data = {
			  lat: lat,
			  lng: lng,
			  description: description,
			  environment: environment,
			  adult: adult,
			  child: child,
			  isgroup: isgroup
			};
		}
		$http({
		  method: method,
		  url: url,
		  data: data,
		  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		}).
		success(function(response) {
		  $imageName = response.imageID;
		  $scope.showSuccess($imageName);
      if ($scope.picture != null) {
        $scope.sendPic($imageName);
      }
		}).
		error(function(response) {
			$scope.codeStatus = response || "Request failed";
		});
	};
  myLocation = function(){
    var options = {timeout: 10000, enableHighAccuracy: true};
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
    coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(coord);
  }, function(error){
    
  });
  };
  $scope.saveName = function(e){
	  console.log(e);
	  $infoProperties.setName(e);
  };
  $scope.saveGender = function(e){
	  $infoProperties.setGender(e);
	  console.log($infoProperties.getGender());
  };
  $scope.saveDesc = function(e){
	  $infoProperties.setDesc(e);
	  console.log($infoProperties.getDesc());
  };
  $scope.saveEnv = function(e){
	  $infoProperties.setEnv(e);
	  console.log($infoProperties.getEnv());
  };
  $scope.saveInv = function(e){
	  $infoProperties.setInv(e);
	  console.log($infoProperties.getInv());
  };
  $scope.saveAdult = function(e){
	  $infoProperties.setAdult(e);
	  console.log($infoProperties.getAdult());
  };
  $scope.saveChild = function(e){
	  $infoProperties.setChild(e);
	  console.log($infoProperties.getChild());
  };
  $scope.saveEmail = function(e){
	  $infoProperties.setEmail(e);
	  console.log($infoProperties.getEmail());
  };
  $scope.savePhone = function(e){
	  $infoProperties.setPhone(e);
	  console.log($infoProperties.getPhone());
  };
  $scope.inputAdult = 0;
  $scope.inputChild = 0;
  $scope.isValid = function(e){
	  if($infoProperties.getisGroup() == 1){
		if($infoProperties.getAdult() == 0 && $infoProperties.getChild() == 0){
			return false;
		}else if($infoProperties.getAdult() < 0 || $infoProperties.getChild() < 0 || $infoProperties.getAdult() == null || $infoProperties.getChild() == null || ($infoProperties.getAdult() == null && $infoProperties.getChild() == null)){
			return false;
		}else if($locationProperties.getLoc() == null){
			return false;
		}else{
			return true;
		}  
	  }else if($infoProperties.getisGroup() == 0){
		if($locationProperties.getLoc() == null){
			return false;
		}else{
			return true;
		}  
	  }else{
		return false;
	  }
  }
    $scope.hasPop = function() {
	    if($infoProperties.getisGroup() == 1){
			var population = $infoProperties.getAdult() + $infoProperties.getChild();
			if(($infoProperties.getAdult() + $infoProperties.getChild()) == 0){
				return false;
			}else{
				return true;
			}
	    }else{
			return true;
		}
    }
	$scope.hasLoc = function() {
		if($locationProperties == null){
			return false;
		}else{
			return true;
		}
	}
  $scope.isNumberChd = function(e) {
	  $infoProperties.setChild(e);
	  if (e < 0) return false; 
	  if (angular.isNumber(e) && e % 1 == 0){
		  
		  return true;
	  }else{
		  return false;
	  }
  }
  $scope.isNumberAdl = function(e) {
	  $infoProperties.setAdult(e);
	  if (e < 0) return false; 
	  if (angular.isNumber(e) && e % 1 == 0){
		  
		  return true;
	  }else{
		  return false;
	  }
  }
  
  // Camera Functions
   $scope.showSuccess = function(e) {
		var alertPopup = $ionicPopup.alert({
			title: 'Submit Successful',
			template: '<div>Thank You!!! for your referral. For additional information contact us at (123)456-7890 </br> <b>'+e+'</b></div>'
		});

		alertPopup.then(function(res) {
			$state.go('menu.resources'); 
		});
	};
	
	$scope.showLocerror = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Location Not Found!',
			template: 'To assist our responders please allow location access for OHAI in Settings. Thank You!'
		});

		alertPopup.then(function(res) {
			$state.go('menu.resources'); 
		});
	};
  
  $scope.takePic = function (options) {
    options = {
      quality : 75,
      targetWidth: 1024,
      targetHeight: 1024,
      sourceType: 1, // 0:PHOTOLIBRARY, 1:CAMERA, 2:SAVEDPHOTOALBUM
      correctOrientation: true,
      destinationType: 1, // 0:DATA_URL, 1:FILE_URI, 2:NATIVE_URI
      encodingType: 0, // 0:JPEG, 1:PNG
      allowEdit: false
    };
    
    $ionicPlatform.ready(function() {
      if (!navigator.camera) {
        // Load image if unable to get camera
        $scope.picture=null;
      } else {
        Camera.getPicture(options).then(function(imagePath) {
          $scope.picture = imagePath;
          console.log(imagePath);
        }, function(err) {
          console.log("Camera Failed: " + err);
        });
      }
    });
  };
  
  $scope.sendPic = function(imageName) {
    
    $ionicPlatform.ready(function() {
      var uploadURI = "http://test.appkauhale.com/postimage.php";
      
      var filename = imageName + ".jpg";
      
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpg",
        params : {'directory':'images', 'fileName':filename}
      };
      
      var ft = new FileTransfer();
      ft.upload($scope.picture, encodeURI(uploadURI), uploadSuccess, uploadError, options);
    });
    
    function uploadSuccess(r) {
      console.log(JSON.stringify(r));
    }
    
    function uploadError(error) {
      console.log("Error: " + error);
    }
    
  };
  
  $scope.itens = [
      { title: "an Individual", checked: false },
      { title: "a Group", checked: false },
  ];
  
  $scope.updateSelection = function(position, itens, title) {
      angular.forEach(itens, function(subscription, index) {
          if (position != index)
              subscription.checked = false;
              $scope.selected = title;
          }
      );
  };
  
  $scope.showPersonPage = function() {
    $infoProperties.setisGroup(0);
	console.log($infoProperties.getisGroup());
    $scope.indform = true;
    $scope.groupform = false;
    
    $scope.personButton="refer-peoplebutton-activated";
    $scope.peopleButton="";
  }
  $scope.showPeoplePage = function() {
    $infoProperties.setisGroup(1);
	console.log($infoProperties.getisGroup());
    $scope.indform = false;
    $scope.groupform = true;
    
    $scope.personButton="";
    $scope.peopleButton="refer-peoplebutton-activated";
  }
  
  $scope.userWindow = false;
  $scope.userInfoWindow = function() {
    $scope.userWindow = !$scope.userWindow;
  }

}])

.controller('kauhaleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
 
}])
      
.controller('resourcesCtrl', ['$scope', '$stateParams', '$cordovaGeolocation','$compile', 'Markers',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation, $compile, Markers) {
	var gmarkers1 = [];
	var apiKey = false;
	var infoWindow;
	var marker;
	var prev_infoWindow;
	var records;
	
	  function initMap(){
		var options = {timeout: 10000, enableHighAccuracy: true};
	 
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
		  var mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		  disableDefaultUI: false,
		  mapTypeControl: false,
		  streetViewControl: false,
          styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1e7185"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"44"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-89"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#95ff00"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd7da"}]}]
            
          }
	 
		  $scope.map = new google.maps.Map(document.getElementById("resourcemap"), mapOptions);
	 
		  //Wait until the map is loaded
		  google.maps.event.addListenerOnce($scope.map, 'idle', function(){
	 
			//Load the markers
			loadCurlocation(latLng);
			loadMarkers();
	 
		  });
	 
		}, function(error){
		  console.log("Could not get location");
	 
			//Load the markers
			loadMarkers();
		});
	 
	  }
	  
	  function loadCurlocation(latLng){
		        locmarker = new google.maps.Marker({
				map: $scope.map,
				icon: 'http://leadingagega.org/newsletters/images/blueDot.png',
				position: latLng
			});
	}
	 
	  function loadMarkers(){
		  //Get all of the markers from our Markers factory
		  Markers.getMarkers().then(function(markers){
			$scope.listMarkers = markers.data.markers;
			$scope.listresponders = markers.data.responders;
			records = markers.data.markers;
			var iconDir = "img/map/";
			var icons = {
			  1: {
				icon: iconDir + 'active-group.png'
			  },
			  0: {
				icon: iconDir + 'active-individual.png'
			  },
			};
			for (var i = 0; i < records.length; i++) {
			var record = records[i];  
			var markerimg = {
				url: icons[record.isgroup].icon,
				scaledSize: new google.maps.Size(44,66), // scaled size
				origin: new google.maps.Point(0,0), // origin
				anchor: new google.maps.Point(22,66) // anchor
			};
			   
			var markerPos = new google.maps.LatLng(record.lat, record.lng);
			// Add the markerto the map
			marker = new google.maps.Marker({
				category: record.cat,
				map: $scope.map,
				icon: markerimg,
				animation: google.maps.Animation.DROP,
				position: markerPos
			});
	        //angular.element(document.getElementById('listContainer')).append($compile("<li class='listviewstyle'><div class='list-img'><img class='list-imglink' src='img/placeholders/referral-image.jpg'></div><div class='list-infocont'><span><a  ng-click='toggleDetails("+i+")' onclick='gotoLocation("+record.lat+","+record.lng+")' class='listwindow-name'>"+record.name+"</a><div class='infowindow'></span><p><span class='info-subheader'>Date referred</span> "+record.referdate+"</p><p><span class='info-subheader'>gender</span>: "+record.gender+"</p></div></div></li>")($scope));
			gmarkers1.push(marker);
			addInfoWindow(marker, record, i);
			}
	 
		}); 
	  }
	  function addInfoWindow(marker, record, i) {
	      //var contentString = "<button ng-click='toggleList()' ng-class='listButton' class='r-listview'>VIEW LIST <i class='ion-ios-list-outline'></i></button>"
		  var contentString = "<span><a ng-click='toggleDetails("+i+"); gotoLocation("+record.lat+","+record.lng+")' class='infowindow-name'>"+record.name+"</a><div class='infowindow-img'><img class='infowindow-imglink' src='"+record.imgurl+"'></div><div class='infowindow'></span><p><span class='info-subheader'>Date referred</span> "+record.referdate+"</p><p><span class='info-subheader'>gender</span>: "+record.gender+"</p></div>";

		  var compileContent = $compile(contentString)($scope)
		  var infoWindow = new google.maps.InfoWindow({
			  content: compileContent[0]
		  });
	 
		  google.maps.event.addListener(marker, 'click', function() {
			  if(prev_infoWindow){
				  prev_infoWindow.close();
			  }
			  prev_infoWindow = infoWindow;
			  infoWindow.open($scope.map, marker);
		  });
	 
	  }
	  filterMarkers = function (e) {
		   var category = e;
           console.log(gmarkers1.length);
		   for (i = 0; i < gmarkers1.length; i++) {
			   if(category == "All"){
				   marker = gmarkers1[i];
				   marker.setVisible(true);
			   }else{
					marker = gmarkers1[i];
					// If is same category or category not picked
					if (marker.category.toLowerCase().indexOf(category.toLowerCase()) > -1 || category.length === 0) {
						marker.setVisible(true);
					}
					// Categories don't match 
					else {
						marker.setVisible(false);
					}
			   }
        }
      }
	$scope.filterNewReferrals = function (e) {
		for (i = 0; i < gmarkers1.length; i++) {
			var curdate = new Date();
			var withinMonth = Date.parse(new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate() - 1));
			var refdate = Date.parse(records[i].referdate);
			if(e === 'All'){
				   marker = gmarkers1[i];
				   marker.setVisible(true);
			}else{
				marker = gmarkers1[i];
				// If is same category or category not picked
				if (refdate > withinMonth) {
					marker.setVisible(true);
				}
				// Categories don't match 
				else {
					marker.setVisible(false);
			    }
			}
        }
	}
    initMap();
    
    // Instantiate map filter bars as hidden
    $scope.resourceBar = "closedanimateresources";
    $scope.searchBar = "closedanimatesearch";
    $scope.testingOutput = function(){
		console.log("called");
	}
    $scope.toggleResources = function () {
        if ($scope.resourcesBar === "openanimate") {
            hideResources();
        }
        else {
          if ($scope.searchBar === "openanimate") {
            hideSearch();
          }
		  if ($scope.listBar === "openanimate") {
            hideList();
          }
          showResources();
        }
    };
    
    hideResources = function () {
      $scope.resourcesButton="hidden-resource-button";
      $scope.resourcesBar="closedanimate";
    };
    
    showResources = function () {
      $scope.resourcesButton="dark-resource-button";
      $scope.resourcesBar="openanimate";
    };
    $scope.gotoLocation = function (lat,lng){
		console.log("called");
		coord = new google.maps.LatLng(lat, lng);
        $scope.map.panTo(coord);
	};
    $scope.toggleSearch = function () {
        
        if ($scope.searchBar === "openanimate") {
            hideSearch();
        }
        else {
          if ($scope.resourcesBar === "openanimate") {
            hideResources();
          }
		  if ($scope.listBar === "openanimate") {
            hideList();
          }
          showSearch();
        }
    };
    
    hideSearch = function () {
      $scope.searchButton="hidden-resource-button";
      $scope.searchBar="closedanimate";
    };
  
    showSearch = function () {
      $scope.searchButton="dark-resource-button";
      $scope.searchBar="openanimate";
    };
	
    $scope.rtmover="resource-toolbar";
    $scope.toggleList = function () {
      if ($scope.rtmover === "resource-toolbar-active") {
        hideList();
      }
      else {
        showList();
        if ($scope.detailmover === "detailcontainer-active") {
          hideDetails();
        }
      }
    };
    hideList = function () {
      $scope.rtmover="resource-toolbar";
    };
    showList = function () {
      $scope.rtmover="resource-toolbar-active";
    };
   
    $scope.detailmover="detailcontainer";
    $scope.toggleDetails = function (e) {
	  var record = records[e];
	  angular.element(document.getElementById('detailWindow')).empty();
	  angular.element(document.getElementById('detailWindow')).append($compile("<div ng-class='detailContent' class='detailcontentinfo'><span class='info-name'>"+record.name+"</span><div class='detail-img'><img class='detail-imglink' src='"+record.imgurl+"'></div><span class='info-subheader'>Description</span><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."+record.description+"</p><span class='info-subheader'>Amount of People</span><p><b>"+record.isgroup+"</b> "+record.popcount+" Adult  ||  "+record.popcount+" Child</p><p><span class='info-subheader'>DATE REFERRED</span> "+record.referdate+"</p><p><span class='info-subheader'>GENDER</span> "+record.gender+"</p><select ng-model='selResponder' ng-change='assignResp("+e+",selResponder)' data-ng-options='resp as resp.respondername for resp in listresponders'></select></div>")($scope));
      if ($scope.detailmover === "detailcontainer-active") {
        hideDetails();
      }
      else {
        showDetails();
        if ($scope.rtmover === "resource-toolbar-active") {
          hideList();
        }
      }
    };
	$scope.assignResp = function(e, f){
		console.log(e);
		console.log(f);
	}
	$scope.closeDetails = function () {
		$scope.detailmover="detailcontainer";
	};
    hideDetails = function () {
      $scope.detailmover="detailcontainer";
    };
    showDetails = function () {
      $scope.detailmover="detailcontainer-active";
    };
    
    myLocation = function(){
	var options = {timeout: 10000, enableHighAccuracy: true};
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
    coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(coord);
	loadCurlocation(coord);
  }, function(error){
    console.log("Could not get location");
  });
  }
    
	
	$scope.toggleMap = function () {
          if ($scope.searchBar === "openanimate") {
            hideSearch();
          }
		  if ($scope.resourcesBar === "openanimate") {
            hideResources();
          }
		  if ($scope.listBar === "openanimate"){
			hideList();
		  }
    }
    
}])

.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(marker){
			if(marker.name.toLowerCase().indexOf(searchString) !== -1){
			result.push(marker);
		}
		});
		return result;
	};
})

.factory('Markers', function($http) {
	
  var markers = [];
 
  return {
    getMarkers: function(){
		
      return $http.get("http://test.appkauhale.com/responderMarker.php").then(function(response){
          markers = response;
          return markers;
      });
    }
  }
})

.controller('foodCtrl', ['$scope', '$stateParams', 'FoodMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, FoodMaps) {
    FoodMaps.init();

}])

.controller('medicalCtrl', ['$scope', '$stateParams', 'MedicineMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MedicineMaps) {
    
	 MedicineMaps.init();

}])

.controller('shelterCtrl', ['$scope', '$stateParams', 'shelMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shelMaps) {
    
	 shelMaps.init();

}])

.controller('vispdatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

   
.controller('eventsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('eventsCtrl', function($scope) {
  $scope.items = [{
      time: '9:30AM',
      title: 'Summer Fun Events',
      date: 'August 25, 2016',
      location: 'Kaʻaahi Women & Family Shelter',
      text: 'For the past five years, IHS has collaborated with local business and community members to host Summer Fun programs for homeless keiki, including a wide range of activities from working in a fish pond to learning how to surf.  Each event is an opportunity to teach life-long lessons and values, including responsibility, leadership, caring, collaboration, and the pursuit of excellence, giving keiki a break from the day-to-day stress of living in a shelter.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '2:30PM',
      title: 'Serve with Us',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '5:30PM',
      title: 'Orientation',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'
          

  }];

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
    

})



