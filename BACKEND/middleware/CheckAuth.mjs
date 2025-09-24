const jwt = require('jsonwebtoken');
const User = require('./models/User');

const checkAuth = async (req, res, next) => {
    try {
        console.log("Token needed for Authorization, valid?");
        
     
        let token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ 
                message: "Token invalid" 
            });
        }
        

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, "this_secret_should_be_longer_than_it_is", (err, decoded) => {
            if (err) {
                return res.status(401).json({ 
                    message: "Token invalid" 
                });
            }
            
      
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ 
            message: "Token invalid" 
        });
    }
};

module.exports = checkAuth;