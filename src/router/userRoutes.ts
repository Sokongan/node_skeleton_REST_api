import { Router } from 'express';
import userController from '../controller/userController';
import { UserSchema } from '../User/src/schema/userSchema';
import { validateRequest } from '../application/validator/validator';

class UserRoutes {
    public router: Router;
    private userSchema: UserSchema;

    constructor() {
        this.router = Router();
        this.userSchema = new UserSchema(); // Ensure this line is executed
        this.initializeRoutes();
    }
  
    private initializeRoutes() {
        this.router.post('/', validateRequest(this.userSchema), userController.createUserHandler.bind(userController)); 
        this.router.patch('/:id', validateRequest(this.userSchema), userController.updateUserHandler.bind(userController)); 
        this.router.get('/', userController.getAllUsersHandler.bind(userController)); 
        this.router.get('/:id', userController.getUserByIdHandler.bind(userController));
        this.router.delete('/:id', userController.deleteUserHandler.bind(userController));
    }
}

export default new UserRoutes().router;
