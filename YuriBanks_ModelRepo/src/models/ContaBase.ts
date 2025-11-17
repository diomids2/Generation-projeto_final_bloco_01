
export type TipoTransacao =
  | 'DEPOSITO'
  | 'SAQUE'
  | 'TRANSFERENCIA_ENVIADA'
  | 'TRANSFERENCIA_RECEBIDA'
  | 'TARIFA'
  | 'RENDIMENTO';

export interface Transacao {
  data: Date;
  tipo: TipoTransacao;
  valor: number; // positivo para entradas, positivo também para débitos (convencionalmente usamos + e distinguimos pelo tipo)
  descricao?: string;
  saldoApos: number;
}

export interface ContaProps {
  numero?: number | null;
  titular: string;
  saldoInicial?: number;
}

export default abstract class ContaBase {
  public numero: number | null;
  public titular: string;
  protected saldo: number;
  public ativa: boolean;
  protected historico: Transacao[] = [];

  constructor({ numero = null, titular, saldoInicial = 0 }: ContaProps) {
    this.numero = numero;
    this.titular = titular;
    this.saldo = Number(saldoInicial) || 0;
    this.ativa = true;
  }

  getSaldo(): number { return this.saldo; }
  getHistorico(): ReadonlyArray<Transacao> { return [...this.historico]; }

  protected registrar(tipo: TipoTransacao, valor: number, descricao?: string) {
    const tx: Transacao = { data: new Date(), tipo, valor, descricao, saldoApos: this.saldo };
    this.historico.push(tx);
  }

  // Sobrecarga de método (overload signatures)
  depositar(valor: number): void;
  depositar(valor: number, descricao: string): void;
  depositar(valor: number, descricao?: string): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    if (valor <= 0) throw new Error('Valor de depósito inválido.');
    this.saldo += valor;
    this.registrar('DEPOSITO', valor, descricao ?? 'Depósito');
  }

  sacar(valor: number, descricao = 'Saque'): void {
    if (!this.ativa) throw new Error('Conta inativa.');
    if (valor <= 0) throw new Error('Valor de saque inválido.');
    if (valor > this.saldo) throw new Error('Saldo insuficiente.');
    this.saldo -= valor;
    this.registrar('SAQUE', valor, descricao);
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

  // Hook polimórfico: cada tipo de conta define sua rotina mensal
  abstract processarCicloMensal(): void;
}
