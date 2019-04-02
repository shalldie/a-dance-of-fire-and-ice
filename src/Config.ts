
/**
 * 游戏相关配置、全局变量
 *
 * @export
 * @class Config
 */
export default class Config {

    /**
     * 容器元素
     *
     * @static
     * @memberof Config
     */
    static ele = document.getElementById('root');

    /**
     * canvas元素
     *
     * @static
     * @memberof Config
     */
    static canvas = document.getElementById('canvas') as HTMLCanvasElement;

    /**
     * 画布上下文
     *
     * @readonly
     * @static
     * @memberof Config
     */
    static get ctx() {
        return Config.canvas.getContext('2d');
    }

    /**
     * 宽高比例
     *
     * @static
     * @memberof Config
     */
    static readonly whScale = 5 / 3;

    /**
     * canvas缩放比例
     *
     * @static
     * @memberof Config
     */
    static readonly canvasScale = 2;

    /**
     * 游戏宽度
     *
     * @static
     * @memberof Config
     */
    static GAME_WIDTH = 1000;

    /**
     * 游戏高度
     *
     * @readonly
     * @static
     * @memberof Config
     */
    static get GAME_HEIGHT() {
        return Config.GAME_WIDTH / Config.whScale;
    }
}
