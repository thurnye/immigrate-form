const jwt = require('jsonwebtoken');

// Secret key for JWT (ensure it's the same as used when generating tokens)
const secretKey = 'MyTe$ting$ecritKey';

const isAuth = (req, res, next) => {
  try {
    
    // Retrieve the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    // Extract the only token 
    const token = authHeader.split(' ')[1]; 
    const decodedToken = jwt.verify(token, secretKey); 

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error });
  }
};

module.exports = {
  isAuth,
};
