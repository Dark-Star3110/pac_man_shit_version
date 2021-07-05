const DEFAULT_X=4;
const DEFAULT_Y=3;
let x=DEFAULT_X;
let y=DEFAULT_Y;

let food_position=[
    [radom_position(),radom_position()]
];
let boom_position=[];
for(let i=0;i<10;i++){
    boom_position.push([radom_position(),radom_position()]);
}

let count=0;
let health=6;
let moveKey = 'right';
let start = false;

function setSpeed(){
    let speed=0;
    let level=document.getElementById('level').value; 
    if(level=='easy'){
        speed=500;
    }
    if(level=='medium'){
        speed=300;
    }
    if(level=='hard'){
        speed=100;
    }
    return speed;
}


function radom_position(){
    return Math.floor(Math.random()*10);
}

function drawBroad(){
    html='';
    for(let i=0;i<10;i++){
        html+='<tr>'
        for(let j=0;j<10;j++){
            html+='<td id="'+i+'-'+j+'">';
            html+='</td>';
        }
        html+='</td>';
    }
    document.getElementById('game-broard').innerHTML=html;
}
drawBroad();

function drawSnakeRight(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img id="pacman" class="image" src="./assets/img/headR.png" alt="image">';
}

function drawSnakeLeft(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img id ="pacman" class="image" src="./assets/img/headL.png" alt="image">';
}

function drawSnakeTop(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img id="pacman" class="image" src="./assets/img/headT.png" alt="image">';
}

function drawSnakeBot(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img id="pacman" class="image" src="./assets/img/headB.png" alt="image">';
}
drawSnakeRight(x,y);

function clearSnake(x,y){
    document.getElementById(x+'-'+y).innerHTML='';
}

function drawFood(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img class="image" src="./assets/img/shit.png" alt="image">';
    // document.getElementById(x+'-'+y).style.backgroundColor='yellow';
}
drawFood(food_position[count][0],food_position[count][1]);

function drawBoom(x,y){
    document.getElementById(x+'-'+y).innerHTML='<img class="image" src="./assets/img/boom.png" alt="image">';
}
for(let i=0;i<10;i++){
    drawBoom(boom_position[i][0],boom_position[i][1]);
}

function drawHealth(){
    let html='';
    for(let i=0;i<health;i+=2){
        html+='<td>';
        html+='<img class="image" src="./assets/img/health.png" alt="image"></img>';
        html+='</td>';
    }
    document.getElementById('health').innerHTML=html;
}
drawHealth();

function explore(a,b){
    for(let i=0;i<10;i++){
        if(x==boom_position[i][0] && y==boom_position[i][1]){
            health--;
            drawHealth();
            document.getElementById(x+'-'+y).innerHTML='<img class="image" src="./assets/img/explore.png" alt="image">';
            return true;
        }
    }
    return false;
}

function opa_pacman(){
    document.getElementById('pacman').style.opacity=0.6;
}

function revive(a,b){
    console.log(health);
    if(explore(a,b)){
        if(health>0){
            document.getElementById(a+'-'+b).innerHTML='<img class="image" src="./assets/img/boom.png" alt="image">';
            setTimeout(opa_pacman,100);
        }
        else{
            alert('gameover');
            if(confirm('Do you want to retry!!')){
                refresh();
            }
            else{
                refresh();
            }
        }
    }
}

function eat(){
    if(x==food_position[count][0] && y==food_position[count][1]){
        count++;
        let a=radom_position();
        let b=radom_position();
        for(let i=0;i<10;i++){
            if(a==boom_position[i][0] && b==boom_position[i][1]){
                a=radom_position();
                b=radom_position();
            }
        }
        food_position.push([a,b]);
        document.getElementById('score').innerHTML='Điểm của bạn:'+count*10+' điểm';
        drawFood(food_position[count][0],food_position[count][1]);
    }
}

function move(event){
    let key = event.keyCode;
    console.log(key);
    switch(key){
        case 37:
            moveKey='left';
            break;
        case 38:
            moveKey='up';
            break;
        case 39:
            moveKey='right';
            break;
        case 40:
            moveKey='down';
            break;
    }    
}
window.addEventListener('keyup',move);
// setInterval(move,1000);

function moveUp(){
        x=x-1;
}

function moveDown(){
    x=x+1;
}

function moveLeft(){
    y=y-1;
}

function moveRight(){
    y=y+1;
}

function resetSnake() {
    if(x < 0) {
        x = 9;
    }

    if(x > 9) {
        x = 0;
    }

    if(y < 0) {
        y = 9;
    }

    if(y == 10) {
        y = 0;
    }
}

function play() {
    if(!start) {
        return;
    }
    clearSnake(x, y);
    revive(x,y);
    switch(moveKey) {
        
        case 'right':
            moveRight();
            resetSnake();
            drawSnakeRight(x,y);
            break;
        case 'left':
            moveLeft();
            resetSnake();
            drawSnakeLeft(x,y);
            break;
        case 'up':
            moveUp();
            resetSnake();
            drawSnakeTop(x,y);
            break;
        default:
            moveDown();
            resetSnake();
            drawSnakeBot(x,y);
            break;
    };
    eat();
    explore(x,y);
    // document.getElementById('speed').innerHTML = speed;
    // document.getElementById('score').innerHTML = countFood;
}
let game=setInterval(play,300);
function check(){
    console.log(setSpeed());
}

function startGame() {
    start = true;
}

function stopGame() {
    start = false;
}

function refresh(){
     location.reload();
}
