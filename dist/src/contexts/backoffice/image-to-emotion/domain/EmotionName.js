"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringValueObject_1 = require("../../../shared/domain/value-object/StringValueObject");
class EmotionName extends StringValueObject_1.StringValueObject {
    static create(name) {
        return new EmotionName(name);
    }
}
exports.default = EmotionName;
