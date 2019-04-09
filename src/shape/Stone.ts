import Shape from "./Shape";
import IShape from "./IShape";
import Config from '../game/Config';

enum EDirection {
    /**
     * 上
     */
    Top,
    /**
     * 右
     */
    Right,
    /**
     * 下
     */
    Down,
    /**
     * 左
     */
    Left
}

export default class Stone extends Shape {

    // private borderColor = '#929b9c';
    private borderColor = '#666';

    private backgroundColor = '#c1c1cd';

    // private size = Config.BLOCK_SIZE;

    private offsetSize = 2;

    public size = Config.BLOCK_SIZE;

    public width = Config.BLOCK_SIZE;

    public height = Config.BLOCK_SIZE;

    /**
     * 当前第几个
     *
     * @memberof Stone
     */
    public step: number;

    /**
     * 上一个
     *
     * @type {Stone}
     * @memberof Stone
     */
    public prev: Stone;

    /**
     * 下一个
     *
     * @type {Stone}
     * @memberof Stone
     */
    public next: Stone;

    private getInnerRect(target: Stone) {
        const size = this.size - this.offsetSize * 8;
        const offsetSize = (this.size - size) / 2;
        let [x, y, width, height] = [
            this.x * this.size + offsetSize,
            this.y * this.size + offsetSize,
            size,
            size
        ];

        if (target.x < this.x) { // 左边
            x = (target.x + 1) * this.size;
        }
        else if (target.x > this.x) { // 右边
            x = target.x * this.size - size;
        }
        else if (target.y < this.y) { // 上边
            y = (target.y + 1) * this.size;
        }
        else { // 下边
            y = target.y * this.size - size;
        }
        return { x, y, width, height };
    }

    draw(ctx?: CanvasRenderingContext2D) {
        ctx = ctx || this.ctx;
        ctx.save();

        // 前后的rect
        ctx.fillStyle = '#3366CC';
        if (this.prev) {
            const { x, y, width, height } = this.getInnerRect(this.prev);
            ctx.fillRect(x, y, width, height);
            // ctx.strokeRect(x, y, width, height);
        }
        if (this.next) {
            const { x, y, width, height } = this.getInnerRect(this.next);
            ctx.fillRect(x, y, width, height);
            // ctx.strokeRect(x, y, width, height);
        }

        ctx.fillStyle = this.backgroundColor;
        ctx.strokeStyle = this.borderColor;

        ctx.fillRect(
            this.x * this.size + this.offsetSize,
            this.y * this.size + this.offsetSize,
            this.size - this.offsetSize * 2,
            this.size - this.offsetSize * 2
        );

        ctx.strokeRect(
            this.x * this.size + this.offsetSize,
            this.y * this.size + this.offsetSize,
            this.size - this.offsetSize * 2,
            this.size - this.offsetSize * 2
        );

        ctx.restore();

    }
}
