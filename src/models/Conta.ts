
export type TipoTransacao =
  | 'DEPOSITO'
  | 'SAQUE'
  | 'TRANSFERENCIA_ENVIADA'
  | 'TRANSFERENCIA_RECEBIDA';

export interface Transacao {
  data: Date;
  tipo: TipoTransacao;
  valor: number;
  descricao?: string;
  saldoApos: number;
}

export interface ContaProps {
  numero?: number | null;
  titular: string;
  saldoInicial?: number;
}

export default class Conta {
  public numero: number | null;
  public titular: string;
  private saldo: number;
  public ativa: boolean;
  private historico: Transacao[] = [];

  constructor({ numero = null, titular, saldoInicial = 0 }: ContaProps) {
    this.numero = numero;
    this.titular = titular;
    this.saldo = Number(saldoInicial) || 0;
    this.ativa = true;
  }

  getSaldo(): number {
    return this.saldo;
  }

  getHistorico(): ReadonlyArray<Transacao> {
    return [...this.historico];
  }

  private registrar(tipo: TipoTransacao, valor: number, descricao?: string) {
    const tx: Transacao = {
      data: new Date(),
      tipo,
      valor,
      descricao,
      saldoApos: this.saldo,
    };
    this.historico.push(tx);
  }

  depositar(valor: number): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    if (valor <= 0) throw new Error('Valor de depósito inválido.');
    this.saldo += valor;
    this.registrar('DEPOSITO', valor, 'Depósito em dinheiro');
  }

  sacar(valor: number): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    if (valor <= 0) throw new Error('Valor de saque inválido.');
    if (valor > this.saldo) throw new Error('Saldo insuficiente.');
    this.saldo -= valor;
    this.registrar('SAQUE', valor, 'Saque em dinheiro');
  }

  receberTransferencia(valor: number, origem: number): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    this.saldo += valor;
    this.registrar('TRANSFERENCIA_RECEBIDA', valor, `De conta ${origem}`);
  }

  enviarTransferencia(valor: number, destino: number): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    if (valor <= 0) throw new Error('Valor inválido.');
    if (valor > this.saldo) throw new Error('Saldo insuficiente.');
    this.saldo -= valor;
    this.registrar('TRANSFERENCIA_ENVIADA', valor, `Para conta ${destino}`);
  }

  encerrar(): void {
    if (!this.ativa) throw new Error('Conta já está inativa.');
    if (this.saldo !== 0) throw new Error('Para encerrar, o saldo deve estar zerado.');
    this.ativa = false;
  }
}
