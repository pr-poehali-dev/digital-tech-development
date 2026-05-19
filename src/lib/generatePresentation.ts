import PptxGenJS from 'pptxgenjs';

const DARK_BG = '0D2137';
const MID_BG  = '0F2B47';
const CARD_BG = '132F52';
const CYAN    = '00B4D8';
const TEAL    = '00CFB4';
const WHITE   = 'FFFFFF';
const MUTED   = 'A0B4C8';
const ACCENT  = '1A3F60';

function addSlideBackground(slide: PptxGenJS.Slide, title: string, subtitle: string) {
  // Основной фон
  slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: DARK_BG } });
  // Декоративная полоса слева
  slide.addShape('rect', { x: 0, y: 0, w: 0.06, h: '100%', fill: { color: CYAN } });
  // Верхняя подложка
  slide.addShape('rect', { x: 0.06, y: 0, w: '100%', h: 1.1, fill: { color: MID_BG } });
  // Разделитель
  slide.addShape('rect', { x: 0.06, y: 1.1, w: 9.94, h: 0.03, fill: { color: CYAN } });

  slide.addText(title, {
    x: 0.3, y: 0.12, w: 9.0, h: 0.55,
    fontSize: 20, bold: true, color: WHITE,
    fontFace: 'Calibri', align: 'left',
  });
  slide.addText(subtitle, {
    x: 0.3, y: 0.67, w: 9.0, h: 0.35,
    fontSize: 10, color: CYAN,
    fontFace: 'Calibri', align: 'left',
  });
}

function addFooter(slide: PptxGenJS.Slide, slideNum: number, total: number) {
  slide.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: MID_BG } });
  slide.addText('Источник: официальная статистика Российской Федерации', {
    x: 0.3, y: 7.12, w: 7, h: 0.3,
    fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left',
  });
  slide.addText(`${slideNum} / ${total}`, {
    x: 9.3, y: 7.12, w: 0.6, h: 0.3,
    fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right',
  });
}

