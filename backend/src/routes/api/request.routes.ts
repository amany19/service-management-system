import { Router } from "express";
import { RequestRepository } from "../../repositories";
import { RequestService } from "../../services";
import { RequestController } from "../../controllers";
import { io } from "../../server";
const router = Router();

const repository = new RequestRepository();
const service = new RequestService(repository);

const controller = new RequestController(service, io);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.patch("/status", controller.updateStatus);

export default router;
