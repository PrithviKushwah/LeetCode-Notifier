import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userController = {

    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if all required fields are provided
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Please provide all required fields' });
            }

            // Check if the user already exists
            const existingUser = await User.findOne({ name });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds = 10

            // Create a new user instance with hashed password
            const newUser = new User({
                name,
                email,
                password: hashedPassword, // Store hashed password in the database
            });

            // Save the new user to the database
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;


            if (!email || !password) {
                return res.status(400).json({ error: 'Please provide email and password' });
            }


            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }


            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, 'leetcode', { expiresIn: '1h' });
            res.status(200).send({ "token": token });

        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default userController;
