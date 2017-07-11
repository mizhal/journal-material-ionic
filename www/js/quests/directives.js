angular.module('journal-material.Quests.directives', [])

.directive("questJournal",
	function(){

		var controller = [
			"$scope",
			"journal-material.Journal.services.JournalService", 
			function($scope, JournalService){
				var cself = this;
				
				$scope.entries = [];

				$scope.update = function(){
					JournalService.getEntriesForQuest($scope.quest._id).then(function(res){
						$scope.entries = res;
					})
				};

				$scope.$on("journal-update", $scope.update);

				$scope.update();
			}
		]

		return {
			restrict: "E",
			replace: true,
			templateUrl: "directives/quests/quest-journal.html",
			controller: controller,
			scope: {
				quest: "="
			}
		}
	}
)
;