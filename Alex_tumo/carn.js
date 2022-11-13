class Carnivorous extends creature{
    constructor(x,y){
        super(x, y);
        this.energy = 35;
        
    }

    chooseCell(character1, character2){
        let found  = [];
        super.getNewCoordinates();
        for(let i = 0; i<this.directions.length; ++i){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length){
            if(matrix[y][x] === character1 || matrix[y][x] === character2){
                found.push(this.directions[i]);
            }
          }
        }  
        return found;
    }

      move(){
        let found = this.chooseCell(0);
        let emptyCell = random(found);
        let found1 = this.chooseCell(1);
        let emptyCell1 = random(found1);
        if(emptyCell){

            this.energy--;
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            if(this.energy <= 0){
                this.die();
            }
        } else if(emptyCell1){

            this.energy--;
            let newX = emptyCell1[0];
            let newY = emptyCell1[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;

            if(this.energy <= 0){
                this.die();
            }
        }
        else{
            this.energy--;
            if(this.energy <= 0){
               this.die();
            }
        }
    }
    mul(){
        let found = this.chooseCell(0,1); // multiplicates in empty and grass
        let emptyCell = random(found);
        if(emptyCell){
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 4;
            let carn = new Carnivorous(newX, newY);
            carnArr.push(carn);
            this.energy = 35;
        }
    }

      die(){
        for(let i in carnArr){
           if(carnArr[i].x == this.x && carnArr[i].y == this.y){
              carnArr.splice(i, 1);
              break;
           }
        }
        matrix[this.y][this.x] = 0;
       }

       eat(){
        let found = this.chooseCell(2);
        let emptyCell = random(found);
        
        if(emptyCell){
          this.energy ++;
          let newX = emptyCell[0];
          let newY = emptyCell[1];
          matrix[newY][newX] = 4;
          matrix[this.y][this.x] = 0;
          this.x = newX;
          this.y = newY;

          for(let i in grassEaterArr){
            if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                grassEaterArr.splice(i, 1);
                break;
            }
        }

          if(this.energy > 40){
            this.mul();
          }
        }
        
        else{
            this.move()
        }
    }
}