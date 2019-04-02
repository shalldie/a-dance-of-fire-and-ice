// import '@babel/polyfill';
import './index.scss';
// import Config from './Config';
import Config from './Config';



function adjustSize() {
    Config.ele.style.cssText = `width:${Config.GAME_WIDTH}px;height:${Config.GAME_HEIGHT}px`;
    // Config.canvas.width = CANVAS_WIDTH;
    // Config.canvas.height = CANVAS_HEIGHT;

    // Config.canvas.style.cssText = [
    //     `width:${CANVAS_WIDTH}px`,
    //     `height:${CANVAS_HEIGHT}px`
    // ].join(';');
}

adjustSize();
