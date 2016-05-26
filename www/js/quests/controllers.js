angular.module('journal-material.Quests.controllers', [])

.controller('journal-material.Quests.controllers.MainCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.ContextController', function($scope){
	$scope.currentContext ="app.quests";
	$scope.contextMenu = [
		{go: "app.quests.focus", name: "Focus"},
		{go: "app.quests.listings({status:'BLOCKED'})", name: "Waiting"},
		{go: "app.quests.listings({status:'OPEN'})", name: "Open"},
		{go: "app.quests.listings({status:'SCHEDULED'})", name: "Scheduled"}
	];
})

.controller('journal-material.Quests.controllers.AllCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.FocusCtrl', function($scope){

})

.controller('journal-material.Quests.controllers.ListingCtrl', 
	[
		"$scope", "$stateParams",
		"journal-material.Quests.services.QuestService", 
		function($scope, $stateParams, QuestService){
			var status = $stateParams.status;
			$scope.title = QuestService.TranslateStatus(status);
		}
	]
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