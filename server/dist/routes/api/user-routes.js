import { Router } from "express";
import { User } from "../../models/index.js";
import jwt from "jsonwebtoken";
// create functions and routes for updating and deleting user accounts
const router = Router();
router.delete('/', async (req, res) => {
    try {
        if (req.user && req.user.email) {
            const user = await User.findOne({
                where: {
                    email: req.user.email
                }
            });
            if (user) {
                await user.destroy();
                res.json({ message: 'user deleted' });
            }
            else {
                res.status(404).json({ message: 'user not found' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/', async (req, res) => {
    try {
        if (req.user && req.user.email) {
            const user = await User.findOne({
                where: {
                    email: req.user.email
                }
            });
            if (user) {
                if (req.body.email) {
                    user.email = req.body.email;
                }
                if (req.body.name) {
                    user.name = req.body.name;
                }
                if (req.body.location) {
                    user.location = req.body.location;
                }
                await user.save();
                const secretKey = process.env.JWT_SECRET_KEY || '';
                const token = jwt.sign({ email: user.email, location: user.location }, secretKey, { expiresIn: '1d' });
                res.json({ token: token, user: user });
            }
            else {
                res.status(404).json({ message: 'user not found' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
