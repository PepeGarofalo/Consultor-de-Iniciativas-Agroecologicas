// controller.ts

import express, { Request, Response } from 'express';
import { upload } from '../helpers/multerConfig';
import { Iniciativa } from '../entities/iniciativa';

export const router = express.Router();

router.post('/upload', upload.array('images', 4), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'No se ha seleccionado ninguna imagen' });
    }

    const identificador = req.body.identificador;
    console.log('Identificador recibido:', identificador); // Agrega esta línea
    const images = (req.files as Express.Multer.File[]).map((file) => file.filename);
    

    if (!identificador) {
      return res.status(400).json({ error: 'ID de iniciativa no proporcionado' });
    }

    const iniciativa = await Iniciativa.findOne(identificador);

    if (!iniciativa) {
      return res.status(404).json({ error: 'Iniciativa no encontrada' });
    }

    iniciativa.imagenes = images;
    await iniciativa.save();

    return res.json({ message: 'Imagen subida correctamente' });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return res.status(500).json({ error: 'Error al subir la imagen' });
  }
});
