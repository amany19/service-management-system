import { Router } from 'express';
import { AuthRepository } from '../../repositories';
import { AuthService } from '../../services';
import { AuthController } from '../../controllers';


const router = Router();

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;
