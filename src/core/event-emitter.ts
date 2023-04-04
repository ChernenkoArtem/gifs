export interface IEvents {
    [key: string]: Array<Function>;
}


class EventEmitter {
    private events: IEvents = {};

    constructor() {
    }

    subscribe(eventName: string, callback: Function): void {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }

    unsubscribe(eventName: string, callback: Function): void {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    emit(eventName: string, emittedValue: any) {
        const event = this.events[eventName];
        event && event.forEach(callback => callback.call(null, emittedValue));
    }
}

export default new EventEmitter();
