import { Router, Request, Response } from "express";
import { User } from "../../models/index.js";
import jwt from "jsonwebtoken"

// create functions and routes for updating and deleting user accounts

const router = Router()

router.delete('/', async (req: Request, res: Response) => {

    try {
        if (req.user && req.user.email) {
        const user = await User.findOne({
            where: {
                email: req.user.email
            }
        })
            if (user) {
                await user.destroy()
                res.status(204).json({message: 'user deleted'})
            }
            else {res.status(404).json({message: 'user not found'})}

        }
    }
    catch (error: any) {res.status(500).json({message: error.message})}
})

router.put('/', async (req: Request, res: Response) => {

    try {
        if (req.user && req.user.email) {
        const user = await User.findOne({
            where: {
                email: req.user.email
            }
        })
            if (user) {
                user.name = req.body?.name
                user.location = req.body?.location
                await user.save()

                const secretKey = process.env.JWT_SECRET_KEY || ''

                const token = jwt.sign({email: user.email, location: user.location, name: user.name}, secretKey, {expiresIn: '1d'})
            
                res.status(200).json({token: token})
            }
            else {res.status(404).json({message: 'user not found'})}

        }
    }
    catch (error: any) {res.status(500).json({message: error.message})}
})

export default router