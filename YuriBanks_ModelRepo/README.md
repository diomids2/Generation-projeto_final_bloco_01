
# Yuri Banks (Model + Repository)

Segunda Etapa: Classes Model (abstrata + herdadas) e Interface Repository, com POO completa (métodos, modificadores, polimorfismo, heranca, sobrecarga, classes abstratas e interfaces).

## O que foi implementado
- **Models**: `ContaBase` (abstrata), `ContaCorrente`, `ContaPoupanca`.
- **Polimorfismo**: `processarCicloMensal()` é polimórfico (tarifa na corrente, rendimento na poupanca).
- **Sobrecarga**: `depositar(valor)` e `depositar(valor, descricao)`.
- **Repository Pattern**: `IRepository<T,K>` genérica; `IContaRepository`; implementacao em memória `ContasMemRepository`.
- **Service**: `BancoService` usa o Repository (injecao de dependência), expõe operacões de conta e sob carga de `criarConta`.
- **Menu**: `YuriBanksApp` atualizado com criacao de conta por tipo e processamento de ciclo mensal.

## Rodando
```bash
npm install
npm run dev      # desenvolvimento
npm run build && npm start
```

## Branch 
branch `Model_Repository`
```bash
git checkout -b Model_Repository
git add .
git commit -m "feat(model-repo): models abstratos, repository interface e servico com DI"
git push -u origin Model_Repository
```
