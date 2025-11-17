
import IRepository from './IRepository';
import ContaBase from '../models/ContaBase';

export type TipoConta = 'corrente' | 'poupanca';

export default interface IContaRepository extends IRepository<ContaBase, number> {
  nextNumero(): number;
  findByTitular(nome: string): ContaBase[];
}
