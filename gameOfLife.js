document.addEventListener("DOMContentLoaded", function () {

    var counter = -1;
    var button = document.querySelector("button");
    var skipButton = document.querySelector(".secondbutton button");
    var turnCounter = 0;
    var interval;
    var allCells;

    var rows = prompt("Rows: ", 0);
    var columns = prompt("Columns: ", 0);
    var deadCellsNumber = setMaxNumberOfDeadCells();
    drawTable(rows, columns);
    fillCells(rows, columns);
    button.addEventListener("click", function () {
        newTurn();
    })


    //function checks if dead cells number is smaller than table size

    function setMaxNumberOfDeadCells() {
        var maxDead = parseInt(rows) * parseInt(columns);
        var deadCellsInput = prompt("Dead Cells: ", maxDead / 2);
        if (deadCellsInput > maxDead) {
            alert("Dead Cells number bigger than table size");
            return setMaxNumberOfDeadCells();
        }
        document.querySelector(".turn").style = "margin-left: " + ((columns * 50) - 100) + "px;";
        return deadCellsInput;
    }

    //function draws table based on provided rows and columns number

    function drawTable(x, y) {
        var table = document.querySelector("table");
        for (var i = 0; i < x; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < y; j++) {
                var cell = document.createElement("td");
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    //skipButton set interval to automatically rollover turns, another press clear interval

    skipButton.addEventListener("click", function () {
        if (!interval) {
            interval = setInterval(function () {
                newTurn();
            }, 500)
            document.querySelector(".secondbutton button").className = "buttonpause";
        } else {
            clearInterval(interval);
            interval = null;
            document.querySelector(".secondbutton button").className = "buttonplay"
        }
    })

    //function puts ID to all cells, then uses function 'putClassToCell' to check which cells are dead and which are alive

    function fillCells() {
        allCells = document.querySelectorAll("td");
        allCells.forEach(function (e) {
            counter++;
            e.id = counter;
        });

        for (var x = 0, y = 0, i = 0; i < rows * columns; i++, x++) {
            if (allCells[i].id % columns === 0) {
                y++;
                x = 1;
            }
            allCells[i].setAttribute("data-x", x);
            allCells[i].setAttribute("data-y", y);
        }
        document.querySelector(".button").style = "visibility: visible";
        document.querySelector(".secondbutton").style = "visibility: visible";
        putClassToCell(generateDeadCells());
    }

    //function generates random numbers 
    function generateNumbers() {
        return Math.floor(Math.random() * rows * columns);
    }

    //function uses 'generateNumbers' function to to choose which cells(by ID) will be dead on start
    function generateDeadCells() {
        var randomCell;
        var tab = [];
        for (var i = 0; i < deadCellsNumber;) {
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
        liveCells.forEach(function (e) {
            e.className = "live";
        })
    }

    //function changes classes from 'dead' to 'live' and vice versa
    function newTurn() {
        turnCounter++;
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
        document.querySelector(".turn").innerHTML = "Turn: " + turnCounter;
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
