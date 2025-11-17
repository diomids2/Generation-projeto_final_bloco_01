
import ContaBase from '../models/ContaBase';
import ContaCorrente from '../models/ContaCorrente';
import ContaPoupanca from '../models/ContaPoupanca';
import IContaRepository, { TipoConta } from '../repositories/IContaRepository';

export default class BancoService {
  constructor(private readonly repo: IContaRepository) {}

  criarConta(titular: string): ContaBase;
  criarConta(titular: string, saldoInicial: number): ContaBase;
  criarConta(titular: string, tipo: TipoConta, saldoInicial?: number): ContaBase;
  criarConta(titular: string, a?: number | TipoConta, b?: number): ContaBase {
    if (!titular || !titular.trim()) throw new Error('Titular inválido.');
    let tipo: TipoConta = 'corrente';
    let saldoInicial = 0;
    if (typeof a === 'number') { saldoInicial = a; }
    else if (typeof a === 'string') { tipo = a; saldoInicial = typeof b === 'number' ? b : 0; }
    const conta: ContaBase = tipo === 'poupanca' ? new ContaPoupanca({ titular, saldoInicial }) : new ContaCorrente({ titular, saldoInicial });
    return this.repo.save(conta);
  }

  listarContas(): ContaBase[] { return this.repo.findAll(); }
  buscarConta(numero: number): ContaBase | null { return this.repo.findById(numero); }

  depositar(numero: number, valor: number, descricao?: string): void { const conta = this.mustGet(numero); if (descricao) conta.depositar(valor, descricao); else conta.depositar(valor); this.repo.save(conta); }
  sacar(numero: number, valor: number): void { const conta = this.mustGet(numero); conta.sacar(valor); this.repo.save(conta); }
  transferir(origem: number, destino: number, valor: number): void { if (origem === destino) throw new Error('Nao é possível transferir para a mesma conta.'); const cOrigem = this.mustGet(origem); const cDestino = this.mustGet(destino); cOrigem.enviarTransferencia(valor, cDestino.numero!); cDestino.receberTransferencia(valor, cOrigem.numero!); this.repo.save(cOrigem); this.repo.save(cDestino); }
  encerrarConta(numero: number): void { const conta = this.mustGet(numero); conta.encerrar(); this.repo.save(conta); }
  processarCicloMensal(): void { for (const c of this.repo.findAll()) { c.processarCicloMensal(); this.repo.save(c); } }
  private mustGet(numero: number): ContaBase { const c = this.repo.findById(numero); if (!c) throw new Error('Conta nao encontrada.'); return c; }
}
