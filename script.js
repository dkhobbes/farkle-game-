/**********   BOARD  **************/
//An array containing all of the dice images
/*
var pics = [ "img/side1.png",'img/side2.png','img/side3.png','img/side4.png','img/side5.png','img/side6.png'];
*/

var Board = function(){
    // Create an array that will hold all the Dice in it.
    var runTotal = document.getElementById("currentTotal");
    var allDice = [];

    for(var i = 1; i <= 6; i++){
        var j = new Die(i);
        allDice.push(j);
    }
    /* Need to attach the onclick function inside the class so that the button points to the class Object and not the Event Object.
    This set up allows the class to be the event handler. Reference:
    http://stackoverflow.com/questions/229080/class-methods-as-event-handlers-in-javascript

    Also need to assign a variable for the class's this property so the constructor knows that 'this' is affiliated with this class and not the HTML element.
    */
    var self = this;
    document.getElementById("roll").onclick = function(){
        self.roll(allDice)
    };

    //Function calculates score of the current roll
    var scoreKepper = Number(document.getElementById("curTotal").innerHTML);
    var scoreEle = document.getElementById("curTotal");
    var rollScore = 0;
    document.getElementById("board").onclick = function(){
        rollScore = self.cTotal(allDice,scoreEle,rollScore);
    }
}

/* Roll function cycles through all the aray of die to simulate a new roll and sets the image source of each dice's HTML element to match the proper value. */
Board.prototype.roll = function(ary){
    var ary = ary;
    for(var i = 0; i < 6; i++){
        var roll = Math.floor(Math.random() * 6);
        var x = ary[i];

        if(x.isClicked() === false){
            var b = x.getEle();
            /*b.src = pics[roll];*/
            x.val = roll + 1;
            b.innerHTML = x.val;
        }

        else{console.log(x.getValue());}
    }
}

Board.prototype.cTotal = function(ary,t,roll){
    var curTotal = Number(t.innerHTML);//holds value of rolling score for the players turn
    curTotal -= roll;
    t.innerHTML = curTotal;
    roll=0;

    var ary = ary;//array of dice
    var selected = [];//new array to hold values of selected dice
    for(var i = 0; i < 6; i++){
        var x = ary[i];
        if(x.clickedThisTurn){
            var v = x.getValue();
            selected.push(v); //adds die value to new array if it was selected
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
        //If all the dice values are equal calculate various score
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
                //If roll is a straight 1-6 add 1500
                if (results[0] === undefined){
                    roll = 1500;
                }

                //If three pairs add 1500
                else if(results.length === 3){
                    roll = 1500;
                }

                //Controls if "two triples" or "four of a number and a pair" rolled
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

    //Function created to show the HTML element associated with the current dice
    this.getEle = function(){
        return this.ele;
    }

    //Function to change the status of the HTML element from false or true.
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

    //Function that returns the clicked status of the HTML element
    Die.prototype.isClicked = function(){return this.clicked;}

    //Function returns the value of the die
    Die.prototype.getValue = function(){return this.val;}
}
