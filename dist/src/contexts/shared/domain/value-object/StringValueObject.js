"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValueObject = void 0;
const ValueObject_1 = require("./ValueObject");
class StringValueObject extends ValueObject_1.ValueObject {
    getValue() {
        return this.value;
    }
}
exports.StringValueObject = StringValueObject;
