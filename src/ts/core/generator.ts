import Util from './martrixUtil'

class Generator{
    martrix: any;
    orders: any;
    generate() {
        while(!this.generator()){

        }
    }
    generator(){
        this.martrix = Util.martrix.createMatrix();
        this.orders = Util.martrix.createMatrix().map(row => row.map((v: any, i: number) => i))
            .map(row => Util.martrix.shuffle(row));
        for(let n = 1;n < 10;n++){//填入1-9数独答案
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
    }

    fillNumber(n: number){
        return this.fillRow(n, 0);
    }

    fillRow(n: number, row: number){
        if(row > 8){
            return true;
        }
        const r = this.martrix[row];
        const orders = this.orders[row];
        for(let i = 0;i < 9;i++){
            const col = orders[i]
            if(r[col]){
                continue;
            }
            if(!Util.martrix.canFill(this.martrix, n, row, col)){
                continue;
            }
            r[col] = n;
            if(!this.fillRow(n,row + 1)){
                r[col] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
}

export default Generator;