//global variables go here:

var clickedArray = []; //used to keep track of the clicked cells.


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

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
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
            //make the blue cells turn red and also reveal their hidden values when clicked
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }
        });
    }
}