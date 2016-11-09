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
      $scope.playerOneScore = 0;
      $scope.playerTwoScore = 0;
      $scope.playerOneCard = "";
      $scope.playerTwoCard = "";
      console.log("reset....");
      this.playerOne = this.playerTwo = [
          { name: "Musician",
            value: 0,
            desc: "This round is nullifed and put on hold",
            priority: 1000,
            power: {
              type: "carry",
              cast: function(point){
                var point = 1;
              }
            }
          },
          {
            name: "Princess",
            value: 1,
            desc: "If your opponent plays the prince, you automatically win the game",
            priority: 6,
            power: {
              type: "win",
              cast: function(playerCard, opponentCard){
                if(opponentCard.name === "Prince") {
                  console.log("Game Over");
                }
              }
            }
          },
          {
            name: "Spy",
            value: 2,
            desc: "Next round, your opponent reveals his card before you choose yours",
            priority: 5,
            power: {
              type: "carry",
              cast: function(){
                console.log("I am a spy")
              }
            }
          },
          {
            name: "Assassin",
            value: 3,
            desc: "The lowest strength wins",
            priority: 4,
            power: {
              type: "instance",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                if(playerCard.value < opponentCard.value) {
                  playerScore++;
                } else {
                  opponentScore++;
                }
              }
            }
          },
          {
            name: "Ambassador",
            value: 4,
            desc: "If you win with this card, it counts as 2 victories",
            priority: 3,
            power: {
              type: "instance",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                if(playerCard > opponentCard) {
                  playerScore += 2;
                } else {
                  opponentScore++;
                }
              }
            }
          },
          {
            name: "Wizard",
            value: 5,
            desc: "Nullifies the special Power of your opponent card",
            priority: 10,
            power: {
              type: "instance",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                if(playerCard.value > opponentCard.value){
                  playerScore++;
                } else {
                  opponentScore++
                }
              }
            }
          },
          {
            name: "General",
            value: 6,
            desc: "The Card in your next round get +2 strength",
            priority: 1,
            power: {
              type: "carry",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                console.log("Nothing yet");
              }
            }
          },
          {
            name: "General",
            value: 6,
            desc: "The Card in your next round get +2 strength",
            priority: 1,
            power: {
              type: "carry",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                console.log("Nothing yet");
              }
            }
          },
          {
            name: "General",
            value: 6,
            desc: "The Card in your next round get +2 strength",
            priority: 1,
            power: {
              type: "carry",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                console.log("Nothing yet");
              }
            }
          },
          {
            name: "Prince",
            value: 7,
            desc: "You win the round",
            priority: 0,
            power: {
              type: "instance",
              cast: function(playerCard, opponentCard, playerScore, opponentScore){
                if(playerCard.value > opponentCard){
                  playerScore++;
                } else {
                  opponentScore++;
                }
              }
            }
          }
        ]


    }

  });


})();
