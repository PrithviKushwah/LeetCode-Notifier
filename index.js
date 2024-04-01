import express from 'express';
import dataBaseConnection from './Middleware/dbConnection.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dataBaseConnection();

// Use userRoutes
app.use(express.json());
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
