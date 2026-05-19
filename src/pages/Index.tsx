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
  { num: 1, title: 'Титульный',       desc: 'Обзор 2022–2024' },
  { num: 2, title: 'KPI-показатели',  desc: 'Ключевые цифры' },
  { num: 3, title: 'Динамика НИОКР',  desc: 'Расходы по годам' },
  { num: 4, title: 'Активность',      desc: 'Предприятия' },
  { num: 5, title: 'ИИ & BigData',    desc: '256,1 млрд руб.' },
];

// ── Цветовая палитра (осветлённая)
const C = {
  bg:       '#132840',   // основной фон — заметно светлее
  bgCard:   '#1C3A5A',   // карточки
  bgAlt:    '#1A3350',   // альтернативный
  border:   '#1E4A70',
  cyan:     '#00C9EE',
  teal:     '#00D9BE',
  white:    '#ffffff',
  muted:    '#8BBDD9',
  accent:   '#00C9EE',
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
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: C.bg, minHeight: '100vh', color: C.white }}>
      {/* Фоновый градиент */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(ellipse at 15% 5%, rgba(0,180,220,0.10) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(0,210,190,0.07) 0%, transparent 55%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '44px 36px' }}>

        {/* ── ШАПКА ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 44 }}>
          <div style={{ borderLeft: `4px solid ${C.cyan}`, paddingLeft: 20 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,200,230,0.12)',
              border: `1px solid rgba(0,200,230,0.28)`,
              borderRadius: 6, padding: '3px 11px', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', color: C.cyan, textTransform: 'uppercase' as const, marginBottom: 8,
            }}>
              Аналитический обзор · 2022–2024
            </div>
            <h1 style={{ fontSize: 'clamp(20px,3vw,34px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
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
                ? 'linear-gradient(135deg,#00A896,#00D9BE)'
                : 'linear-gradient(135deg,#0077A8,#00C9EE)',
              border: 'none', borderRadius: 10, padding: '12px 22px',
              color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 4px 20px rgba(0,200,230,0.25)',
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

        {/* ── КАРТОЧКИ СЛАЙДОВ (предпросмотр) ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
            Структура презентации · 5 слайдов
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {slides.map(sl => (
              <div key={sl.num} style={{
                flex: 1, background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: '14px 14px 12px',
                borderTop: `3px solid ${sl.num % 2 === 0 ? C.cyan : C.teal}`,
              }}>
                <div style={{ fontSize: 10, color: sl.num % 2 === 0 ? C.cyan : C.teal, fontWeight: 700, marginBottom: 4 }}>
                  Слайд {sl.num}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 2 }}>{sl.title}</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>{sl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KPI-КАРТОЧКИ ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14, marginBottom: 28 }}>
          {kpiData.map((kpi, i) => (
            <div key={i} style={{
              background: `linear-gradient(145deg, ${C.bgCard}, ${C.bgAlt})`,
              border: `1px solid ${C.border}`, borderRadius: 12, padding: '22px 18px',
              position: 'relative' as const, overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute' as const, top: 0, left: 0, right: 0, height: 3,
                background: i % 2 === 0
                  ? `linear-gradient(90deg,${C.cyan},#0099BB)`
                  : `linear-gradient(90deg,${C.teal},#009A8A)`,
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ background: 'rgba(0,200,230,0.13)', borderRadius: 8, padding: 7 }}>
                  <Icon name={kpi.icon} fallback="TrendingUp" size={17} style={{ color: C.cyan }} />
                </div>
                <span style={{
                  background: kpi.growth === '→' ? 'rgba(255,255,255,0.07)' : 'rgba(0,220,190,0.14)',
                  border: `1px solid ${kpi.growth === '→' ? 'rgba(255,255,255,0.1)' : 'rgba(0,220,190,0.28)'}`,
                  borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700,
                  color: kpi.growth === '→' ? C.muted : C.teal,
                }}>
                  {kpi.growth}
                </span>
              </div>
              <div style={{ fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
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
          <div style={{ background: `linear-gradient(145deg,${C.bgCard},${C.bgAlt})`, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
            <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Динамика расходов</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>НИОКР и инновационная деятельность</div>

            {niokrData.map((row, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', marginBottom: 5 }}>{row.year}</div>
                <div style={{ marginBottom: 5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 9, color: C.muted }}>Инновации</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.cyan }}>{row.innov.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 7 }}>
                    <div style={{ height: '100%', width: `${(row.innov / 4524.1) * 100}%`, background: `linear-gradient(90deg,#0077B6,${C.cyan})`, borderRadius: 4 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 9, color: C.muted }}>НИОКР</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.teal }}>{row.niokr.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 7 }}>
                    <div style={{ height: '100%', width: `${(row.niokr / 1884.9) * 100}%`, background: `linear-gradient(90deg,#00A896,${C.teal})`, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Инновационная активность */}
          <div style={{ background: `linear-gradient(145deg,${C.bgCard},${C.bgAlt})`, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
            <div style={{ fontSize: 10, color: C.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Сравнительный блок</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Инновационная активность предприятий</div>

            {innovationActivity.map((row, i) => {
              const isLast = i === 2;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: isLast ? C.cyan : C.muted, textAlign: 'center' as const }}>{row.year}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: C.muted }}>Общая</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: isLast ? C.white : C.muted }}>{row.overall}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 9 }}>
                      <div style={{ height: '100%', width: `${(row.overall / 15) * 100}%`, background: isLast ? `linear-gradient(90deg,#0077B6,${C.cyan})` : 'rgba(0,120,180,0.4)', borderRadius: 4 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: C.muted }}>Технол.</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: isLast ? C.white : C.muted }}>{row.tech}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 9 }}>
                      <div style={{ height: '100%', width: `${(row.tech / 30) * 100}%`, background: isLast ? `linear-gradient(90deg,#00A896,${C.teal})` : 'rgba(0,160,140,0.35)', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{
              marginTop: 10, padding: '10px 14px',
              background: 'rgba(0,200,230,0.07)', border: `1px solid rgba(0,200,230,0.2)`, borderRadius: 8,
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

        {/* ── АКЦЕНТНЫЙ БЛОК ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,70,120,0.75) 0%, rgba(0,110,150,0.55) 50%, rgba(0,180,160,0.25) 100%)',
          border: `1px solid rgba(0,200,230,0.32)`, borderRadius: 12, padding: '26px 30px',
          position: 'relative' as const, overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute' as const, right: -30, top: -30, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,200,230,0.14) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' as const }} />
          <div style={{ position: 'relative' as const, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center' }}>
            <div style={{ background: 'rgba(0,200,230,0.14)', border: `1px solid rgba(0,200,230,0.38)`, borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 7 }}>
              <Icon name="Cpu" size={30} style={{ color: C.cyan }} />
              <span style={{ fontSize: 8, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textAlign: 'center' as const, lineHeight: 1.3 }}>
                Цифровой<br/>приоритет
              </span>
            </div>
            <div>
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
                Приоритетное направление · 2024
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, marginBottom: 7 }}>
                Передовые цифровые и интеллектуальные производственные технологии,<br/>обработка больших данных, машинное обучение и ИИ
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Наиболее динамично развивающийся сегмент инновационной экономики России.
              </div>
            </div>
            <div style={{ textAlign: 'right' as const, minWidth: 150 }}>
              <div style={{ fontSize: 'clamp(30px,3.8vw,46px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>256,1</div>
              <div style={{ fontSize: 14, color: C.cyan, fontWeight: 700, marginTop: 4 }}>млрд руб.</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Объём сектора · 2024</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 9, background: 'rgba(0,220,190,0.14)', border: `1px solid rgba(0,220,190,0.32)`, borderRadius: 20, padding: '3px 11px' }}>
                <Icon name="Sparkles" size={11} style={{ color: C.teal }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.teal }}>AI & BigData</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ФУТЕР ── */}
        <div style={{ marginTop: 28, paddingTop: 14, borderTop: `1px solid rgba(255,255,255,0.08)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.05em' }}>
            Источник: официальная статистика Российской Федерации
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,200,230,0.45)' }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', fontFamily: "'IBM Plex Sans', sans-serif" }}>2022 · 2023 · 2024</span>
          </div>
        </div>

      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
