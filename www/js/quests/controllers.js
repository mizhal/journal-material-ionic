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

.controller('journal-material.Quests.controllers.AllCtrl', [
	"$scope",
	"journal-material.Quests.services.QuestService",
	"$q",
	"journal-material.services.SortCriteriaService",
	function($scope, QuestService, $q, SortCriteriaService){
		$scope.sorting = SortCriteriaService.Enum.UPDATED_DESC;
		
		QuestService.GetSummarizedQuestLog($scope.sorting).then(function(response){
			$scope.quest_log = response;
		});
	}
])

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

.controller('journal-material.Quests.controllers.EditCtrl', [
	"$scope",
	"$stateParams",
	"journal-material.Quests.services.QuestFactory",
	"ionicDatePicker",
	function($scope, $stateParams, QuestFactory, ionicDatePicker){
		$scope.id = $stateParams.id;
		if($scope.id) {
			$scope.action = "Edit";
		} else {
			$scope.action = "New";
			$scope.quest = QuestFactory._new();
		}

		$scope.contexts = [
			{id: 1, name: "TFG"},
			{id: 2, name: "GFS"},
			{id: 3, name: "IOS"}
		]

		$scope.statuses = [
			{id: "OPEN", name: "Open"},
			{id: "FOCUS", name: "Focus"},
			{id: "WAITING", name: "Waiting"}
		]

		var deadline_obj = {
			callback: function(val) {
				$scope.quest.deadline = val;
			}
		}

		/** METHODS **/
		$scope.selectDeadline = function(){
			ionicDatePicker.openDatePicker(deadline_obj);
		}

		$scope.save = function(){
			console.log($scope.quest);
		}

		$scope.cancel = function(){

		}
		/** END: METHODS **/
	}
])

.controller('journal-material.Quests.controllers.DetailCtrl',
	function($scope, $stateParams){

	}
)

.controller('journal-material.Quests.controllers.TodoListCtrl',
	function($scope, $stateParams){

	}
)

;