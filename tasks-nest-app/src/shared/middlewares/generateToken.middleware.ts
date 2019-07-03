import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class GenerateTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        let auth = req.headers.authorization;
        if (!auth) {
            return next();
        } else {
            let token = auth.split(' ')[1];
            if (!token || token === 'null') {
                return next();
            } else {
                jwt.verify(token, 'SecretKey', (err, success) => {
                    if (err) {
                        // throw new HttpException('Wrong Token', HttpStatus.FORBIDDEN);
                        return next();
                    } else if (success) {
                        jwt.sign({ userId: success.userId }, 'SecretKey', { expiresIn: '1h' }, (err, newToken) => {
                            res.setHeader('token', newToken);
                            res.setHeader('Access-Control-Expose-Headers', 'Content-Type, token, X-Service-API-Version, X-Service-Name');
                            next();
                        });
                    } else if (!success) {
                        return next();
                    }
                })
            }
        }
    }
}