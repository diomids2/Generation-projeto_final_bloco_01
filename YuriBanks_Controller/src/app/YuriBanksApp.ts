
import App from '../core/App';
import { input, inputNumber, colors } from '../utils/io';
import BancoService from '../services/BancoService';
import ContasMemRepository from '../repositories/memory/ContasMemRepository';
import ContaBase from '../models/ContaBase';
import ContaController from '../controllers/ContaController';

export default class YuriBanksApp extends App {
  private repo = new ContasMemRepository();
  private banco = new BancoService(this.repo);
  private controller = new ContaController(this.repo, this.banco);

  constructor() {
    super('Yuri Banks - Sistema de Contas Bancárias');
    // Seed
    this.banco.criarConta('Cliente Demo 1', 'corrente', 500);
    this.banco.criarConta('Cliente Demo 2', 'poupanca', 250);
    this.controller.syncCache();
  }

  protected showMenu(): void {
    console.log(`${colors.bold}1.${colors.reset} Cadastrar conta`);
    console.log(`${colors.bold}2.${colors.reset} Listar contas`);
    console.log(`${colors.bold}3.${colors.reset} Consultar saldo`);
    console.log(`${colors.bold}4.${colors.reset} Depositar`);
    console.log(`${colors.bold}5.${colors.reset} Sacar`);
    console.log(`${colors.bold}6.${colors.reset} Transferir`);
    console.log(`${colors.bold}7.${colors.reset} Extrato`);
    console.log(`${colors.bold}8.${colors.reset} Encerrar conta`);
    console.log(`${colors.bold}9.${colors.reset} Processar ciclo mensal (tarifa/rendimento)`);
    console.log(`${colors.bold}10.${colors.reset} CRUD (Controller) → Criar/Listar/Buscar/Atualizar/Excluir`);
    console.log(`${colors.bold}0.${colors.reset} Sair`);
  }

  protected handleOption(opt: number): void {
    switch (opt) {
      case 1: this.cadastrarConta(); break;
      case 2: this.listarContas(); break;
      case 3: this.consultarSaldo(); break;
      case 4: this.depositar(); break;
      case 5: this.sacar(); break;
      case 6: this.transferir(); break;
      case 7: this.extrato(); break;
      case 8: this.encerrarConta(); break;
      case 9: this.processarCiclo(); break;
      case 10: this.menuCRUDController(); break;
      case 0: this.exit(); break;
      default: console.log(colors.red, 'Opcao inválida.', colors.reset);
    }
  }

  private menuCRUDController(): void {
    console.log(colors.bold, '--- CRUD Controller ---', colors.reset);
    console.log(`${colors.bold}1.${colors.reset} Criar conta (Controller)`);
    console.log(`${colors.bold}2.${colors.reset} Listar contas (cache Controller)`);
    console.log(`${colors.bold}3.${colors.reset} Buscar por número (cache Controller)`);
    console.log(`${colors.bold}4.${colors.reset} Buscar por titular (índice Controller)`);
    console.log(`${colors.bold}5.${colors.reset} Atualizar titular (Controller)`);
    console.log(`${colors.bold}6.${colors.reset} Deletar conta (Controller)`);
    console.log(`${colors.bold}0.${colors.reset} Voltar`);

    const sub = inputNumber('Escolha uma opcao: ', { min: 0, max: 6 });
    switch (sub) {
      case 1: this.crudCriar(); break;
      case 2: this.crudListar(); break;
      case 3: this.crudBuscarNumero(); break;
      case 4: this.crudBuscarTitular(); break;
      case 5: this.crudAtualizarTitular(); break;
      case 6: this.crudDeletar(); break;
      case 0: default: return;
    }
  }

