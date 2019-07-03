import * as  multer from 'multer'
import { HttpException, HttpStatus } from "@nestjs/common";


export class UploadImage {
    constructor() { };
    get storage() {
        return multer.diskStorage({
            destination: './public/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
            }
        })
    };
    public fileFilter(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(file.originalname.split('.')[file.originalname.split('.').length - 1]);
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true)
        } else {
            return cb(new HttpException('Images Only', HttpStatus.NOT_ACCEPTABLE), false);
        }
    }
}