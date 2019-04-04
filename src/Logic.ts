import Config from './Config';
import Stone from './shape/Stone';

export default class Logic {

    constructor() {
        this.initWrap();
        this.initCanvas();
        this.createStones();
        this.draw();
        this.moveToCenter();
    }

    private currentStep = 1;

    private initWrap() {
        Config.ele.style.cssText = `width:${Config.GAME_WIDTH}px;height:${Config.GAME_HEIGHT}px`;
    }
    private initCanvas() {
        const canvas = Config.canvas;
        canvas.width = Config.CANVAS_WIDTH;
        canvas.height = Config.CANVAS_HEIGHT;
    }

    private stones: Stone[] = [];

    private createStones() {
        const list: Stone[] = [];
        for (let x = 0; x < Config.mapWidth; x++) {
            for (let y = 0; y < Config.mapHeight; y++) {
                const step = Config.map[x][y];
                if (step > 0) {
                    // const stone = new Stone({ x, y });
                    // stone.step = step;
                    // list.push(stone);
                    list.push(new Stone({ x, y, step }));
                }
            }
        }
        list.sort((a, b) => a.step - b.step);
        this.stones = list;
    }

    private drawStones() {
        for (let i = 0, len = this.stones.length; i < len; i++) {
            this.stones[i].draw();
        }
    }


    private draw() {
        this.drawStones();
    }

    private moveToCenter() {
        const stone = this.stones[this.currentStep - 1];
        const center = {
            x: Config.GAME_WIDTH / (2 * Config.BLOCK_SIZE),
            y: Config.GAME_HEIGHT / (2 * Config.BLOCK_SIZE)
        };
        const offset = {
            x: center.x - stone.x,
            y: center.y - stone.y
        };
        Config.canvas.style.cssText = [
            `transform:translate3d(${offset.x * stone.size}px,${offset.y * stone.size}px,0)`
        ].join(';');
    }

    public moveNext() {
        this.currentStep++;
        this.moveToCenter();
    }
}
