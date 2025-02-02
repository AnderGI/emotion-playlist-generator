"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value.toString();
    }
    equals(other) {
        return this.constructor.name === other.constructor.name && this.value === other.value;
    }
}
exports.ValueObject = ValueObject;
