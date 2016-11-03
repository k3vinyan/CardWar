(function() {

  var cardGame = angular.module('cardGame', []);

  cardGame.controller('gameCtrl', function($scope) {
    var playerOneScore = 0;
    var playerTwoScore = 0;


    var displayCard = {};
    $scope.playerOneCards = cards;
    $scope.playerTwoCards = cards;
    $scope.pickCard = function(card) {
      $scope.displayCard = card;
      compareCard(card, cards[0]);

    };

    var removeCard = function(cards, cardPick) {
      for(var i = 0; i < cards.length; i++) {
        if(cards[i] === cardPick) {
          console.log(cards[i]);
          cards.splice(i, 1);
        }
      }
    };

    var compareCard = function(playerOneCard, playerTwoCard) {
      ;
        if(playerOneCard.value > playerTwoCard.value) {
            removeCard($scope.playerOneCards, playerOneCard);
            playerOneScore++;
              console.log("cat")
        } else if(playerOneCard.value < playerTwoCard.value) {
            removeCard($scope.playerTwoCards);
            playerTwoScore++;
              console.log("dog")
        } else {
            console.log("monkey")
        }
    };

  });


})();
