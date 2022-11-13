class Grass extends creature {

    mul(){
        this.multiply ++;
        let found = super.chooseCell();
        let emptyCell = random(found);
        if(emptyCell && this.multiply >= 10){
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0;
        }
    }

}