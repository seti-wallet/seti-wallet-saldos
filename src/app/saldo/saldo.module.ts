import { Logger, Module } from '@nestjs/common';
import { SaldoController } from './saldo.controller';
import { SaldoService } from './saldo.service';
import { SaldoRepository } from './saldo.repository';

@Module({
  controllers: [SaldoController],
  providers: [SaldoService, SaldoRepository, Logger],
})
export class SaldoModule {}