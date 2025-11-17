# Yuri Banks — Etapa 3 (Controller + CRUD)

Esta etapa adiciona a **Camada Controller** com **CRUD completo** (Criar, Listar/Buscar, Atualizar e Excluir) usando **Collections** (`Map`, `Set`) para índices e cache.

## O que há de novo
- **Controller (`ContaController`)**
  - `Map<number, ContaBase>` cache de contas
  - `Map<string, Set<number>>` índice por titular (exato)
  - `Set<number>` contas ativas
  - Métodos: `create`, `findAll`, `findById`, `findByTitularExact`, `searchByTitular`, `updateTitular`, `delete`, `syncCache`
- **App**
  - Submenu **CRUD (Controller)** com operações de Create/Read/Update/Delete
  - Seleção de menu **sem Enter** (readline-sync `keyIn`)

## Executar
```bash
npm install
npm run dev
# ou
npm run build && npm start
```

SEMPRE APERTER ENTER ANTES EM SEGUIDA A NUMERAÇÂO