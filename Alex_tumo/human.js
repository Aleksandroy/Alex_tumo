class Human extends creature{
    constructor(x,y){
        super(x,y);
        this.energy = 10;
        
    }

    chooseCell(character, character2, charcter3, character4) {
        let found = [];
        super.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character || matrix[y][x] === character2 || matrix[y][x] === charcter3 || matrix[y][x] === character4) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    mul() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        if (oneCell) {
            let x = oneCell[0];
            let y = oneCell[1];
            matrix[y][x] = 5;
            let human = new Human(x, y);
            humanArr.push(human);
            this.energy = 10;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in humanArr) {
            if (humanArr[i].x === this.x && humanArr[i].y === this.y) {
                humanArr.splice(i, 1);
                break;
            }
        }
    }
    move() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        let found1 = this.chooseCell(2);
        let oneCell1 = random(found1);
        if (oneCell) {
            let newX = oneCell[0];
            let newY = oneCell[1];
            this.energy--;
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy <= 0) {
                this.die()
            }
        }
        else if(oneCell1){

            this.energy--;
            let newX = oneCell1[0];
            let newY = oneCell1[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 2;
            this.x = newX;
            this.y = newY;

            if(this.energy <= 0){
                this.die();
            }
        }
        else {
            this.energy--;
            if (this.energy <= 0) {
                this.die()
            }
        }
    }


    eat() {
        let found = this.chooseCell(1, 3, 4);
        let oneCell = random(found);
        if (oneCell) {
            this.energy += 2;
            let newX = oneCell[0];
            let newY = oneCell[1];
            if (matrix[newY][newX] === 1) {
                for (let i in grassArr) {
                    if (newX === grassArr[i].x && newY === grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] === 3) {
                for (let i in allEaterArr) {
                    if (newX === allEaterArr[i].x && newY === allEaterArr[i].y) {
                        allEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] === 4) {
                for (let i in carnArr) {
                    if (newX === carnArr[i].x && newY === carnArr[i].y) {
                        carnArr.splice(i,1);
                        break;
                    }
                }
            }

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy > 30) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

}