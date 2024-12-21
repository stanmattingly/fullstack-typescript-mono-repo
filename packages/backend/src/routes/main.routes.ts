import { Router } from 'express';
import { getHelloWorld } from '../controllers/main.controller';

const router = Router();

router.get('', getHelloWorld);

export default router;
