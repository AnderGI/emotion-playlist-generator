"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryImageRepository = void 0;
class InMemoryImageRepository extends Map {
    async save(image) {
        super.set(image.getId(), image);
        return Promise.resolve();
    }
    async search(imageId) {
        const image = this.get(imageId.getId());
        if (!image) {
            throw new Error(`Image with ${imageId.getId()} does not exist`);
        }
        return Promise.resolve(image);
    }
    async removeAllImages() {
        super.clear();
        return Promise.resolve();
    }
}
exports.InMemoryImageRepository = InMemoryImageRepository;
