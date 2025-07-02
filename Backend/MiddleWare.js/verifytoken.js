import jwt from 'jsonwebtoken'; 
import "dotenv/config";

const verifytoken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized. Please log in.",
        redirectTo: "/login" 
      });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      // console.log('err:',err)
      if (err) {
        return res.status(401).send({
          status: 401,
          message: "Token is invalid or expired. Please log in again.",
          redirectTo: "/login"
        });
      }
     req.user = decoded;
      next();
    });
};

export default verifytoken;
