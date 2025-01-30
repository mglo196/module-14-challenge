// src/types/express/types.d.ts

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload; // Augment the Express.Request interface with the user property
      }
    }
  
    // Define the JwtPayload interface if it's not already defined elsewhere
    interface JwtPayload {
      username: string;
      // You can add other properties of your JWT payload here
    }
  }
  
  // This ensures the file is treated as a module and doesn't pollute the global scope
  export {};
  
  