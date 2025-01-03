"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySyncEventBus = void 0;
class InMemorySyncEventBus extends Map {
    async publish(event) {
        // const subscribers = this.get(event.eventName);
        // if (!subscribers) {
        // 	throw new Error(`No subscribers found for ${event.eventName}`);
        // }
        // await Promise.all(subscribers.map(subscriber => subscriber.on(event)));
        console.log(event);
        await Promise.resolve();
    }
    addSubscribers(subscribers) {
        subscribers.items.forEach(subscriber => {
            const events = subscriber.subscribedTo();
            events.forEach(event => {
                const eventName = event.EVENT_NAME;
                if (!this.get(eventName)) {
                    this.set(eventName, []);
                }
                this.get(eventName)?.push(subscriber);
            });
        });
    }
}
exports.InMemorySyncEventBus = InMemorySyncEventBus;
