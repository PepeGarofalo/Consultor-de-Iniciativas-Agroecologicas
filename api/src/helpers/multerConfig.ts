// multerConfig.ts

import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage });

export { upload }; // Exporta la configuración de multer

// Puedes exportar otras cosas si es necesario
