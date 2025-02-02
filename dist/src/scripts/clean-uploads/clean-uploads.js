"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
// Ruta del directorio a limpiar
const directory = path.join(__dirname, '..', '..', '..', 'image-uploads', 'uploads');
// Función para eliminar archivos del directorio
const cleanDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        console.log(`El directorio "${dir}" no existe.`);
        return;
    }
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error leyendo el directorio: ${err.message}`);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error obteniendo información del archivo: ${err.message}`);
                    return;
                }
                if (stats.isFile()) {
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(`Error eliminando el archivo "${file}": ${err.message}`);
                        }
                        else {
                            console.log(`Archivo eliminado: ${file}`);
                        }
                    });
                }
                else if (stats.isDirectory()) {
                    cleanDirectory(filePath); // Llamada recursiva para subdirectorios
                }
            });
        });
    });
};
// Llamar a la función para limpiar el directorio
cleanDirectory(directory);
