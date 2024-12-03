import { Injectable } from "@nestjs/common";
import { SaldoRepository } from "./saldo.repository";

@Injectable()
export class SaldoService {
  private readonly MODULE_NAME = 'SaldoService';
  constructor(private saldoRepository: SaldoRepository) {}}