import {  NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req:any, res: any, next: NextFunction) => {
    try{
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token is required' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });

    }catch(err){
        console.log(err);
        return res.json({err : err?.message})
    }
   
};
