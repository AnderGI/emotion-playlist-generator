"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmitImageCommand {
    constructor(params) {
        this.params = params;
    }
    static create(req) {
        return new SubmitImageCommand(req);
    }
}
exports.default = SubmitImageCommand;
