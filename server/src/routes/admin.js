import { Router } from 'express';
import { registerNewAdmin, loginAdmin } from '../controller/admin.js';

const adminRoute = Router();

adminRoute.post('/register', registerNewAdmin);
adminRoute.post('/login', loginAdmin);

export default adminRoute;
