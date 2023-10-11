import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://JacobDev:Jowi2703@devflow.kytm4jj.mongodb.net/?retryWrites=true&w=majority"), UsersModule, ConfigModule.forRoot({
    envFilePath: '.env', isGlobal: true,
  }), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
