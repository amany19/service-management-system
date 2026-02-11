import { Router } from "express";
import { createRequestRouter } from "./api/request.routes";
import { Server } from "socket.io";
import authRoutes from './api/auth.routes'
import serviceRoutes from './api/service.routes'
import userRoutes from './api/user.routes'
export const createRoutes = (io: Server) => {
    const router = Router();
    router.use('/auth', authRoutes);
    router.use('/service', serviceRoutes);
    router.use('/user', userRoutes);
    router.use("/request", createRequestRouter(io));

    return router;
};
