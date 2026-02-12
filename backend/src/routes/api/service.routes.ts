import { Router } from "express";
import { ServiceRepository } from "../../repositories";
import { ServiceService } from "../../services";
import { ServiceController } from "../../controllers/service.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

const repository = new ServiceRepository();
const service = new ServiceService(repository);
const controller = new ServiceController(service);

// 🔹 Create Service (Admin only)
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create.bind(controller)
);

// 🔹 Get All Services (Admin + Mobile User)
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MOBILE_USER"),
  controller.getAll.bind(controller)
);

// 🔹 Get Service By ID (Admin + Mobile User)
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "MOBILE_USER"),
  controller.getById.bind(controller)
);

// 🔹 Update Service (Admin only)
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update.bind(controller)
);

// 🔹 Delete Service (Admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete.bind(controller)
);

export default router;
