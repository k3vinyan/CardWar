var createPlayer = function(player){
  this.player = player;
  this.score = 0;
  this.cards = [
      { name: "Tree Trunk",
        player: player,
        value: 0,
        desc: "This round is nullifed and put on hold",
        image: "images/treetrunk.png"
      },
      {
        name: "Princess Bubble Gum",
        player: null,
        value: 1,
        desc: "If your opponent plays the prince, you automatically win the game",
        image: "images/princess.png"
      },
      {
        name: "Beemo",
        player: null,
        value: 2,
        desc: "Next round, your opponent reveals his card before you choose yours",
        image: "images/beemo.png"
      },
      {
        name: "Lich King",
        player: null,
        value: 3,
        desc: "The lowest strength wins",
        image: "images/lich.png"
      },
      {
        name: "Marceline",
        player: null,
        value: 4,
        desc: "If you win with this card, it counts as 2 victories",
        image: "images/marceline.png"
      },
      {
        name: "Ice King",
        player: null,
        value: 5,
        desc: "Nullifies the special Power of your opponent card",
        image: "images/iceking.png"
      },
      {
        name: "Jake",
        player: null,
        value: 6,
        desc: "The Card in your next round get +2 strength",
        image: "images/jake.png"
      },
      {
        name: "Finn",
        player: "null",
        value: 7,
        desc: "You win the round",
        image: "images/finn.png"
      }
    ]
    return {
      player: this.player,
      score: this.score,
      cards: this.cards,
    }
}
