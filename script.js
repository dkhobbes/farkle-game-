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

  var scoreKepper = Number(document.getElementById("curTotal").innerHTML);
      var scoreEle = document.getElementById("curTotal");
      var rollScore = 0;
      document.getElementById("board").onclick = function(){
          rollScore = self.cTotal(allDice,scoreEle,rollScore);
      }

  Board.prototype.roll = function(ary){
    var ary = ary;
    for(var i = 0; i < 6; i++){
        var roll = Math.floor(Math.random() * 6);
        var x = ary[i];

        if(x.isClicked() === false){
            var b = x.getEle();
            x.val = roll + 1;
            b.innerHTML = x.val;
        }

        else{console.log(x.getValue());}
    }
}

Board.prototype.cTotal = function(ary,t,roll){
    var curTotal = Number(t.innerHTML);
    curTotal -= roll;
    t.innerHTML = curTotal;
    roll=0;

    var ary = ary;
    var selected = [];
    for(var i = 0; i < 6; i++){
        var x = ary[i];
        if(x.clickedThisTurn){
            var v = x.getValue();
            selected.push(v);
        }
    }

    if(selected.length === 1){
        if(selected[0]===1){
            roll += 100;
        }
        else if(selected[0]===5){
            roll += 50;
        }
        t.innerHTML = String(curTotal + roll);
    }

    if(selected.length > 1){
        if(selected.allValuesEqual()){
            if(selected.length===2){
                if(selected[0]===1){
                    roll += 200;
                }
                else if(selected[0]===5){
                    roll += 100;
                }
            }
            else if(selected.length===3){
                if(selected[0]===1){
                    roll += 300;
                }
                else{
                    roll += selected[0]*100;
                }
            }
            else if(selected.length===4){
                roll += 1000;
            }
            else if(selected.length===5){
                roll += 2000;
            }
            else if(selected.length===6){
                roll += 3000;
            }
        }
        else{

            var splitDie = selected.slice().sort();
            if(splitDie.length===6){
                var results = [];
                for (var i = 0; i < splitDie.length; i++) {
                    if (splitDie[i + 1] !== splitDie[i]) {
                        results.push(splitDie[i]);
                    }
                }
                console.log(results.length);

                if (results[0] === undefined){
                    roll = 1500;
                }

                else if(results.length === 3){
                    roll = 1500;
                }

                else if(results.length === 2){
                    roll = 2500;
                }
            }
        }
        t.innerHTML = String(curTotal + roll);
    }

    return roll;
}

Array.prototype.allValuesEqual = function(){
    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0]){
            return false;
        }
    }
    return true;
}

var board = new Board();

/**********   DICE  **************/
function Die(number){
    var current = this;
    this.clicked = false;
    this.clickedThisTurn = false;
    this.num = number;
    this.val = 1;
    this.ele = document.getElementById('die' + number);

    this.getEle = function(){
        return this.ele;
    }

    this.ele.onclick = function(){current.stateChange(current,current.clicked,current.ele)};

    Die.prototype.stateChange = function(current,clicked, ele){
        if(clicked === true){
            current.clicked = false;
            ele.className = ele.className.replace(" dieSelect", "");
            current.clickedThisTurn = false;
            return clicked, current.clickedThisTurn;
        }
        else{
            current.clicked = true;
            ele.className = ele.className + " dieSelect";
            current.clickedThisTurn = true;
            return clicked, current.clickedThisTurn;
        }
    }

    Die.prototype.isClicked = function(){return this.clicked;}

    Die.prototype.getValue = function(){return this.val;}
}
