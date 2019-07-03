import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffSchema } from './Schemas/Staff.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'staff', schema: StaffSchema }])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
