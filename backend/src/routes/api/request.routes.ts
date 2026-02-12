import { Router } from "express";
import { RequestRepository } from "../../repositories";
import { RequestService } from "../../services";
import { RequestController } from "../../controllers";
import { Server } from "socket.io";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

export const createRequestRouter = (io: Server) => {
  const router = Router();

  const repository = new RequestRepository();
  const service = new RequestService(repository);
  const controller = new RequestController(service, io);

  // 🔹 MOBILE USER creates request
  router.post(
    "/",
    authenticate,
    authorize("MOBILE_USER"),
    controller.create.bind(controller)
  );

  // 🔹 ADMIN views all requests (Dashboard)
  router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    controller.getAll.bind(controller)
  );

  // 🔹 ADMIN updates status
  router.patch(
    "/status",
    authenticate,
    authorize("ADMIN"),
    controller.updateStatus.bind(controller)
  );

  return router;
};
