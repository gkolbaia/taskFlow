import * as jwt from 'jsonwebtoken'
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';



@Injectable()
export class VerifyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        let auth = req.headers.authorization;
        if (!auth) {
            throw new HttpException('Unautorized', HttpStatus.FORBIDDEN);
        };
        let token = auth.split(' ')[1];
        if (!token || token === 'null') {
            throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
        };
        jwt.verify(token, 'SecretKey', (err, success) => {
            next();
        });
    }
}