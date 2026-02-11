import { Router } from 'express';
import { AuthRepository, UserRepository } from '../../repositories';
import { UserService } from '../../services';
import { UserController } from '../../controllers';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';

const router = Router();

const userRepository = new UserRepository();
const authRepository =new AuthRepository();

const userService = new UserService(authRepository,userRepository);
const userController = new UserController(userService);
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  userController.getAll.bind(userController)
);
router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  userController.getAll.bind(userController)
);

router.get(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  userController.getById.bind(userController)
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  userController.update.bind(userController)
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  userController.delete.bind(userController)
);

export default router;
