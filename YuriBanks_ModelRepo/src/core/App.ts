
import { clear, pause, colors, keyInOption } from '../utils/io';

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
  protected abstract allowedOptions(): string; // ex.: '0123456789'

  public start(): void {
    while (this.running) {
      clear();
      this.printHeader();
      this.showMenu();

      const opt = keyInOption(this.allowedOptions());
      try {
        this.handleOption(opt);
      } catch (err: any) {
        console.log(colors.red, `Erro: ${err?.message ?? String(err)}`, colors.reset);
      }
      if (this.running) pause();
    }
  }

  protected exit(): void {
    this.running = false;
    console.log(colors.green, 'Obrigado por utilizar o sistema. Até logo!', colors.reset);
  }
}
