const martrixTool = {
    createRow(v = 0){
        const array = new Array(9);
        array.fill(v);
        return array
    },
    
    createMatrix(v: any = 0){
        return Array.from({length:9},() => this.createRow(v))
    },
    /*
     *Fisher-Yates洗牌算法 
     */
    shuffle(arr: any){
        const end = arr.length - 2;
        for(let i = 0;i < end;i++){
            const tmp = Math.floor(Math.random()*(arr.length - i));
            [arr[i], arr[tmp]] = [arr[tmp], arr[i]];
        }
        return arr
    },

    canFill(martrix: any, n: number, row: number, col: number){
        const r = new Set(martrix[row]);
        const c = new Set(this.createRow().map((v: any,i: number) => martrix[i][col]));
        const boxIndex = boxTool.getBoxIndex(row, col);
        const box = new Set(boxTool.getBoxCells(martrix, boxIndex));
        if(r.has(n) || c.has(n) || box.has(n)){
            return false;
        }
        return true;
    }
};

const boxTool = {
    getBoxIndex(row: number, col: number){
        return {
            box: Math.floor(row / 3) * 3 + Math.floor(col / 3),
            cell: row % 3 * 3 + col % 3
        };
    },
    getGridIndex(box:number, cell: number){
        return{
            row: Math.floor(box / 3) * 3 + Math.floor(cell / 3),
            col: box % 3 *3 + cell % 3
        }
    },
    getBoxCells(martrix: any, boxIndex: any){
        const {box, cell} = boxIndex;
        const gridIndex = this.getGridIndex(box,cell);
        const startRow = Math.floor(gridIndex.row / 3) * 3;
        const startCol = Math.floor(gridIndex.col / 3) * 3;
        const result = [];
        
        // console.log(0,martrix,1,gridIndex,2,boxIndex,startRow,startCol)
        for(let cellIndex = 0;cellIndex < 9; cellIndex++){
            const row = startRow + Math.floor(cellIndex / 3);
            const col = startCol + cellIndex % 3;
            // console.log(5,row,6,col)
            result.push(martrix[row][col]);
        }
        // console.log(martrix,boxIndex,gridIndex,startRow,startCol,result)
        return result;
    }


}

export default class Util {
    static get martrix(){
        return martrixTool;
    }

    static get box(){
        return boxTool;
    }
};