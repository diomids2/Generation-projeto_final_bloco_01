
import Conta from '../models/Conta';

export default class BancoService {
  private contas = new Map<number, Conta>();
  private seq = 1001; // número inicial de conta

  criarConta(titular: string, saldoInicial = 0): Conta {
    if (!titular.trim()) throw new Error('Titular inválido.');
    const conta = new Conta({ numero: this.seq++, titular, saldoInicial });
    this.contas.set(conta.numero!, conta);
    return conta;
  }

  listarContas(): Conta[] {
    return Array.from(this.contas.values());
  }

  buscarConta(numero: number): Conta | null {
    return this.contas.get(numero) ?? null;
  }

  depositar(numero: number, valor: number): void {
    const conta = this.buscarConta(numero);
    if (!conta) throw new Error('Conta nao encontrada.');
    conta.depositar(valor);
  }

  sacar(numero: number, valor: number): void {
    const conta = this.buscarConta(numero);
    if (!conta) throw new Error('Conta nao encontrada.');
    conta.sacar(valor);
  }

  transferir(origem: number, destino: number, valor: number): void {
    const cOrigem = this.buscarConta(origem);
    const cDestino = this.buscarConta(destino);
    if (!cOrigem) throw new Error('Conta de origem nao encontrada.');
    if (!cDestino) throw new Error('Conta de destino nao encontrada.');
    if (origem === destino) throw new Error('Nao é possível transferir para a mesma conta.');

    cOrigem.enviarTransferencia(valor, cDestino.numero!);
    cDestino.receberTransferencia(valor, cOrigem.numero!);
  }

  encerrarConta(numero: number): void {
    const conta = this.buscarConta(numero);
    if (!conta) throw new Error('Conta nao encontrada.');
    conta.encerrar();
  }
}
