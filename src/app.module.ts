import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GridItemModule } from './modules/grid-item/grid-item.module';
import { WidgetModule } from './modules/widget/widget.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
    DashboardModule,
    GridItemModule,
    WidgetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
