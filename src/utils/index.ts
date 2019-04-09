
/**
 * requestAnimationFrame 简易封装
 *
 * @export
 * @param {Function} fn
 */
export function invokeAnimation(fn: Function) {
    fn();
    window.requestAnimationFrame(() => {
        invokeAnimation(fn);
    });
}
