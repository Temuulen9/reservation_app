import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseLoggerService } from './mongoose-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? '', {
      dbName: 'sample_mflix',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MongooseLoggerService],
})
export class AppModule {}
