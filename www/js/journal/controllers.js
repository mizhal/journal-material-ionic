angular.module("journal-material.Journal.controllers", [])
    .controller("journal-material.Journal.controllers.EditController", [
        "$scope",
        "$state",
        "$stateParams",
        "$ionicHistory",
        "$ionicPopup",
        "journal-material.Journal.services.JournalEntryFactory",
        "journal-material.Journal.services.JournalService",
        "journal-material.Quests.services.QuestService",
        function ($scope, $state, $stateParams, $ionicHistory, $ionicPopup,
            JournalEntryFactory, JournalService, QuestService) {
            var self = this;
            
            $scope.entry = JournalEntryFactory._new();
            var quest_id = $stateParams.quest_id;
            if (quest_id) {
                QuestService.get(quest_id).then(function (quest) {
                    $scope.quest = quest;
                    $scope.entry.quest_id = quest._id;
                })
                ;
            }

            $scope.save = function () {
                JournalService.save($scope.entry)
                    .then(function () {
                        $ionicHistory.goBack();
                    })
                    .catch(function (error) {
                        console.log(error);
                        $ionicPopup.alert({
                            title: "Error",
                            template: "Something went wrong."
                        })
                        ;
                    })
                    ;
            }

            $scope.cancel = function () {
                $ionicHistory.goBack();
            }
        }
    ])
    ;