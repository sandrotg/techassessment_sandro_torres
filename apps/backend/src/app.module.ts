import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './presentation/controllers/health.controller';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { UsersModule } from './presentation/modules/users.module';
import { TasksModule } from './presentation/modules/tasks.module';
import { AuthModule } from './presentation/modules/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    TasksModule,
    AuthModule,],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
