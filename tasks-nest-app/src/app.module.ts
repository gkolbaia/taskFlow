import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { GenerateTokenMiddleware } from './shared/middlewares/generateToken.middleware';
import { BothModule } from './both/both.module';

@Module({
  imports: [AuthModule,BothModule, MongooseModule.forRoot('mongodb://192.168.4.169/gio-test-5-tasks', { useNewUrlParser: true }) ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GenerateTokenMiddleware)
      .forRoutes('')
  }
}
