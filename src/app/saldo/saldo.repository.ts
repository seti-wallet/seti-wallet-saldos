import {
  Logger,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { DataSource } from "typeorm";
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { SaldosDiariosEntity } from "../entities/saldo.entity";
import { format } from 'date-fns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SaldoRepository {
  private readonly MODULE_NAME = 'SaldoRepository';
  constructor(
    private readonly logger: Logger,
    @InjectDataSource() private dataSource: DataSource,
    private readonly httpService: HttpService,
  ) { }

  /**
    * Method getSaldo
    * @param cuenta
    * @returns
    */
  async getSaldo(cuenta: number) {
    
    const repo = this.dataSource.getRepository(SaldosDiariosEntity);

    try {
      const result = await repo.find({
        where: { cuenta: Number(cuenta) }, 
        select: ["cuenta", "saldo", "fecha"]

      });
      
      if (result.length === 0) { 
        throw new NotFoundException(`No se encontró el número de cuenta: ${cuenta}`); }


      return result;

    } catch (error) {
      this.logger.error({ 
        method: `${this.MODULE_NAME}.getSaldo`, 
        message: error.message, 
      }); 
      if (error instanceof NotFoundException) { 
        throw error; 
      } 

      throw new InternalServerErrorException( 
        'Error', 
        error.message, 
      ); 
    } 
  }



/** * Method getSaldoUser * @param userId * @returns saldo del usuario */ 
async getSaldoUser(cuenta: number): Promise<number> { 
  try { 
    const response = await firstValueFrom( 
      this.httpService.get(`http://localhost:3000/saldo/${cuenta}`) 
    ); 
      return response.data.saldo; 
    } 
      catch (error) {
         this.logger.error({ 
          method: `${this.MODULE_NAME}.getSaldoUser`, 
          message: error, 
        }); 
        throw new InternalServerErrorException( 
          'Error con la transacción', 
          error,
         ); 
        } 
      }
    }