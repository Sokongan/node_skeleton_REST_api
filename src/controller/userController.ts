import { Request, Response } from 'express';
import { UserService } from '../User/src/service/userService';
import { UserDTO } from '../DTO/userDTO';
import { UserSchema } from '../User/src/schema/userSchema';
import { UserMapper } from '../User/src/mapper/userMapper';



class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUserHandler(req: Request, res: Response): Promise<void> {
        const userData: UserDTO = req.body;

        try {
            const newUser = await this.userService.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
    
    async updateUserHandler(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const updateData: Partial<UserDTO> = req.body;
        try {
            const updatedUser = await this.userService.update(id, updateData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: error});
        }
    }
    
    async getAllUsersHandler(req: Request, res: Response): Promise<void> {
    
          
        try {
            const id = req.params;
            const users = await this.userService.getAll();
            const userMapper = new UserMapper();
            const userSchema = userMapper.forward(users);
            console.log('/n',id,'\\')
            console.log(userSchema)
            
           
            // console.log('Forward Mapped User Schema:', userSchema);

            
            // const responseData = userMapper.reverse(userSchema, 'GET');
            // console.log('Reverse Mapped Response Data for GET:', responseData);

            // const responseDataPost = userMapper.reverse(userSchema, 'POST');
            // console.log('Reverse Mapped Response Data for POST:', responseDataPost);

            // res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
    
    async getUserByIdHandler(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const user = await this.userService.getById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    async deleteUserHandler(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const deletedUser = await this.userService.delete(id);
            if (deletedUser) {
                res.status(200).json(deletedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

export default new UserController();
