
/**
 * 所有目标元素需要实现的接口
 *
 * @export
 * @interface IShape
 */
export default interface IShape {

    /**
     * x坐标
     *
     * @type {number}
     * @memberof IShape
     */
    x?: number;


    /**
     * y坐标
     *
     * @type {number}
     * @memberof IShape
     */
    y?: number;


    /**
     * 宽度
     *
     * @type {number}
     * @memberof IShape
     */
    width?: number;


    /**
     * 高度
     *
     * @type {number}
     * @memberof IShape
     */
    height?: number;
}
