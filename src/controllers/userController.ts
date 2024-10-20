import { registerUser, findUserByEmail } from '../services/userService';

export const  register = async (req: any, res: any) => {
    const { name, email, password , role } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = await registerUser(name, email, password ,role);
        res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

