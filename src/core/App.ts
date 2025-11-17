
import { inputNumber, clear, pause, colors } from '../utils/io';
import * as readline from 'readline-sync'; // <--- adicione este import no topo

export default abstract class App {
  protected running = true;

  constructor(private readonly title: string = 'Aplicacao Console') {
    if (new.target === App) {
      throw new Error('App é uma classe abstrata e nao pode ser instanciada diretamente.');
    }
  }

  protected printHeader(): void {
    console.log(`${colors.bold}${colors.cyan}=== ${this.title} ===${colors.reset}
`);
  }

  protected abstract showMenu(): void;
  protected abstract handleOption(opt: number): void;

 public start(): void {
  while (this.running) {
    clear();
    this.printHeader();
    this.showMenu();

    // >>> Lê UMA tecla (0–8) e não exige Enter
    const optChar = readline.keyIn('\nEscolha uma opção: ', { limit: '012345678' });
    const opt = Number(optChar);

    try {
      this.handleOption(opt);
    } catch (err: any) {
      console.log(colors.red, `Erro: ${err?.message ?? String(err)}`, colors.reset);
    }

    // O pause fica APÓS a execução da opção
    if (this.running) pause();
  }
}


  protected exit(): void {
    this.running = false;
    console.log(colors.green, 'Obrigado por utilizar o sistema. Até logo!', colors.reset);
  }
}
