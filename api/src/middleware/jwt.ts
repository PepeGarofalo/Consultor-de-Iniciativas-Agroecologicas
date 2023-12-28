
import * as jtw from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export function isValidToken(req: Request, res: Response, next: NextFunction) {

    try {
        const { authorization = null } = req.headers
        const token = authorization?.split('Bearer ')[1] || null
        if (!authorization || !token) {
            return res.status(401).json({
                msg: "Unauthorized"
            })
        }
        const secret_key = process.env.SECRET_KEY || ""

        const isValidToken = jtw.verify(token, secret_key)

        if (isValidToken) {
            return next()
        }

    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" })
    }


}



