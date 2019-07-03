import { Injectable, HttpException, HttpStatus, Header } from '@nestjs/common';
import { Model } from 'mongoose'
import { GetUserId } from '../shared/helpers/getUserId';
import { InjectModel } from "@nestjs/mongoose";
import { Staff } from '../auth/interfaces/Staff';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'

@Injectable()
export class BothService {
    constructor(@InjectModel('staff') private readonly StaffModel: Model<Staff>) {

    };
    async verifyToken(token) {
        let verifyToken = await jwt.verify(token, 'SecretKey');
        if (!verifyToken) {
            throw new HttpException('Forbiddened', HttpStatus.FORBIDDEN);
        } else if (!!verifyToken) {
            return true;
        }
    };
    async getUserId(header) {
        const getUserId = new GetUserId();
        return getUserId.userId(header);
    };
    async getUser(header) {
        const id = await this.getUserId(header)
        const staff = await this.StaffModel.findOne({ _id: id })
        if (!staff) {
            throw new HttpException('forbidden', HttpStatus.FORBIDDEN)
        } else if (staff) {
            return await staff
        }
    };
    async editUser(body, header) {
        const id = await this.getUserId(header)
        let staff = await this.StaffModel.findOne({ _id: id }, body.key);
        if (!staff) {
            throw new HttpException('Forbiddened', HttpStatus.FORBIDDEN)
        } else if (staff) {
            staff[body.key] = body.value;
            const editedStaff = await staff.save();
            return editedStaff
        }
    };
    async editPosterPath(header, file) {
        const id = await this.getUserId(header);
        let staff = await this.StaffModel.findOne({ _id: id }, 'imagePath');
        if (!staff) {
            throw new HttpException('Forbiddened', HttpStatus.FORBIDDEN);
        } else if (staff) {
            staff.imagePath = file.path;
            const savedPath = await staff.save();
            return await savedPath;
        }
    };

}
