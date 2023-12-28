import  axios  from "axios";
import { LogedUser } from '../../../api/src/saveJwt/saveJWT';
const URI='http://localhost:3002/iniciativa'
export const loadIniciativas =async ()=>{
  const user = new LogedUser()
    try {
      const resultado = await axios.get(URI,{headers:{
        Authorization :`Bearer ${user._access_token}`
    }});
      return resultado
    } catch (error) {
      console.error(error); 
    }
  }