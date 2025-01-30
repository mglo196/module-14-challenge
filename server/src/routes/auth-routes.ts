import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/auth';  // Import the authenticateToken middleware

// Login route handler
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create JWT token with the user data and secret key
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' }  // Set expiration time for the token
    );

    return res.json({ token });
  } catch (error) {
    console.error('Login failure due to error:', error);
    return res.status(500).json({ message: 'Server error, oopsie!' });
  }
};

const router = Router();

// POST /login - Login a user and return JWT token
router.post('/login', login);

// POST /protected - Example of a protected route using JWT middleware
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
  // If the token is valid, the user info will be attached to req.user
  res.json({ message: `Hello, ${req.user?.username}! This is a protected route.` });
});

export default router;
