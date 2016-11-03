(function() {

  var cardGame = angular.module('cardGame', []);

  cardGame.controller('gameCtrl', function($scope) {
    var displayCard = {};
    $scope.cards = cards;
    $scope.pickCard = function(card) {
      console.log(card)
      $scope.displayCard = card;
    };
  });

})();
