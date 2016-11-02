(function() {
  var cardGame = angular.module('cardGame', []);

  var cards = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  }

  cardGame.controller('gameCtrl', function() {
    this.card = cards;
  });


})();
