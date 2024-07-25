import { Request, Response } from 'express';
import { UserDTO } from '../DTO/userDTO';
import { UserService } from '../User/src/userService';


const userService = new UserService();
export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDTO: UserDTO = req.body;
      const user = await userService.create(userDTO);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updateData: Partial<UserDTO> = req.body;       
    try {
        const updatedUser = await userService.update(id, updateData);
   
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
      res.status(500).json({ message: `Error Updating user`, error });
    }
      
  }

  static async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await userService.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  static async findAllUser(req: Request, res: Response): Promise<void> {
    try {
     const user = await userService.findAll();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }
  static async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const deletedUser = await userService.delete(id);
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
static async findUserByUsername(req: Request, res: Response): Promise<void> {
    try { 
        const username = req.params.username
        console.log(username)
       
        const user = await userService.findByUsername(username);
        res.status(200).json(user);
        
    } catch (error) {
        console.error('Error fetching user by Username user:', error);
        res.status(500).json({ message: 'Failed fetching user by Username' , error });
    }
    
}
}
