app.factory('BoxesSharedObjects', function() {
	return {
		boxesModal: null
	};
});

app.controller("boxesApp", ["$scope", "$modal", "uuid2", "BoxesSharedObjects", function($scope, $modal, uuid2, BoxesSharedObjects){
	$scope.openRevokeForm = function(size) {
		BoxesSharedObjects.boxesModal = $modal.open({
      templateUrl: 'boxesModal.html',
      size: size,
      controller: 'boxesApp'
    });
	}
	$scope.revoke = function() {
		BoxesSharedObjects.boxesModal.close()
	}
	$scope.cancel = function(){
		BoxesSharedObjects.boxesModal.dismiss('cancel')
	}

	$scope.boxes = [{
		name: "Box 1"
	},{
		name: "Box 2"
	},{
		name: "Box 3"
	}]

	$scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.entryLimit = 8;

  $scope.noOfPages = Math.ceil($scope.boxes.length/$scope.entryLimit);
  
  $scope.filter = function() {
    window.setTimeout(function() {
      $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
    }, 10);
  };
}]);