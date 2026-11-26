/* Carrossel de imagens reutilizável.
   Uso: coloque <div data-carrossel></div> na página e carregue este script.
   As imagens são SVG embutidos aqui, então não dependem de arquivos externos. */
(function () {
  function slideSvg(titulo, sub, c1, c2, icone) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="800" height="360" fill="url(#g)"/><circle cx="680" cy="60" r="140" fill="#fff" opacity=".08"/>' +
      '<path d="' + icone + '" transform="translate(500 20) scale(1.2)" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>' +
      '<text x="48" y="170" fill="#fff" font-family="Arial,sans-serif" font-size="40" font-weight="700">' + titulo + '</text>' +
      '<text x="48" y="220" fill="#fff" font-family="Arial,sans-serif" font-size="22">' + sub + '</text></svg>';
  }
  var SLIDES = [
    { alt: 'Somos o Registrar Ponto. Empresa de registro de ponto eletrônico', svg: slideSvg('Somos o Registrar Ponto', 'Empresa de registro de ponto eletrônico', '#1e40af', '#2563eb', 'M60 160h120M120 100v120') },
    { alt: 'O que fazemos. Controle de jornada simples, no celular', svg: slideSvg('O que fazemos', 'Controle de jornada simples, no celular', '#15803d', '#166534', 'M70 120a60 60 0 1 0 120 0a60 60 0 1 0 -120 0M130 90v32l24 16') },
    { alt: 'Relatórios claros. Horas, saldo e histórico sempre à mão', svg: slideSvg('Relatórios claros', 'Horas, saldo e histórico sempre à mão', '#6d28d9', '#4c1d95', 'M60 190l40-50 40 30 50-80') },
    { alt: 'Feito para todos. Acessível, com modo escuro e fonte maior', svg: slideSvg('Feito para todos', 'Acessível, com modo escuro e fonte maior', '#0f172a', '#1f3f73', 'M60 130h140M130 80v110M90 190l40-60 40 60') },
    { alt: 'Fale com a gente. Central de Ajuda e Suporte quando precisar', svg: slideSvg('Fale com a gente', 'Central de Ajuda e Suporte quando precisar', '#b45309', '#7c2d12', 'M70 100h120v80h-60l-30 30v-30h-30z') }
  ];

  function iniciar(raiz) {
    var atual = 0;
    var tocando = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer;

    raiz.className = 'carrossel';
    raiz.setAttribute('role', 'region');
    raiz.setAttribute('aria-roledescription', 'carrossel');
    raiz.setAttribute('aria-label', 'Destaques do sistema');
    raiz.tabIndex = 0;

    var area = document.createElement('div');
    area.className = 'slides';
    area.setAttribute('aria-live', 'polite');
    var figuras = SLIDES.map(function (s, i) {
      var f = document.createElement('figure');
      f.className = 'slide';
      f.hidden = i !== 0;
      var im = document.createElement('img');
      im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.svg);
      im.alt = s.alt;
      var cap = document.createElement('figcaption');
      cap.textContent = s.alt;
      f.append(im, cap);
      area.appendChild(f);
      return f;
    });

    var ctrl = document.createElement('div');
    ctrl.className = 'car-ctrl';
    function botao(txt, label, fn) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = txt; b.setAttribute('aria-label', label); b.onclick = fn;
      return b;
    }
    var prev = botao('‹', 'Slide anterior', function () { ir(atual - 1); });
    var next = botao('›', 'Próximo slide', function () { ir(atual + 1); });
    var play = botao('', '', function () { tocando = !tocando; rotular(); ciclo(); });
    var contagem = document.createElement('span');
    contagem.className = 'car-contagem';
    contagem.setAttribute('aria-hidden', 'true');
    ctrl.append(prev, play, contagem, next);

    function rotular() {
      play.textContent = tocando ? 'Pausar' : 'Reproduzir';
      play.setAttribute('aria-label', tocando ? 'Pausar rotação automática' : 'Retomar rotação automática');
    }
    function ir(n) {
      atual = (n + figuras.length) % figuras.length;
      figuras.forEach(function (f, i) { f.hidden = i !== atual; });
      contagem.textContent = (atual + 1) + ' / ' + figuras.length;
    }
    function ciclo() {
      clearInterval(timer);
      if (tocando) timer = setInterval(function () { ir(atual + 1); }, 5000);
    }
    raiz.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { ir(atual - 1); }
      if (e.key === 'ArrowRight') { ir(atual + 1); }
    });
    // pausa enquanto o usuário interage
    raiz.addEventListener('mouseenter', function () { clearInterval(timer); });
    raiz.addEventListener('mouseleave', ciclo);

    raiz.append(area, ctrl);
    rotular(); ir(0); ciclo();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carrossel]').forEach(iniciar);
  });
})();
