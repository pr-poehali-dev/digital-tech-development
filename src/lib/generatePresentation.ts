import PptxGenJS from 'pptxgenjs';

const SOURCE_TEXT = 'Источник: Российский статистический ежегодник. 2025';

// ── Светлая палитра (в соответствии с веб-версией)
const BG       = 'EEF4FA';  // фон страницы
const BG_CARD  = 'FFFFFF';  // белые карточки
const BG_ALT   = 'E0ECF7';  // чуть темнее для секций
const BG_BADGE = 'E6F5FA';  // фон бейджей
const BORDER   = 'C2D8EC';
const CYAN     = '0077A8';  // основной акцент
const TEAL     = '007A6E';  // второй акцент
const TEXT     = '0F2438';  // основной текст
const MUTED    = '4A6B82';  // второстепенный текст
const BAR_TRACK= 'D4E6F4';  // трек прогресс-баров
const WHITE    = 'FFFFFF';

function addSlideBackground(slide: PptxGenJS.Slide, title: string, subtitle: string) {
  slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: BG } });
  slide.addShape('rect', { x: 0, y: 0, w: 0.06, h: '100%', fill: { color: CYAN } });
  slide.addShape('rect', { x: 0.06, y: 0, w: '100%', h: 1.1, fill: { color: BG_CARD } });
  slide.addShape('rect', { x: 0.06, y: 1.1, w: 13.27, h: 0.03, fill: { color: CYAN } });

  slide.addText(title, {
    x: 0.3, y: 0.13, w: 12.7, h: 0.55,
    fontSize: 20, bold: true, color: TEXT, fontFace: 'Calibri', align: 'left',
  });
  slide.addText(subtitle, {
    x: 0.3, y: 0.67, w: 12.7, h: 0.35,
    fontSize: 10, color: CYAN, fontFace: 'Calibri', align: 'left',
  });
}

function addFooter(slide: PptxGenJS.Slide, slideNum: number, total: number) {
  slide.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: BG_CARD } });
  slide.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.03, fill: { color: BORDER } });
  slide.addText(SOURCE_TEXT, {
    x: 0.3, y: 7.14, w: 9, h: 0.28,
    fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left',
  });
  slide.addText(`${slideNum} / ${total}`, {
    x: 12.5, y: 7.14, w: 0.7, h: 0.28,
    fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right',
  });
}

