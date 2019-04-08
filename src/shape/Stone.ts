import Shape from "./Shape";
import IShape from "./IShape";
import Config from '../game/Config';

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

    draw(ctx?: CanvasRenderingContext2D) {
        ctx = ctx || this.ctx;
        ctx.save();

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
