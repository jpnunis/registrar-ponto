/* Painel de acessibilidade — compartilhado por todas as páginas.
   Salva as preferências no localStorage e as aplica como atributos no <html>. */
(function () {
  var ZOOMS = [1, 1.15, 1.3, 1.5];
  var raiz = document.documentElement;
  var pref = { tema: 'claro', zoom: 0, contraste: 'normal', fonte: 'padrao', movimento: 'normal' };

  try { Object.assign(pref, JSON.parse(localStorage.getItem('acessibilidade') || '{}')); }
  catch (e) { /* sem storage: usa os padrões */ }
  // Primeira visita: respeita o tema do sistema operacional
  if (!localStorage.getItem('acessibilidade') && matchMedia('(prefers-color-scheme: dark)').matches) pref.tema = 'escuro';

  function aplicar() {
    raiz.setAttribute('data-tema', pref.tema === 'escuro' || pref.contraste === 'alto' ? 'escuro' : 'claro');
    raiz.setAttribute('data-contraste', pref.contraste);
    raiz.setAttribute('data-fonte', pref.fonte);
    raiz.setAttribute('data-movimento', pref.movimento);
    if (document.body) document.body.style.zoom = ZOOMS[pref.zoom];
    try { localStorage.setItem('acessibilidade', JSON.stringify(pref)); } catch (e) {}
    atualizarRotulos();
  }

  var painel, rotulos = {};
  function atualizarRotulos() {
    if (!painel) return;
    rotulos.tema.textContent = pref.tema === 'escuro' ? 'Modo claro' : 'Modo escuro';
    rotulos.contraste.setAttribute('aria-pressed', pref.contraste === 'alto');
    rotulos.fonte.setAttribute('aria-pressed', pref.fonte === 'legivel');
    rotulos.movimento.setAttribute('aria-pressed', pref.movimento === 'reduzido');
    rotulos.tamanho.textContent = Math.round(ZOOMS[pref.zoom] * 100) + '%';
  }

  function criar(tag, attrs, texto) {
    var el = document.createElement(tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (texto) el.textContent = texto;
    return el;
  }

  function montar() {
    var abrir = criar('button', { id: 'a11y-abrir', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'a11y-painel', 'aria-label': 'Abrir opções de acessibilidade' }, 'Aa');
    painel = criar('div', { id: 'a11y-painel', role: 'dialog', 'aria-label': 'Acessibilidade', hidden: '' });
    painel.appendChild(criar('h2', {}, 'Acessibilidade'));

    function botao(texto, fn, chave) {
      var b = criar('button', { type: 'button' }, texto);
      b.onclick = function () { fn(); aplicar(); };
      if (chave) rotulos[chave] = b;
      painel.appendChild(b);
      return b;
    }
    botao('Modo escuro', function () { pref.tema = pref.tema === 'escuro' ? 'claro' : 'escuro'; if (pref.contraste === 'alto') pref.contraste = 'normal'; }, 'tema');

    var linha = criar('div', { class: 'a11y-linha' });
    var menos = criar('button', { type: 'button', 'aria-label': 'Diminuir fonte' }, 'A−');
    var mais = criar('button', { type: 'button', 'aria-label': 'Aumentar fonte' }, 'A+');
    rotulos.tamanho = criar('span', { 'aria-live': 'polite' }, '100%');
    menos.onclick = function () { pref.zoom = Math.max(0, pref.zoom - 1); aplicar(); };
    mais.onclick = function () { pref.zoom = Math.min(ZOOMS.length - 1, pref.zoom + 1); aplicar(); };
    linha.append(menos, rotulos.tamanho, mais);
    painel.appendChild(linha);

    botao('Alto contraste', function () { pref.contraste = pref.contraste === 'alto' ? 'normal' : 'alto'; }, 'contraste').setAttribute('aria-pressed', 'false');
    botao('Fonte legível', function () { pref.fonte = pref.fonte === 'legivel' ? 'padrao' : 'legivel'; }, 'fonte').setAttribute('aria-pressed', 'false');
    botao('Reduzir animações', function () { pref.movimento = pref.movimento === 'reduzido' ? 'normal' : 'reduzido'; }, 'movimento').setAttribute('aria-pressed', 'false');
    botao('Restaurar padrão', function () { pref = { tema: 'claro', zoom: 0, contraste: 'normal', fonte: 'padrao', movimento: 'normal' }; });

    abrir.onclick = function () {
      var aberto = painel.hidden;
      painel.hidden = !aberto;
      abrir.setAttribute('aria-expanded', aberto);
      if (aberto) painel.querySelector('button').focus();
    };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !painel.hidden) { painel.hidden = true; abrir.setAttribute('aria-expanded', 'false'); abrir.focus(); }
    });
    document.body.append(abrir, painel);
    aplicar();
  }

  aplicar(); // aplica cedo (evita "piscar" de tema)
  document.addEventListener('DOMContentLoaded', montar);
})();
