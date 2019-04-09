import Shape from "./Shape";
import IShape from "./IShape";
import Config from "../game/Config";

export enum BallType {
    Red = '#f00',
    Blue = '#0033CC'
}

export default class Ball extends Shape {

    private offsetSize = 6;

    private get rotate(): number {
        const anglePerMil = -Math.PI / 1000;
        const diffTime = new Date().getTime() - this.createTime;
        return diffTime * anglePerMil % (2 * Math.PI);
    }

    public r: number = ~~(Config.BLOCK_SIZE / 2);

    public size = Config.BLOCK_SIZE;

    /**
     * 球的类型
     *
     * @memberof Ball
     */
    public ballType = BallType.Red;

    public createTime: number = new Date().getTime();

    public draw() {

        this.ctx.save();

        this.ctx.fillStyle = this.ballType;
        this.ctx.beginPath();
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
