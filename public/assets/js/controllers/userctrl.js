app.factory('UsersSharedObjects', function() {
	return {
        generateUserModal: null,
        editedUserForm:    null
	};
});


app.controller("usersApp", [
	"$scope", "$modal", "uuid2", "UsersSharedObjects", 'BoxesService',
	function($scope, $modal, uuid2, UsersSharedObjects, BoxesService){

	$scope.boxes = BoxesService.all();

	var User = function(attributes) {
		attributes = attributes || {};

		this.name = attributes.name;
		this.checkbox = attributes.checkbox;
		this.email = attributes.email;
		this.password = attributes.password;
	};

	var CHECKBOXES = {
		box1: {cam1: false, cam2: false, cam3: false},
		box2: {cam1: false, cam2: false, cam3: false},
		box3: {cam1: false, cam2: false, cam3: false}
	};

	// Example:
	// var user = new User({ name: "Artem", email: "artem.slabodnik@gmail.com", group: "SA" });
	// console.log(user.groupName());
  // Define instance method for class User
	User.prototype.groupName = function() {
		return CHECKBOXES[this.checkbox];
	};

	$scope.users = [{
			name: 		"petya",
			email: 		"petya@example.com",
			password: "example",
			group: 		"System administrator" 
		},
		{
			name: 		"letya",
			email: 		"letya@example.com",
			password: "example",
			group: 		"Manager" 
		},
		{
			name: 		"ketya",
			email: 		"ketya@example.com",
			password: "example",
			group: 		"Seller" 
		},{
			name: 		"petya",
			email: 		"petya@example.com",
			password: "example",
			group: 		"System administrator" 
		},
		{
			name: 		"letya",
			email: 		"letya@example.com",
			password: "example",
			group: 		"Manager" 
		},
		{
			name: 		"ketya",
			email: 		"ketya@example.com",
			password: "example",
			group: 		"Seller" 
		},
	];

	$scope.users = _.map($scope.users, function(attributes) {
		return new User(attributes);
	});

	$scope.userGroups = [{
		name: 	"System administrator",
		code: 	"SA"
	}, {
		name: 	"Manager",
		code: 	"M"	
	}, {
		name: 	"Seller",
		code: 	"S"	
	}];

	$scope.tab = 1;

	$scope.selectTab = function(setTab){
	 	$scope.tab = setTab;
	}

	$scope.isSelected = function(isSet){
		return $scope.tab === isSet;
	}

	$scope.removeUser = function(user) {
		var confirmAction = confirm("Remove that user?");

		if(confirmAction == true) {
			var index = _.indexOf($scope.users, user);
			$scope.users.splice(index, 1);
		} else {
			return false;
		}
	};

  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.entryLimit = 8;

  $scope.noOfPages = Math.ceil($scope.users.length/$scope.entryLimit);
  
  $scope.filter = function() {
    window.setTimeout(function() {
      $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
    }, 10);
  };

  $scope.openForm = function(size) {
		UsersSharedObjects.generateUserModal = $modal.open({
      templateUrl: 'modalForm.html',
      size: size,
      controller: 'usersApp'
    });
		UsersSharedObjects.generateUserModal.result.then(function (user) {
      $scope.users.push(new User(user))
    });
	};
  $scope.getPass = function() {
    UsersSharedObjects.genPass = uuid2.newuuid();
    $scope.userPass = UsersSharedObjects.genPass;
  };	
  
  $scope.ok = function () {
    UsersSharedObjects.generateUserModal.close({ email: $scope.userEmail, password: $scope.userPass, checkbox: $scope.userCheckbox});
  };
  $scope.cancel = function () {
    UsersSharedObjects.generateUserModal.dismiss('cancel');
  };

  $scope.openEditForm = function(user, size){
		UsersSharedObjects.editedUserForm = $modal.open({
      templateUrl: 'modalContent.html',
      size: size,
      controller: "UsersController"
    });
    UsersSharedObjects.currentUser = user;
	}
}]);


app.controller("UsersController", ["$scope", "UsersSharedObjects", function($scope, UsersSharedObjects){
	$scope.currentUser = UsersSharedObjects.currentUser;
	
	$scope.save_user = function() {
		UsersSharedObjects.editedUserForm.close($scope.currentUser);
		$scope.currentUser = null;
	}

	$scope.close = function() {
		UsersSharedObjects.editedUserForm.dismiss('cancel')
	}
}])
