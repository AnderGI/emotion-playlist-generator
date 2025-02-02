"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImageCommandMother = void 0;
const faker_1 = require("faker");
const CreateImageCommand_1 = __importDefault(require("../../../../../src/apps/backoffice/backend/controllers/submit-image/CreateImageCommand"));
class CreateImageCommandMother {
    static random() {
        const submitImageRequest = {
            id: faker_1.datatype.uuid(),
            fieldname: faker_1.system.fileName(),
            dirname: faker_1.system.directoryPath()
        };
        return CreateImageCommand_1.default.create(submitImageRequest);
    }
}
exports.CreateImageCommandMother = CreateImageCommandMother;
