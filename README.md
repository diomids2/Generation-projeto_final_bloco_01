
# YuriBanks

Aplicativo de console em **TypeScript** (Node.js) com **readline-sync**, inspirado no projeto **Conta Bancária**.

## Funcionalidades
- Cadastrar conta
- Listar contas
- Consultar saldo
- Depositar
- Sacar
- Transferir
- Extrato
- Encerrar conta (somente com saldo zerado)

## Requisitos
- Node.js

## Instalacao
```bash
npm install
```

## Desenvolvimento (hot reload)
```bash
npm run dev
```

## Build e execucao
```bash
npm run build
npm start
```

## Estrutura
```
src/
  core/App.ts         # Classe abstrata com loop de menu
  app/YuriBanksApp.ts # Subclasse com funcionalidades bancárias
  models/Conta.ts     # Modelo de conta e transacões
  services/BancoService.ts # Servico de contas
  utils/io.ts         # Entrada/saída, validacao e cores
  index.ts            # Ponto de entrada
```

Captura de tela 2025-11-17 190803.png
