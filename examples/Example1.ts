// BetterEventEmitter typed with Generic

import { BetterEventEmitter } from "../src";


type EmitterType = {
    event1: (a: number, b: number) => void,
    event2: (arg: string) => void
};

const emitter = new BetterEventEmitter<EmitterType>();

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