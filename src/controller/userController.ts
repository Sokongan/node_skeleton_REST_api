import { Request, Response } from 'express';
import { userDTO } from '../DTO/userDTO'; 
import { UserService } from '../User/src/service/userService';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUserHandler(req: Request, res: Response): Promise<void> {
        const userData: userDTO = req.body;

        try {
            const newUser = await this.userService.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
    
    async updateUserHandler(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const updateData: Partial<userDTO> = req.body;
        try {
            const updatedUser = await this.userService.update(id, updateData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
    
    async getAllUsersHandler(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
    
    async getUserByIdHandler(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
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
        const id = parseInt(req.params.id, 10);
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
