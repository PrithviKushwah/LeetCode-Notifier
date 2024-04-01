import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization;

    // Check if token is provided
    if (!token || !token.startsWith('Bearer')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Extract the token value after 'Bearer '
        const tokenValue = token.split(' ')[1];

        // Verify the token using the secret key
        const decoded = jwt.verify(tokenValue, 'leetcode');

        // Set userId in the request object for further processing
        req.userId = decoded.userId;
        
        // Call the next middleware
        next();
    } catch (error) {
        // Handle token verification errors
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
