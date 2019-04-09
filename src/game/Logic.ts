import Config from './Config';
import Stone from '../shape/Stone';
import Ball, { BallType } from '../shape/Ball';
import Circle from '../shape/Circle';
import Resource from './Resource';
import { invokeAnimation } from '../utils';

export default class Logic {

    constructor() {
        this.moveToCenter();
        this.startGame();
        window['rs'] = this.resource;
    }


    /**
     * 游戏相关资源
     *
     * @private
     * @type {Resource}
     * @memberof Logic
     */
    private resource: Resource = new Resource();





    private moveToCenter() {
        const stone = this.resource.currentStone;
        const center = {
            x: Config.GAME_WIDTH / (2 * Config.BLOCK_SIZE),
            y: Config.GAME_HEIGHT / (2 * Config.BLOCK_SIZE)
        };
        const offset = {
            x: center.x - stone.x - 1,
            y: center.y - stone.y - 1
        };
        // Config.canvas.style.cssText = [
        //     `transform:translate3d(${offset.x * stone.size}px,${offset.y * stone.size}px,0)`
        // ].join(';');
        Config.canvas.style.transform = `translate3d(${offset.x * stone.size}px,${offset.y * stone.size}px,0)`;
    }

    public startGame(): void {
        invokeAnimation(() => {
            this.resource.draw();
        });
    }

}
