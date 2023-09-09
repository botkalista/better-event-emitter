
import { describe, it } from '@jest/globals';
import { BetterEventEmitter } from '../src';
import expect from 'expect';

describe('EventEmitter', () => {

    it('listen specific event', done => {
        const emitter = new BetterEventEmitter();

        emitter.on('test', (a: number, b: string) => {
            expect(a).toBe(123);
            expect(b).toBe('data');
            done();
        });

        emitter.emit('test', 123, 'data');

        emitter.dispose();
    });

    it('listen any event', done => {
        const emitter = new BetterEventEmitter();

        emitter.onAny((event: string, a: number, b: string) => {
            expect(event).toBe('test');
            expect(a).toBe(123);
            expect(b).toBe('data');
            done();
        });

        emitter.emit('test', 123, 'data');

        emitter.dispose();
    });

    it('listen specific event once', done => {
        const emitter = new BetterEventEmitter();
        let times = 0;
        emitter.once('test', (a: number, b: string) => {
            expect(a).toBe(123);
            expect(b).toBe('data');
            times++;
            if (times > 1) throw Error('Should have been called once');
        });
        emitter.emit('test', 123, 'data');
        emitter.emit('test', 123, 'data');
        emitter.dispose();
        done();
    });

    it('remove specific event', done => {
        const emitter = new BetterEventEmitter();
        const callback = (a: number, b: string) => {
            throw Error('Callback should not be called');
        };
        emitter.on('test', callback);
        emitter.removeListener('test', callback);
        emitter.emit('test', 123, 'data');
        done();
    });

    it('remove global event', done => {
        const emitter = new BetterEventEmitter();
        const callback = (event: string, a: number, b: string) => {
            throw Error('Callback should not be called');
        };
        emitter.onAny(callback);
        emitter.removeGlobalListener(callback);
        emitter.emit('test', 123, 'data');
        done();
    });

});