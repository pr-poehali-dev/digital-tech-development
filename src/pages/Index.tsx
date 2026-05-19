import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { generatePresentation } from '@/lib/generatePresentation';

const kpiData = [
  { value: '9 817,7', unit: 'млрд руб.', label: 'Инновационные товары, работы и услуги', growth: '+18%', icon: 'TrendingUp' },
  { value: '4 524,1', unit: 'млрд руб.', label: 'Расходы на инновационную деятельность',  growth: '+29%', icon: 'BarChart3' },
  { value: '1 884,9', unit: 'млрд руб.', label: 'Внутренние затраты на НИОКР',             growth: '+14%', icon: 'FlaskConical' },
  { value: '1,0%',   unit: 'от ВВП',    label: 'Доля НИОКР в валовом внутреннем продукте',growth: '→',   icon: 'PieChart' },
];

const innovationActivity = [
  { year: '2022', overall: 11.0, tech: 22.8 },
  { year: '2023', overall: 11.3, tech: 22.7 },
  { year: '2024', overall: 12.5, tech: 24.5 },
];

const niokrData = [
  { year: '2022', niokr: 1435.9, innov: 2662.6 },
  { year: '2023', niokr: 1649.8, innov: 3519.5 },
  { year: '2024', niokr: 1884.9, innov: 4524.1 },
];

const slides = [
  { num: 1,  title: 'Титульный',      desc: 'Обзор 2022–2024' },
  { num: 2,  title: 'KPI-показатели', desc: 'Ключевые цифры' },
  { num: 3,  title: 'Динамика НИОКР', desc: 'Расходы по годам' },
  { num: 4,  title: 'Активность',     desc: 'Предприятия' },
  { num: 5,  title: 'Приоритеты',     desc: 'Сравнение направлений' },
  { num: 6,  title: 'ИИ & BigData',   desc: '256,1 млрд руб.' },
  { num: 7,  title: 'Прогноз ИИ/IoT', desc: 'до 2030 года' },
  { num: 8,  title: 'Применение',     desc: '3 сценария' },
  { num: 9,  title: 'Источники',      desc: 'Методика' },
];

const forecastData = [
  { year: '2025', value: 170.3 },
  { year: '2026', value: 247 },
  { year: '2027', value: 358 },
  { year: '2030', value: 1000 },
];

const companiesData = [
  {
    name: 'Яндекс',
    icon: 'Cpu',
    color: '#0077A8',
    desc: 'Платформы для умных устройств, голосовые ассистенты, решения для промышленности и транспорта.',
  },
  {
    name: 'Сбер',
    icon: 'Database',
    color: '#007A6E',
    desc: 'Экосистема SberDevices, платформы для анализа данных и автоматизации.',
  },
  {
    name: 'Касперский',
    icon: 'Shield',
    color: '#5A6E82',
    desc: 'Решения по кибербезопасности для IoT и промышленных систем.',
  },
];

const scenariosData = [
  {
    icon: 'Briefcase',
    title: 'Для бизнеса',
    color: '#0077A8',
    text: 'Использовать тренды роста НИОКР и инноваций для приоритизации инвестиций в цифровизацию, автоматизацию и внедрение ИИ-решений. Помогает выбирать направления, где рынок уже растёт.',
  },
  {
    icon: 'TrendingUp',
    title: 'Для стратегии и инвестиций',
    color: '#007A6E',
    text: 'Опираясь на прогноз рынка ИИ и IoT до 2030 года, оценивать долгосрочные точки роста, планировать бюджет и выбирать отрасли с наибольшим потенциалом — телеком, e-commerce, промышленность.',
  },
  {
    icon: 'FileText',
    title: 'Для презентации или отчёта',
    color: '#5A6E82',
    text: 'Использовать ключевые цифры и графики как основу для слайда руководителю, публичного доклада или аналитической записки: рост затрат, цифровой приоритет, лидеры отраслей, прогноз.',
  },
];

const sourcesBullets = [
  'Источник данных — Росстат.',
  'Для анализа и подготовки текста использовались Perplexity, ГигаЧат, poehali и другие LLM-сервисы.',
  'Часть платформ имеет ограничения по объёму контекста, из-за чего большие наборы данных приходится делить на части.',
  'Некоторые сервисы не отдают готовый файл презентации напрямую и используют промежуточные форматы, например base64.',
  'Визуализация данных в ИИ-сервисах требует проверки: подписи, оси и текст на графиках могут быть неточными.',
];

