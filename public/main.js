(function() {

  var cardGame = angular.module('cardGame', []);
  cardGame.controller('gameCtrl', function($scope) {

    $scope.playerOne = createPlayer("playerOne");
    $scope.playerTwo = createPlayer("playerTwo");

    $scope.roundMessage = "";
    //rotate cards
    $scope.cardDisplay = function(type, value){
      if(type === "rotation"){
        return ("rotate-" + value)
      } else if(type === "up"){
        return ("card-up-" + value)
      }
    }

    //points or powers that are carry to the next round
    var carryRound = {
      players: {
        player1: { power: null },
        player2: { power: null }
      },
      points: 0
    };

    var resetJakePower = function(round){
      round.players.player1.power = null;
      round.players.player1.power = null;
    }

    var resetRound = function(round){
      round.points = 0;
      round.players.player1.power = null;
      round.players.player2.power = null;
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
      $scope.message = "";

      //Jake Power
      if(carryRound.players.player1.power !== null){
        playerOneCardPick.value = playerOneCardPick.value + carryRound.players.player1.power;
      }
      if(carryRound.players.player2.power !== null){
        playerTwoCardPick.value = playerTwoCardPick.value + carryRound.players.player2.power;
      }

      var playOutcome = function(player, message, restRound, deleteCards){
        player.score = player.score + carryRound.points + 1;
        $scope.message = message;
        resetRound(carryRound);
        deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
      }


      //Ice King nullifed others powers
      if(playerOneCardPick.name === "Ice King" || playerTwoCardPick.name === "Ice King") {
        if(playerOneCardPick.value > playerTwoCardPick.value){
          playOutcome(playerOne, "Ice King in play, opponent power are nullified", resetRound, deleteCards);
          return
        }
        if(playerOneCardPick.value < playerTwoCardPick.value){
          playerTwo.score = playerTwo.score + carryRound.points + 1;
          playOutcome(playerTwo, "Ice King in play, opponent powers are nullified", resetRound, deleteCards);
          return
        }
        if(playerOneCardPick.value === playerTwoCardPick.value){
          carryRound.points++
          $scope.message = "Tie";
          resetJakePower(carryRound);
          deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
          return
        }
      }
      //Jake
      if(playerOneCardPick.name === "Jake"){
        carryRound.players.player1.power += 2;
        console.log("Jake in play, plus 2 for next round for player1");
      }if(playerTwoCardPick.name === "General"){
        carryRound.players.player2.power += 2;
        console.log("Jake in play, plus 2 for next round for player2");
      }

      //Tree Trunk round on hold
      if(playerOneCardPick.name === "Tree Trunk" || playerTwoCardPick.name === "Tree Trunk") {
        carryRound.points++;
        $scope.message = ("Tree Trunk is in play, round is on hold");
        resetJakePower(carryRound);
        deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
        return
      }

      //Princess Bubble Gum
      if(playerOneCardPick.name === "Princess Bubble Gum" && playerTwoCardPick.name === "Finn"){
        console.log("player 1 Princess Bubble Gum win");
        deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
        return
      }if (playerOneCardPick.name === "Finn" && playerTwoCardPick.name === "Princess Bubble Gum"){
        console.log("player 2 Princess Bubble Gum win");
        deleteCards(playerOne, playerTwo, playerOneCardPick, playerTwoCardPick);
        return
      }

      //Lich King
      if(playerOneCardPick.name === "Lich King"){
        if(playerTwoCardPick.name === "Finn") {
          playOutcome(playerTwo, "Finn has defeated the Lich King. Rejoice!", resetRound, deleteCards);
          console.log("Finn wins(Lich King)")
          return
        }
        if(playerOneCardPick.value < playerTwoCardPick.value){
          playOutcome(playerOne, "Lich King win", resetRound, deleteCards);
          console.log("playerOne Lich King")
          return
        }
        if(playerTwoCardPick.value < playerTwoCardPick.value){
          playOutcome(playerTwo, "The Lich King has been defeated", resetRound, deleteCards);
          console.log("Lich King defeated");
          return
        }
      }

      //lich King
      if(playerTwoCardPick.name === "Lich King"){
        if(playerOneCardPick.name === "Finn") {
          playOutcome(playerOne, "Finn has defeated the Lich King", resetRound, deleteCards);
          return
        }
        if(playerTwoCardPick.value < playerOneCardPick.value){
          playOutcome(playerTwo, "Lich King win", resetRound, deleteCards);
          return
        }
        if(playerOneCardPick.value < playerOneCardPick.value){
          playOutcome(playerTwo, "Lich King has been defeated", resetRound, deleteCards);
          return
        }
      }

      //comparing Marceline
      if(playerOneCardPick.name === "Marceline" && playerOneCardPick.value > playerTwoCardPick.value){
        playerOne.score++;
        console.log('playerOne Marceline and score')
        playOutcome(playerOne, "Marceline wins! score +2", resetRound, deleteCards);
        return
      }if(playerTwoCardPick.name === "Marceline" && playerTwoCardPick.value > playerOneCardPick.value){
        playerTwo.score = playerTwo.score + carryRound.points + 2;
        playerOne.score++;
        console.log('playerTwo played Marceline and score')
          playOutcome(playerTwo, "Marceline wins! score +2", resetRound, deleteCards);
        return
      }

      //beemo
      if(playerOneCardPick.name === "Beemo"){
        var beemoPower = function(){
          console.log("Beemo Power");
        };
        carryRound.players.player1.power = beemoPower;
      }
      if(playerTwoCardPick.name === "Beemo"){
        var beemoPower = function(){
          console.log("Beemo Power")
        };
        carryRound.players.player1.power = beemoPower;
      }

      //compare value
      if(playerOneCardPick.value > playerTwoCardPick.value){
        playOutcome(playerOne, "Player One score!", resetRound, deleteCards);
      }if(playerOneCardPick.value < playerTwoCardPick.value){
          playOutcome(playerOne, "Player Two score!", resetRound, deleteCards);
      }if(playerOneCardPick.value === playerTwoCardPick.value){
        $scope.message = "Tie";
        carryRound.points++;
        resetJakePower(carryRound);
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


    $scope.playAgain = function() {
      $scope.playerOne = createPlayer("playerOne");
      $scope.playerTwo = createPlayer("playerTwo");

    }
  });




})();
