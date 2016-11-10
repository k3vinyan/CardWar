(function() {

  var cardGame = angular.module('cardGame', []);


  cardGame.controller('gameCtrl', function($scope) {

    $scope.playerOne = createPlayer("playerOne");
    $scope.playerTwo = createPlayer("playerTwo");

    var carryRound = {
      points: 0,
      players: {
        player1: { value: 0 },
        player2: { value: 0 }
      },
      powers: []
    };

    $scope.startRound = function(cardPick, playerOne, playerTwo, compareCard, deleteCards){

      var playerOneCardPick = cardPick;
      var playerTwoCardPick = randomCard(playerTwo.cards);
      $scope.playerOneCard = playerOneCardPick;
      $scope.playerTwoCard = playerTwoCardPick;

      //points and power carry to the next round
      if(carryRound.players.player1.value > 0){
        playerOneCardPick.value = playerOneCardPick.value + carryRound.players.player1.value;
        console.log(playerOneCardPick.value);
        carryRound.players.player1.value = 0;
        console.log("player1 +2")
      } else if(carryRound.players.player2.value > 0){
        playerTwoCardPick.value += carryRound.players.player2.value;
        carryRound.players.player1.value = 0;
        console.log("player2 +2")
      }

        compareCard(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick, deleteCards);

    }

    $scope.compareCard = function(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick, deleteCards){

      //Ice King
      if(playerOneCardPick.name === "Ice King" || playerTwoCardPick.name === "Ice King") {
        if(playerOneCardPick.value > playerTwoCardPick.value){
          playerOne.score = carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Ice King Wins");
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          return
        } else if(playerOneCardPick.value < playerTwoCardPick.value){
          playerTwo.score = carryRound.points + 1;
          carryRound.points = 0;
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          console.log("playerTwo Ice King Wins")
        } else if(playerOneCardPick.value === playerTwoCardPick.value){
          console.log("Ice King Tie");
          carryRound.points++
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          return
        }
      }
      //Tree Trunk
      if(playerOneCardPick.name === "Tree Trunk" || playerTwoCardPick.name === "Tree Trunk") {
        carryRound.points++;
        deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
        console.log("Tree Trunk in play, round on hold");
        return
      }

      //Jake
      if(playerOneCardPick.name === "Jake"){
        carryRound.players.player1.value += 2;
        console.log("Jake in play, plus 2 for next round for player1")
      } else if(playerTwoCardPick.name === "General"){
        carryRound.players.player2.value += 2;
        console.log("Jake in play, plus 2 for next round for player2")
      }

      //Princess Bubble Gum
      if(playerOneCardPick.name === "Princess Bubble Gum" && playerTwoCardPick.name === "Finn"){
        console.log("player 1 Princess Bubble Gum win");
        return
      } else if (playerOneCardPick.name === "Finn" && playerTwoCardPick.name === "Princess Bubble Gum"){
        console.log("player 2 Princess Bubble Gum win");
        return
      }

      //comparing Marceline
      if(playerOneCardPick.name === "Marceline" && playerOneCardPick.value > playerTwoCardPick.value){
        playerOne.score = PlayerOne.score + carryRound.points + 1;
        console.log('playerOne Marceline and score')
        carryRound.points = 0;
      } else if(playerTwoCardPick.name === "Marceline" && playerTwoCardPick.value > playerOneCardPick.value){
        playerTwo.score = PlayerTwo.score + carryRound.points + 1;
        carryRound.points = 0;
        console.log('playerTwo played Marceline and score')
      }

      //Lich King
      if(playerOneCardPick.name === "Lich King" || playerTwoCardPick.name === "Lich King"){
        if(playerOneCardPick.value > playerTwoCardPick.value) {
          playerTwo.score = playerTwo.score + carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Lich King Win")
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          return
        } else if(playerOneCardPick.value < playerTwoCardPick.value){
          playerOne.score = playerOne.score + carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Lich King Win")
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          return
        }
      }

      //compare value
      if(playerOneCardPick.value > playerTwoCardPick.value){
        playerOne.score = playerOne.score + carryRound.points + 1;
        console.log("before PlayerOne " + playerOne.score)
        carryRound.points = 0;
        console.log("compare player1 " + playerOne.score);
      } else if(playerOneCardPick.value < playerTwoCardPick.value){
        console.log("before PlayerTwo " + playerTwo.score)
        playerTwo.score = playerTwo.score + carryRound.points + 1;
        carryRound.points = 0;
        console.log("compare player2 " + playerTwo.score)
      } else if(playerOneCardPick.value === playerTwoCardPick.value){
        console.log("tie");
        carryRound.points++;
      }

      deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);

    };

    $scope.deleteCards = function(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick){
      for(var i = 0; i < playerOne.cards.length; i++){
        if(playerOneCardPick === playerOne.cards[i]){
          playerOne.cards.splice(i, 1);
        }
      }
      for(var i = 0; i < playerTwo.cards.length; i++){
        if(playerTwoCardPick === playerTwo.cards[i]){
          playerTwo.cards.splice(i, 1);
        }
      }
    }

    let randomCard = function(deck){
      return deck[Math.floor((Math.random()*deck.length))]
    }

    let gameOver = function(player){
      if(player === "player1"){
        alert("player1 win");
      } else {
        alert("player2 win");
      }
    };

    $scope.playAgain = function() {
      $scope.playerOne = createPlayer("playerOne");
      $scope.playerTwo = createPlayer("playerTwo");

    }
  });




})();
