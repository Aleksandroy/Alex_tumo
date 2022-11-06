class Beam{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === 0) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }

    mul(){
        this.energy++;
        let found = this.chooseCell();
        let emptyCell = random(found);
        if(emptyCell && this.multiply === 5){
            let x = emptyCell[0];
            let y = emptyCell[1];
            if (matrix[x][y] === 1) {
                for (let i in grassArr) {
                    if (x === grassArr[i].x && y === grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[x][y] === 2) {
                for (let i in grassArr) {
                    if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[x][y] === 3) {
                for (let i in allEaterArr) {
                    if (x === allEaterArr[i].x && y === allEaterArr[i].y) {
                        allEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[x][y] === 4) {
                for (let i in carnArr) {
                    if (x === carnArr[i].x && y === carnArr[i].y) {
                        carnArr.splice(i, 1);
                        break;
                    }
                }
            }

            matrix[y][x] = 0;
            this.multiply = 0;
        }

    }
}