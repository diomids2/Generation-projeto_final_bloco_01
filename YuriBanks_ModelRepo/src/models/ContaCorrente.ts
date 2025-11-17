
import ContaBase from './ContaBase';

export default class ContaCorrente extends ContaBase {
  // Exemplo: tarifa fixa mensal
  private readonly tarifaMensal = 19.9;

  processarCicloMensal(): void {
    if (!this.ativa) return;
    const valor = this.tarifaMensal;
    if (this.getSaldo() >= valor) {
      // usar sacar para validar saldo e registrar
      this.sacar(valor, 'Tarifa mensal de manutencao');
      // ajustar o tipo de transacao no último registro para TARIFA
      const last = (this as any).historico[(this as any).historico.length - 1];
      last.tipo = 'TARIFA';
    } else {
      // Sem saldo suficiente: nao cobra (comportamento simples)
    }
  }
}
