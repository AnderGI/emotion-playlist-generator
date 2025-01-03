"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidValueObject = void 0;
const uuid_1 = require("uuid");
const StringValueObject_1 = require("./StringValueObject");
class UuidValueObject extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.ensureIsValid(value);
    }
    static random() {
        const uuid = new UuidValueObject((0, uuid_1.v4)());
        return uuid.getValue();
    }
    ensureIsValid(value) {
        if (!(0, uuid_1.validate)(value)) {
            throw new Error(`Invalid uuid ${value}`);
        }
    }
}
exports.UuidValueObject = UuidValueObject;
