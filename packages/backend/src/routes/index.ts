import { Router } from 'express';
import mainRoutes from './main.routes';

const router = Router();

router.use('', mainRoutes);

export default router;
