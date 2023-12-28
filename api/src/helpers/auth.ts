import * as jwt from 'jsonwebtoken'
type Payload = {userName:string}

export const genearateJswToken = (payload: Payload) =>{
      const sk = process.env.SECRET_KEY || null
      try {
        if (!sk) {
            throw new Error("Error in auth")
         }
         const token =  jwt.sign(payload,sk,{expiresIn:'24h'} )
         return token
      } catch (error) {
         throw error
      }

     
}