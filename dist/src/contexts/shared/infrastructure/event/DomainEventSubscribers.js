"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventSubscribers = void 0;
class DomainEventSubscribers {
    constructor(items) {
        this.items = items;
    }
    static from(container) {
        const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber');
        const subscribers = [];
        subscriberDefinitions.forEach((value, key) => {
            const domainEventSubscriber = container.get(key.toString());
            subscribers.push(domainEventSubscriber);
        });
        return new DomainEventSubscribers(subscribers);
    }
}
exports.DomainEventSubscribers = DomainEventSubscribers;