function addCard(slide: PptxGenJS.Slide, x: number, y: number, w: number, h: number,
  value: string, unit: string, label: string, badge?: string, accentColor = CYAN) {
  // Карточка
  slide.addShape('rect', { x, y, w, h, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
  // Акцентная полоса сверху
  slide.addShape('rect', { x, y, w, h: 0.06, fill: { color: accentColor }, rectRadius: 0.04 });
  // Значение
  slide.addText(value, {
    x: x + 0.15, y: y + 0.18, w: w - 0.3, h: 0.55,
    fontSize: 28, bold: true, color: WHITE, fontFace: 'Calibri', align: 'left',
  });
  // Единица
  slide.addText(unit, {
    x: x + 0.15, y: y + 0.72, w: w - 0.3, h: 0.26,
    fontSize: 10, bold: true, color: accentColor, fontFace: 'Calibri', align: 'left',
  });
  // Подпись
  slide.addText(label, {
    x: x + 0.15, y: y + 0.98, w: w - 0.3, h: 0.45,
    fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left', wrap: true,
  });
  if (badge) {
    slide.addText(badge, {
      x: x + w - 0.9, y: y + 0.18, w: 0.75, h: 0.28,
      fontSize: 9, bold: true, color: TEAL, fontFace: 'Calibri', align: 'center',
    });
  }
}

function addBarRow(slide: PptxGenJS.Slide, x: number, y: number, w: number,
  label: string, value: string, pct: number, color: string) {
  slide.addText(label, { x, y, w: 1.1, h: 0.28, fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left' });
  // Трек
  slide.addShape('rect', { x: x + 1.15, y: y + 0.06, w: w - 1.7, h: 0.18, fill: { color: ACCENT }, rectRadius: 0.05 });
  // Заполнение
  const fillW = Math.max(0.05, (w - 1.7) * pct);
  slide.addShape('rect', { x: x + 1.15, y: y + 0.06, w: fillW, h: 0.18, fill: { color }, rectRadius: 0.05 });
  slide.addText(value, { x: x + w - 0.55, y, w: 0.5, h: 0.28, fontSize: 9, bold: true, color: WHITE, fontFace: 'Calibri', align: 'right' });
}

export async function generatePresentation(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 × 7.5 inches
  pptx.author = 'Аналитический обзор';
  pptx.title = 'Развитие цифровых технологий в России';

  const TOTAL = 5;

  // ────────────────────────────────────────────────
  // СЛАЙД 1 — Титульный
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: DARK_BG } });
    s.addShape('rect', { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: CYAN } });
    s.addShape('rect', { x: 0.12, y: 3.2, w: 13.21, h: 0.04, fill: { color: CYAN } });
    s.addShape('rect', { x: 0.12, y: 3.25, w: 13.21, h: 0.02, fill: { color: '1A5F7A' } });

    s.addText('РАЗВИТИЕ ЦИФРОВЫХ\nТЕХНОЛОГИЙ В РОССИИ', {
      x: 0.5, y: 1.3, w: 12.0, h: 1.9,
      fontSize: 44, bold: true, color: WHITE,
      fontFace: 'Calibri', align: 'left', lineSpacingMultiple: 1.1,
    });
    s.addText('АНАЛИТИЧЕСКИЙ ОБЗОР · 2022–2024', {
      x: 0.5, y: 3.45, w: 10, h: 0.5,
      fontSize: 14, color: CYAN, fontFace: 'Calibri', align: 'left', charSpacing: 3,
    });
    s.addText('Ключевые показатели инновационной и научно-технической деятельности', {
      x: 0.5, y: 4.0, w: 10, h: 0.5,
      fontSize: 13, color: MUTED, fontFace: 'Calibri', align: 'left',
    });

    // Декор — большой круг
    s.addShape('ellipse', { x: 9.5, y: 1.0, w: 3.5, h: 3.5, fill: { color: '0A2A45' }, line: { color: CYAN, width: 0.5, dashType: 'dash' } });
    s.addShape('ellipse', { x: 10.2, y: 1.7, w: 2.1, h: 2.1, fill: { color: '0F3355' } });
    s.addText('2022\n—\n2024', {
      x: 10.2, y: 1.9, w: 2.1, h: 1.5,
      fontSize: 18, bold: true, color: CYAN, fontFace: 'Calibri', align: 'center',
    });

    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: MID_BG } });
    s.addText('Источник: официальная статистика Российской Федерации', {
      x: 0.3, y: 7.12, w: 9, h: 0.3, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left',
    });
    s.addText('1 / 5', { x: 9.3, y: 7.12, w: 0.6, h: 0.3, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right' });
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

    const cw = 3.0, ch = 1.7, gap = 0.2, startX = 0.35, startY = 1.4;
    cards.forEach((card, i) => {
      addCard(s, startX + i * (cw + gap), startY, cw, ch, card.v, card.u, card.l, card.b, card.c);
    });

    // Подстрочный комментарий
    s.addText('Данные за 2024 год. Прирост указан относительно 2023 года.', {
      x: 0.35, y: 3.25, w: 12.5, h: 0.35,
      fontSize: 9, color: MUTED, fontFace: 'Calibri', align: 'left',
    });

    // Доп. акцент: объём инновационных товаров
    s.addShape('rect', { x: 0.35, y: 3.7, w: 12.9, h: 2.9, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 3.7, w: 0.07, h: 2.9, fill: { color: CYAN } });

    s.addText('Динамика роста объёма инновационных товаров, работ и услуг', {
      x: 0.6, y: 3.85, w: 11.5, h: 0.35, fontSize: 11, bold: true, color: WHITE, fontFace: 'Calibri',
    });

    const rows = [
      { year: '2022', val: '6 377,2 млрд руб.', pct: 0.65 },
      { year: '2023', val: '8 323,9 млрд руб.', pct: 0.85 },
      { year: '2024', val: '9 817,7 млрд руб.', pct: 1.00 },
    ];
    rows.forEach((r, i) => {
      const ry = 4.3 + i * 0.75;
      s.addText(r.year, { x: 0.6, y: ry, w: 0.65, h: 0.28, fontSize: 10, bold: true, color: i === 2 ? CYAN : MUTED, fontFace: 'Calibri' });
      s.addShape('rect', { x: 1.3, y: ry + 0.06, w: 10.5, h: 0.22, fill: { color: ACCENT }, rectRadius: 0.05 });
      s.addShape('rect', { x: 1.3, y: ry + 0.06, w: 10.5 * r.pct, h: 0.22, fill: { color: i === 2 ? CYAN : '1A6080' }, rectRadius: 0.05 });
      s.addText(r.val, { x: 1.35, y: ry + 0.04, w: 10.4, h: 0.26, fontSize: 9, bold: true, color: WHITE, fontFace: 'Calibri', align: 'left' });
    });

    addFooter(s, 2, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 3 — Динамика НИОКР и инновационных расходов
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
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.85, h: 5.4, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.85, h: 0.06, fill: { color: TEAL }, rectRadius: 0.04 });
    s.addText('Внутренние затраты на НИОКР', { x: 0.55, y: 1.45, w: 5.4, h: 0.4, fontSize: 12, bold: true, color: WHITE, fontFace: 'Calibri' });
    s.addText('млрд руб.', { x: 0.55, y: 1.85, w: 5.4, h: 0.3, fontSize: 9, color: MUTED, fontFace: 'Calibri' });

    years.forEach((r, i) => {
      const ry = 2.25 + i * 1.3;
      addBarRow(s, 0.55, ry, 5.5, r.year, `${r.niokr.toLocaleString('ru')} млрд`, r.niokr / maxNiokr, TEAL);
      s.addShape('rect', { x: 0.55, y: ry + 0.32, w: 5.5, h: 0.5,
        fill: { color: i === 2 ? '0F3A55' : '0A2A40' }, rectRadius: 0.05 });
      s.addText(`${((r.niokr / (i === 0 ? r.niokr : years[i-1].niokr) - 1) * 100).toFixed(1)}% к пред. году`, {
        x: 0.65, y: ry + 0.36, w: 5.3, h: 0.38,
        fontSize: 8.5, color: i === 2 ? TEAL : MUTED, fontFace: 'Calibri', italic: true,
      });
    });

    // Правая секция — Инновации
    s.addShape('rect', { x: 6.55, y: 1.3, w: 6.45, h: 5.4, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 6.55, y: 1.3, w: 6.45, h: 0.06, fill: { color: CYAN }, rectRadius: 0.04 });
    s.addText('Расходы на инновационную деятельность', { x: 6.75, y: 1.45, w: 6.0, h: 0.4, fontSize: 12, bold: true, color: WHITE, fontFace: 'Calibri' });
    s.addText('млрд руб.', { x: 6.75, y: 1.85, w: 6.0, h: 0.3, fontSize: 9, color: MUTED, fontFace: 'Calibri' });

    years.forEach((r, i) => {
      const ry = 2.25 + i * 1.3;
      addBarRow(s, 6.75, ry, 5.9, r.year, `${r.innov.toLocaleString('ru')} млрд`, r.innov / maxInnov, CYAN);
      s.addShape('rect', { x: 6.75, y: ry + 0.32, w: 5.9, h: 0.5,
        fill: { color: i === 2 ? '0F3A55' : '0A2A40' }, rectRadius: 0.05 });
      s.addText(`${((r.innov / (i === 0 ? r.innov : years[i-1].innov) - 1) * 100).toFixed(1)}% к пред. году`, {
        x: 6.85, y: ry + 0.36, w: 5.7, h: 0.38,
        fontSize: 8.5, color: i === 2 ? CYAN : MUTED, fontFace: 'Calibri', italic: true,
      });
    });

    addFooter(s, 3, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 4 — Инновационная активность предприятий
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    addSlideBackground(s, 'Инновационная активность предприятий', 'Сравнительный анализ показателей за 2022–2024');

    const rows = [
      { year: '2022', overall: 11.0, tech: 22.8 },
      { year: '2023', overall: 11.3, tech: 22.7 },
      { year: '2024', overall: 12.5, tech: 24.5 },
    ];

    // Левый блок — Общая активность
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.85, h: 5.5, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.85, h: 0.06, fill: { color: CYAN }, rectRadius: 0.04 });
    s.addText('Общая инновационная активность', {
      x: 0.55, y: 1.45, w: 5.4, h: 0.5, fontSize: 12, bold: true, color: WHITE, fontFace: 'Calibri',
    });
    s.addText('Доля предприятий, осуществляющих инновационную деятельность', {
      x: 0.55, y: 1.9, w: 5.4, h: 0.45, fontSize: 8.5, color: MUTED, fontFace: 'Calibri', wrap: true,
    });

    rows.forEach((r, i) => {
      const ry = 2.55 + i * 1.35;
      const isLast = i === 2;
      s.addText(r.year, {
        x: 0.55, y: ry, w: 0.75, h: 0.35, fontSize: 13, bold: true,
        color: isLast ? CYAN : MUTED, fontFace: 'Calibri',
      });
      s.addShape('rect', { x: 0.55, y: ry + 0.42, w: 5.0, h: 0.22, fill: { color: ACCENT }, rectRadius: 0.05 });
      s.addShape('rect', { x: 0.55, y: ry + 0.42, w: 5.0 * (r.overall / 15), h: 0.22, fill: { color: isLast ? CYAN : '1A6080' }, rectRadius: 0.05 });
      s.addText(`${r.overall}%`, {
        x: 0.55, y: ry + 0.68, w: 5.0, h: 0.3, fontSize: 20, bold: true,
        color: isLast ? WHITE : MUTED, fontFace: 'Calibri', align: 'right',
      });
    });

    // Правый блок — Технологические инновации
    s.addShape('rect', { x: 6.55, y: 1.3, w: 6.45, h: 5.5, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });
    s.addShape('rect', { x: 6.55, y: 1.3, w: 6.45, h: 0.06, fill: { color: TEAL }, rectRadius: 0.04 });
    s.addText('Технологические инновации', {
      x: 6.75, y: 1.45, w: 6.0, h: 0.5, fontSize: 12, bold: true, color: WHITE, fontFace: 'Calibri',
    });
    s.addText('Доля предприятий, внедряющих технологические инновации', {
      x: 6.75, y: 1.9, w: 6.0, h: 0.45, fontSize: 8.5, color: MUTED, fontFace: 'Calibri', wrap: true,
    });

    rows.forEach((r, i) => {
      const ry = 2.55 + i * 1.35;
      const isLast = i === 2;
      s.addText(r.year, {
        x: 6.75, y: ry, w: 0.75, h: 0.35, fontSize: 13, bold: true,
        color: isLast ? TEAL : MUTED, fontFace: 'Calibri',
      });
      s.addShape('rect', { x: 6.75, y: ry + 0.42, w: 5.5, h: 0.22, fill: { color: ACCENT }, rectRadius: 0.05 });
      s.addShape('rect', { x: 6.75, y: ry + 0.42, w: 5.5 * (r.tech / 30), h: 0.22, fill: { color: isLast ? TEAL : '1A7070' }, rectRadius: 0.05 });
      s.addText(`${r.tech}%`, {
        x: 6.75, y: ry + 0.68, w: 5.5, h: 0.3, fontSize: 20, bold: true,
        color: isLast ? WHITE : MUTED, fontFace: 'Calibri', align: 'right',
      });
    });

    // Итоговый прирост
    s.addShape('rect', { x: 0.35, y: 6.45, w: 12.65, h: 0.35, fill: { color: '0A2540' }, rectRadius: 0.06 });
    s.addText('Прирост 2022→2024:', {
      x: 0.55, y: 6.47, w: 2.5, h: 0.28, fontSize: 9, color: MUTED, fontFace: 'Calibri',
    });
    s.addText('Общая активность +1,5 п.п.', {
      x: 3.2, y: 6.47, w: 3.5, h: 0.28, fontSize: 9, bold: true, color: CYAN, fontFace: 'Calibri',
    });
    s.addText('Технологические инновации +1,7 п.п.', {
      x: 6.8, y: 6.47, w: 5.5, h: 0.28, fontSize: 9, bold: true, color: TEAL, fontFace: 'Calibri',
    });

    addFooter(s, 4, TOTAL);
  }

  // ────────────────────────────────────────────────
  // СЛАЙД 5 — Акцентный: Цифровой приоритет / ИИ
  // ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    // Фон
    s.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: '081C36' } });
    s.addShape('rect', { x: 0, y: 0, w: 0.12, h: '100%', fill: { color: TEAL } });
    // Верхняя полоса
    s.addShape('rect', { x: 0.12, y: 0, w: '100%', h: 1.1, fill: { color: '0C2540' } });
    s.addShape('rect', { x: 0.12, y: 1.1, w: 13.21, h: 0.03, fill: { color: TEAL } });

    s.addText('Цифровой приоритет', {
      x: 0.35, y: 0.12, w: 9, h: 0.55, fontSize: 20, bold: true, color: WHITE, fontFace: 'Calibri',
    });
    s.addText('ПРИОРИТЕТНОЕ НАПРАВЛЕНИЕ · 2024', {
      x: 0.35, y: 0.67, w: 9, h: 0.35, fontSize: 10, color: TEAL, fontFace: 'Calibri', charSpacing: 2,
    });

    // Центральный блок с цифрой
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.5, h: 4.5, fill: { color: '0D2E50' }, line: { color: TEAL, width: 1 }, rectRadius: 0.12 });
    s.addShape('rect', { x: 0.35, y: 1.3, w: 5.5, h: 0.08, fill: { color: TEAL }, rectRadius: 0.08 });

    s.addText('256,1', {
      x: 0.4, y: 1.6, w: 5.3, h: 1.6,
      fontSize: 80, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center',
    });
    s.addText('млрд руб.', {
      x: 0.4, y: 3.15, w: 5.3, h: 0.5,
      fontSize: 20, bold: true, color: TEAL, fontFace: 'Calibri', align: 'center',
    });
    s.addText('Объём сектора · 2024', {
      x: 0.4, y: 3.65, w: 5.3, h: 0.35,
      fontSize: 10, color: MUTED, fontFace: 'Calibri', align: 'center',
    });

    // Теги направления
    const tags = ['BigData', 'ML', 'Искусственный интеллект', 'Цифровые производства'];
    tags.forEach((tag, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      s.addShape('rect', {
        x: 0.5 + col * 2.65, y: 4.25 + row * 0.55,
        w: 2.4, h: 0.38,
        fill: { color: '143D60' }, line: { color: TEAL, width: 0.5 }, rectRadius: 0.15,
      });
      s.addText(tag, {
        x: 0.5 + col * 2.65, y: 4.27 + row * 0.55, w: 2.4, h: 0.34,
        fontSize: 9, bold: true, color: TEAL, fontFace: 'Calibri', align: 'center',
      });
    });

    // Правый блок — описание
    s.addShape('rect', { x: 6.2, y: 1.3, w: 6.75, h: 4.5, fill: { color: CARD_BG }, line: { color: ACCENT, width: 0.5 }, rectRadius: 0.1 });

    s.addText('Передовые цифровые и интеллектуальные производственные технологии, обработка больших данных, машинное обучение и искусственный интеллект', {
      x: 6.4, y: 1.5, w: 6.35, h: 1.4,
      fontSize: 13, bold: true, color: WHITE, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2,
    });

    s.addShape('rect', { x: 6.4, y: 2.95, w: 6.2, h: 0.03, fill: { color: ACCENT } });

    const facts = [
      'Наиболее динамично растущий сегмент инновационной экономики России',
      'Включает разработку и внедрение технологий ИИ, промышленного ML и обработки больших массивов данных',
      'Является стратегическим приоритетом государственной научно-технической политики',
    ];
    facts.forEach((fact, i) => {
      s.addShape('ellipse', { x: 6.4, y: 3.1 + i * 0.95, w: 0.16, h: 0.16, fill: { color: TEAL } });
      s.addText(fact, {
        x: 6.65, y: 3.06 + i * 0.95, w: 5.9, h: 0.75,
        fontSize: 10, color: MUTED, fontFace: 'Calibri', wrap: true, lineSpacingMultiple: 1.2,
      });
    });

    s.addShape('rect', { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: '0A2035' } });
    s.addText('Источник: официальная статистика Российской Федерации', {
      x: 0.3, y: 7.12, w: 9, h: 0.3, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'left',
    });
    s.addText('5 / 5', { x: 9.3, y: 7.12, w: 0.6, h: 0.3, fontSize: 8, color: MUTED, fontFace: 'Calibri', align: 'right' });
  }

  await pptx.writeFile({ fileName: 'Цифровые-технологии-Россия-2024.pptx' });
}
