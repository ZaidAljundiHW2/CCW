const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const protect = require("../middleware/protect.js")

const router = express.Router();

const cookieOptions = {

    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d"
    })
}

//register
// router.post('/register', async(req,res) => {
//     try {

//         const { username, email, password } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }

//         const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (userExists.rows.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const bcryptedPassword = await bcrypt.hash(password, 10);

//         const newuser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [username, email, bcryptedPassword]);
        
//         const token = generateToken(newuser.rows[0].id);

//         res.cookie('token', token, cookieOptions);

//         return res.status(201).json({ user: newuser.rows[0]});

//     } catch (error) {
//         console.error(error);
//     }

// })

router.post('/login', async(req,res) => {

    try {

        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userData = user.rows[0];

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(userData.id);

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({ user: userData });

    }

    catch (error) {
        console.error(error);

    }
})

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
  // return info of the logged in user from protect middleware
});

//logout
router.post('/logout', async(req,res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    res.json({ message: 'Logged out successfully' });
})

module.exports = router;