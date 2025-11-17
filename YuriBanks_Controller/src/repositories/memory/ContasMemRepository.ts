
import IContaRepository from '../IContaRepository';
import ContaBase from '../../models/ContaBase';

export default class ContasMemRepository implements IContaRepository {
  private readonly store = new Map<number, ContaBase>();
  private seq = 1001;
  nextNumero(): number { return this.seq++; }
  save(entity: ContaBase): ContaBase { if (entity.numero == null) entity.numero = this.nextNumero(); this.store.set(entity.numero, entity); return entity; }
  findById(id: number): ContaBase | null { return this.store.get(id) ?? null; }
  findAll(): ContaBase[] { return Array.from(this.store.values()); }
  deleteById(id: number): boolean { return this.store.delete(id); }
  findByTitular(nome: string): ContaBase[] { const t = nome.trim().toLowerCase(); return this.findAll().filter(c => c.titular.toLowerCase().includes(t)); }
}
