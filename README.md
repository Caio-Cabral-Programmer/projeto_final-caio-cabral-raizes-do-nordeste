# Raízes do Nordeste - Front-End

Projeto acadêmico (UNINTER, Análise e Desenvolvimento de Sistemas, trilha Front-End): interface web responsiva para a rede de lanchonetes nordestinas "Raízes do Nordeste". É somente front-end: usuários, pedidos, pontos e pagamento são **simulados** e ficam no `localStorage` do navegador.

## Funcionalidades

- Cadastro, login, logout, edição e exclusão de conta.
- Cardápio por unidade (3 unidades, 10 itens cada) e carrinho.
- Pedido criado como **Pendente** e botão **Realizar pagamento** em cada pedido pendente.
- Pagamento simulado em um gateway externo fictício (aprovado, recusado ou indisponível). Aprovado muda o pedido para **Confirmado**.
- Programa de fidelidade: 10 pontos por pedido confirmado, 10% de desconto com 30 pontos e 1 pedido grátis a cada 5 pedidos confirmados (concedido uma vez por conta).
- Banner promocional logo abaixo do header, em todas as páginas.
- LGPD: modal de consentimento, política de privacidade, revogação e exclusão dos dados.
- Layout mobile-first (360 px a 1920 px) com cor primária `#ff6200` (um tom de laranja).

## Tecnologias

React 19, TypeScript, Vite, Bootstrap 5.3, React Bootstrap, React Router (`HashRouter`) e Bootstrap Icons.

## Como executar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run lint     # análise estática
npm run build    # build de produção em dist/
```
