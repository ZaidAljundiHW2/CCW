const jwt = require("jsonwebtoken")
const pool = require('../db');


const protect = async(req,res,next) => {

    try {

        console.log("COOKIES:", req.cookies);

        const token = req.cookies.token;

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", decoded);

        const user = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1',
            [decoded.id]
        );

        console.log("USER:", user.rows);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user.rows[0];
        next();

    } catch(error) {

        console.error("PROTECT ERROR:", error);
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports = protect;