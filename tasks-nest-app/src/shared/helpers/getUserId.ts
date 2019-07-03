import * as jwt from 'jsonwebtoken'

export class GetUserId {
    constructor() {
    }
    public userId(header) {
        let token = header['authorization'].split(' ')[1];
        let payload = jwt.verify(token, 'SecretKey');
        return payload.userId;
    }
}