import Generator from './generator'

export default class Sudoku{
    solution: any;
    puzzle: any;
    constructor(){
        const generator = new Generator();
        generator.generate();
        this.solution = generator.martrix;
    }

    createWhite(level = 5){
        this.puzzle = this.solution.map((row: any) =>{
            return row.map((cell: any) => Math.random() * 9 < level ? 0 : cell);
        })
    }
}