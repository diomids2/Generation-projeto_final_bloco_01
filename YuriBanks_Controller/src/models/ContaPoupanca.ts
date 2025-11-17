import ContaBase from './ContaBase';
export default class ContaPoupanca extends ContaBase { private readonly taxa = 0.005; processarCicloMensal(): void { if (!this.ativa) return; const r = this.getSaldo() * this.taxa; if (r > 0) { this.depositar(r, 'Rendimento mensal'); const last = (this as any).historico[(this as any).historico.length - 1]; last.tipo = 'RENDIMENTO'; } } }
