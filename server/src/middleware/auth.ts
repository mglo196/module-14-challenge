import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as JwtPayload);
        }
      });
    });

    // Attach the decoded user to the request object
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
