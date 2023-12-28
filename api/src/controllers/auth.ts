import { Request, Response } from 'express'
import { genearateJswToken } from '../helpers/auth'
export const authController = async (req: Request, res: Response) => {
    
    const { username = '', password = '' } = req.body
    try {
        if (username === '' || password === '') {
            return res.status(400).json({ msg: "Inserte correctamente las credenciales" })
        }
        const cred = {
            user: process.env.mockuser || '',
            password: process.env.mockpassword || ''
        }
     
        
        
        

        if (!(cred.user === username) || !(cred.password === password)) {
            return res.status(400).json({ msg: "Error al introducir las credenciales" })
        }
        const token = genearateJswToken({ userName: username })
        
        return res.json({
            access_token: token
        })
    } catch (error) {
        return res.status(500).json({ msg: "Server error" })
    }
}

