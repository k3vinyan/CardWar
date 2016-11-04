(function() {

  var cardGame = angular.module('cardGame', []);

  cardGame.controller('gameCtrl', function($scope) {
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    $scope.playerOneCards = player1;
    $scope.playerTwoCards = player2;

    $scope.startRound = function(card, playerOneCards, playerTwoCards, compareCard, deleteCards){
      var playerOneCard = card;
      var playerTwoCard = randomCard(playerTwoCards);
      $scope.playerOneCard = card
      $scope.playerTwoCard = playerTwoCard;
      compareCard(playerOneCard, playerTwoCard, playerOneCards, playerTwoCards, deleteCards);
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
      for(var i = 0; i < player1cards.length; i++){
        if(card1 === player1cards[i]){
          player1cards.splice(i, 1);
        }
      }
      for(var i = 0; i < player2cards.length; i++){
        if(card2 === player2cards[i]){
          player2cards.splice(i, 1);
        }
      }
    }

    let randomCard = function(deck){
      return deck[Math.floor((Math.random()*deck.length))]
    }

    $scope.reset = function() {
      $scope.playerOneScore = 0;
      $scope.playerTwoScore = 0;
      $scope.playerOneCard = "";
      $scope.playerTwoCard = "";

      this.playerOneCards = this.playerTwoCards = [
          {
            name: "one",
            value: 1
          },
          {
            name: "two",
            value: 2
          },
          {
            name: "three",
            value: 3
          },
          {
            name: "four",
            value: 4
          },
          {
            name: "five",
            value: 5
          },
          {
            name: "six",
            value: 6
          },
          {
            name: "seven",
            value: 7
          },
          {
            name: "nine",
            value: 8
          },
          {
            name: "nine",
            value: 9
          },
        ]


    }

  });


})();
