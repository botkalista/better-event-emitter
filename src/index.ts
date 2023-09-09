

type Listener<T> = { event: keyof T, callback: (...args: any) => any }
type AnyListener<T> = (event: keyof T, ...args: any) => any

export class BetterEventEmitter<T extends (Record<string, (...args: any) => any>)> {

    private listeners: Listener<T>[] = [];
    private anyListeners: AnyListener<T>[] = [];

    private singleListeners: Listener<T>[] = [];

    constructor(data?: T) { }

    on<K extends keyof T>(event: K, callback: T[K]): this {
        this.listeners.push({ event, callback });
        return this;
    }

    once<K extends keyof T>(event: K, callback: T[K]): this {
        this.singleListeners.push({ event, callback });
        return this;
    }

    removeListener<K extends keyof T>(event: K, callback: T[K]): this {
        this.listeners = this.listeners.filter(e => e.event != event && e.callback != callback);
        return this;
    }

    onAny(callback: (event: keyof T, ...args: any) => any): this {
        this.anyListeners.push(callback);
        return this;
    }

    removeGlobalListener(callback: (event: keyof T, ...args: any) => any): this {
        this.anyListeners = this.anyListeners.filter(e => e != callback);
        return this;
    }


    emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): this {
        this.anyListeners.forEach(e => e(event, ...args as any));
        this.singleListeners.filter(e => e.event == event).forEach(e => e.callback(...args as any));
        this.singleListeners = this.singleListeners.filter(e => e.event != event);
        this.listeners.filter(e => e.event == event).forEach(e => e.callback(...args as any));
        return this;
    }

    dispose() {
        this.listeners.length = 0;
        this.anyListeners.length = 0;
    }

}