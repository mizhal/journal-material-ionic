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
	"$rootScope",
	"$stateParams",
	"$ionicHistory",
	"$ionicPopup",
	"$state",
	"journal-material.Quests.services.QuestFactory",
	"ionicDatePicker",
	function($scope, $rootScope, $stateParams, $ionicHistory, $ionicPopup, $state, QuestFactory, ionicDatePicker){
		$scope.id = $stateParams.id;
		$scope.must_confirm = true;
		if($scope.id) {
			$scope.action = "Edit Quest";
		} else {
			$scope.action = "New Quest";
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

		$scope.save = function(form){
			if(form.$valid){
				console.log($scope.quest);
				$scope.must_confirm = false;
				$ionicHistory.goBack();
			}
		}

		$scope.cancel = function(){
			$ionicHistory.goBack();
		}
		/** END: METHODS **/

		/** EVENTS **/

		// prevent going out of state without saving
		$scope.$on("$stateChangeStart", 
			function(event, toState, fromState, toParams, fromParams){
				var $scope = event.currentScope;
				if($scope.must_confirm){
					event.preventDefault();
					$ionicPopup.confirm({
						title: "Data will be lost!"
					}).then(function(ok){
						if(ok) {
							$scope.must_confirm = false;
							$state.go(toState, toParams);
						}
					})
				}
			}
		)
		/** END: EVENTS **/
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