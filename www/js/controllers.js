angular.module('journal-material.controllers', [])

.controller('MainCtrl', function($scope) {
  $scope.isExpanded = false;

  $scope.mainMenuNav = [
    {go: "app.dashboard", name: "Dashboard"},
    {go: "app.quests.all", name: "Quest Log"},
    {go: "app.codex.main", name: "Codex"},
    {go: "app.journal.main", name: "Journal"}
  ]
  ;

})

;
