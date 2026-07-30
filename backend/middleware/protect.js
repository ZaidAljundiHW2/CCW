const jwt = require("jsonwebtoken")
const pool = require('../db');


const protect = async(req,res,next) => {

    try {
        
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [decoded.id]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found, not authorized' });
        }


        req.user = user.rows[0];
        next();
        } catch (error) {
        
        console.error(error);
    }
}

module.exports = protect;