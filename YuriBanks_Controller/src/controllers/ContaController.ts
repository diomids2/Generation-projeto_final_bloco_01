
import IContaRepository from '../repositories/IContaRepository';
import BancoService from '../services/BancoService';
import ContaBase from '../models/ContaBase';
import { TipoConta } from '../repositories/IContaRepository';

export default class ContaController {
  private cache = new Map<number, ContaBase>();
  private indexTitular = new Map<string, Set<number>>();
  private ativas = new Set<number>();

  constructor(private readonly repo: IContaRepository, private readonly service: BancoService) { this.syncCache(); }

  public syncCache(): void {
    this.cache.clear(); this.indexTitular.clear(); this.ativas.clear();
    for (const conta of this.repo.findAll()) {
      this.cache.set(conta.numero!, conta);
      const key = conta.titular.toLowerCase();
      if (!this.indexTitular.has(key)) this.indexTitular.set(key, new Set<number>());
      this.indexTitular.get(key)!.add(conta.numero!);
      if (conta.ativa) this.ativas.add(conta.numero!);
    }
  }

  public create(titular: string, tipo: TipoConta, saldoInicial = 0): ContaBase {
    const conta = this.service.criarConta(titular, tipo, saldoInicial);
    this.cache.set(conta.numero!, conta);
    const key = conta.titular.toLowerCase();
    if (!this.indexTitular.has(key)) this.indexTitular.set(key, new Set<number>());
    this.indexTitular.get(key)!.add(conta.numero!);
    if (conta.ativa) this.ativas.add(conta.numero!);
    return conta;
  }

  public findAll(): ContaBase[] { return Array.from(this.cache.values()); }
  public findById(numero: number): ContaBase | null { return this.cache.get(numero) ?? null; }
  public findByTitularExact(nome: string): ContaBase[] { const key = nome.trim().toLowerCase(); const ids = this.indexTitular.get(key); if (!ids) return []; return Array.from(ids).map(id => this.cache.get(id)!).filter(Boolean); }
  public searchByTitular(term: string): ContaBase[] { const t = term.trim().toLowerCase(); return this.findAll().filter(c => c.titular.toLowerCase().includes(t)); }
  public updateTitular(numero: number, novoTitular: string): ContaBase { const c = this.repo.findById(numero); if (!c) throw new Error('Conta não encontrada.'); if (!novoTitular.trim()) throw new Error('Novo titular inválido.'); const oldKey = c.titular.toLowerCase(); const setOld = this.indexTitular.get(oldKey); if (setOld) setOld.delete(numero); c.titular = novoTitular; this.repo.save(c); const newKey = c.titular.toLowerCase(); if (!this.indexTitular.has(newKey)) this.indexTitular.set(newKey, new Set<number>()); this.indexTitular.get(newKey)!.add(numero); this.cache.set(numero, c); return c; }
  public delete(numero: number): boolean { const c = this.repo.findById(numero); if (!c) return false; if (c.getSaldo() !== 0) throw new Error('Para deletar, o saldo deve estar zerado.'); if (c.ativa) throw new Error('Para deletar, a conta deve estar inativa.'); const ok = this.repo.deleteById(numero); if (ok) { this.cache.delete(numero); const key = c.titular.toLowerCase(); const set = this.indexTitular.get(key); if (set) set.delete(numero); this.ativas.delete(numero); } return ok; }
}
