import Icon from '@/components/ui/icon';

const kpiData = [
  {
    value: '9 817,7',
    unit: 'млрд руб.',
    label: 'Инновационные товары, работы и услуги',
    growth: '+18%',
    year: '2024',
    icon: 'TrendingUp',
  },
  {
    value: '4 524,1',
    unit: 'млрд руб.',
    label: 'Расходы на инновационную деятельность',
    growth: '+29%',
    year: '2024',
    icon: 'BarChart3',
  },
  {
    value: '1 884,9',
    unit: 'млрд руб.',
    label: 'Внутренние затраты на НИОКР',
    growth: '+14%',
    year: '2024',
    icon: 'FlaskConical',
  },
  {
    value: '1,0%',
    unit: 'от ВВП',
    label: 'Доля НИОКР в ВВП',
    growth: '→',
    year: '2024',
    icon: 'PieChart',
  },
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

const maxInnov = 4524.1;
const maxNiokr = 1884.9;

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: '#0A1628',
        minHeight: '100vh',
        color: '#ffffff',
        padding: '0',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 20% 10%, rgba(0,120,180,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,180,160,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '48px 40px' }}>

        {/* ШАПКА */}
        <div style={{ borderLeft: '4px solid #00B4D8', paddingLeft: 24, marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              background: 'linear-gradient(135deg, #003566, #005f99)',
              border: '1px solid rgba(0,180,216,0.3)',
              borderRadius: 6,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#00B4D8',
              textTransform: 'uppercase' as const,
            }}>
              Аналитический обзор · 2022–2024
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '8px 0 4px',
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}>
            Развитие цифровых технологий в России
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 400, margin: 0, fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Ключевые показатели инновационной и научно-технической деятельности
          </p>
        </div>

        {/* KPI-КАРТОЧКИ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {kpiData.map((kpi, i) => (
            <div key={i} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(0,180,216,0.18)',
              borderRadius: 12,
              padding: '24px 20px',
              position: 'relative' as const,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute' as const,
                top: 0, left: 0, right: 0,
                height: 3,
                background: i === 0
                  ? 'linear-gradient(90deg, #00B4D8, #0077B6)'
                  : i === 1
                  ? 'linear-gradient(90deg, #0077B6, #00B4D8)'
                  : i === 2
                  ? 'linear-gradient(90deg, #00CFB4, #0077B6)'
                  : 'linear-gradient(90deg, #48CAE4, #00CFB4)',
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{
                  background: 'rgba(0,180,216,0.12)',
                  borderRadius: 8,
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name={kpi.icon} fallback="TrendingUp" size={18} style={{ color: '#00B4D8' }} />
                </div>
                <div style={{
                  background: kpi.growth === '→' ? 'rgba(255,255,255,0.08)' : 'rgba(0,207,180,0.15)',
                  border: kpi.growth === '→' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,207,180,0.3)',
                  borderRadius: 20,
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: kpi.growth === '→' ? 'rgba(255,255,255,0.5)' : '#00CFB4',
                }}>
                  {kpi.growth}
                </div>
              </div>
              <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 900, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: 12, color: '#00B4D8', fontWeight: 600, marginTop: 2, marginBottom: 8 }}>
                {kpi.unit}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 8, fontWeight: 600, letterSpacing: '0.06em' }}>
                {kpi.year}
              </div>
            </div>
          ))}
        </div>

        {/* НИЖНЯЯ СЕКЦИЯ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* График НИОКР */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(0,180,216,0.15)',
            borderRadius: 12,
            padding: '24px',
          }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: '#00B4D8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
                Динамика расходов
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>
                НИОКР и инновационная деятельность
              </div>
            </div>

            {niokrData.map((row, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{row.year}</span>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>Инновации</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#00B4D8' }}>{row.innov.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(row.innov / maxInnov) * 100}%`,
                      background: 'linear-gradient(90deg, #0077B6, #00B4D8)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>НИОКР</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#00CFB4' }}>{row.niokr.toLocaleString('ru')} млрд ₽</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(row.niokr / maxNiokr) * 100}%`,
                      background: 'linear-gradient(90deg, #00A896, #00CFB4)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 4, background: 'linear-gradient(90deg, #0077B6, #00B4D8)', borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>Инновации</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 4, background: 'linear-gradient(90deg, #00A896, #00CFB4)', borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>НИОКР</span>
              </div>
            </div>
          </div>

          {/* Инновационная активность */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(0,180,216,0.15)',
            borderRadius: 12,
            padding: '24px',
          }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: '#00B4D8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
                Сравнительный блок
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>
                Инновационная активность предприятий
              </div>
            </div>

            {innovationActivity.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 1fr',
                gap: 12,
                marginBottom: 16,
                alignItems: 'center',
              }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: i === 2 ? '#00B4D8' : 'rgba(255,255,255,0.5)',
                  textAlign: 'center' as const,
                }}>
                  {row.year}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: "'IBM Plex Sans', sans-serif" }}>Общая</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: i === 2 ? '#ffffff' : 'rgba(255,255,255,0.6)' }}>{row.overall}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(row.overall / 15) * 100}%`,
                      background: i === 2 ? 'linear-gradient(90deg, #0077B6, #00B4D8)' : 'rgba(0,119,182,0.4)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: "'IBM Plex Sans', sans-serif" }}>Технол.</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: i === 2 ? '#ffffff' : 'rgba(255,255,255,0.6)' }}>{row.tech}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(row.tech / 30) * 100}%`,
                      background: i === 2 ? 'linear-gradient(90deg, #00A896, #00CFB4)' : 'rgba(0,168,150,0.35)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              background: 'rgba(0,180,216,0.07)',
              border: '1px solid rgba(0,180,216,0.2)',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Рост 2022→2024
              </span>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#00B4D8' }}>+1,5 п.п.</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: "'IBM Plex Sans', sans-serif" }}>общая</div>
                </div>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#00CFB4' }}>+1,7 п.п.</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: "'IBM Plex Sans', sans-serif" }}>технол.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* АКЦЕНТНЫЙ БЛОК */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,55,102,0.8) 0%, rgba(0,90,140,0.6) 50%, rgba(0,160,150,0.3) 100%)',
          border: '1px solid rgba(0,180,216,0.35)',
          borderRadius: 12,
          padding: '28px 32px',
          position: 'relative' as const,
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute' as const,
            right: -40, top: -40,
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none' as const,
          }} />

          <div style={{ position: 'relative' as const, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center' }}>
            <div style={{
              background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.4)',
              borderRadius: 16,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: 8,
            }}>
              <Icon name="Cpu" size={32} style={{ color: '#00B4D8' }} />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, textAlign: 'center' as const, lineHeight: 1.3 }}>
                Цифровой<br/>приоритет
              </span>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#00CFB4', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
                Приоритетное направление · 2024
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#ffffff', lineHeight: 1.3, marginBottom: 8 }}>
                Передовые цифровые и интеллектуальные производственные технологии,<br />
                обработка больших данных, машинное обучение и ИИ
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1.5 }}>
                Наиболее динамично развивающийся сегмент инновационной экономики России.
                Включает BigData, ML, AI и смежные технологии.
              </div>
            </div>

            <div style={{ textAlign: 'right' as const, minWidth: 160 }}>
              <div style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                256,1
              </div>
              <div style={{ fontSize: 15, color: '#00B4D8', fontWeight: 700, marginTop: 4 }}>млрд руб.</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Объём сектора · 2024
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 10,
                background: 'rgba(0,207,180,0.15)',
                border: '1px solid rgba(0,207,180,0.35)',
                borderRadius: 20,
                padding: '4px 12px',
              }}>
                <Icon name="Sparkles" size={12} style={{ color: '#00CFB4' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#00CFB4' }}>AI & BigData</span>
              </div>
            </div>
          </div>
        </div>

        {/* ФУТЕР */}
        <div style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.06em' }}>
            Источник: официальная статистика Российской Федерации
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,180,216,0.5)' }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.06em' }}>
              2022 · 2023 · 2024
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}