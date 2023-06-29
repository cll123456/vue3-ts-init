/**
 * 函数防抖
 * @param f 防抖后需要执行的函数
 * @param t  防抖时间
 * @param im 是否立即执行
 * @returns
 */
export function debounce(f: (...args: unknown[]) => unknown, t: number, im: boolean = false) {
    let timer = 0,
        flag = true
    return (...args: unknown[]) => {
        // 需要立即执行的情况
        if (im) {
            if (flag) {
                f(...args)
                flag = false
            } else {
                window.clearTimeout(timer)
                timer = window.setTimeout(() => {
                    f(...args)
                    flag = true
                }, t)
            }
        } else {
            // 非立即执行的情况
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                f(...args)
            }, t)
        }
    }
}
