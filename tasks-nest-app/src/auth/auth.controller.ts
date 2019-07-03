import { Controller, Get, Post, Req, Body, Res, Header, Headers, Next, UseInterceptors, UploadedFile, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StaffDto } from './dto.auth/staff.dto';
import { Staff } from 'dist/auth/interfaces/Staff';
import { StaffLoginDto } from './dto.auth/staff.login.dto';
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from 'multer'
import { UploadImage } from '../shared/helpers/uploadImage';
@Controller('auth')
export class AuthController {
    imageUpload: any;
    storage: any;
    constructor(private readonly _authService: AuthService) {
        this.imageUpload = new UploadImage();
        this.storage = this.imageUpload.storage;
    };

    @Get('staff')
    getStaff(): Promise<Staff> {
        return this._authService.getStaff()
    };

    @Post('register')
    register(@Body() staff: StaffDto, @Headers() header: string): Promise<{ token: string, staff: Staff }> {
        return this._authService.register(staff);
    };


    @Post('login')
    login(@Body() staff: StaffLoginDto, @Headers() header: string, ): Promise<{ token: string, user: Staff }> {
        return this._authService.login(staff);
    };


    @Get('permission')
    getPersmission(@Headers() header: string): Promise<{ permission: boolean, role: string }> {
        return this._authService.getPersmisson(header);
    };


    @Post('imageUpload')
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
    async ImageUpload(@UploadedFile() file) {
        await this._authService.giveStaffImagePath(file);
        return file;
    };


    
    @Get('logout')
    logout() {
        return {};
    };
}
