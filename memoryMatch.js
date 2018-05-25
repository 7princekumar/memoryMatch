//global variables go here:


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


        });
    }


}