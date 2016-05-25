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

.directive("quest-journal", function(){
	return {
		templateUrl: "directives/quests/quest-journal.html"
	}
})

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