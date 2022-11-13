

let matrix = [
    /*
    [3,0,0,0,0,0,1,1],
    [0,0,0,0,0,1,1,1],
    [1,1,0,1,4,1,1,1],
    [1,1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1],
    [1,1,0,1,0,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,4,1,1,1,1,1,1],
    */
];
let side = 15;
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let carnArr = [];
let humanArr = [];

function setup(){
    matrix = generateMatrix(50, 50, 70, 40, 30, 30, 15, 2);
    frameRate(60);
    createCanvas(side * matrix[0].length+1, side * matrix.length+1);
    background('red');
    for(let y=0; y<matrix.length; ++y){
        for(let x=0; x<matrix[y].length; ++x){
        if(matrix[y][x]===1){
         let grass = new Grass(x,y);
         grassArr.push(grass);
        }
        else if(matrix[y][x] === 2){
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
        }
        else if(matrix[y][x] === 3){
            let allEater = new AllEater(x,y);
            allEaterArr.push(allEater);
        }
        else if(matrix[y][x] === 4){
            let carn = new Carnivorous(x,y);
            carnArr.push(carn);
        }
        else if(matrix[y][x] === 5){
            let human = new Human(x,y);
            humanArr.push(human);
        }
    }
    }
}
let count = 0
function draw(){
    count++
    for(let y=0; y<matrix.length; ++y){
        for(let x=0; x<matrix[y].length; ++x){
            if(matrix[y][x]===1){
                fill('green');
            }
            else if(matrix[y][x] == 0){
                fill('white');
            }
            else if(matrix[y][x] == 2){
                fill('yellow');
            }
            else if(matrix[y][x] == 3){
                fill('red');
            }
            else if(matrix[y][x] == 4){
                fill('orange');
            }
            else if(matrix[y][x] == 5){
                fill('black');
            }
            rect(x*side, y*side, side, side);
            fill('black');
            text(x + ',' + y, x * side + 42, y * side + 50);
        }
    }
    for(let i = 0; i < grassArr.length;  ++i){
        grassArr[i].mul();
    }
    for(let i = 0; i < grassEaterArr.length; ++i){
        grassEaterArr[i].eat();
    }
    for(let i = 0; i < allEaterArr.length; ++i){
        allEaterArr[i].eat();
    }
    for(let i = 0; i < carnArr.length; ++i){
        carnArr[i].eat();
    }
    for(let i=0; i<humanArr.length; ++i){
        humanArr[i].eat();
    }
}


function generateMatrix(x, y, grassCount, grassEaterCount, allEaterCount, carnCount, humanCount) {
    let matrix = [];
    for(let i = 0; i < x; i++){
        matrix.push([]);
        for(let j = 0; j < y; j++){
            matrix[i][j] = 0;
        }
    }
    for(let i = 0; i < grassCount; i++){
        let newX = Math.floor(random(x))
        let newY = Math.floor(random(y))
        if(matrix[newY][newX] == 0){
            matrix[newY][newX] = 1;
        }
    }
    for(let i = 0; i < grassEaterCount; i++){
        let newX = Math.floor(random(x))
        let newY = Math.floor(random(y))
        if(matrix[newY][newX] == 0){
            matrix[newY][newX] = 2;
        }
    }
    for(let i = 0; i < allEaterCount; i++){
        let newX = Math.floor(random(x))
        let newY = Math.floor(random(y))
        if(matrix[newY][newX] == 0){
            matrix[newY][newX] = 3;
        }
    }
    for(let i = 0; i < carnCount; i++){
        let newX = Math.floor(random(x))
        let newY = Math.floor(random(y))
        if(matrix[newY][newX] == 0){
            matrix[newY][newX] = 4;
        }
    }
    for(let i = 0; i < humanCount; i++){
        let newX = Math.floor(random(x))
        let newY = Math.floor(random(y))
        if(matrix[newY][newX] == 0){
            matrix[newY][newX] = 5;
        }
    }

    return matrix;
}



