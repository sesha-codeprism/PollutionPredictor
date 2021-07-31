const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/User");
const auth = require('./Auth');
const signincheck = require('./SignInCheck');


router.post("/signup", [check("username", "Enter username").not().isEmpty(),
check('email', 'Enter email').isEmail(),
check('password', 'Enter password').isLength({ min: 6 }),
check('phone', "Enter phone").isMobilePhone('en-IN')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password, phone } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({ username, email, password, phone });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, "randomString", { expiresIn: 10000000 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    })
                }
            );
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Error in saving');
        }

    }

);

router.post('/login', [check("email", 'Enter a valid email').isEmail(),
check("password", "Password is incorrect").isLength({ min: 6 })

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    message: "User doesn't exist"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Incorrect password."
                })
            }
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, "secret", { expiresIn: '10000000' },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            )
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Server error'
            });
        }

    }
);


router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);

    }
    catch (e) {
        res.send({ message: "Error in fetching user" });
    }
})
router.get('/signincheck', signincheck, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);

    }
    catch (e) {
        res.send({ message: "Error in fetchin`g user" });
    }
})









module.exports = router;