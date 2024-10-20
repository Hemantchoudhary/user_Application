import User from '../models/User';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';


export const createUser = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        
        return res.status(201).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err?.message });
    }
};

export const getUsers = async (req, res) => {
    const { page = 1, limit = 10, name, email, role } = req.query;

    const where : any= {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (role) where.role = role;

    try {
        const users = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });

        return res.json({
            total: users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: page,
            users: users.rows,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err?.message  });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err?.message  });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.id === id) {
        return res.status(403).json({ message: 'Admins cannot delete themselves' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        return res.status(200).json({message : "User deleted Succesfully!"}); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err?.message  });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.id === id) {
        return res.status(403).json({ message: 'Admins cannot delete themselves' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        return res.status(200).json({message : "User deleted Succesfully!"}); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err?.message  });
    }
};

export const fetchRecentUsers = async (req, res) => {
    try{
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); 
    
        const recentUsers = await User.findAll({
            where: {
                createdAt: {
                    [Op.gte]: sevenDaysAgo, 
                },
            },
        });
    
        return res.status(200).json({data:recentUsers});

    }catch(err){
        console.error(err);
        return res.status(500).json({err : err?.message});
    }
   
};



