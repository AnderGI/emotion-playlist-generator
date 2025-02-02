"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySyncEventBus = void 0;
class InMemorySyncEventBus extends Map {
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // const subscribers = this.get(event.eventName);
            // if (!subscribers) {
            // 	throw new Error(`No subscribers found for ${event.eventName}`);
            // }
            // await Promise.all(subscribers.map(subscriber => subscriber.on(event)));
            console.log(event);
            yield Promise.resolve();
        });
    }
    addSubscribers(subscribers) {
        subscribers.items.forEach(subscriber => {
            const events = subscriber.subscribedTo();
            events.forEach(event => {
                var _a;
                const eventName = event.EVENT_NAME;
                if (!this.get(eventName)) {
                    this.set(eventName, []);
                }
                (_a = this.get(eventName)) === null || _a === void 0 ? void 0 : _a.push(subscriber);
            });
        });
    }
}
exports.InMemorySyncEventBus = InMemorySyncEventBus;