const SOURCE = 'Российский статистический ежегодник. 2025';

const prioritiesData = [
  { label: 'Цифровые, ИИ, BigData, ML', value: 256.1, highlight: true },
  { label: 'Транспорт и телеком-системы', value: 102.2, highlight: false },
  { label: 'Персонализированная медицина', value: 80.9, highlight: false },
  { label: 'Экологичная энергетика', value: 69.5, highlight: false },
];

// ── Светлая палитра
const C = {
  bg:        '#EEF4FA',  // страница — очень светлый голубой
  bgCard:    '#FFFFFF',  // карточки — белые
  bgAlt:     '#E0ECF7',  // чуть темнее белого для градиентов
  bgSection: '#F5F9FD',  // секции
  border:    '#C2D8EC',
  borderDark:'#A0BDD4',
  cyan:      '#0077A8',  // акцентный синий
  teal:      '#007A6E',  // акцентный бирюзовый
  text:      '#0F2438',  // основной текст
  muted:     '#4A6B82',  // второстепенный текст
  barTrack:  '#D4E6F4',  // фон прогресс-баров
  badge:     '#E6F5FA',  // фон бейджей
  badgeTeal: '#E0F5F2',
};

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  async function handleDownload() {
    setLoading(true);
    setDone(false);
    try {
      await generatePresentation();
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      {/* Лёгкий декоративный градиент */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, rgba(0,150,200,0.07) 0%, transparent 50%), radial-gradient(ellipse at 90% 100%, rgba(0,160,140,0.05) 0%, transparent 50%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '44px 36px' }}>

        {/* ── ШАПКА ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div style={{ borderLeft: `4px solid ${C.cyan}`, paddingLeft: 20 }}>
            <div style={{
              display: 'inline-block',
              background: C.badge,
              border: `1px solid ${C.border}`,
              borderRadius: 6, padding: '3px 11px', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', color: C.cyan, textTransform: 'uppercase' as const, marginBottom: 8,
            }}>
              Аналитический обзор · 2022–2024
            </div>
            <h1 style={{ fontSize: 'clamp(20px,3vw,34px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 5px', letterSpacing: '-0.02em', color: C.text }}>
              Развитие цифровых технологий в России
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: "'IBM Plex Sans', sans-serif" }}>
              Ключевые показатели инновационной и научно-технической деятельности
            </p>
          </div>

          {/* Кнопка скачивания */}
          <button
            onClick={handleDownload}
            disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              background: done
                ? 'linear-gradient(135deg,#007A6E,#009F8F)'
                : `linear-gradient(135deg,${C.cyan},#009DC8)`,
              border: 'none', borderRadius: 10, padding: '12px 22px',
              color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 4px 18px rgba(0,119,168,0.28)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget.style.transform = 'scale(1.03)'); }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Icon name={done ? 'CheckCircle' : loading ? 'Loader' : 'Download'} size={17}
              style={{ color: '#fff', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {done ? 'Готово!' : loading ? 'Генерация…' : 'Скачать PPTX'}
          </button>
        </div>

        {/* ── КАРТОЧКИ СЛАЙДОВ ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
            Структура презентации · 9 слайдов
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {slides.map(sl => (
              <div key={sl.num} style={{
                flex: 1, background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderTop: `3px solid ${sl.num % 2 === 0 ? C.cyan : C.teal}`,
                borderRadius: 10, padding: '14px 14px 12px',
                boxShadow: '0 1px 4px rgba(0,80,140,0.06)',
              }}>
                <div style={{ fontSize: 10, color: sl.num % 2 === 0 ? C.cyan : C.teal, fontWeight: 700, marginBottom: 4 }}>
                  Слайд {sl.num}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 2 }}>{sl.title}</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>{sl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KPI-КАРТОЧКИ ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14, marginBottom: 24 }}>
          {kpiData.map((kpi, i) => (
            <div key={i} style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '22px 18px',
              position: 'relative' as const, overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,80,140,0.07)',
            }}>
              <div style={{
                position: 'absolute' as const, top: 0, left: 0, right: 0, height: 3,
                background: i % 2 === 0
                  ? `linear-gradient(90deg,${C.cyan},#009DC8)`
                  : `linear-gradient(90deg,${C.teal},#009F8F)`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8, padding: 7 }}>
                  <Icon name={kpi.icon} fallback="TrendingUp" size={17} style={{ color: C.cyan }} />
                </div>
                <span style={{
                  background: kpi.growth === '→' ? C.bgAlt : C.badgeTeal,
                  border: `1px solid ${kpi.growth === '→' ? C.border : '#B2DDD8'}`,
                  borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700,
                  color: kpi.growth === '→' ? C.muted : C.teal,
                }}>
                  {kpi.growth}
                </span>
              </div>
              <div style={{ fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: C.text }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: 11, color: C.cyan, fontWeight: 600, marginTop: 2, marginBottom: 7 }}>{kpi.unit}</div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4, fontFamily: "'IBM Plex Sans', sans-serif" }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* ── НИЖНЯЯ СЕКЦИЯ ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>

          {/* График НИОКР */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
            <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Динамика расходов</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 18 }}>НИОКР и инновационная деятельность</div>

            {niokrData.map((row, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: i === 2 ? C.cyan : C.muted, marginBottom: 5 }}>{row.year}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: C.muted }}>Инновации</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.cyan }}>{row.innov.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: C.barTrack, borderRadius: 4, height: 8 }}>
                    <div style={{ height: '100%', width: `${(row.innov / 4524.1) * 100}%`, background: `linear-gradient(90deg,${C.cyan},#009DC8)`, borderRadius: 4 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: C.muted }}>НИОКР</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.teal }}>{row.niokr.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: C.barTrack, borderRadius: 4, height: 8 }}>
                    <div style={{ height: '100%', width: `${(row.niokr / 1884.9) * 100}%`, background: `linear-gradient(90deg,${C.teal},#009F8F)`, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 18, height: 4, background: `linear-gradient(90deg,${C.cyan},#009DC8)`, borderRadius: 2 }} />
                <span style={{ fontSize: 9, color: C.muted }}>Инновации</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 18, height: 4, background: `linear-gradient(90deg,${C.teal},#009F8F)`, borderRadius: 2 }} />
                <span style={{ fontSize: 9, color: C.muted }}>НИОКР</span>
              </div>
            </div>
          </div>

          {/* Инновационная активность */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
            <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Сравнительный блок</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 18 }}>Инновационная активность предприятий</div>

            {innovationActivity.map((row, i) => {
              const isLast = i === 2;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: isLast ? C.cyan : C.muted, textAlign: 'center' as const }}>{row.year}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: C.muted }}>Общая</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: isLast ? C.text : C.muted }}>{row.overall}%</span>
                    </div>
                    <div style={{ background: C.barTrack, borderRadius: 4, height: 9 }}>
                      <div style={{ height: '100%', width: `${(row.overall / 15) * 100}%`, background: isLast ? `linear-gradient(90deg,${C.cyan},#009DC8)` : '#B8D4E8', borderRadius: 4 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: C.muted }}>Технол.</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: isLast ? C.text : C.muted }}>{row.tech}%</span>
                    </div>
                    <div style={{ background: C.barTrack, borderRadius: 4, height: 9 }}>
                      <div style={{ height: '100%', width: `${(row.tech / 30) * 100}%`, background: isLast ? `linear-gradient(90deg,${C.teal},#009F8F)` : '#B2D8D4', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{
              marginTop: 10, padding: '10px 14px',
              background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 10, color: C.muted }}>Рост 2022→2024</span>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.cyan }}>+1,5 п.п.</div>
                  <div style={{ fontSize: 8, color: C.muted }}>общая</div>
                </div>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.teal }}>+1,7 п.п.</div>
                  <div style={{ fontSize: 8, color: C.muted }}>технол.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ДИАГРАММА ПРИОРИТЕТОВ ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 26px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
                Технологические приоритеты · 2024
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                Цифровые технологии — главный приоритет
              </div>
            </div>
            <div style={{ background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 14px', fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>
              млрд руб.
            </div>
          </div>

          {/* Столбчатая диаграмма */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 200, marginBottom: 16 }}>
            {prioritiesData.map((item, i) => {
              const maxVal = 256.1;
              const barH = Math.round((item.value / maxVal) * 180);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: item.highlight ? C.text : C.muted }}>
                    {item.value}
                  </div>
                  <div style={{
                    width: '100%', height: barH,
                    background: item.highlight
                      ? `linear-gradient(180deg, ${C.cyan} 0%, #009DC8 100%)`
                      : C.barTrack,
                    borderRadius: '6px 6px 0 0',
                    border: item.highlight ? 'none' : `1px solid ${C.border}`,
                    position: 'relative' as const,
                    boxShadow: item.highlight ? '0 4px 16px rgba(0,119,168,0.25)' : 'none',
                    transition: 'opacity 0.2s',
                  }}>
                    {item.highlight && (
                      <div style={{
                        position: 'absolute' as const, top: 6, left: 0, right: 0,
                        textAlign: 'center' as const, fontSize: 9, fontWeight: 700, color: '#fff',
                        letterSpacing: '0.08em',
                      }}>
                        №1
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Подписи под столбцами */}
          <div style={{ display: 'flex', gap: 18 }}>
            {prioritiesData.map((item, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' as const }}>
                <div style={{ fontSize: 9, color: item.highlight ? C.cyan : C.muted, fontWeight: item.highlight ? 700 : 400, lineHeight: 1.3, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Вывод */}
          <div style={{ marginTop: 18, padding: '10px 16px', background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1.5 }}>
            Цифровое направление опережает ближайшего конкурента (транспорт и телеком) в <span style={{ fontWeight: 700, color: C.cyan }}>2,5 раза</span> и заметно опережает большинство остальных приоритетов.
          </div>
        </div>

        {/* ── АКЦЕНТНЫЙ БЛОК ── */}
        <div style={{
          background: `linear-gradient(135deg, ${C.badge} 0%, #D8EEF8 50%, #D4F0EC 100%)`,
          border: `1px solid ${C.borderDark}`,
          borderLeft: `4px solid ${C.cyan}`,
          borderRadius: 12, padding: '26px 30px',
          position: 'relative' as const, overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,80,140,0.09)',
        }}>
          <div style={{ position: 'relative' as const, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center' }}>
            <div style={{
              background: C.badge, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 7,
            }}>
              <Icon name="Cpu" size={30} style={{ color: C.cyan }} />
              <span style={{ fontSize: 8, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textAlign: 'center' as const, lineHeight: 1.3 }}>
                Цифровой<br/>приоритет
              </span>
            </div>
            <div>
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
                Приоритетное направление · 2024
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text, lineHeight: 1.3, marginBottom: 7 }}>
                Передовые цифровые и интеллектуальные производственные технологии,<br/>обработка больших данных, машинное обучение и ИИ
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Наиболее динамично развивающийся сегмент инновационной экономики России.
              </div>
            </div>
            <div style={{ textAlign: 'right' as const, minWidth: 150 }}>
              <div style={{ fontSize: 'clamp(30px,3.8vw,46px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: C.text }}>256,1</div>
              <div style={{ fontSize: 14, color: C.cyan, fontWeight: 700, marginTop: 4 }}>млрд руб.</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Объём сектора · 2024</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 9, background: C.badgeTeal, border: `1px solid #B2DDD8`, borderRadius: 20, padding: '3px 11px' }}>
                <Icon name="Sparkles" size={11} style={{ color: C.teal }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.teal }}>AI & BigData</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ПРОГНОЗ ИИ/IoT ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 26px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Прогноз · 2025–2030</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Рынок ИИ и IoT в России: прогноз роста до 2030 года</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 3, fontFamily: "'IBM Plex Sans', sans-serif" }}>Среднегодовой рост ~45% в 2025–2027 гг.</div>
            </div>
            <div style={{ background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 14px', fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>млрд руб.</div>
          </div>

          {/* Линейный график — точки и соединительные линии через SVG */}
          {(() => {
            const maxV = 1000;
            const h = 160;
            const w = 100;
            const pts = forecastData.map((d, i) => ({
              x: (i / (forecastData.length - 1)) * w,
              y: h - (d.value / maxV) * h,
              ...d,
            }));
            const polyline = pts.map(p => `${p.x}%,${p.y}px`).join(' ');
            return (
              <div style={{ position: 'relative' as const, height: h + 60, marginBottom: 16 }}>
                <svg style={{ position: 'absolute' as const, top: 0, left: 0, width: '100%', height: h }} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0077A8" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0077A8" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  {/* Заливка под линией */}
                  <polygon
                    points={`0,${h} ${pts.map(p => `${p.x},${p.y}`).join(' ')} 100,${h}`}
                    fill="url(#lineGrad)"
                  />
                  {/* Линия */}
                  <polyline
                    points={pts.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#0077A8"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                  {/* Точки */}
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="1.8" fill={i === pts.length - 1 ? '#007A6E' : '#0077A8'} />
                  ))}
                </svg>
                {/* Подписи значений */}
                {pts.map((p, i) => (
                  <div key={i} style={{
                    position: 'absolute' as const,
                    left: `calc(${p.x}% - 28px)`,
                    top: p.y - 28,
                    width: 56, textAlign: 'center' as const,
                    fontSize: i === pts.length - 1 ? 12 : 10,
                    fontWeight: i === pts.length - 1 ? 800 : 600,
                    color: i === pts.length - 1 ? C.teal : C.text,
                  }}>
                    {i === pts.length - 1 ? '>1 000' : p.value}
                  </div>
                ))}
                {/* Подписи годов */}
                {pts.map((p, i) => (
                  <div key={i} style={{
                    position: 'absolute' as const,
                    left: `calc(${p.x}% - 20px)`,
                    top: h + 10, width: 40,
                    textAlign: 'center' as const,
                    fontSize: 10, fontWeight: 700,
                    color: i === pts.length - 1 ? C.teal : C.muted,
                  }}>
                    {p.year}
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Карточки компаний */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 14 }}>
            {companiesData.map((c, i) => (
              <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', borderTop: `3px solid ${c.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ background: C.badge, border: `1px solid ${C.border}`, borderRadius: 7, padding: 6 }}>
                    <Icon name={c.icon} fallback="Star" size={15} style={{ color: c.color }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5, fontFamily: "'IBM Plex Sans', sans-serif" }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Вывод */}
          <div style={{ padding: '12px 16px', background: C.badge, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1.6 }}>
            Рынок ИИ и IoT в России демонстрирует устойчивый рост: к 2030 году внутренние затраты на цифровизацию и внедрение новых технологий могут превысить <span style={{ fontWeight: 700, color: C.cyan }}>триллионы рублей</span>. Основные направления — автоматизация бизнес-процессов, развитие e-commerce, телекома и промышленности.
          </div>
        </div>

        {/* ── ПРИМЕНЕНИЕ ДАННЫХ ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 26px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
          <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Практическое применение</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Как использовать данные на практике</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", marginBottom: 18 }}>3 сценария применения анализа НИОКР, инноваций и прогноза ИИ/IoT</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {scenariosData.map((s, i) => (
              <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 16px', borderTop: `3px solid ${s.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ background: C.badge, border: `1px solid ${C.border}`, borderRadius: 7, padding: 6 }}>
                    <Icon name={s.icon} fallback="Star" size={16} style={{ color: s.color }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55, fontFamily: "'IBM Plex Sans', sans-serif" }}>{s.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 16px', background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1.5 }}>
            Анализ показывает не только текущее состояние цифрового развития, но и помогает принимать решения о том, куда направлять ресурсы, какие технологии внедрять и какие рынки считать приоритетными.
          </div>
        </div>

        {/* ── ИСТОЧНИКИ И ОГРАНИЧЕНИЯ ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 26px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,80,140,0.07)' }}>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Методология</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Источники и ограничения методики</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", marginBottom: 18 }}>Как формировались результаты исследования</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {sourcesBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.border, marginTop: 5, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, fontFamily: "'IBM Plex Sans', sans-serif" }}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ФУТЕР ── */}
        <div style={{ marginTop: 26, paddingTop: 14, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.04em' }}>
            Источник: {SOURCE}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.border }} />
            <span style={{ fontSize: 10, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>2022 · 2023 · 2024</span>
          </div>
        </div>

      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}