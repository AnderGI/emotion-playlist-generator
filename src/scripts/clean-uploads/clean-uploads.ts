import * as fs from 'node:fs';
import * as path from 'node:path';

// Ruta del directorio a limpiar
const directory = path.join(__dirname, '..', '..', '..', 'image-uploads', 'uploads');

// Función para eliminar archivos del directorio
const cleanDirectory = (dir: string) => {
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
						} else {
							console.log(`Archivo eliminado: ${file}`);
						}
					});
				} else if (stats.isDirectory()) {
					cleanDirectory(filePath); // Llamada recursiva para subdirectorios
				}
			});
		});
	});
};

// Llamar a la función para limpiar el directorio
cleanDirectory(directory);
