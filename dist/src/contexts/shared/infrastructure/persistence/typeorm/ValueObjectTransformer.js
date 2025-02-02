"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObjectTransformer = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ValueObjectTransformer = (ValueObject) => {
    return {
        to: (value) => value.value,
        from: (value) => new ValueObject(value)
    };
};
exports.ValueObjectTransformer = ValueObjectTransformer;
