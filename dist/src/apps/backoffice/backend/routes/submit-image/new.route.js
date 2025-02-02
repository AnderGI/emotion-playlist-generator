"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const dependency_injection_1 = __importDefault(require("../../dependency-injection"));
const register = (router) => {
    const controller = dependency_injection_1.default.get('apps.backoffice.ImagePutController');
    router.put('/images/:id', (req, res) => {
        console.log('📥 Backend submit route');
        const { id } = req.params;
        const boundaryRegex = /boundary=(.+)/;
        const contentType = req.headers['content-type'];
        const boundaryMatch = contentType.match(boundaryRegex);
        if (!boundaryMatch) {
            return res.status(http_status_1.default.BAD_REQUEST).send({ error: 'No boundary found' });
        }
        const boundary = `--${boundaryMatch[1]}`;
        let rawData = '';
        req.on('data', (chunk) => {
            rawData += chunk.toString('binary'); // Asegurar que no se pierda información
        });
        req.on('end', () => {
            const parts = rawData.split(boundary).slice(1, -1); // Eliminar primeras y últimas líneas
            parts.forEach(part => {
                const [headers, fileContent] = part.split('\r\n\r\n');
                if (headers.includes('filename=')) {
                    const filenameMatch = headers.match(/filename="(.+?)"/);
                    if (!filenameMatch) {
                        return;
                    }
                    const filename = filenameMatch[1].trim();
                    const content = fileContent.slice(0, -2); // Quitar el `\r\n` extra del final
                    // Guardar archivo
                    fs_1.default.writeFileSync(`./images/${filename}`, content, 'binary');
                    console.log(`✅ Archivo guardado: ${filename}`);
                    const createImageReq = {
                        id,
                        dirname: 'images',
                        filename
                    };
                    controller.run(createImageReq, res);
                }
            });
            res.status(http_status_1.default.OK).json({ message: 'Archivo recibido correctamente' });
        });
        req.on('error', err => {
            console.error('❌ Error al procesar la solicitud:', err);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({ error: 'Error procesando archivo' });
        });
    });
};
exports.register = register;
