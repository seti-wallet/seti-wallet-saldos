import { Module, Logger } from '@nestjs/common';
import { SaldoController } from './saldo.controller';
import { SaldoRepository } from './saldo.repository';
import { SaldoService } from './saldo.service';
import { HttpModule } from '@nestjs/axios'


@Module({
  imports: [HttpModule],
  exports: [SaldoRepository],
  controllers: [SaldoController],
  providers: [SaldoService, SaldoRepository, Logger],
})
export class SaldoModule {}