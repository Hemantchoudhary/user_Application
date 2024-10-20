import { Request, Response } from 'express';
import { findUserByEmail } from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req: any, res: any) => {
    try{
   const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
    }catch(err){
        console.log(err);
        return res.json({err :err?.message})
    }
   
};
