import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BothController } from './both.controller';
import { BothService } from './both.service';
import { VerifyMiddleware } from '../shared/middlewares/verify.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffSchema } from '../auth/Schemas/Staff.Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'staff', schema: StaffSchema }])],
  controllers: [BothController],
  providers: [BothService]
})
export class BothModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyMiddleware)
      .exclude('getposter')
      .forRoutes('both')
  }
}
