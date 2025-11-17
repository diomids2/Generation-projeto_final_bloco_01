

<img src="https://github.com/diomids2/Generation-projeto_final_bloco_01/blob/Model_repository/Captura%20de%20tela%202025-11-17%20190803.png?raw=true" alt="Texto Alternativo"> 

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
