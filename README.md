# Registrar Ponto

Site de controle de ponto eletrônico, feito em HTML, CSS e JavaScript puros (sem framework e sem etapa de build). Projeto final da disciplina de Desenvolvimento de Interfaces (2/2026), de João Pedro Nunis Braga (RA 22350383).

O site nasceu como trabalho de outra disciplina, no semestre passado. Neste projeto final ele foi ampliado com acessibilidade, modo escuro, Central de Ajuda e correção de contraste conforme a WCAG 2.1 (nível AA). O histórico de commits mostra o que mudou.

## Como acessar

- **Online:** https://jpnunis.github.io/registrar-ponto/
- **Local:** baixe o repositório e abra `index.html` no navegador (ou use a extensão Live Server do VS Code). É preciso internet para carregar os ícones (Font Awesome).
- **Acesso de demonstração:** CPF `123.456.789-00` e senha `1234`. O login é uma simulação feita no navegador.

## Páginas

| Arquivo | Função |
|---|---|
| `index.html` | Login com CPF e senha |
| `baterponto.html` | Painel de ponto (entrada, intervalo, retorno e saída) |
| `relatorio.html` | Histórico com filtro por data |
| `relatorio2.html` | Resumo do mês |
| `perfil.html` | Dados do colaborador |
| `alterar-senha.html` | Troca de senha com validação em tempo real |
| `notificacoes.html` | Notificações |
| `suporte.html` | Formulário de contato e chamados |
| `ajuda.html` | Central de Ajuda: carrossel, cartões explicativos e abas de pesquisa |
| `carrossel.js` | Carrossel de imagens reutilizável, usado na tela de ponto e na Central de Ajuda |

Outros arquivos: `style.css` (estilos, modo escuro e alto contraste), `acessibilidade.js` (painel de acessibilidade) e `assets/` (logo e ícones). As imagens do carrossel são SVG embutidos no `carrossel.js`.

## Recursos de acessibilidade

O botão **Aa**, presente em todas as páginas, abre o painel com:

- modo claro/escuro (segue o tema do sistema na primeira visita);
- fonte de 100% a 150%;
- alto contraste;
- fonte mais legível;
- reduzir animações;
- restaurar padrão.

As escolhas ficam salvas no `localStorage`. Todos os textos atendem ao contraste mínimo de 4,5:1 nos modos claro e escuro.

## Como foi construído (passo a passo)

1. **Ponto de partida:** site estático do semestre passado, com 8 páginas.
2. **Diagnóstico:** teste dos fluxos de login, registro de ponto, navegação e validação de senha em navegador automatizado (Playwright). Tudo funcionava e não havia links quebrados.
3. **Auditoria de contraste:** cálculo da razão de contraste das cores com a fórmula da WCAG, que mostrou textos reprovados (cinza `#94a3b8` com 2,5:1, amarelo `#f59e0b` com 2,0:1, entre outros).
4. **Correção das cores:** troca por `#526077`, `#b45309`, `#15803d` e `#b91c1c` em todos os arquivos.
5. **Formulários:** cada `label` passou a ser ligado ao seu campo (`for` e `id`), e as datas do relatório passaram para dd/mm/aaaa.
6. **Painel de acessibilidade:** `acessibilidade.js` aplica as preferências como atributos no elemento `<html>` (`data-tema`, `data-contraste`, `data-fonte`, `data-movimento`) e as guarda no `localStorage`.
7. **Modo escuro e alto contraste:** regras CSS ligadas a esses atributos, no fim do `style.css`.
8. **Carrossel e Central de Ajuda:** componente `carrossel.js` (botões de anterior, próximo e pausa, setas do teclado e rotação automática; respeita a preferência de movimento reduzido), usado na tela de ponto e na nova página `ajuda.html`, que também tem cartões explicativos e abas com busca por texto.
9. **Rodapé e navegação:** rodapé em todas as páginas e item "Ajuda" na barra inferior.
10. **Verificação final:** nova varredura de contraste nos dois temas (sem falhas), teste do painel, do carrossel e das abas, e nenhum erro de JavaScript.

## Limitações

O login e os horários são simulados no navegador. Um sistema real precisaria de servidor, banco de dados e autenticação segura.

## Uso de IA

A análise do site, as correções de acessibilidade e contraste, o painel, a Central de Ajuda, os testes automatizados e parte da documentação foram feitos com ajuda do Claude (Anthropic). O detalhamento está na Parte D do relatório.
