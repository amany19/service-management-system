import express, {  Router } from 'express';
import authRoutes from './api/auth.routes'
const routes = Router();

routes.use('/auth', authRoutes);
export default routes