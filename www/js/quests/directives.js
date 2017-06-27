angular.module('journal-material.Quests.directives', [])

.directive("quest-actions", function(){
	return {
		templateUrl: "directives/quests/quest-actions.html"
	}
})

.directive("quest-description", function(){
	return {
		templateUrl: "directives/quests/quest-description.html"
	}
})

.directive("quest-header", function(){
	return {
		templateUrl: "directives/quests/quest-header.html"
	}
})

.directive("quest-inventory", function(){
	return {
		templateUrl: "directives/quests/quest-inventory.html"
	}
})

.directive("quest-inventory-item", function(){
	return {
		templateUrl: "directives/quests/quest-inventory-item.html"
	}
})

.directive("quest-journal", [
	"journal-material.Journal.services.JournalService",
	function(JournalService){
		var controller = function(){
			var cself = this;
			
			$scope.entries = [];

			$scope.$on("journal-update", function(event, args){
				JournalService.getEntriesForQuest($scope.quest._id).then(function(res){
					$scope.entries = res;
				})
				;
			})
			;

			$scope.$emit("journal-update");
		}

		return {
			templateUrl: "directives/quests/quest-journal.html",
			controller: controller,
			controllerAs: "cself",
			bindToController: true,
			scope: {
				quest: "=",
			}
		}
	}
])

.directive("quest-todo-item", function(){
	return {
		templateUrl: "directives/quests/quest-todo-item.html"
	}
})

.directive("quest-track", function(){
	return {
		templateUrl: "directives/quests/quest-track.html"
	}
})

;