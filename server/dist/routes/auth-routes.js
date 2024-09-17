import { Router } from "express";
import { User } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// create functions and routes for signing up, logging in, including creating and responding with jwt's
const router = Router();
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, location } = req.body;
        const newUser = await User.create({ email: email, password: password, name: name, location: location });
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: newUser.email, location: newUser.location }, secretKey, { expiresIn: '1d' });
        res.json({ token: token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ email: user.email, location: user.location }, secretKey, { expiresIn: '1d' });
    return res.json({ token: token });
});
export default router;