  private crudCriar(): void { const titular = input('Titular: '); const tipoRaw = input('Tipo (1: Corrente, 2: Poupanca) [1]: ').trim(); const tipo = tipoRaw === '2' ? 'poupanca' : 'corrente'; const saldoInicial = inputNumber('Saldo inicial: ', { min: 0 }); const conta = this.controller.create(titular, tipo as any, saldoInicial); console.log(colors.green, `Conta ${tipo} #${conta.numero} criada (Controller).`, colors.reset); }
  private crudListar(): void { const contas = this.controller.findAll(); if (contas.length === 0) { console.log(colors.yellow, 'Nenhuma conta no cache.', colors.reset); return; } console.log(colors.bold, '--- Contas (cache Controller) ---', colors.reset); for (const c of contas) this.printConta(c); }
  private crudBuscarNumero(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const conta = this.controller.findById(numero); if (!conta) { console.log(colors.yellow, 'Nao encontrada no cache.', colors.reset); return; } this.printConta(conta); }
  private crudBuscarTitular(): void { const term = input('Titular (termo): '); const exatas = this.controller.findByTitularExact(term); const parciais = this.controller.searchByTitular(term); console.log(colors.bold, '--- Resultados exatos pelo índice ---', colors.reset); if (exatas.length === 0) console.log(colors.yellow, 'Nenhum.', colors.reset); for (const c of exatas) this.printConta(c); console.log(colors.bold, '--- Resultados parciais (varredura) ---', colors.reset); if (parciais.length === 0) console.log(colors.yellow, 'Nenhum.', colors.reset); for (const c of parciais) this.printConta(c); }
  private crudAtualizarTitular(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const novo = input('Novo titular: '); const conta = this.controller.updateTitular(numero, novo); console.log(colors.green, `Titular atualizado: #${conta.numero} → ${conta.titular}`, colors.reset); }
  private crudDeletar(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const ok = this.controller.delete(numero); console.log(ok ? colors.green : colors.yellow, ok ? 'Conta deletada.' : 'Conta nao encontrada.', colors.reset); }

  private cadastrarConta(): void { const titular = input('Nome do titular: '); const tipoRaw = input('Tipo (1: Corrente, 2: Poupanca) [1]: ').trim(); const tipo = tipoRaw === '2' ? 'poupanca' : 'corrente'; const saldoInicial = inputNumber('Saldo inicial: ', { min: 0 }); const conta = this.banco.criarConta(titular, tipo as any, saldoInicial); console.log(colors.green, `Conta ${tipo} #${conta.numero} criada com sucesso!`, colors.reset); }
  private listarContas(): void { const contas = this.banco.listarContas(); if (contas.length === 0) { console.log(colors.yellow, 'Nenhuma conta cadastrada.', colors.reset); return; } console.log(colors.bold, '--- Contas ---', colors.reset); for (const c of contas) this.printConta(c); }
  private consultarSaldo(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const conta = this.banco.buscarConta(numero); if (!conta) { console.log(colors.red, 'Conta nao encontrada.', colors.reset); return; } console.log(colors.bold, `Saldo da conta #${conta.numero}: R$ ${conta.getSaldo().toFixed(2)}`, colors.reset); }
  private depositar(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const valor = inputNumber('Valor do depósito: ', { min: 0.01 }); this.banco.depositar(numero, valor); console.log(colors.green, 'Depósito realizado com sucesso.', colors.reset); }
  private sacar(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const valor = inputNumber('Valor do saque: ', { min: 0.01 }); this.banco.sacar(numero, valor); console.log(colors.green, 'Saque realizado com sucesso.', colors.reset); }
  private transferir(): void { const origem = inputNumber('Conta de origem: ', { min: 1 }); const destino = inputNumber('Conta de destino: ', { min: 1 }); const valor = inputNumber('Valor da transferência: ', { min: 0.01 }); this.banco.transferir(origem, destino, valor); console.log(colors.green, 'Transferência realizada com sucesso.', colors.reset); }
  private extrato(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); const conta = this.banco.buscarConta(numero); if (!conta) { console.log(colors.red, 'Conta nao encontrada.', colors.reset); return; } const hist = conta.getHistorico(); if (hist.length === 0) { console.log(colors.yellow, 'Nao há transacões nesta conta.', colors.reset); return; } console.log(colors.bold, `--- Extrato da conta #${conta.numero} (${conta.titular}) ---`, colors.reset); for (const t of hist) { const data = new Date(t.data).toLocaleString(); console.log(`${data} | ${t.tipo.padEnd(24)} | R$ ${t.valor.toFixed(2).padStart(10)} | Saldo após: R$ ${t.saldoApos.toFixed(2)}${t.descricao ? ' | ' + t.descricao : ''}`); } console.log(colors.bold, `Saldo atual: R$ ${conta.getSaldo().toFixed(2)}`, colors.reset); }
  private encerrarConta(): void { const numero = inputNumber('Número da conta: ', { min: 1 }); this.banco.encerrarConta(numero); console.log(colors.green, 'Conta encerrada com sucesso.', colors.reset); }
  private processarCiclo(): void { this.banco.processarCicloMensal(); console.log(colors.green, 'Ciclo mensal processado (tarifa/rendimento aplicados).', colors.reset); }
  private printConta(c: ContaBase): void { const tipo = c.constructor.name; console.log(`#${c.numero} | ${tipo} | Titular: ${c.titular} | Saldo: R$ ${c.getSaldo().toFixed(2)} | Ativa: ${c.ativa ? 'Sim' : 'Nao'}`); }
}
