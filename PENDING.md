# Pending Tasks / Missing Requirements

> Lista consolidada dos pontos ainda não atendidos em relação ao edital do desafio.

## Backend (clockwise-backend)

- [ ] Configurar **ESLint** para o pacote backend (pode reutilizar a flat-config do frontend ou usar @eslint/eslintrc).
- [ ] Adicionar **Prettier** (arquivo `.prettierrc` + script `format`).
- [ ] (Nice to have) Incluir Husky + lint-staged para rodar lint/format nos commits.

## Frontend (clockwise-frontend)

- [ ] Criar **testes automatizados** (Vitest + Testing Library)
  - Render + interação do **Timer**
  - Abertura e funcionamento do **Modal** em History
  - Componente **Stats** (mudança de período, tooltip)
- [ ] Adicionar **Prettier** (e compartilhar config com backend).
- [ ] Criar **Dockerfile** e service no `docker-compose.yml` para servir o build (ex.: nginx ou `vite preview`).

## Entrega / Documentação

- [ ] Adicionar link público do **Figma** com a releitura do protótipo no README.
- [ ] Providenciar **deploy**:
  - Backend no **Render** (atualizar variáveis de ambiente e CORS).
  - Frontend no **Vercel** (definir `VITE_API_URL`).
- [ ] Atualizar README com instruções de build/run, endpoints, URLs de produção.

> **TL;DR:** Prettier + ESLint backend, testes frontend, Docker front, link Figma e deploys. Após esses itens, o projeto estará 100 % alinhado com as exigências e diferenciais do desafio.

## Plano de Implementação

1. **Configuração de Ferramentas de Código**
   - Compartilhar configuração Prettier entre front e back (`.prettierrc`, script `npm run format`).
   - Copiar eslint.flat.config do front para back, ajustar parser de TS + Node environment.
   - Adicionar Husky + lint-staged nos dois `package.json` para rodar `lint` e `format` no pre-commit.

2. **Testes no Frontend**
   - Instalar `@testing-library/react`, `@testing-library/user-event`, `vitest`, `jsdom`.
   - Estrutura `src/__tests__`.
   - Escrever specs:
     1. `Timer.spec.tsx` – render com startTime null e cronômetro correndo com fake timers.
     2. `HistoryModal.spec.tsx` – clicar em linha da tabela abre Modal e exibe dados.
     3. `Stats.spec.tsx` – mudança de tabs (semana/mês/ano) atualiza gráficos.
   - Configurar CI local (`npm run test`) e adicionar coverage badge.

3. **Docker para Frontend**
   - Criar `clockwise-frontend/Dockerfile` (base node:18; build; usar `node:alpine` nginx ou `vite preview`).
   - Adicionar serviço `frontend` no `docker-compose.yml` expondo porta 5173 (dev) ou 80 (prod) e dependendo do banco/api.
   - Atualizar README com instruções `docker-compose up` end-to-end.

4. **Deploy**
   - Render: criar serviço Web (Dockerfile backend) + DB Postgres; set vars.
   - Realizar migration automática (`prisma migrate deploy`).
   - Vercel: importar repo, definir build `pnpm install && pnpm run build`, output `dist`; set `VITE_API_URL`.
   - Adicionar URLs finais no README.

5. **Figma Link & README**
   - Colocar link público do Figma no topo do README.
   - Seção "Stack & Arquitetura"; "Como rodar localmente"; "Deploy em produção".

6. **Revisão Final**
   - Executar `npm run lint`, `npm run format`, `npm run test` em ambos pacotes.
   - Verificar lighthouse (PWA / acessibilidade ≥ 90).
