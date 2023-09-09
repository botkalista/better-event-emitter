// BetterEventEmitter typed with constructor

import { BetterEventEmitter } from "../src";

const emitter = new BetterEventEmitter({
    event1: (a: number, b: number) => { },
    event2: (arg: string) => { }
});

emitter.on('event1', (a, b) => {
    console.log('Autocomplete for on');
    console.log('Typed a and b');
});

emitter.on('event2', (arg) => {
    console.log('Autocomplete for on');
    console.log('Typed a');
});

emitter.emit('event1', 1, 2);
emitter.emit('event2', 'test');