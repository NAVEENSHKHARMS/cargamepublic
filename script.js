// console.log("This is script file and in this file we will write javascript code");

const gameArea = document.querySelector('.gameArea');
const startScreen = document.querySelector('.startScreen');
const score = document.querySelector('.score');
// console.log(gameArea);


// PRE DETERMINE ALL THE KEYSA FALSE 
let keys = {ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false, 
    ArrowLeft : false,
         }
    // console.log(keys);


startScreen.addEventListener("click", start);



// FOR GETTING THE KEYS WHICH USER ARE PRESSING ON THE WINDOW 
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

// CREATING A EMPTY OBJECT 
let player = {speed : 5, score: 0};


// FOR CHECKING COLLISIION IN TWO CAR AND STOR THE GAME.......
function isCollide(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom< bRect.top) || (aRect.top> bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}




// DEFINE THE FUNCTION FOR MOVING THE LINES......
function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if (item.y >= 700) {
            item.y -= 750;
        }
         item.y += player.speed;
         item.style.top = item.y + "px";
    })
}



// FRO ENDING THE GAME AFTER COLLISED.........
function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> your final score is " + player.score + "<br> press here to restart the Game";
}

// DEFINE THE FUNCTION FOR MOVING TEH ENEMY CAR......
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if (isCollide(car, item)) {
            console.log("car hit hua");
            endGame();
        }


        if (item.y >= 700) {
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350) + 'px';

        }
         item.y += player.speed;
         item.style.top = item.y + "px";
    })
}


// PUTTING THE RENDOM COLOUR TO THE CAR (ENEMY CAR)........
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}




// DEFINE THE GAMEPLAY FUNCTION......
function gamePlay(){
    // console.log("Hello game is starting plese start play game");
    let car = document.querySelector('.car');

    // SET(getting) BOUNDRY CONDITION FOR MOVING CAR 
    let road = gameArea.getBoundingClientRect();
    console.log(road);


    // DEFINE ABOUT MOVING CAR METHOD 
    if (player.start) {

        moveLines();
        moveEnemy(car);



        if (keys.ArrowUp && (player.y> road.top+ 100)) {player.y -= player.speed}   
        if (keys.ArrowDown && player.y< (road.bottom - 85)) {  player.y += player.speed}
        if (keys.ArrowLeft && player.x>0) {player.x -= player.speed}   
        if (keys.ArrowRight && player.x < (road.width - 50)) {  player.x += player.speed}
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);

        // FOR CREATING SCORE AND DISPLAYING
        console.log(player.score++);
        player.score++;
        let ps = player.score - 2;
       score.innerText = "score: " + ps;
   }

}


// DEFINE THE START FUNCTION....... 
// FOR APPLYING THE CONTINOUS ANNIMITION IN THE GAME 
function start(){ 
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = " ";
    player.start = true;
    player.score = 0;
   window.requestAnimationFrame(gamePlay);


   // CREATING ROAD LINE AND APPEND GAMEAREA 

   for (let line = 0; line < 5; line++) {
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = (line*150);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
 
       
   }
   

   // CREATING A CAR TO MOVE IN WINDOW SCREEN 
   let car = document.createElement('div');
   car.setAttribute('class', 'car');
//    car.innerText = "Hey i am you car";
   gameArea.appendChild(car);

   player.x = car.offsetLeft;
   player.y = car.offsetTop;
//    player.y = car.offsetRight;
//    player.y = car.offsetBottom;



//    console.log("top position "+ car.offsetTop);
//    console.log("left position "+ car.offsetLeft);


// GENERATIN THREE ENEMY CAR WITH RANDOM PLACE
for (let car = 0; car < 3; car++) {
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class', 'enemy');
    enemyCar.y = ((car+1)*350)* -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random()*350) + 'px';
    gameArea.appendChild(enemyCar);

   }

}

