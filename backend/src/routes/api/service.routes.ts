import { Router } from "express";
import { ServiceRepository } from "../../repositories";
import { ServiceService } from "../../services";
import { ServiceController } from "../../controllers/service.controller";

const router = Router();


const repository = new ServiceRepository();
const service = new ServiceService(repository);
const controller = new ServiceController(service);

// Routes
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
