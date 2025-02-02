"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("./ValueObject");
class NumberValueObject extends ValueObject_1.ValueObject {
    getValue() {
        return this.value;
    }
}
exports.default = NumberValueObject;
