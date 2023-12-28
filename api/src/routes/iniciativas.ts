import { Router } from "express";
import {createIniciativa,getIniciativa,putIniciativa,deleteIniciativa,getOneiniciativas,getnombreProvincia,getnombreMunicipio,toggleDestacada} from "../controllers/iniciativa";
import { isValidToken} from "../middleware/jwt";
export const router=Router();
// router.get('/hello',(req,res)=> res.send('hello word'));
router.post('/',createIniciativa);
router.get('/:identificador',getOneiniciativas);
router.get('/',getIniciativa);
router.put('/:identificador',putIniciativa)
router.delete ('/:identificador',deleteIniciativa)
router.get('/provincia/:nombre_provincia',getnombreProvincia)
router.get('/municipio/:nombre_municipio',getnombreMunicipio)
router.put('/:identificador/:destacada',toggleDestacada)

