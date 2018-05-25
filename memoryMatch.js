//global variables go here:

var clickedArray = []; //used to keep track of the clicked cells.
//for time stuff
var interval;        //to stop the timer using a clearInterval() method call
var started = false; //only start the timer once
var time = 0;        //to keep track of the elapsed time

var ready = true; //indicates whether or not the application is able to handle click events
var numCompleted = 0; //keeps track of the number of cells that have been completed

//execute functions here:
setUp();


//function definitions go here:

function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){ //sort the array in a pseudo random way
        return .5 - Math.random();
    })
    return answers;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function hide(cell){
    //reverts red cells back to blue cells and also hides their hidden number
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false; //so it can be clicked again in the future
}


function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false; //whether matched to it's matching pair
        cell.clicked = false;
        cell.value = answers[i];

        //setUp() function has a for-loop that iterates through all of the grid cells. 
        //Using this for-loop to add event listeners to all of the cells in the grid.
        cell.addEventListener("mouseenter",function(){
            //hover when no match
            if(this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        cell.addEventListener("mouseleave",function(){
            //no hover when no match
            if(this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener('click',function(){
            if(ready == false){ //make the application unable to handle click events when the ready attribute is set to false
                return;
            }

            startTimer();
            //make the blue cells turn red and also reveal their hidden values when clicked
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }

            if(clickedArray.length == 2){

                if(clickedArray[0].value == clickedArray[1].value){
                    //if a matching pair is found
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = []; //empty the clickedArray again for new pairs

                    if(numCompleted == 8){
                        alert("You won in " + time + " seconds!");
                        clearInterval(interval); //stop timer
                    }
                }
                else{
                    //if a matching pair is not found
                    ready = false;
                    document.getElementById("gridTable").style.border = "5px solid red";

                    //The red border and the inability to handle click events will only last for 500 ms
                    // because a setTimeout() will schedule a function to undo these actions
                    setTimeout(function(){
                        //after a 500ms delay
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById("gridTable").style.border = "2px solid black";

                    },500);

                }

            }
        });

        
    }//for
}