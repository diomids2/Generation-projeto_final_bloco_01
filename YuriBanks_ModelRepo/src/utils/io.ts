
import * as readline from 'readline-sync';

export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
} as const;

export function input(msg: string): string {
  return readline.question(msg);
}

export function inputNumber(msg: string, opts: { min?: number | null; max?: number | null } = {}): number {
  const { min = null, max = null } = opts;
  while (true) {
    const raw = readline.question(msg);
    const normalized = raw.replace(',', '.');
    const value = Number.parseFloat(normalized);
    if (!Number.isFinite(value)) {
      console.log(colors.red, 'Entrada inválida. Digite um número.', colors.reset);
      continue;
    }
    if (min !== null && value < min) {
      console.log(colors.red, `O valor mínimo é ${min}.`, colors.reset);
      continue;
    }
    if (max !== null && value > max) {
      console.log(colors.red, `O valor máximo é ${max}.`, colors.reset);
      continue;
    }
    return value;
  }
}

export function clear() { console.clear(); }
export function pause() { readline.question('Pressione Enter para continuar...'); }

export function keyInOption(allowed: string, label = 'Escolha uma opcao: '): number {
  const ch = readline.keyIn(label, { limit: allowed });
  return Number(ch);
}
