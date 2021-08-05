import { Router } from 'express';
import {getBox} from "./../controller"
import {isUserAuthenticated, isUserAdmin} from "./../auth"

const router = Router();

router.get('/', [isUserAuthenticated, isUserAdmin], async (req, res) => {
    console.log("/box");
    return res.send(await getBox());
});

router.get('/:userId', (req, res) => {
    return res.send(`box router ${req.params.userId}`);
});

export default router;