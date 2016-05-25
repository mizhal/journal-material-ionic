angular.module('journal-material.Quests.controllers', [])

.controller('journal-material.Quests.controllers.MainCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.ContextController', function($scope){
	$scope.currentContext ="app.quests";
	$scope.contextMenu = [
		{go: "app.quests.focus", name: "Focus"},
		{go: "app.quests.all", name: "Summary"},
		{go: "app.quests.listings({status:'SCHEDULED'})", name: "Scheduled"}
	];

	console.log($scope.contextMenu);
})

.controller('journal-material.Quests.controllers.AllCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.FocusCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.ListingCtrl', 
	function($scope, $stateParams){

	}
)

.controller('journal-material.Quests.controllers.EditCtrl', 
	function($scope, $stateParams){

	}
)

.controller('journal-material.Quests.controllers.DetailCtrl',
	function($scope, $stateParams){

	}
)

.controller('journal-material.Quests.controllers.TodoListCtrl',
	function($scope, $stateParams){

	}
)

;