import Stone from "../shape/Stone";
import Ball, { BallType } from "../shape/Ball";
import Circle from "../shape/Circle";
import Config from "./Config";
import IShape from "../shape/IShape";

/**
 * 游戏相关的资源，缓存 balabala
 *
 * @export
 * @class Resource
 */
export default class Resource {

    private ctx: CanvasRenderingContext2D = Config.ctx;

    /**
    * 初始化
    *
    * @private
    * @memberof Resource
    */
    private initialize() {
        // 初始化画布
        Config.ele.style.cssText = `width:${Config.GAME_WIDTH}px;height:${Config.GAME_HEIGHT}px`;
        Config.canvas.width = Config.CANVAS_WIDTH;
        Config.canvas.height = Config.CANVAS_HEIGHT;

        // 初始化stones
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
        for (let i = 0, len = list.length; i < len; i++) {
            const pre = list[i - 1];
            if (pre) {
                pre.next = list[i];
                list[i].prev = pre;
            }
        }
        this.stones = list;

        // 缓存背景图
        this.cache.background.width = Config.canvas.width;
        this.cache.background.height = Config.canvas.height;
        for (let stone of this.stones) {
            stone.draw(this.cache.background.getContext('2d'));
        }

        // 初始化step
        this.updateStep(1);

        // 绘制游戏背景
        this.ctx.drawImage(this.cache.background, 0, 0);

    }

    constructor() {
        this.initialize();
    }

    public step: number = 1;

    public cache = {
        background: document.createElement('canvas')
    };

    /**
     * 背景 canvas
     *
     * @type {HTMLCanvasElement}
     * @memberof Resource
     */
    public background: HTMLCanvasElement;

    /**
     * 所有的stone
     * [0] 是当前轴心球，[1] 是活动球
     *
     * @type {Stone[]}
     * @memberof Resource
     */
    public stones: Stone[] = [];

    /**
     * 当前步骤的stone
     *
     * @readonly
     * @type {Stone}
     * @memberof Resource
     */
    public get currentStone(): Stone {
        return this.stones[this.step - 1];
    }

    /**
     * 双色球
     *
     * @type {[Ball, Ball]}
     * @memberof Resource
     */
    public balls: [Ball, Ball] = [new Ball(), new Ball()];

    /**
     * 转动的轨道
     *
     * @type {Circle}
     * @memberof Resource
     */
    public circle: Circle = new Circle();

    /**
     * 更新step
     *
     * @param {number} newStep
     * @memberof Resource
     */
    public updateStep(newStep: number) {
        // 更新当前step
        this.step = newStep;

        // 当前stone内容
        let { x, y, step } = this.currentStone;

        // 调整circle位置
        this.circle.moveTo(x, y);

        // 把balls坐标、颜色更新
        let [color0, color1] = [BallType.Red, BallType.Blue];
        if (step % 2 == 1) {
            [color0, color1] = [color1, color0];
        }
        this.balls[0].extend({ x, y, ballType: color0 });

        ({ x, y } = this.currentStone.prev || { x: x - 1, y });
        this.balls[1].extend({ x, y, ballType: color1 });


    }

    public clearCurrent() {
        // 先画原背景，只更新局部。麻烦点但是应该能降低消耗
        let x = this.currentStone.x - 1;
        let y = this.currentStone.y - 1;
        let width = 3;
        let height = 3;

        if (this.currentStone.prev) {
            x = Math.min(x, this.currentStone.prev.x - 1);
            y = Math.min(y, this.currentStone.prev.y - 1);
            width = 4;
            height = 4;
        }

        x = ~~(x * Config.BLOCK_SIZE);
        y = ~~(y * Config.BLOCK_SIZE);
        width = ~~(width * Config.BLOCK_SIZE);
        height = ~~(height * Config.BLOCK_SIZE);

        // this.ctx.save();
        this.ctx.clearRect(x, y, width, height);
        return { x, y, width, height };
    }

    public draw(): void {
        const { x, y, width, height } = this.clearCurrent();

        this.ctx.drawImage(
            this.cache.background,
            x,
            y,
            width,
            height,
            x,
            y,
            width,
            height
        );

        this.circle.draw();
        this.balls.forEach(ball => ball.draw());
    }
}
