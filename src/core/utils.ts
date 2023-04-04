export function debounce(callback: Function, duration: number) : Function {
    let timer: any = null;
    return (...args: any)=> {
        if ( timer ) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=> {
            callback(...args);
        }, duration)
    }
}

export function randomizer(max: number = 1000) { // 4999 max API offset
    return Math.floor(Math.random() * max)
}
