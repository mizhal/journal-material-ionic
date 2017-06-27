angular.module("journal-material.Journal.controllers", [])
.controller("journal-material.Journal.controllers.EditController", [
    "$scope", 
    "$state", 
    "$stateParams", 
    "$ionicHistory", 
    "$ionicPopup",
    "journal-material.Journal.services.JournalEntryFactory",
    function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, JournalEntryFactory){
        $scope.entry = JournalEntryFactory._new();
    }
])
;