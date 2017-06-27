angular.module("journal-material.Journal.controllers", [])
.controller("journal-material.Journal.controllers.EditController", [
    "$scope", 
    "$state", 
    "$stateParams", 
    "$ionicHistory", 
    "$ionicPopup",
    "journal-material.Journal.services.JournalEntryFactory",
    "journal-material.Quests.services.QuestService",
    function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, 
        JournalEntryFactory, QuestService){
        var self = this;

        $scope.entry = JournalEntryFactory._new();
        var quest_id = $stateParams.quest_id;
        if(quest_id){
            QuestService.get(quest_id).then(function(quest){
                $scope.quest = quest;
            })
            ;
        }

        $scope.save = function() {

        }

        $scope.cancel = function() {

        }
    }
])
;