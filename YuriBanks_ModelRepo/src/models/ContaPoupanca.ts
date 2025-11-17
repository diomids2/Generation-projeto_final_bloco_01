
import ContaBase from './ContaBase';

export default class ContaPoupanca extends ContaBase {
  // Exemplo: rendimento simples de 0,5% ao mês
  private readonly taxa = 0.005;

  processarCicloMensal(): void {
    if (!this.ativa) return;
    const rendimento = this.getSaldo() * this.taxa;
    if (rendimento > 0) {
      this.depositar(rendimento, 'Rendimento mensal');
      const last = (this as any).historico[(this as any).historico.length - 1];
      last.tipo = 'RENDIMENTO';
    }
  }
}
