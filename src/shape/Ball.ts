import Shape from "./Shape";
import IShape from "./IShape";
import Config from "../game/Config";

export enum BallType {
    Red = '#f00',
    Blue = '#2ad'
}

export default class Ball extends Shape {

    private offsetSize = 6;

    public r: number = ~~(Config.BLOCK_SIZE / 2);

    public size = Config.BLOCK_SIZE;

    /**
     * 球的类型
     *
     * @memberof Ball
     */
    public ballType = BallType.Red;

    constructor(shape?: IShape) {
        super(shape);
        shape && Object.assign(this, shape);
    }

    public draw() {

        this.ctx.save();

        this.ctx.fillStyle = this.ballType;
        this.ctx.arc(
            this.x * this.size + Config.BLOCK_SIZE / 2,
            this.y * this.size + Config.BLOCK_SIZE / 2,
            this.r - this.offsetSize,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        this.ctx.restore();
    }
}
