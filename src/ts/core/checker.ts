import Util from "./martrixUtil"

function checkArray(array: any){
    const len = array.length;
    const marks = new Array(len)
    marks.fill(true)
    for(let i = 0;i < len - 1;i++){
        if(!marks[i]){
            continue;
        }
        const v = array[i];
        if(!v){
            marks[i] = false;
            continue;
        }

        for(let j = i + 1;j < len;j++){
            if(v === array[j]){
                marks[i] = marks[j] = false
            }
        }
    }
    return marks;
}

class Checker{
    private _martrix: any;
    private _allMarks: any;
    private _success: boolean = false;

    constructor(martrix: any){
        this._martrix = martrix;
        this._allMarks = Util.martrix.createMatrix(true);
    }
    get martrix(){
        return this._martrix
    }
    get allMarks(){
        return this._allMarks;
    }
    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        this._success = this._allMarks.every((row: any) => row.every((item: any) => item));
        return this._success;
    }
    checkRows(){
        for(let row = 0;row < 9;row++){
            const r = this._martrix[row];
            const marks = checkArray(r);
            for(let col = 0;col < marks.length;col++){
                if(!marks[col]){
                    this._allMarks[row][col] = false;
                }
            }
        }
    }
    checkCols(){
        for(let col = 0;col < 9;col++){
            let c = [];
            for(let row = 0;row < 9;row++){
                c[row] = this._martrix[row][col];
            }

            const marks = checkArray(c);
            for(let row  = 0;row < marks.length;row++){
                if(!marks[row]){
                    this._allMarks[row][col] = false;
                }
            }
        }
    }
    checkBoxes(){
        for(let boxIndex = 0;boxIndex < 9;boxIndex++){
            const boxes = Util.box.getBoxCells(this._martrix,{box:boxIndex,cell:0});
            const marks = checkArray(boxes);
            for(let cellIndex = 0;cellIndex < 9;cellIndex++){
                if(!marks[cellIndex]){
                    const {row, col} = Util.box.getGridIndex(boxIndex,cellIndex);
                    this._allMarks[row][col] = false;
                }
            }
        }
    }
}

export default Checker;