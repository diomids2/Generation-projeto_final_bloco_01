import ContaBase from './ContaBase';
export default class ContaCorrente extends ContaBase { private readonly tarifaMensal = 19.9; processarCicloMensal(): void { if (!this.ativa) return; const v = this.tarifaMensal; if (this.getSaldo() >= v) { this.sacar(v, 'Tarifa mensal de manutenção'); const last = (this as any).historico[(this as any).historico.length - 1]; last.tipo = 'TARIFA'; } } }
