import User from '../models/User';
import bcrypt from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string ,role : string) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword ,role });
        return user;
    }catch(err){
        console.log(err);
        return null;
    }
  
};

export const findUserByEmail = async (email: string) => {
    try{
        return await User.findOne({ where: { email } });
    }catch(err){
        console.log(err);
        return null;
    }
};

export const findById = async (id: number) => {
    try{
        return await User.findOne({ where: { id } });
    }catch(err){
        console.log(err);
        return null;
    }
};


