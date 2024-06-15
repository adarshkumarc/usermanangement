const jsonwebtoken = require("jsonwebtoken");

function generateAuthToken(user) {
    
  const expiresIn = "2w";

  const payload = {
    sub: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,  
    },
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn});

 
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
    sub: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,   
    },
  };
  
}

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    const tokenParts = req.headers.authorization.split(' ');

    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {

      try {
        const verification = jsonwebtoken.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET);
        if(verification.sub.verified === false){
          res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not verified your email to access your account" });
        }else{
          req.jwt = verification;
        }
        next();
      } catch (err) {
        res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not authorized to visit this route" });
      }

    } else {
      res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not authorized to visit this route" });
    }
  } else {
    res.status(401).json({ success: false, status: 'TokenError', msg: "You are not authorized to visit this route" });
  }
}

module.exports.generateAuthToken = generateAuthToken;
module.exports.authMiddleware = authMiddleware;