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
exports.ImageSaver = void 0;
const DomainImageSaver_1 = require("../../domain/save/DomainImageSaver");
class ImageSaver {
    constructor(imageRepository, eventBus) {
        this.imageRepository = imageRepository;
        this.eventBus = eventBus;
    }
    run(command) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('imagesaver');
            return DomainImageSaver_1.DomainImageSaver.save(this.imageRepository, this.eventBus)(command);
        });
    }
}
exports.ImageSaver = ImageSaver;
