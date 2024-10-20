import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import adminRoutes   from "./routes/adminRoutes"
import requestLogger from './middlewares/requestLogger';
const app = express();
app.use(express.json());
app.use(requestLogger);

app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
