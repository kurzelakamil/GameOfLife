document.addEventListener("DOMContentLoaded", function () {
    var allCells = document.querySelectorAll("td");
    var counter = -1;
    var button = document.querySelector("button");
   
    fillCells();
    button.addEventListener("click", function () {
        newTurn();
    })
    
    //function puts ID to all cells, then uses function 'putClassToCell' to check which cells are dead and which are alive
    
    function fillCells() {                                              
        allCells.forEach(function (e) {
            counter++;
            e.id = counter;
        });

        for (var x = 0, y = 0, i = 0; i < 100; i++, x++) {
            if (allCells[i].id % 10 === 0) {
                y++;
                x = 1;
            }
            allCells[i].setAttribute("data-x", x);
            allCells[i].setAttribute("data-y", y);
        }
        putClassToCell(generateDeadCells());
    }
    
    //function generates random numbers 
    function generateNumbers() {
        return Math.floor(Math.random() * 100);
    }
    
    //function uses 'generateNumbers' function to to choose which cells(by ID) will be dead on start
    function generateDeadCells() {
        var randomCell;
        var tab = [];
        for (var i = 0; i < 50;) {
            randomCell = generateNumbers();
            if (tab.lastIndexOf(randomCell) === -1) {
                tab.push(randomCell);
                i++;
            }
        }
        tab.reduce(function (a, b) {
            a - b
        });
        return tab;
    }
    
    //function adds 'dead' or 'live' class to cells
    function putClassToCell(tab) {
        for (var i = 0; i < tab.length; i++) {
            document.getElementById(tab[i]).className = "dead";
        }
        var liveCells = document.querySelectorAll("td:not(.dead)");
        liveCells.forEach(function(e){
            e.className = "live";
        })
    }

    //function changes classes from 'dead' to 'live' and vice versa
    function newTurn() {
        var newAlive = checkDead();
        var newDead = checkAlive();
        newDead.forEach(function (e) {
            e.classList.add("dead");
            e.classList.remove("live");
        })
        newAlive.forEach(function (e) {
            e.classList.add("live");
            e.classList.remove("dead");
        })
    }
    
    //function checks for each dead cell if it can be alive
    function checkDead() {
        var deadCells = document.querySelectorAll(".dead");
        var newAliveCells = [];
        deadCells.forEach(function (e) {
            var isAlive = checkNeighbour(e);
            if (isAlive === 3) {
                newAliveCells.push(e);
            }
        })
        return newAliveCells;
    }

    //function checks for each alive cell if it can dead 
    function checkAlive() {
        var aliveCells = document.querySelectorAll(".live");
        var newDeadCells = [];
        aliveCells.forEach(function (e) {
            var isDead = checkNeighbour(e);
            if (isDead < 2 || isDead > 3) {
                newDeadCells.push(e);
            }
        })
        return newDeadCells;
    }

    //function checks if neighbour cells are dead or alive
    function checkNeighbour(cell) {
        var changeCounter = 0;
        var x = parseInt(cell.dataset.x);
        var y = parseInt(cell.dataset.y);
        if (document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + y + "\"]") !== null && document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + y + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + y + "\"]") !== null && document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + y + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + x + "\"][data-y=\"" + (y - 1) + "\"]") !== null && document.querySelector("[data-x=\"" + x + "\"][data-y=\"" + (y - 1) + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + x + "\"][data-y=\"" + (y + 1) + "\"]") !== null && document.querySelector("[data-x=\"" + x + "\"][data-y=\"" + (y + 1) + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + (y - 1) + "\"]") !== null && document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + (y - 1) + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + (y - 1) + "\"]") !== null && document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + (y - 1) + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + (y + 1) + "\"]") !== null && document.querySelector("[data-x=\"" + (x - 1) + "\"][data-y=\"" + (y + 1) + "\"]").className === "live") {
            changeCounter++;
        }
        if (document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + (y + 1) + "\"]") !== null && document.querySelector("[data-x=\"" + (x + 1) + "\"][data-y=\"" + (y + 1) + "\"]").className === "live") {
            changeCounter++;
        }
        return changeCounter;
    }
});
