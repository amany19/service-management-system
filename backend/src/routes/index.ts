import express, {  Router } from 'express';
import authRoutes from './api/auth.routes'
import serviceRoutes from './api/service.routes'
import requestRoutes from './api/request.routes'
const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/service', serviceRoutes);
routes.use('/request', requestRoutes);
export default routes