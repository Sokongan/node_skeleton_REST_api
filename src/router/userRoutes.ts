import { Router } from 'express';
import { UserController } from '../controller/userController';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
  
    private initializeRoutes() { 
        this.router.post('/', UserController.createUser.bind(UserController)); 
        this.router.patch('/:id', UserController.updateUser.bind(UserController)); 
        this.router.get('/',UserController.findAllUser.bind(UserController)); 
        this.router.get('/:id', UserController.findUserById.bind(UserController));
        this.router.get('/username/:username', UserController.findUserByUsername.bind(UserController));
        this.router.delete('/:id', UserController.deleteUser.bind(UserController));
    }
}

export default new UserRoutes().router;
