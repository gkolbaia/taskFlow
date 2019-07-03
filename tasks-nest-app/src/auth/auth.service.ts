import { Injectable, HttpException, HttpStatus, Header } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Staff } from './interfaces/Staff';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { GetUserId } from '../shared/helpers/getUserId';
import { UploadImage } from '../shared/helpers/uploadImage';

@Injectable()
export class AuthService {
    private saltRound: number = 10;
    imageUploadHelper: any
    constructor(@InjectModel('staff') private readonly StaffModel: Model<Staff>) {
        this.imageUploadHelper = new UploadImage();
    }
    ragaca(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(file.originalname.split('.')[file.originalname.split('.').length - 1]);
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true)
        } else {
            return cb(new HttpException('Images Only', HttpStatus.NOT_ACCEPTABLE), false);
        }
    }
    get storage() {
        return this.imageUploadHelper.storage;
    }
    async register(staff: Staff): Promise<{ token: string, staff: Staff }> {
        const existUserName = await this.findOne('userName', staff.userName);
        if (existUserName) {
            throw new HttpException('User Name Already exists', HttpStatus.BAD_REQUEST)
        } else {
            const existEmail = await this.findOne('email', staff.email)
            if (existEmail) {
                throw new HttpException('Email Already exists', HttpStatus.BAD_REQUEST)
            } else {
                const hashPass = await this.hashPass(staff.password);
                staff.password = hashPass;
                const newStaff = new this.StaffModel(staff);
                const savedStaff = await newStaff.save();
                const token = await this.createToken(savedStaff._id);
                return await { token: token, staff: savedStaff }
            }
        }

        // return await this.StaffModel.find()
        // return await this.findOne('email', 'kolba@gmail.com');
        // const newStaff = new this.StaffModel(staff);
    };
    async login(staff: { userName: string, password: string }): Promise<{ token: string, user: Staff }> {
        var validUserName = await this.findOne('userName', staff.userName);
        if (!validUserName) {
            throw new HttpException('Invalid Username', HttpStatus.BAD_REQUEST)
        } else if (validUserName) {
            const validPassword = await this.compareHash(staff.password, validUserName.password);
            if (!validPassword) {
                throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST)
            } else if (validPassword) {
                const token = await this.createToken(validUserName._id);
                return await { token: token, user: validUserName }
            }
        }

    };
    async getStaff(): Promise<Staff> {
        return await this.StaffModel.find();
    };
    async findOne(key: string, value: any): Promise<Staff> {
        var x = {}
        x[`${key}`] = value
        // console.log(x);
        return this.StaffModel.findOne(x)
    };
    async hashPass(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRound)
    };
    async compareHash(password: string | undefined, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    async createToken(id: string): Promise<string> {
        const expiresIn = { expiresIn: '1h' };
        const secretKey = 'SecretKey';
        const payload = { userId: id };
        return jwt.sign(payload, secretKey, expiresIn);
    };
    async getUserId(header): Promise<string> {
        const getUserId = new GetUserId();
        return getUserId.userId(header)
    };
    async getPersmisson(header): Promise<{ permission: boolean, role: string }> {
        const id = await this.getUserId(header)
        var staff = await this.StaffModel.findById({ _id: id });
        if (!staff) {
            throw new HttpException('Unauthorized Request', HttpStatus.UNAUTHORIZED);
        } else if (staff) {
            return { permission: true, role: staff['role'] }
        }
    };
    async giveStaffImagePath(file) {
        const userName = file.originalname.split('.')[0];
        const staff = await this.StaffModel.findOne({ userName: userName });
        staff.imagePath = file.path;
        var savedStaff = await staff.save();
    }

}
