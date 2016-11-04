(function() {

  var cardGame = angular.module('cardGame', []);

  cardGame.controller('gameCtrl', function($scope) {
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    var displayCard = {};
    $scope.playerOneCards = player1;
    $scope.playerTwoCards = player2;
    $scope.deck = deck;

    $scope.pickCard = function(card) {
      $scope.displayCard = card;
      compareCard(card, computer.pickCard());
    };

    var computer = {
      pickCard: function() {
        return ($scope.playerTwoCards[Math.floor((Math.random()*$scope.playerTwoCards.length) +1)]);
      }
    }

    var compareCard = function(playerOneCard, playerTwoCard) {
      console.log(playerTwoCard);
        if(playerOneCard.value > playerTwoCard.value) {
            removeCard($scope.playerOneCards, playerOneCard);
            $scope.playerOneScore++;
        } else if(playerOneCard.value < playerTwoCard.value) {
            removeCard($scope.playerTwoCards);
            $scope.playerTwoScore++;
        } else {

        }
    };

    var removeCard = function(deck, playerCard) {
      for(var i = 0; i < deck.length; i++) {
        if(deck[i] === playerCard) {
          $scope.playerOneCards.splice(i, 1);
        }
      }
    };




   $scope.reset = function(){
      $scope.playerOneCards = $scope.deck;
      $scope.playerOneScore = 0;
      $scope.playerTwoScore = 0;
    };

  });


})();
