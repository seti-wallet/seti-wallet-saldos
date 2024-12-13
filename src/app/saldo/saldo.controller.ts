import { Controller, Get, InternalServerErrorException, Logger, NotFoundException, Param } from "@nestjs/common";
import { SaldoService } from "./saldo.service";
import { SaldoRepository } from "./saldo.repository";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

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
 //@Throttle({ default: { limit: 1, ttl: 60000 } })
 //@SkipThrottle()
 async getCustomerByDocument(@Param('cuenta') cuenta: number) {
  try{
   const saldo= await this.saldoRepository.getSaldo(cuenta);
   
   //if (!saldo){
   // throw new NotFoundException(`No se encontró saldo para el usuario con cuenta: ${cuenta}`); 
  //} 
  return saldo; 
} catch (error) { 
  
  if (error instanceof NotFoundException) { 
    throw new NotFoundException(error.message); 
  }
  //throw new InternalServerErrorException('Error', error.message); 
} } }