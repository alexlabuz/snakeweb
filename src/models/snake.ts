export class Snake {
    private nbCol = 15;
    private nbLig = 15;
    private interval = 250;

    public gameBoard: number[][] = [];

    private snakeCoordinate: number[][] = [];
    private snakeMoveDirection: MoveDirection | null = null;
    private snakeIntervalId: number | undefined;

    public isGameOver: boolean = false;
    public isStartGame: boolean = false;

    constructor() {
        this.initializeBoard();
        this.initializeGame();
    }

    public playGame(play: boolean){
        if(play){
            if(this.isStartGame){
                this.snakeIntervalId = setInterval(() => this.moveSnake(), this.interval);
            }
        }else {
            clearInterval(this.snakeIntervalId);
        }
    }

    public resetGame(){
        this.initializeBoard();
        this.initializeGame();
    }

    public changeMoveDirection(moveDirection: MoveDirection){
        if(!this.isStartGame){
            // Start interval
            this.isStartGame = true;
            this.playGame(true);
        }

        const nextDirection = this.getNextCoordinate(moveDirection);
        const beforeSnake : number[] | null = this.snakeCoordinate.length > 1 ? this.snakeCoordinate[this.snakeCoordinate.length - 2] : null;

        if(beforeSnake === null || (nextDirection[0] !== beforeSnake[0] || nextDirection[1] !== beforeSnake[1])){
            this.snakeMoveDirection = moveDirection;
        }

    }

    public getScore(): number {
        return this.snakeCoordinate.length - 1;
    }

    private initializeBoard(){
        for(let col = 0; col < this.nbCol; col++){
            this.gameBoard[col] = [];

            for(let lig = 0; lig < this.nbLig; lig++){
                this.gameBoard[col][lig] = TypeCase.Empty;
            }
        }
    }

    private initializeGame(){
        this.isGameOver = false;
        this.snakeCoordinate = [];

        // Create start Snake
        const startCol =  Math.round(this.nbCol / 2) - 1
        const startLig = Math.round(this.nbLig / 2) - 1;

        this.snakeCoordinate.push([startCol, startLig]);
        this.updateBoardSnake([startCol, startLig], true);

        // Create first Square
        this.appearSquare();
    }

    private moveSnake(){
        const newCoordinate = this.getNextCoordinate(this.snakeMoveDirection!);

        if(this.checkEndGame(newCoordinate)){
            this.gameOver();
            return;
        }

        const isSquareCase = this.checkCase(newCoordinate) === TypeCase.Square;

        this.snakeCoordinate.push(newCoordinate);
        this.updateBoardSnake(newCoordinate, true);

        if (isSquareCase) {
            this.appearSquare();
        } else {
            this.updateBoardSnake(this.snakeCoordinate[0], false);
            this.snakeCoordinate.shift();
        }
    }

    private getNextCoordinate(direction: MoveDirection){
        const currentCoordinate = this.snakeCoordinate[this.snakeCoordinate.length - 1];
        switch (direction) {
            case MoveDirection.Top:
                return [currentCoordinate[0] - 1, currentCoordinate[1]];
            case MoveDirection.Bottom:
                return [currentCoordinate[0] + 1, currentCoordinate[1]];
            case MoveDirection.Left:
                return [currentCoordinate[0], currentCoordinate[1] - 1];
            default:
                return [currentCoordinate[0], currentCoordinate[1] + 1];
        }
    }

    private updateBoardSnake(coordinate: number[], isCreate: boolean){
        this.gameBoard[coordinate[0]][coordinate[1]] = isCreate ? TypeCase.Snake : TypeCase.Empty;
    }

    private appearSquare(): void{
        const squareCol = getRandomInt(1, this.nbCol - 1);
        const squareLig = getRandomInt(1, this.nbLig - 1);

        if(this.checkCase([squareCol, squareLig]) != TypeCase.Empty){
            return this.appearSquare();
        }

        this.gameBoard[squareCol][squareLig] = TypeCase.Square;
    }

    private checkCase(coordinate: number[]): TypeCase {
        return this.gameBoard[coordinate[0]][coordinate[1]];
    }

    private checkEndGame(newCoordinate: number[]): boolean {
        if(newCoordinate[0] < 0 ||
            newCoordinate[0] > (this.nbCol - 1) ||
            newCoordinate[1] < 0 ||
            newCoordinate[1] > (this.nbLig - 1)){
            return true;
        }

        return this.checkCase(newCoordinate) === TypeCase.Snake;
    }

    private gameOver(){
        this.isGameOver = true;
        this.isStartGame = false;
        this.playGame(false);
    }
}

export function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export enum TypeCase {
    Empty,
    Snake,
    Square
}

export enum MoveDirection {
    Top,
    Bottom,
    Left,
    Right
}