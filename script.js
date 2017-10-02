//Select random numbers per die
//add in score of selected by click
//save score, and continue to roll

var board = function() {
  var runTotal = document.getElementById('currentTotal');
  var allDice = [];

  for (var i = 1; i < i <= 6; i++) {
    var j = newDie(i);
    allDice.push(j);
  }
}

var self = this;
document.getElementById("roll").onClick =
  function(){
    self.roll(allDice)
  };
