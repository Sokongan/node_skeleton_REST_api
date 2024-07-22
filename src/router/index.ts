import { Router } from 'express';
import userRoutes from './userRoutes';

class RouteIndex {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use('/users', userRoutes);
    }
}

export default new RouteIndex().router;
