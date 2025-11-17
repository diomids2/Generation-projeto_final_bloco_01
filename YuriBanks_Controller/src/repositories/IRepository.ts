export default interface IRepository<T, K> { save(entity: T): T; findById(id: K): T | null; findAll(): T[]; deleteById(id: K): boolean; }
