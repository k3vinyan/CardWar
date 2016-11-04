(function() {

  var cardGame = angular.module('cardGame', []);

  cardGame.controller('gameCtrl', function($scope) {
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    $scope.playerOneCards = player1;
    $scope.playerTwoCards = player2;
    $scope.deck = deck;

    $scope.startRound = function(card, playerOneCards, playerTwoCards, compareCard, deleteCards){
      var playerOneCard = card;
      var playerTwoCard = randomCard(playerTwoCards);
      compareCard(playerOneCard, playerTwoCard, playerOneCards, playerTwoCards, deleteCards);

    }

    let displaycard = function(card){
      console.log(card)
    }

    $scope.compareCard = function(card1, card2, player1cards, player2cards, deleteCards){
        if(card1.value > card2.value){
          $scope.playerOneScore++;
        } else if(card1.value < card2.value) {
           $scope.playerTwoScore++;
        } else {
          console.log("tie");
        }
        deleteCards(card1, card2, player1cards, player2cards);
    };

    $scope.deleteCards = function(card1, card2, player1cards, player2cards){
      var cards = [player1cards, player2cards];
      console.log("no");
      for(var i = 0; i < player1cards.length; i++){
        if(card1 === player1cards[i]){
          console.log("yess")
          player1cards.splice(i, 1);
        }
      }
    }

    let randomCard = function(deck){
      return deck[Math.floor((Math.random()*deck.length))]
    }

  });


})();
