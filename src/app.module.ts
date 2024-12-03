import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigMySql } from './app/shared/config/connection.service';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SaldoModule } from './app/saldo/saldo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useClass: ConfigMySql }),
   
    SaldoModule,
     ],
  controllers: [],
 
})
export class AppModule {}
