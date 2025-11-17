
export default interface IRepository<T, K> {
  save(entity: T): T;          // cria ou atualiza
  findById(id: K): T | null;
  findAll(): T[];
  deleteById(id: K): boolean;
}
