import { Router } from "express";
import { createRequestRouter } from "./api/request.routes";
import { Server } from "socket.io";
import authRoutes from './api/auth.routes'
import serviceRoutes from './api/service.routes'
export const createRoutes = (io: Server) => {
    const router = Router();
    router.use('/auth', authRoutes);
    router.use('/service', serviceRoutes);
    router.use("/request", createRequestRouter(io));

    return router;
};
