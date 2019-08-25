import Sudoku from '../core/sudoku';
import Checker from '../core/checker'

class Grid{
    private _$container: any;
    constructor(container: any){
        this._$container = container;
    }

    build() {
        const sudoku = new Sudoku();
        sudoku.createWhite();
        const martix = sudoku.puzzle;

        const rowGroupClasses = ['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses = ['col_g_left','col_g_center','col_g_right'];

        const cells = martix.map((rowValue: any) => rowValue.map((cellValue: any, index: number) => {
            let tmp = document.createElement('span');
            $(tmp).addClass(colGroupClasses[index % 3]).addClass(cellValue ? "tips":"empty").text(cellValue)
           return tmp
        }));

        const divArray = cells.map((spanArray: any, index: number) => {
            let tmp = document.createElement('div')
            $(tmp).addClass('row').addClass(rowGroupClasses[index % 3]).append(spanArray)
            return tmp
        })

        this._$container.append(divArray)
        
    }

    layout() {
        const width = $("span:first",this._$container).width();
        $("span",this._$container).height(width).css({
            "line-height":`${width}px`,
            "font-size":width < 32 ? `${width / 2}px` : ""
        })
    }

    bindPopup(popupNumbers: any){
        this._$container.on("click","span",(e: any) => {
            const cell = $(e.target);
            popupNumbers.popup(cell);
        })
    }

    check(){
        const data = this._$container.children().map((index: number, div: any) => {
            return $(div).children().map((index, span) => parseInt($(span).text()) || 0);
        }).toArray().map(($data: any) => $data.toArray());
        const checker = new Checker(data)
        if(checker.check()){
            return true;
        }
        const marks = checker.allMarks;
        this._$container.children().each((row: number, div: any) => {
            $(div).children().each((col: number, span: any) => {
                if(marks[row][col] || $(span).is(".tips")){
                    $(span).removeClass("error");
                }else{
                    $(span).addClass("error");
                }
                
            })
        })
    }

    reset(){
        $("span:not(.tips)", this._$container)
        .text("0")
        .removeClass("mark1 mark2 error")
        .addClass("empty");
    }

    clear(){
        $("span.error", this._$container).removeClass("error");
    }

    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }
}
export default Grid;