import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { PublicApiModule } from './public-api/public-api.module';
import { AuthModule } from './auth/auth.module';
import { TaskManagerModule } from './task-manager/task-manager.module';
import { WorkLogModule } from './work-log/work-log.module';
// import * as crypto from 'crypto';
// (global as any).crypto = crypto;
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Makes env variables globally available
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PublicApiModule,
    AuthModule,
    TaskManagerModule,
    WorkLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('protected');
  }
}
