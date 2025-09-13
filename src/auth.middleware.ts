import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['x-api-key'];

        if (apiKey === 'my-secret-key') {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
        }
    }
}
