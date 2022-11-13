class AllEater extends creature {
    constructor(x, y) {
        super(x,y);
        this.energy = 8;
        
    }
    chooseCell(character, character2, charcter3) {
        let found = [];
        super.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character || matrix[y][x] === character2 || matrix[y][x] === charcter3) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    eat() {
        let found = this.chooseCell(1, 2, 4);
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
            else if (matrix[newY][newX] === 2) {
                for (let i in grassEaterArr) {
                    if (newX === grassEaterArr[i].x && newY === grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] === 4) {
                for (let i in carnArr) {
                    if (newX === carnArr[i].x && newY === carnArr[i].y) {
                        this.energy-=2; // they damage each other
                        carnArr[i].energy--;
                        break;
                    }
                }
            }

            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy > 16) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    move() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        if (oneCell) {
            let newX = oneCell[0];
            let newY = oneCell[1];
            this.energy--;
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy <= 0) {
                this.die()
            }
        }
        else {
            this.energy--;
            if (this.energy <= 0) {
                this.die()
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i in allEaterArr) {
            if (allEaterArr[i].x === this.x && allEaterArr[i].y === this.y) {
                allEaterArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        if (oneCell) {
            let x = oneCell[0];
            let y = oneCell[1];
            matrix[y][x] = 3;
            let allEater = new AllEater(x, y);
            allEaterArr.push(allEater);
            this.energy = 8;
        }
    }

}