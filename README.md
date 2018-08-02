# GameOfLife

This repo imitates Game Of Life - https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

In table, which size is choosen by user at the beggining, program generates live and dead cells - 
also, dead cells amount is choosen by user. Then application on each turn checks if any dead cells can become live and viceversa. 

It is checking as below:
-If dead cell has exactly 3 dead neighbours, then in next turn become alive
-If alive cell has 2 or 3 neighburs, then in next turn still is alive, otherwise dies

User have choice - step each turn manually by 'Next turn' button or set autochanging. 

When game is finished(no more cells can be changed), program displays alert about end of game and provides number of played turns

JavaScript
