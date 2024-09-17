import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload {
    email: string;
    location: string;
    name: string;
}

const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        const secretKey = process.env.JWT_SECRET_KEY || ''

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {return res.sendStatus(403).json({message: 'test'})}
            else {
                req.user = user as JwtPayload
                return next()}
            });
    }
    else {res.sendStatus(401).json({message: 'test'})}
}


export default authentication