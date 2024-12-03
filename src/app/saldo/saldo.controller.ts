import { Controller, Get, Logger, Param } from "@nestjs/common";
import { SaldoService } from "./saldo.service";
import { SaldoRepository } from "./saldo.repository";

@Controller('saldo')
  export class SaldoController {
    private readonly MODULE_NAME = 'ServicesController';
    constructor(
      private saldoService: SaldoService,
      private saldoRepository: SaldoRepository,
      private readonly logger: Logger,
    ) {}


 /**
     * Method getSaldo
     * @param cuenta
     * @returns
     */
 @Get('/:cuenta')
 async getCustomerByDocument(@Param('cuenta') cuenta: number) {
   return await this.saldoRepository.getSaldo(cuenta);
 }



}