function addCard(slide: PptxGenJS.Slide, x: number, y: number, w: number, h: number,
  value: string, unit: string, label: string, badge?: string, accentColor = CYAN) {
  slide.addShape('rect', { x, y, w, h, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
  slide.addShape('rect', { x, y, w, h: 0.06, fill: { color: accentColor }, rectRadius: 0.04 });
  slide.addText(value, {
    x: x + 0.15, y: y + 0.18, w: w - 0.3, h: 0.55,
    fontSize: 26, bold: true, color: TEXT, fontFace: 'Calibri', align: 'left',
  });
  slide.addText(unit, {
    x: x + 0.15, y: y + 0.72, w: w - 0.3, h: 0.26,
    fontSize: 10, bold: true, color: accentColor, fontFace: 'Calibri', align: 'left',
  });
  slide.addText(label, {
    x: x + 0.15, y: y + 0.98, w: w - 0.3, h: 0.45,
    fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left', wrap: true,
  });
  if (badge) {
    slide.addText(badge, {
      x: x + w - 0.9, y: y + 0.18, w: 0.75, h: 0.28,
      fontSize: 9, bold: true,
      color: badge === '→' ? MUTED : TEAL,
      fontFace: 'Calibri', align: 'center',
    });
  }
}

function addBarRow(slide: PptxGenJS.Slide, x: number, y: number, w: number,
  label: string, value: string, pct: number, color: string, isHighlight = false) {
  slide.addText(label, { x, y, w: 1.1, h: 0.28, fontSize: 9, color: isHighlight ? CYAN : MUTED, fontFace: 'Calibri', bold: isHighlight, align: 'left' });
  slide.addShape('rect', { x: x + 1.15, y: y + 0.06, w: w - 1.7, h: 0.18, fill: { color: BAR_TRACK }, rectRadius: 0.05 });
  const fillW = Math.max(0.05, (w - 1.7) * pct);
  slide.addShape('rect', { x: x + 1.15, y: y + 0.06, w: fillW, h: 0.18, fill: { color }, rectRadius: 0.05 });
  slide.addText(value, { x: x + w - 0.55, y, w: 0.5, h: 0.28, fontSize: 9, bold: true, color: isHighlight ? TEXT : MUTED, fontFace: 'Calibri', align: 'right' });
}

export async function generatePresentation(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Аналитический обзор';
  pptx.title = 'Развитие цифровых технологий в России';

  const TOTAL = 9;

  // ────────────────────────────────────────────────
  // СЛАЙД 1 — Титульный
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();

    // Фон
    s.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: BG } });
    // Полоса слева
    s.addShape('rect', { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: CYAN } });
    // Разделительная горизонтальная полоса
    s.addShape('rect', { x: 0.12, y: 3.4, w: 13.21, h: 0.04, fill: { color: CYAN } });
    s.addShape('rect', { x: 0.12, y: 3.45, w: 13.21, h: 0.02, fill: { color: BORDER } });

    // Бейдж-метка
    s.addShape('rect', { x: 0.5, y: 1.1, w: 3.8, h: 0.36, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.08 });
    s.addText('АНАЛИТИЧЕСКИЙ ОБЗОР · 2022–2024', {
      x: 0.5, y: 1.1, w: 3.8, h: 0.36,
      fontSize: 9, bold: true, color: CYAN, fontFace: 'Calibri', align: 'center', charSpacing: 1.5,
    });

    s.addText('РАЗВИТИЕ ЦИФРОВЫХ\nТЕХНОЛОГИЙ В РОССИИ', {
      x: 0.5, y: 1.6, w: 8.5, h: 1.7,
      fontSize: 40, bold: true, color: TEXT,
      fontFace: 'Calibri', align: 'left', lineSpacingMultiple: 1.1,
    });
    s.addText('Ключевые показатели инновационной и научно-технической деятельности', {
      x: 0.5, y: 3.6, w: 8.5, h: 0.5,
      fontSize: 12, color: MUTED, fontFace: 'Calibri', align: 'left',
    });

    // Декор — круги справа
    s.addShape('ellipse', { x: 9.6, y: 0.9, w: 3.5, h: 3.5, fill: { color: BG_ALT }, line: { color: BORDER, width: 1, dashType: 'dash' } });
    s.addShape('ellipse', { x: 10.3, y: 1.6, w: 2.1, h: 2.1, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 } });
    s.addText('2022\n—\n2024', {
      x: 10.3, y: 1.8, w: 2.1, h: 1.5,
      fontSize: 18, bold: true, color: CYAN, fontFace: 'Calibri', align: 'center',
    });

    // Футер
    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: BG_CARD } });
    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.03, fill: { color: BORDER } });
    s.addText(SOURCE_TEXT, {
      x: 0.3, y: 7.14, w: 9, h: 0.28, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left',
    });
    s.addText('1 / 5', { x: 12.5, y: 7.14, w: 0.7, h: 0.28, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right' });
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 2 — KPI-карточки
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Ключевые показатели · 2024', 'KPI-обзор основных индикаторов');

    const cards = [
      { v: '9 817,7', u: 'млрд руб.', l: 'Инновационные товары, работы и услуги', b: '+18%', c: CYAN },
      { v: '4 524,1', u: 'млрд руб.', l: 'Расходы на инновационную деятельность', b: '+29%', c: TEAL },
      { v: '1 884,9', u: 'млрд руб.', l: 'Внутренние затраты на НИОКР',           b: '+14%', c: CYAN },
      { v: '1,0%',   u: 'от ВВП',    l: 'Доля НИОКР в валовом внутреннем продукте', b: '→', c: TEAL },
    ];

    const cw = 3.0, ch = 1.7, gap = 0.2, startX = 0.35, startY = 1.35;
    cards.forEach((card, i) => {
      addCard(s, startX + i * (cw + gap), startY, cw, ch, card.v, card.u, card.l, card.b, card.c);
    });

    s.addText('Данные за 2024 год. Прирост указан относительно 2023 года.', {
      x: 0.35, y: 3.15, w: 12.5, h: 0.32,
      fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left', italic: true,
    });

    // Горизонтальные бары — динамика роста
    s.addShape('rect', { x: 0.35, y: 3.55, w: 12.9, h: 3.05, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 3.55, w: 0.07, h: 3.05, fill: { color: CYAN } });

    s.addText('Динамика роста объёма инновационных товаров, работ и услуг', {
      x: 0.6, y: 3.68, w: 11.5, h: 0.35, fontSize: 11, bold: true, color: TEXT, fontFace: 'Calibri',
    });

    const rows = [
      { year: '2022', val: '6 377,2 млрд руб.', pct: 0.65 },
      { year: '2023', val: '8 323,9 млрд руб.', pct: 0.85 },
      { year: '2024', val: '9 817,7 млрд руб.', pct: 1.00 },
    ];
    rows.forEach((r, i) => {
      const ry = 4.15 + i * 0.75;
      const isLast = i === 2;
      s.addText(r.year, { x: 0.6, y: ry, w: 0.65, h: 0.28, fontSize: 10, bold: true, color: isLast ? CYAN : MUTED, fontFace: 'Calibri' });
      s.addShape('rect', { x: 1.3, y: ry + 0.06, w: 10.5, h: 0.22, fill: { color: BAR_TRACK }, rectRadius: 0.05 });
      s.addShape('rect', { x: 1.3, y: ry + 0.06, w: 10.5 * r.pct, h: 0.22, fill: { color: isLast ? CYAN : 'A0C8DC' }, rectRadius: 0.05 });
      s.addText(r.val, { x: 1.35, y: ry + 0.04, w: 10.4, h: 0.26, fontSize: 9, bold: isLast, color: isLast ? WHITE : TEXT, fontFace: 'Calibri', align: 'left' });
    });

    addFooter(s, 2, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 3 — Динамика НИОКР
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Динамика расходов · 2022–2024', 'НИОКР и инновационная деятельность — сравнение по годам');

    const years = [
      { year: '2022', niokr: 1435.9, innov: 2662.6 },
      { year: '2023', niokr: 1649.8, innov: 3519.5 },
      { year: '2024', niokr: 1884.9, innov: 4524.1 },
    ];
    const maxInnov = 4524.1;
    const maxNiokr = 1884.9;

    // Левая секция — НИОКР
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.9, h: 5.4, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.9, h: 0.06, fill: { color: TEAL }, rectRadius: 0.04 });
    s.addText('Внутренние затраты на НИОКР', { x: 0.55, y: 1.45, w: 5.5, h: 0.4, fontSize: 12, bold: true, color: TEXT, fontFace: 'Calibri' });
    s.addText('млрд руб.', { x: 0.55, y: 1.85, w: 5.5, h: 0.3, fontSize: 9, color: MUTED, fontFace: 'Calibri' });

    years.forEach((r, i) => {
      const ry = 2.25 + i * 1.3;
      const isLast = i === 2;
      addBarRow(s, 0.55, ry, 5.5, r.year, `${r.niokr.toLocaleString('ru')} млрд`, r.niokr / maxNiokr, TEAL, isLast);
      s.addShape('rect', { x: 0.55, y: ry + 0.32, w: 5.5, h: 0.5, fill: { color: isLast ? BG_BADGE : BG_ALT }, rectRadius: 0.05 });
      const prev = years[Math.max(0, i - 1)].niokr;
      const pctChange = i === 0 ? '—' : `+${((r.niokr / prev - 1) * 100).toFixed(1)}% к пред. году`;
      s.addText(pctChange, {
        x: 0.65, y: ry + 0.36, w: 5.3, h: 0.38,
        fontSize: 8.5, color: isLast ? TEAL : MUTED, fontFace: 'Calibri', italic: true,
      });
    });

    // Правая секция — Инновации
    s.addShape('rect', { x: 6.6, y: 1.3, w: 6.4, h: 5.4, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 6.6, y: 1.3, w: 6.4, h: 0.06, fill: { color: CYAN }, rectRadius: 0.04 });
    s.addText('Расходы на инновационную деятельность', { x: 6.8, y: 1.45, w: 6.0, h: 0.4, fontSize: 12, bold: true, color: TEXT, fontFace: 'Calibri' });
    s.addText('млрд руб.', { x: 6.8, y: 1.85, w: 6.0, h: 0.3, fontSize: 9, color: MUTED, fontFace: 'Calibri' });

    years.forEach((r, i) => {
      const ry = 2.25 + i * 1.3;
      const isLast = i === 2;
      addBarRow(s, 6.8, ry, 5.9, r.year, `${r.innov.toLocaleString('ru')} млрд`, r.innov / maxInnov, CYAN, isLast);
      s.addShape('rect', { x: 6.8, y: ry + 0.32, w: 5.9, h: 0.5, fill: { color: isLast ? BG_BADGE : BG_ALT }, rectRadius: 0.05 });
      const prev = years[Math.max(0, i - 1)].innov;
      const pctChange = i === 0 ? '—' : `+${((r.innov / prev - 1) * 100).toFixed(1)}% к пред. году`;
      s.addText(pctChange, {
        x: 6.9, y: ry + 0.36, w: 5.7, h: 0.38,
        fontSize: 8.5, color: isLast ? CYAN : MUTED, fontFace: 'Calibri', italic: true,
      });
    });

    addFooter(s, 3, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 4 — Инновационная активность
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Инновационная активность предприятий', 'Сравнительный анализ показателей за 2022–2024');

    const rows = [
      { year: '2022', overall: 11.0, tech: 22.8 },
      { year: '2023', overall: 11.3, tech: 22.7 },
      { year: '2024', overall: 12.5, tech: 24.5 },
    ];

    // Левый блок
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.9, h: 5.5, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.9, h: 0.06, fill: { color: CYAN }, rectRadius: 0.04 });
    s.addText('Общая инновационная активность', { x: 0.55, y: 1.45, w: 5.5, h: 0.4, fontSize: 12, bold: true, color: TEXT, fontFace: 'Calibri' });
    s.addText('Доля предприятий, осуществляющих инновационную деятельность', {
      x: 0.55, y: 1.85, w: 5.5, h: 0.4, fontSize: 8.5, color: MUTED, fontFace: 'Calibri', wrap: true,
    });

    rows.forEach((r, i) => {
      const ry = 2.45 + i * 1.35;
      const isLast = i === 2;
      s.addText(r.year, { x: 0.55, y: ry, w: 0.75, h: 0.35, fontSize: 13, bold: true, color: isLast ? CYAN : MUTED, fontFace: 'Calibri' });
      s.addShape('rect', { x: 0.55, y: ry + 0.42, w: 5.0, h: 0.22, fill: { color: BAR_TRACK }, rectRadius: 0.05 });
      s.addShape('rect', { x: 0.55, y: ry + 0.42, w: 5.0 * (r.overall / 15), h: 0.22, fill: { color: isLast ? CYAN : 'A0C8DC' }, rectRadius: 0.05 });
      s.addText(`${r.overall}%`, { x: 0.55, y: ry + 0.68, w: 5.0, h: 0.3, fontSize: 20, bold: true, color: isLast ? TEXT : MUTED, fontFace: 'Calibri', align: 'right' });
    });

    // Правый блок
    s.addShape('rect', { x: 6.6, y: 1.3, w: 6.4, h: 5.5, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 6.6, y: 1.3, w: 6.4, h: 0.06, fill: { color: TEAL }, rectRadius: 0.04 });
    s.addText('Технологические инновации', { x: 6.8, y: 1.45, w: 6.0, h: 0.4, fontSize: 12, bold: true, color: TEXT, fontFace: 'Calibri' });
    s.addText('Доля предприятий, внедряющих технологические инновации', {
      x: 6.8, y: 1.85, w: 6.0, h: 0.4, fontSize: 8.5, color: MUTED, fontFace: 'Calibri', wrap: true,
    });

    rows.forEach((r, i) => {
      const ry = 2.45 + i * 1.35;
      const isLast = i === 2;
      s.addText(r.year, { x: 6.8, y: ry, w: 0.75, h: 0.35, fontSize: 13, bold: true, color: isLast ? TEAL : MUTED, fontFace: 'Calibri' });
      s.addShape('rect', { x: 6.8, y: ry + 0.42, w: 5.5, h: 0.22, fill: { color: BAR_TRACK }, rectRadius: 0.05 });
      s.addShape('rect', { x: 6.8, y: ry + 0.42, w: 5.5 * (r.tech / 30), h: 0.22, fill: { color: isLast ? TEAL : 'A0CEC8' }, rectRadius: 0.05 });
      s.addText(`${r.tech}%`, { x: 6.8, y: ry + 0.68, w: 5.5, h: 0.3, fontSize: 20, bold: true, color: isLast ? TEXT : MUTED, fontFace: 'Calibri', align: 'right' });
    });

    // Итоговая строка прироста
    s.addShape('rect', { x: 0.35, y: 6.5, w: 12.65, h: 0.38, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.06 });
    s.addText('Прирост 2022→2024:', { x: 0.55, y: 6.52, w: 2.5, h: 0.28, fontSize: 9, color: MUTED, fontFace: 'Calibri' });
    s.addText('Общая активность +1,5 п.п.', { x: 3.2, y: 6.52, w: 3.5, h: 0.28, fontSize: 9, bold: true, color: CYAN, fontFace: 'Calibri' });
    s.addText('Технологические инновации +1,7 п.п.', { x: 6.8, y: 6.52, w: 5.8, h: 0.28, fontSize: 9, bold: true, color: TEAL, fontFace: 'Calibri' });

    addFooter(s, 4, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 5 — Сравнение технологических приоритетов
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Цифровые технологии — главный приоритет', 'Сравнение объёмов финансирования по направлениям · 2024');

    const priorities = [
      { label: 'Цифровые,\nИИ, BigData, ML', value: 256.1, highlight: true },
      { label: 'Транспорт и\nтелеком-системы', value: 102.2, highlight: false },
      { label: 'Персонализированная\nмедицина', value: 80.9, highlight: false },
      { label: 'Экологичная\nэнергетика', value: 69.5, highlight: false },
    ];
    const maxVal = 256.1;

    // Фон секции с диаграммой
    s.addShape('rect', { x: 0.35, y: 1.3, w: 12.65, h: 4.9, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });

    // Столбцы диаграммы
    const colW = 2.5;
    const colGap = 0.65;
    const chartBottom = 5.6;
    const maxBarH = 3.2;
    const startX = 0.9;

    priorities.forEach((p, i) => {
      const barH = (p.value / maxVal) * maxBarH;
      const bx = startX + i * (colW + colGap);
      const by = chartBottom - barH;

      // Столбец
      s.addShape('rect', {
        x: bx, y: by, w: colW, h: barH,
        fill: { color: p.highlight ? CYAN : BAR_TRACK },
        line: { color: p.highlight ? CYAN : BORDER, width: 0.5 },
        rectRadius: 0.06,
      });

      // Метка №1 внутри выделенного столбца
      if (p.highlight) {
        s.addText('№ 1', {
          x: bx, y: by + 0.15, w: colW, h: 0.35,
          fontSize: 12, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center',
        });
      }

      // Значение над столбцом
      s.addText(`${p.value} млрд`, {
        x: bx - 0.1, y: by - 0.38, w: colW + 0.2, h: 0.32,
        fontSize: p.highlight ? 13 : 10,
        bold: p.highlight,
        color: p.highlight ? TEXT : MUTED,
        fontFace: 'Calibri', align: 'center',
      });

      // Подпись под столбцом
      s.addText(p.label, {
        x: bx - 0.1, y: chartBottom + 0.12, w: colW + 0.2, h: 0.55,
        fontSize: 9,
        bold: p.highlight,
        color: p.highlight ? CYAN : MUTED,
        fontFace: 'Calibri', align: 'center', wrap: true,
      });
    });

    // Горизонтальная ось
    s.addShape('rect', { x: 0.7, y: chartBottom, w: 12.0, h: 0.03, fill: { color: BORDER } });

    // Вывод-комментарий
    s.addShape('rect', { x: 0.35, y: 6.55, w: 12.65, h: 0.42, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.07 });
    s.addText('Цифровое направление опережает ближайшего конкурента (транспорт и телеком) в 2,5 раза и занимает лидирующее место среди всех приоритетов.', {
      x: 0.55, y: 6.58, w: 12.3, h: 0.35,
      fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left',
    });

    addFooter(s, 5, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 6 — Цифровой приоритет / ИИ
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();

    s.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: BG } });
    s.addShape('rect', { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: TEAL } });
    s.addShape('rect', { x: 0.12, y: 0, w: '100%', h: 1.1, fill: { color: BG_CARD } });
    s.addShape('rect', { x: 0.12, y: 1.1, w: 13.27, h: 0.03, fill: { color: TEAL } });

    s.addText('Цифровой приоритет', { x: 0.35, y: 0.13, w: 9, h: 0.55, fontSize: 20, bold: true, color: TEXT, fontFace: 'Calibri' });
    s.addText('ПРИОРИТЕТНОЕ НАПРАВЛЕНИЕ · 2024', { x: 0.35, y: 0.67, w: 9, h: 0.35, fontSize: 10, color: TEAL, fontFace: 'Calibri', charSpacing: 2 });

    // Левый блок — большая цифра
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.5, h: 5.4, fill: { color: BG_BADGE }, line: { color: BORDER, width: 1 }, rectRadius: 0.12 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.5, h: 0.07, fill: { color: TEAL }, rectRadius: 0.08 });

    s.addText('256,1', {
      x: 0.4, y: 1.55, w: 5.3, h: 1.6,
      fontSize: 80, bold: true, color: TEXT, fontFace: 'Calibri', align: 'center',
    });
    s.addText('млрд руб.', {
      x: 0.4, y: 3.1, w: 5.3, h: 0.5,
      fontSize: 20, bold: true, color: TEAL, fontFace: 'Calibri', align: 'center',
    });
    s.addText('Объём сектора · 2024', {
      x: 0.4, y: 3.62, w: 5.3, h: 0.3,
      fontSize: 10, color: MUTED, fontFace: 'Calibri', align: 'center',
    });

    // Теги направлений
    const tags = ['BigData', 'ML', 'Искусственный интеллект', 'Цифровые производства'];
    tags.forEach((tag, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      s.addShape('rect', {
        x: 0.5 + col * 2.65, y: 4.15 + row * 0.55,
        w: 2.4, h: 0.38,
        fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.12,
      });
      s.addText(tag, {
        x: 0.5 + col * 2.65, y: 4.17 + row * 0.55, w: 2.4, h: 0.34,
        fontSize: 9, bold: true, color: TEAL, fontFace: 'Calibri', align: 'center',
      });
    });

    // Правый блок — описание
    s.addShape('rect', { x: 6.2, y: 1.3, w: 6.75, h: 5.4, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });

    s.addText('Передовые цифровые и интеллектуальные производственные технологии, обработка больших данных, машинное обучение и искусственный интеллект', {
      x: 6.4, y: 1.5, w: 6.35, h: 1.3,
      fontSize: 13, bold: true, color: TEXT, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2,
    });

    s.addShape('rect', { x: 6.4, y: 2.85, w: 6.2, h: 0.03, fill: { color: BORDER } });

    const facts = [
      'Наиболее динамично растущий сегмент инновационной экономики России',
      'Включает разработку и внедрение технологий ИИ, промышленного ML и обработки больших массивов данных',
      'Является стратегическим приоритетом государственной научно-технической политики',
    ];
    facts.forEach((fact, i) => {
      s.addShape('ellipse', { x: 6.4, y: 3.02 + i * 0.95, w: 0.14, h: 0.14, fill: { color: TEAL } });
      s.addText(fact, {
        x: 6.65, y: 2.98 + i * 0.95, w: 5.9, h: 0.75,
        fontSize: 10, color: MUTED, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2,
      });
    });

    // Футер
    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: BG_CARD } });
    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.03, fill: { color: BORDER } });
    s.addText(SOURCE_TEXT, { x: 0.3, y: 7.14, w: 9, h: 0.28, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left' });
    s.addText('6 / 9', { x: 12.5, y: 7.14, w: 0.7, h: 0.28, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right' });
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 7 — Прогноз ИИ и IoT до 2030
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Рынок ИИ и IoT в России: прогноз роста до 2030 года', 'Показать будущую динамику цифровизации и лидеров рынка · Среднегодовой рост ~45% в 2025–2027 гг.');

    // Блок с графиком (горизонтальные бары — аналог линейного)
    s.addShape('rect', { x: 0.35, y: 1.3, w: 7.8, h: 5.4, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 7.8, h: 0.06, fill: { color: CYAN }, rectRadius: 0.04 });
    s.addText('Прогноз объёма рынка, млрд руб.', { x: 0.55, y: 1.45, w: 7.4, h: 0.4, fontSize: 11, bold: true, color: TEXT, fontFace: 'Calibri' });

    const forecast = [
      { year: '2025', value: 170.3 },
      { year: '2026', value: 247 },
      { year: '2027', value: 358 },
      { year: '2030', value: 1000 },
    ];
    const maxFV = 1000;
    forecast.forEach((f, i) => {
      const isLast = i === 3;
      const ry = 2.0 + i * 1.1;
      const barW = 6.0 * (f.value / maxFV);
      s.addText(f.year, { x: 0.55, y: ry, w: 0.7, h: 0.3, fontSize: 11, bold: true, color: isLast ? TEAL : MUTED, fontFace: 'Calibri' });
      s.addShape('rect', { x: 1.3, y: ry + 0.05, w: 6.0, h: 0.24, fill: { color: BAR_TRACK }, rectRadius: 0.05 });
      s.addShape('rect', { x: 1.3, y: ry + 0.05, w: barW, h: 0.24, fill: { color: isLast ? TEAL : CYAN }, rectRadius: 0.05 });
      s.addText(isLast ? '>1 000 млрд' : `${f.value} млрд`, {
        x: 1.35, y: ry + 0.04, w: barW > 0.8 ? barW - 0.1 : 1.5, h: 0.24,
        fontSize: 8.5, bold: true, color: barW > 0.8 ? WHITE : TEXT, fontFace: 'Calibri', align: barW > 0.8 ? 'right' : 'left',
      });
      if (i < 3) {
        const pct = i === 0 ? '+45%' : i === 1 ? '+45%' : '+45%/год';
        s.addText(pct, { x: 7.4, y: ry, w: 0.65, h: 0.32, fontSize: 9, bold: true, color: CYAN, fontFace: 'Calibri', align: 'right' });
      }
    });

    // Карточки компаний
    s.addShape('rect', { x: 8.5, y: 1.3, w: 4.8, h: 5.4, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 8.5, y: 1.3, w: 4.8, h: 0.06, fill: { color: TEAL }, rectRadius: 0.04 });
    s.addText('Лидеры рынка', { x: 8.7, y: 1.45, w: 4.4, h: 0.35, fontSize: 11, bold: true, color: TEXT, fontFace: 'Calibri' });

    const companies = [
      { name: 'Яндекс', desc: 'Платформы для умных устройств, голосовые ассистенты, решения для промышленности и транспорта.', c: CYAN },
      { name: 'Сбер', desc: 'Экосистема SberDevices, платформы для анализа данных и автоматизации.', c: TEAL },
      { name: 'Касперский', desc: 'Решения по кибербезопасности для IoT и промышленных систем.', c: MUTED },
    ];
    companies.forEach((co, i) => {
      const cy = 1.95 + i * 1.55;
      s.addShape('rect', { x: 8.7, y: cy, w: 4.4, h: 1.35, fill: { color: BG_ALT }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.08 });
      s.addShape('rect', { x: 8.7, y: cy, w: 0.06, h: 1.35, fill: { color: co.c } });
      s.addText(co.name, { x: 8.9, y: cy + 0.1, w: 4.1, h: 0.3, fontSize: 11, bold: true, color: TEXT, fontFace: 'Calibri' });
      s.addText(co.desc, { x: 8.9, y: cy + 0.42, w: 4.1, h: 0.8, fontSize: 9, color: MUTED, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2 });
    });

    // Вывод
    s.addShape('rect', { x: 0.35, y: 6.55, w: 12.65, h: 0.45, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.07 });
    s.addText('Рынок ИИ и IoT демонстрирует устойчивый рост. К 2030 году затраты на цифровизацию могут превысить триллионы рублей. Ключевые направления: автоматизация, e-commerce, телеком, промышленность.', {
      x: 0.55, y: 6.58, w: 12.3, h: 0.38, fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left',
    });

    addFooter(s, 7, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 8 — Как использовать данные на практике
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Как использовать данные на практике', '3 сценария применения анализа НИОКР, инноваций и прогноза ИИ/IoT');

    const scenarios = [
      {
        title: 'Для бизнеса',
        text: 'Использовать тренды роста НИОКР и инноваций для приоритизации инвестиций в цифровизацию, автоматизацию и внедрение ИИ-решений. Помогает выбирать направления, где рынок уже растёт и где можно быстрее получить эффект.',
        color: CYAN,
      },
      {
        title: 'Для стратегии и инвестиций',
        text: 'Опираясь на прогноз рынка ИИ и IoT до 2030 года, оценивать долгосрочные точки роста, планировать бюджет и выбирать отрасли с наибольшим потенциалом — телеком, e-commerce, промышленность и сервисные платформы.',
        color: TEAL,
      },
      {
        title: 'Для презентации или отчёта',
        text: 'Использовать ключевые цифры и графики как основу для слайда руководителю, публичного доклада или аналитической записки: рост затрат, цифровой приоритет, лидеры отраслей, прогноз на будущее.',
        color: MUTED,
      },
    ];

    const cw = 4.0, ch = 4.8, gap = 0.2, sx = 0.35;
    scenarios.forEach((sc, i) => {
      const bx = sx + i * (cw + gap);
      s.addShape('rect', { x: bx, y: 1.3, w: cw, h: ch, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
      s.addShape('rect', { x: bx, y: 1.3, w: cw, h: 0.07, fill: { color: sc.color }, rectRadius: 0.05 });
      // Номер
      s.addShape('ellipse', { x: bx + 0.2, y: 1.52, w: 0.45, h: 0.45, fill: { color: sc.color } });
      s.addText(`${i + 1}`, { x: bx + 0.2, y: 1.54, w: 0.45, h: 0.38, fontSize: 13, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center' });
      s.addText(sc.title, { x: bx + 0.75, y: 1.57, w: cw - 0.95, h: 0.4, fontSize: 12, bold: true, color: TEXT, fontFace: 'Calibri' });
      s.addShape('rect', { x: bx + 0.2, y: 2.1, w: cw - 0.4, h: 0.02, fill: { color: BORDER } });
      s.addText(sc.text, {
        x: bx + 0.2, y: 2.22, w: cw - 0.4, h: 3.6,
        fontSize: 10, color: MUTED, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.35,
      });
    });

    // Итоговый вывод
    s.addShape('rect', { x: 0.35, y: 6.35, w: 12.65, h: 0.6, fill: { color: BG_BADGE }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.08 });
    s.addText('Анализ показывает не только текущее состояние цифрового развития, но и помогает принимать решения о том, куда направлять ресурсы, какие технологии внедрять и какие рынки считать приоритетными.', {
      x: 0.55, y: 6.38, w: 12.3, h: 0.5, fontSize: 9.5, color: MUTED, fontFace: 'Calibri', align: 'left', wrap: true,
    });

    addFooter(s, 8, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 9 — Источники и ограничения методики
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Источники и ограничения методики', 'Как формировались результаты исследования');

    const bullets = [
      'Источник данных — Росстат.',
      'Для анализа и подготовки текста использовались Perplexity, ГигаЧат, poehali и другие LLM-сервисы.',
      'Часть платформ имеет ограничения по объёму контекста, из-за чего большие наборы данных приходится делить на части.',
      'Некоторые сервисы не отдают готовый файл презентации напрямую и используют промежуточные форматы, например base64.',
      'Визуализация данных в ИИ-сервисах требует проверки: подписи, оси и текст на графиках могут быть неточными.',
    ];

    s.addShape('rect', { x: 0.35, y: 1.3, w: 12.65, h: 5.55, fill: { color: BG_CARD }, line: { color: BORDER, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 0.07, h: 5.55, fill: { color: MUTED } });

    bullets.forEach((b, i) => {
      const by = 1.65 + i * 0.95;
      s.addShape('ellipse', { x: 0.65, y: by + 0.05, w: 0.18, h: 0.18, fill: { color: i === 0 ? CYAN : BORDER } });
      s.addText(b, {
        x: 1.0, y: by, w: 11.7, h: 0.8,
        fontSize: 11, color: i === 0 ? TEXT : MUTED, bold: i === 0,
        fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2,
      });
    });

    addFooter(s, 9, TOTAL);
  }

  await pptx.writeFile({ fileName: 'Цифровые-технологии-Россия-2024.pptx' });
}