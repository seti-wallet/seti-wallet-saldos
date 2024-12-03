import {
  Logger,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource } from "typeorm";
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { SaldosDiariosEntity } from "../entities/saldo.entity";
import { format } from 'date-fns';

export class SaldoRepository {
  private readonly MODULE_NAME = 'SaldoRepository';
  constructor(
    private readonly logger: Logger,
    @InjectDataSource() private dataSource: DataSource,
    //private readonly httpService: HttpService,
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
        where: { cuenta: Number(cuenta) }, select: ["cuenta", "saldo", "fecha"]

      });
      
      if (result.length === 0) { throw new Error(`No se encontró el número de cuenta: ${cuenta}`); }


      return result;

    } catch (error) {
      Logger.error({
        method: `${this.MODULE_NAME}.getSaldo`,
        message: error,
      });
      throw new InternalServerErrorException(
        'Error obteniendo el saldo para la cuenta enviada',
        error,
      );
    }
  }



}