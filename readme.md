

# Better Event Emitter

BetterEventEmitter is a custom event emitter with types and more functions.

## Installation

<code> npm i better-event-emitter </code>

## Usage

### Typing the emitter

#### Typing using Generics

```ts

import { BetterEventEmitter } from 'better-event-emitter';

type EmitterType = {
    login: (username: string, password: string) => void,
    logout: (username: string) => void,
}

const emitter = new BetterEventEmitter<EmitterType>();

```

#### Typing using constructor

```ts

import { BetterEventEmitter } from 'better-event-emitter';

const emitter = new BetterEventEmitter({
    login: (username: string, password: string) => {},
    logout: (username: string) => {},
});

```

### Register event listeners

#### `on` method

You can register a regular event listener using the `on` method. This listener will be called every time the specified event is emitted:

```ts
emitter.on('eventName1', (arg1, arg2) => {
  // Your event handler logic here
  console.log(`Event "eventName1" emitted with arguments: ${arg1}, ${arg2}`);
});
```

#### `once` method

You can register a one-time event listener using the `once` method. This listener will be called only once for the specified event:

```ts
emitter.once('eventName2', () => {
  // Your event handler logic here
  console.log('This listener will be called once when "eventName2" is emitted.');
});
```

#### `onAny` method

You can register an event listener for every event using the `onAny` method. This listener will be called for every emitted event:

```ts
emitter.onAny((event, ...args) => {
  // Your event handler logic here
  console.log(`Event ${event} emitted with arguments: ${arg1}, ${arg2}`);
});
```

### Emit events

#### `emit` method

You can emit events using the emit method. Pass the event name and any required arguments:

```ts
emitter.emit('eventName1', 'Hello', 42);
emitter.emit('eventName2');
```

### Remove event listeners

#### `removeListener` method

You can remove a specific event listener using the `removeListener` method. Provide the event name and the callback function:

```ts
const eventHandler = (arg1: string, arg2: number) => {
  // Your event handler logic here
};
emitter.on('eventName1', eventHandler);

// Later, remove the event listener
emitter.removeListener('eventName1', eventHandler);
```

#### `removeGlobalListener ` method

You can remove a global event listener (registered using `onAny`) using the `removeGlobalListener` method. Provide the callback function:

```ts
const globalEventHandler = (event: keyof typeof emitter, ...args: any) => {
  // Your global event handler logic here
};
emitter.onAny(globalEventHandler);

// Later, remove the global event listener
emitter.removeGlobalListener(globalEventHandler);
```

### Dispose the emitter

You can dispose the `BetterEventEmitter` instance to remove all event listeners:

```ts
emitter.dispose();
```

## Example

```ts

import { BetterEventEmitter } from 'better-event-emitter';

type EmitterType = {
    login: (username: string, password: string) => void,
    logout: (username: string) => void,
}

const emitter = new BetterEventEmitter<EmitterType>();

emitter.on('login', (username, password) => {
    console.log(`${username} has logged in`);
});

emitter.on('logout', (username) => {
    console.log(`${username} has logged out`);
});


```