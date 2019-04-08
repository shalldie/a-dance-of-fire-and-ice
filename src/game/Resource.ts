import Stone from "../shape/Stone";
import Ball, { BallType } from "../shape/Ball";
import Circle from "../shape/Circle";
import Config from "./Config";

/**
 * 游戏相关的资源，缓存 balabala
 *
 * @export
 * @class Resource
 */
export default class Resource {

    /**
    * 初始化
    *
    * @private
    * @memberof Resource
    */
    private initialize() {
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
        this.stones = list;

        // 缓存背景图
        this.cache.background.width = Config.canvas.width;
        this.cache.background.height = Config.canvas.height;
        for (let stone of this.stones) {
            stone.draw(this.cache.background.getContext('2d'));
        }


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
     *
     * @type {Stone[]}
     * @memberof Resource
     */
    public stones: Stone[] = [];

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
     * @param {number} step
     * @memberof Resource
     */
    public updateStep(step: number) {
        this.step = step;

    }
}
