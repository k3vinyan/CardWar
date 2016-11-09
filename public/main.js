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

    var assassinPower = function(cardPick, player){

    };


    $scope.startRound = function(cardPick, playerOne, playerTwo, compareCard, deleteCards){

      var playerOneCardPick = cardPick;
      var playerTwoCardPick = randomCard(playerTwo.cards);
      $scope.playerOneCard = playerOneCardPick;
      $scope.playerTwoCard = playerTwoCardPick;

      //check for carry Power and excute
      if(carryRound.powers.length > 0){
        for(var i = 0; i < carryRound.powers.length; i++) {
            carryRound.powers[i]();
        }
      };

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

        compareCard(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo, deleteCards);

    }

    $scope.compareCard = function(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo, deleteCards){

      //comparing Wizard
      if(playerOneCardPick.name === "Wizard" || playerTwoCardPick.name === "Wizard") {
        if(playerOneCardPick.value > playerTwoCardPick.value){
          playerOne.score = carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Wizard");
          deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
          return
        } else if(playerOneCardPick.value < playerTwoCardPick.value){
          playerTwo.score = carryRound.points + 1;
          carryRound.points = 0;
          deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
          console.log("playerTwo Wizard")
        } else if(playerOneCardPick.value === playerTwoCardPick.value){
          console.log("tie");
          carryRound.points++
          deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
          return
        }
      }
      //musician card
      if(playerOneCardPick.name === "Musician" || playerTwoCardPick.name === "Musician") {
        carryRound.points++;
        deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
        console.log("musician");
        return
      }

      //general card
      if(playerOneCardPick.name === "General"){
        carryRound.players.player1.value += 2;
        console.log("General: " + carryRound.players.player1.value++)
      } else if(playerTwoCardPick.name === "General"){
        carryRound.players.player2.value += 2;
        console.log("General: " + carryRound.players.player1.value++)
      }

      //comparing princess card
      if(playerOneCardPick.name === "Princess" && playerTwoCardPick.name === "Prince"){
        console.log("player 1 win");
      } else if (playerOneCardPick.name === "Prince" && playerTwoCardPick.name === "Princess"){
        console.log("player 2 win");
      }

      //comparing Ambassador
      if(playerOneCardPick.name === "Ambassador" && playerOneCardPick.value > playerTwoCardPick.value){
        playerOne.score = PlayerOne.score + carryRound.points + 1;
        console.log('playerOne Ambassador')
        carryRound.points = 0;
      } else if(playerTwoCardPick.name === "Ambassador" && playerTwoCardPick.value > playerOneCardPick.value){
        playerTwo.score = PlayerTwo.score + carryRound.points + 1;
        carryRound.points = 0;
        console.log('Ambassador')
      }

      //lAssassin
      if(playerOneCardPick.name === "Assassin" || playerTwoCardPick.name === "Assassin"){
        if(playerOneCardPick.value > playerTwoCardPick.value) {
          playerTwo.score = playerTwo.score + carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Assassin")
          deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
          return
        } else if(playerOneCardPick.value < playerTwoCardPick.value){
          playerOne.score = playerOne.score + carryRound.points + 1;
          carryRound.points = 0;
          console.log("playerOne Assassin")
          deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);
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

      deleteCards(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo);

    };

    $scope.deleteCards = function(playerOneCardPick, playerTwoCardPick, playerOne, playerTwo){
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

    $scope.reset = function() {
      $scope.playerOne = createPlayer("playerOne");
      $scope.playerTwo = createPlayer("playerTwo");

    }
  });




})();
