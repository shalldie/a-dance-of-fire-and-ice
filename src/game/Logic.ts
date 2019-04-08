import Config from './Config';
import Stone from '../shape/Stone';
import Ball, { BallType } from '../shape/Ball';
import Circle from '../shape/Circle';

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

    private redBall = new Ball();

    private blueBall = new Ball().extend({
        ballType: BallType.Blue
    });

    private circle = new Circle();

    private stones: Stone[] = [];

    private get currentStone() {
        return this.stones[this.currentStep - 1];
    }

    private createStones() {
        const list: Stone[] = [];
        for (let x = 0; x < Config.mapWidth; x++) {
            for (let y = 0; y < Config.mapHeight; y++) {
                const step = Config.map[x][y];
                if (step > 0) {
                    list.push(new Stone().extend({ x, y, step }));
                }
            }
        }
        list.sort((a, b) => a.step - b.step);
        this.stones = list;

        this.redBall.x = this.currentStone.x;
        this.redBall.y = this.currentStone.y;
    }

    private drawStones() {
        for (let i = 0, len = this.stones.length; i < len; i++) {
            this.stones[i].draw();
        }
    }

    private draw() {
        this.drawStones();
        this.redBall.draw();
    }

    private moveToCenter() {
        const stone = this.currentStone;
        const center = {
            x: Config.GAME_WIDTH / (2 * Config.BLOCK_SIZE),
            y: Config.GAME_HEIGHT / (2 * Config.BLOCK_SIZE)
        };
        const offset = {
            x: center.x - stone.x - 1,
            y: center.y - stone.y - 1
        };
        // Config.canvas.style.cssText = [
        //     `transform:translate3d(${offset.x * stone.size}px,${offset.y * stone.size}px,0)`
        // ].join(';');
        Config.canvas.style.transform = `translate3d(${offset.x * stone.size}px,${offset.y * stone.size}px,0)`;
    }

    public moveNext() {
        // step+1
        this.currentStep++;
        // circle
        this.circle.moveTo(this.currentStone.x, this.currentStone.y);

        this.moveToCenter();
    }

}
