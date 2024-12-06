import { Controller, Get, InternalServerErrorException, Logger, NotFoundException, Param } from "@nestjs/common";
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
  try{
   const saldo= await this.saldoRepository.getSaldo(cuenta);
   if (!saldo){
    throw new NotFoundException(`No se encontró saldo para el usuario con cuenta: ${cuenta}`); 
  } 
  return saldo; 
} catch (error) { 
  throw new InternalServerErrorException('Error con la cuenta', error.message); 
} } }