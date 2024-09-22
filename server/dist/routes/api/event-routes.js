import { Router } from "express";
import { Event } from "../../models/index.js";
import { User } from "../../models/index.js";
// create functions and routes for getting event data
// need routes for: creating single event, updating single event, deleting single event, finding single event, finding all events for the logged-in user, finding all events for the logged-in user for the current day
// routes start with api/event
const router = Router();
//post new event. Incoming req.body object should at least contain key-values for event name and date. Can also include optional start time, end time, and notes.
router.post('/', async (req, res) => {
    const { name, date, startTime, endTime, notes } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: req.user?.email
            }
        });
        if (user) {
            const event = await Event.create({ name, date, startTime, endTime, notes, UserId: user.id });
            res.status(201).json(event);
        }
        else
            res.status(404).json({ message: 'user not found' });
    }
    catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
});
//delete existing event. Incoming req.param.id should be event id.
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findByPk(id);
        if (event) {
            await event.destroy();
            res.status(200).json({ message: 'event deleted' });
        }
        else {
            res.status(404).json({ message: 'event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// update existing effect. Incoming req.param.id should be event id. Req.body needs to contain key-values for name, date, startTime, endTime, and notes. If notes or times are not submitted in, they should be set to '' in the req.body, name and date are required.
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findByPk(id);
        if (event) {
            event.name = req.body?.name;
            event.date = req.body?.date;
            event.startTime = req.body?.startTime;
            event.endTime = req.body?.endTime;
            event.notes = req.body?.notes;
            await event.save();
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: 'event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get all events for the logged-in user. Middleware should have placed decrypted token payload into req.body.token.
router.get('/all', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.user?.email
            }
        });
        if (user) {
            const events = await Event.findAll({
                where: {
                    UserId: user.id
                }
            });
            if (events) {
                res.status(200).json(events);
            }
            else
                res.status(404).json({ message: 'no events found' });
        }
        else
            res.status(500).json({ message: 'failed to fetch user' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get all events from the logged-in user for the current day
router.get('/day/:id', async (req, res) => {
    // formate date into mm/dd/yyyy with no leading zeroes.
    const date = (req.params.id.split('-').join('/'));
    try {
        const user = await User.findOne({
            where: {
                email: req.user?.email
            }
        });
        if (user) {
            const events = await Event.findAll({
                where: {
                    UserId: user.id,
                    date: date
                }
            });
            if (events) {
                res.status(200).json(events);
            }
            else
                res.status(404).json({ message: 'no events found' });
        }
        else
            res.status(500).json({ message: 'failed to fetch user' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get a single event by id.
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            where: {
                email: req.user?.email
            }
        });
        if (user) {
            const event = await Event.findOne({
                where: {
                    id: id,
                    UserId: user.id,
                }
            });
            if (event) {
                res.status(200).json(event);
            }
            else {
                res.status(404).json({ message: 'event not found' });
            }
        }
        else {
            res.status(404).json({ message: 'could not complete request' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
