import IShape from './IShape';
import Config from '../game/Config';

export default abstract class Shape implements IShape {

    /**
     * 当前画布的上下文对象 context
     *
     * @protected
     * @type {CanvasRenderingContext2D}
     * @memberof Shape
     */
    protected ctx: CanvasRenderingContext2D = Config.ctx;

    public x = 0;

    public y = 0;

    public width = 0;

    public height = 0;

    /**
     * 是否需要画出来
     *
     * @readonly
     * @memberof Shape
     */
    get alive() {
        return !(
            this.x + this.width < 0
            || this.x > this.width
            || this.y + this.height < 0
            || this.y > this.height
        );
    }

    /**
     * 绘制当前图像
     *
     * @abstract
     * @memberof Shape
     */
    public abstract draw(): void

    /**
     * 给当前实例添加属性
     *
     * @param {IShape} shape
     * @returns {this}
     * @memberof Shape
     */
    public extend(shape: IShape): this {
        Object.assign(this, shape);
        return this;
    }

}
