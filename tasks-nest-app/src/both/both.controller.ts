import { Controller, Get, Headers, Post, Body, Param, Req, Res, Query, HttpException, HttpStatus, Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { getUserId } from 'dist/shared/getStaffId';
import { Staff } from 'src/auth/interfaces/Staff';
import { BothService } from './both.service';
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from 'multer'

import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import { LoggingInterceptor } from '../shared/interceptors/contentType.Interceptor';

@Controller('shared')
export class BothController {
    constructor(private readonly _bothService: BothService) {

    }
    @Get('getuser')
    getUser(@Headers() header: string): Promise<Staff> {
        return this._bothService.getUser(header);
    };


    @Post('editstaff')
    editStaff(@Body() body: { key: string, value: string }, @Headers() header: string): Promise<Staff> {
        return this._bothService.editUser(body, header);
    };


    @Get('getposter')
    @UseInterceptors(LoggingInterceptor)
    getposter(@Query('path') path: string, @Query('auth') token: string, @Res() res: Response) {
        if (this._bothService.verifyToken(token)) {
            fs.readFile('./' + path, (err, image) => {
                if (err) {
                    throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
                } else if (!image) {
                    throw new HttpException('Image Not Found', HttpStatus.NOT_FOUND);
                } else if (image) {
                    res.contentType('image/jpeg')
                    return res.send(image)
                }
            });
        }
    };


    @Post('editimage')
    @UseInterceptors(FileInterceptor('image', {
        dest: '/public/uploads',
        storage: multer.diskStorage({
            destination: './public/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
            }
        }),
        limits: { fileSize: 1000000 },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/;
            const extname = fileTypes.test(file.originalname.split('.')[file.originalname.split('.').length - 1]);
            const mimetype = fileTypes.test(file.mimetype);
            if (mimetype && extname) {
                return cb(null, true)
            } else {
                return cb(new HttpException('Images Only', HttpStatus.NOT_ACCEPTABLE), false);
            }
        }
    }))
    ImageUpload(@UploadedFile() file, @Headers() header: string) {
        var editedPoster = this._bothService.editPosterPath(header, file);
        return editedPoster;
    }
}
