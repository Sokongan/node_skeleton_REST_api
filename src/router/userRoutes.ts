import { Router } from 'express';
import userController from '../controller/userController';
import { UserSchema } from '../User/src/schema/userSchema';

class UserRoutes {
    public router: Router;
    private userSchema: UserSchema;

    constructor() {
        this.router = Router();
        this.userSchema = new UserSchema(); 
        this.initializeRoutes();
    }
  
    private initializeRoutes() {
        this.router.post('/', userController.createUserHandler.bind(userController)); 
        this.router.patch('/:id', userController.updateUserHandler.bind(userController)); 
        this.router.get('/',userController.getAllUsersHandler.bind(userController)); 
        this.router.get('/:id', userController.getUserByIdHandler.bind(userController));
        this.router.delete('/:id', userController.deleteUserHandler.bind(userController));
    }
}

export default new UserRoutes().router;
