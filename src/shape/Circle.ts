import Shape from "./Shape";
import Config from "../game/Config";
import IShape from "./IShape";

export default class Circle extends Shape {

    public createTime = new Date().getTime();

    private get rotate(): number {
        const anglePerMil = -Math.PI / 1000;
        const diffTime = new Date().getTime() - this.createTime;
        return diffTime * anglePerMil % (2 * Math.PI);
    }

    public readonly size = Config.BLOCK_SIZE;

    public readonly r: number = Config.BLOCK_SIZE;

    /**
     * 移动坐标
     *
     * @param {number} x x坐标
     * @param {number} y y坐标
     * @memberof Circle
     */
    public moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public draw(): void {
        this.ctx.save();
        this.ctx.setLineDash([6]);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#660099';
        this.ctx.translate(
            (this.x + 0.5) * this.size,
            (this.y + 0.5) * this.size
        );
        this.ctx.rotate(this.rotate);
        this.ctx.beginPath();
        this.ctx.arc(
            0,
            0,
            this.r,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.restore();
    }
}
