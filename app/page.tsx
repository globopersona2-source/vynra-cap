'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── DESIGN TOKENS ─────────────────────────────────────────
const T = {
  white:     '#FFFFFF',
  offWhite:  '#F8F8F6',
  gray50:    '#F4F4F1',
  gray100:   '#EAEAE6',
  gray200:   '#D2D2CC',
  gray300:   '#ABABAB',
  gray400:   '#7A7A74',
  gray500:   '#565650',
  gray600:   '#3E3E3A',
  ink:       '#14141A',
  black:     '#0A0A0C',
  blue:      '#1A56DB',
  blueDark:  '#1440B0',
  blueMid:   '#2E68E6',
  blueLight: '#EBF2FF',
  bluePale:  '#F0F5FF',
  border:    '#E2E2DC',
  borderD:   '#C4C4BC',
  numColor:  '#8A8A84',   // darker decorative numbers — clearly visible
}

// ─── SCROLL PROGRESS ───────────────────────────────────────
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fn = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (ref.current) ref.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[70]" style={{ height: '3px', backgroundColor: T.gray100 }}>
      <div ref={ref} style={{ height: '100%', backgroundColor: T.blue, width: '0%', transition: 'none' }} />
    </div>
  )
}

// ─── NAV DOTS ──────────────────────────────────────────────
const SECS = ['hero', 'positioning', 'pillars', 'solutions', 'who', 'process', 'about', 'cta']
function NavDots() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = SECS.indexOf(e.target.id)
          if (i !== -1) setActive(i)
        }
      })
    }, { threshold: 0.4 })
    SECS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-[14px]">
      {SECS.map((id, i) => (
        <button key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={id}
          style={{
            height: '6px',
            width: active === i ? '22px' : '6px',
            borderRadius: '3px',
            backgroundColor: active === i ? T.blue : T.gray200,
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
      ))}
    </div>
  )
}

// ─── COUNTER ──────────────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const t0 = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          if (el) el.textContent = prefix + Math.round(ease * to) + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, suffix, prefix])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─── SECTION LABEL ─────────────────────────────────────────
function SLabel({ tag, num }: { tag: string; num: string }) {
  return (
    <div style={{ borderBottom: `1px solid ${T.border}`, padding: '22px 0' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 56px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div className="ld" style={{ width: '44px', height: '2.5px', backgroundColor: T.blue, flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.44em', color: T.gray400, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{tag}</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: T.border }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: T.gray400, letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>{num}</span>
      </div>
    </div>
  )
}

// ─── DATA ──────────────────────────────────────────────────
const PILLARS = [
  { num: '01', tag: 'EXPERTISE', title: 'Experience That Reduces Risk',  body: 'Two decades of hands-on transaction structuring across commercial, hard money, and MCA financing across diverse market cycles.' },
  { num: '02', tag: 'ACCESS',    title: 'Deep Capital Access',           body: 'Direct relationships across banks, non-bank lenders, hedge funds, insurance funds, private, and institutional capital providers.' },
  { num: '03', tag: 'STRATEGY',  title: 'Strategic Structuring',         body: 'Every transaction is evaluated not only for approval, but for how it impacts refinancing options, future leverage, and long-term positioning.' },
  { num: '04', tag: 'EXECUTION', title: 'Speed with Discipline',         body: 'We move decisively when time matters while maintaining institutional-level underwriting standards throughout every deal.' },
]
const SOLUTIONS = [
  { name: 'SBA Loans',                  idx: '01', desc: 'Government-backed financing for small business acquisition, expansion, and working capital.', detail: 'Amounts up to $5M · Terms up to 25 years · Low down payment · Best for 2+ year operating history.', tags: ['Up to $5M', 'Low Rates', 'Up to 25 yrs'] },
  { name: 'Commercial Purchase Loans',  idx: '02', desc: 'Acquisition financing for office, retail, industrial, warehouse, and mixed-use properties.',  detail: 'Up to 75% LTV · Fixed & variable rates · 5–30 year amortization · Owner-occupied or investment.', tags: ['Up to 75% LTV', 'Fixed & Variable', '5–30 yr'] },
  { name: 'Construction & Development', idx: '03', desc: 'Ground-up construction, gut renovations, and land development financing.',                    detail: 'Draw schedule disbursements · Interest-only during build · Exit to permanent financing available.', tags: ['Draw Schedules', 'Interest-Only', 'Flexible Exit'] },
  { name: 'Bridge Financing',           idx: '04', desc: 'Short-term capital to close quickly while permanent financing is arranged.',                   detail: '6–36 month terms · Fast close in 7–14 days · Asset-based qualification.', tags: ['6–36 Months', 'Fast Close', 'Asset-Based'] },
  { name: 'Hard Money Loans',           idx: '05', desc: 'Asset-based lending with rapid approval for non-conforming or complex scenarios.',             detail: 'Approval in 48 hours · Up to 70% LTV · No income verification · Credit-flexible.', tags: ['48-hr Approval', 'Up to 70% LTV', 'No Income Req'] },
  { name: 'DSCR Investor Loans',        idx: '06', desc: 'Qualified on rental income only — no W-2 or personal tax returns required.',                   detail: 'DSCR ≥ 1.0 · LLC eligible · 30-year options · Ideal for portfolio building.', tags: ['DSCR ≥ 1.0', 'LLC Eligible', '30-yr Available'] },
  { name: 'Merchant Cash Advances',     idx: '07', desc: 'Revenue-based working capital for businesses with consistent monthly sales.',                   detail: 'Funded in 24–72 hours · No collateral required · Repayment tied to daily revenue.', tags: ['24–72hr Funding', 'No Collateral', 'Revenue-Based'] },
  { name: 'Asset-Based Lending',        idx: '08', desc: 'Revolving credit lines and term loans secured by accounts receivable or inventory.',           detail: 'AR, inventory, or equipment-backed · Revolving lines scale with business growth.', tags: ['AR / Inventory', 'Revolving Lines', 'Growth Capital'] },
]
const WHO = [
  'Real Estate Investors', 'First-Time Investors', 'Business Owners',    'Real Estate Agents',
  'Loan Officers',         'CPAs',                 'Builders',           'Developers',
  'Commercial Brokers',    'Growing Enterprises',
]
const RATES = [
  { l: 'SBA 7(a)',      r: '6.50%', up: true,  d: '+0.12', icon: '🏦' },
  { l: 'DSCR',         r: '7.85%', up: false, d: '-0.08', icon: '🏘' },
  { l: 'Hard Money',   r: '11.0%', up: true,  d: '+0.25', icon: '⚡' },
  { l: 'Bridge',       r: '9.25%', up: false, d: '-0.15', icon: '🔗' },
  { l: 'Construction', r: '10.5%', up: true,  d: '+0.10', icon: '🏗' },
  { l: 'MCA',          r: '1.35×', up: false, d: '-0.05', icon: '💼' },
]
const TRANSACTIONS = [
  { title: 'Mixed-Use Commercial',       location: 'Miami, FL',       amt: '$2.4M',  type: 'Commercial', status: 'FUNDED',   sc: '#15803D', sb: '#DCFCE7' },
  { title: 'DSCR Investor Portfolio',    location: 'Austin, TX',      amt: '$850K',  type: 'DSCR Loan',  status: 'APPROVED', sc: T.blue,    sb: T.blueLight },
  { title: 'Bridge → Permanent Refi',    location: 'Chicago, IL',     amt: '$1.1M',  type: 'Bridge',     status: 'FUNDED',   sc: '#15803D', sb: '#DCFCE7' },
  { title: 'Hard Money Fix & Flip',      location: 'Phoenix, AZ',     amt: '$430K',  type: 'Hard Money', status: 'CLOSED',   sc: T.gray500, sb: T.gray100 },
  { title: 'SBA Business Expansion',     location: 'Nashville, TN',   amt: '$1.75M', type: 'SBA 7(a)',   status: 'FUNDED',   sc: '#15803D', sb: '#DCFCE7' },
]

// ─── PAGE ──────────────────────────────────────────────────
export default function Home() {
  const [openSol, setOpenSol] = useState<number | null>(null)
  const [rateTick, setRateTick] = useState(0)
  const [heroTab, setHeroTab] = useState<'rates' | 'transactions' | 'qualify'>('rates')
  const mainRef   = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setInterval(() => setRateTick(n => n + 1), 3000); return () => clearInterval(t) }, [])
  const activeRate = rateTick % RATES.length

  const initAnims = useCallback(() => {
    if (!mainRef.current) return
    gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fu').forEach(el =>
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.sl').forEach(el =>
        gsap.fromTo(el, { x: -52, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.sr').forEach(el =>
        gsap.fromTo(el, { x: 52, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.sc').forEach(el =>
        gsap.fromTo(el, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.sg').forEach(p =>
        gsap.fromTo(Array.from(p.children), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 84%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.cr').forEach(el =>
        gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.15, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }))
      gsap.utils.toArray<HTMLElement>('.ld').forEach(el =>
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } }))
    }, mainRef.current)
  }, [])

  useEffect(() => {
    gsap.fromTo('.hw', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 1.6 })
    gsap.to(loaderRef.current, {
      y: '-100%', duration: 0.85, delay: 1.3, ease: 'power3.inOut',
      onComplete: () => { if (loaderRef.current) loaderRef.current.style.display = 'none'; initAnims() }
    })
    return () => { ScrollTrigger.getAll().forEach(s => s.kill()); gsap.killTweensOf('*') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: T.blue, color: T.white,
    padding: '14px 32px', borderRadius: '7px',
    fontSize: '12px', fontWeight: 800, letterSpacing: '0.18em',
    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(26,86,219,0.28)',
    transition: 'all 0.25s ease',
  }
  const btnSecondary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent', color: T.gray600,
    padding: '14px 26px', borderRadius: '7px',
    fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em',
    textTransform: 'uppercase', cursor: 'pointer',
    border: `1.5px solid ${T.borderD}`,
    transition: 'all 0.25s ease',
  }
  const btnDark: React.CSSProperties = {
    ...btnPrimary,
    backgroundColor: T.ink,
    boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.gray50}; }
        ::-webkit-scrollbar-thumb { background: ${T.gray200}; border-radius: 2px; }

        @keyframes marquee    { 0%{transform:translateX(0)}    100%{transform:translateX(-50%)} }
        @keyframes marqueeR   { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)}   }
        @keyframes floatY     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes loadFill   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ripple     { 0%{transform:translate(-50%,-50%) scale(0.8);opacity:0.5} 100%{transform:translate(-50%,-50%) scale(2.8);opacity:0} }
        @keyframes pulse2     { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideInUp  { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes ticker     { 0%,8%{transform:translateY(0)} 25%,33%{transform:translateY(-100%)} 50%,58%{transform:translateY(-200%)} 75%,83%{transform:translateY(-300%)} 100%{transform:translateY(-400%)} }

        .btn-p:hover   { background-color: ${T.blueMid} !important; transform: translateY(-2px) !important; box-shadow: 0 8px 28px rgba(26,86,219,0.36) !important; }
        .btn-s:hover   { background-color: ${T.gray50} !important; border-color: ${T.gray400} !important; color: ${T.ink} !important; }
        .btn-d:hover   { background-color: ${T.blue} !important; transform: translateY(-2px) !important; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.5) !important; color: white !important; background-color: rgba(255,255,255,0.06) !important; }
        .sol-row:hover     { background-color: ${T.offWhite} !important; }
        .who-card:hover    { background-color: ${T.blueLight} !important; border-color: rgba(26,86,219,0.35) !important; transform: translateY(-2px); }
        .pillar-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.11) !important; transform: translateY(-6px) !important; }
        .pillar-card:hover .p-top-bar { background-color: ${T.blue} !important; }
        .process-cell:hover { background-color: ${T.bluePale} !important; }
        .about-card:hover   { border-color: ${T.blue} !important; background-color: ${T.blueLight} !important; }
        .footer-link:hover  { color: ${T.blue} !important; padding-left: 6px !important; }
        .social-btn:hover   { border-color: ${T.blue} !important; color: ${T.blue} !important; background-color: ${T.blueLight} !important; }
        .hero-tab-btn:hover { background-color: ${T.gray50} !important; }
        .rate-row:hover     { background-color: ${T.blueLight} !important; }
        .tx-row:hover       { background-color: ${T.gray50} !important; }
      `}</style>

      {/* ── LOADER ───────────────────────────────────────── */}
      <div ref={loaderRef} style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: T.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${T.gray100} 1px, transparent 0)`, backgroundSize: '32px 32px', pointerEvents: 'none', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: T.blue, animation: 'loadFill 1.1s cubic-bezier(0.4,0,0.2,1) forwards', transformOrigin: 'left', transform: 'scaleX(0)' }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
          <div style={{ position: 'relative', width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px dashed ${T.gray200}`, animation: 'spin 10s linear infinite' }} />
            <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', border: '2.5px solid transparent', borderTopColor: T.blue, borderRightColor: T.blue, animation: 'spin 1s cubic-bezier(0.4,0,0.6,1) infinite' }} />
            <div style={{ position: 'absolute', inset: '32px', borderRadius: '50%', border: `1px solid ${T.gray100}` }} />
            <div style={{ position: 'relative', zIndex: 3, width: '148px', height: '52px', borderRadius: '12px', backgroundColor: T.white, boxShadow: `0 6px 28px rgba(26,86,219,0.12), 0 2px 8px rgba(0,0,0,0.06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.border}`, animation: 'floatY 2.2s ease-in-out infinite', overflow: 'hidden', padding: '8px 12px' }}>
              <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" fill style={{ objectFit: 'contain', padding: '8px 12px' }} priority />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '1.5px', backgroundColor: T.blue, animation: 'loadFill 1.1s ease forwards', transformOrigin: 'left', transform: 'scaleX(0)' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.52em', color: T.gray400, textTransform: 'uppercase' }}>VYNRA CAPITAL</span>
              <div style={{ width: '24px', height: '1.5px', backgroundColor: T.blue, animation: 'loadFill 1.1s ease forwards', transformOrigin: 'right', transform: 'scaleX(0)' }} />
            </div>
            <div style={{ width: '180px', height: '2px', backgroundColor: T.gray100, borderRadius: '1px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: T.blue, animation: 'loadFill 1.1s cubic-bezier(0.4,0,0.2,1) forwards', transformOrigin: 'left', transform: 'scaleX(0)' }} />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.28em', color: T.gray300, textTransform: 'uppercase', fontStyle: 'italic' }}>Structured for Growth.</span>
          </div>
        </div>
      </div>

      <ScrollProgress />
      <NavDots />

      {/* ── STICKY NAV ──────────────────────────────────── */}
      <header style={{ position: 'fixed', top: '3px', left: 0, right: 0, zIndex: 60, backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" width={148} height={40} style={{ objectFit: 'contain', height: '38px', width: 'auto' }} priority />
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {['Solutions', 'Who We Help', 'About', 'Contact'].map(item => (
              <a key={item} href="#"
                style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', color: T.gray500, textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = T.blue)}
                onMouseLeave={e => (e.currentTarget.style.color = T.gray500)}>
                {item}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-s" style={btnSecondary}>Speak to Advisor</button>
            <button className="btn-p" style={btnPrimary}>Request Capital</button>
          </div>
        </div>
      </header>

      <main ref={mainRef} style={{ backgroundColor: T.white, color: T.ink, overflowX: 'hidden' }}>

        {/* ════════════════════════════════════════════════
            §1  HERO
        ════════════════════════════════════════════════ */}
        <section id="hero" style={{ paddingTop: '71px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%' }}>

          {/* LEFT ─ black panel */}
          <div style={{ backgroundColor: T.black, padding: '80px 64px 80px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 71px)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 0)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: `linear-gradient(to bottom, ${T.blue}, ${T.blueMid})` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '40%', background: `radial-gradient(circle at bottom right, rgba(26,86,219,0.06), transparent 60%)`, pointerEvents: 'none' }} />

            <div>
              {/* Live badge */}
              <div className="hw" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)', marginBottom: '56px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0, animation: 'pulse2 2s infinite' }} />
                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.36em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                  Structured Funding · Est. 20+ Yrs
                </span>
              </div>

              {/* Headline */}
              {[
                { text: 'STRATEGIC', weight: 900, stroke: false },
                { text: 'CAPITAL.', weight: 200, stroke: true },
              ].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', marginBottom: i === 0 ? '6px' : '32px' }}>
                  <h1 className="hw" style={{
                    fontSize: 'clamp(4rem,7vw,8.5rem)',
                    fontWeight: line.weight,
                    letterSpacing: '-0.045em',
                    color: line.stroke ? 'transparent' : T.white,
                    WebkitTextStroke: line.stroke ? '1.5px rgba(255,255,255,0.32)' : undefined,
                    textTransform: 'uppercase',
                    lineHeight: 0.87,
                    fontStyle: line.stroke ? 'italic' : 'normal',
                  }}>
                    {line.text}
                  </h1>
                </div>
              ))}

              <div className="hw" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{ width: '36px', height: '2px', background: `linear-gradient(to right, ${T.blue}, ${T.blueMid})`, flexShrink: 0 }} />
                <span style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', fontStyle: 'italic' }}>
                  Structured for Growth.
                </span>
              </div>

              <p className="hw" style={{ fontSize: '15.5px', lineHeight: 1.85, color: 'rgba(255,255,255,0.38)', maxWidth: '420px', marginBottom: '48px' }}>
                Over 20 years of experience delivering commercial, hard money, and alternative financing solutions through trusted banking, institutional, and private capital relationships.
              </p>

              <div className="hw" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn-p" style={{ ...btnPrimary, padding: '16px 36px', fontSize: '12.5px' }}>
                  Request Capital
                </button>
                <button className="btn-ghost" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: 'transparent', color: 'rgba(255,255,255,0.55)',
                  padding: '16px 28px', borderRadius: '7px',
                  fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.14)',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}>
                  Speak With Advisor <span style={{ color: T.blue, fontSize: '14px' }}>→</span>
                </button>
              </div>
            </div>

            {/* Trust row */}
            <div className="hw" style={{ display: 'flex', gap: '32px', paddingTop: '44px', borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', marginTop: '48px' }}>
              {['No upfront fees', 'All credit profiles', '24–48 hr decisions'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
                  <span style={{ color: T.blue, fontWeight: 900, fontSize: '14px' }}>✓</span>{t}
                </span>
              ))}
            </div>

            {/* Scroll cue */}
            <div style={{ position: 'absolute', bottom: '32px', left: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '1px', height: '48px', background: `linear-gradient(to bottom, ${T.blue}, transparent)` }} />
              <span style={{ fontSize: '8.5px', letterSpacing: '0.52em', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>SCROLL</span>
            </div>
          </div>

          {/* RIGHT ─ NEW: Capital Intelligence Panel */}
          <div style={{ backgroundColor: T.white, borderLeft: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 71px)' }}>

            {/* Tab bar */}
            <div className="hw" style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
              {([
                { key: 'rates',        label: 'Market Rates',    icon: '◈' },
                { key: 'transactions', label: 'Live Deals',      icon: '◉' },
                { key: 'qualify',      label: 'Quick Qualify',   icon: '◇' },
              ] as const).map(tab => (
                <button key={tab.key}
                  className="hero-tab-btn"
                  onClick={() => setHeroTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '18px 12px',
                    border: 'none',
                    borderBottom: heroTab === tab.key ? `3px solid ${T.blue}` : '3px solid transparent',
                    backgroundColor: heroTab === tab.key ? T.bluePale : T.white,
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                    transition: 'all 0.22s ease',
                  }}>
                  <span style={{ fontSize: '13px', color: heroTab === tab.key ? T.blue : T.gray400 }}>{tab.icon}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.14em', color: heroTab === tab.key ? T.blue : T.gray500, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ── TAB: Market Rates ── */}
            {heroTab === 'rates' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 40px', gap: '0', animation: 'slideInUp 0.35s ease' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0, animation: 'pulse2 2s infinite' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.3em', color: T.gray400, textTransform: 'uppercase' }}>Live Market Rates</span>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: T.gray300, padding: '4px 10px', backgroundColor: T.gray50, borderRadius: '4px', border: `1px solid ${T.border}` }}>UPDATED TODAY</span>
                </div>

                {/* Rate rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '32px' }}>
                  {RATES.map((r, i) => (
                    <div key={r.l} className="rate-row"
                      style={{
                        display: 'grid', gridTemplateColumns: '44px 1fr auto auto',
                        alignItems: 'center', gap: '16px',
                        padding: '14px 16px', borderRadius: '8px',
                        backgroundColor: i === activeRate ? T.blueLight : 'transparent',
                        border: `1px solid ${i === activeRate ? 'rgba(26,86,219,0.15)' : 'transparent'}`,
                        transition: 'all 0.4s ease', cursor: 'default',
                      }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: i === activeRate ? T.blue : T.gray50, border: `1px solid ${i === activeRate ? T.blue : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, transition: 'all 0.4s' }}>
                        {r.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: i === activeRate ? T.ink : T.ink, letterSpacing: '0.04em', marginBottom: '2px' }}>{r.l}</div>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: T.gray400 }}>Current Rate</div>
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: i === activeRate ? T.blue : T.ink, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{r.r}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: r.up ? '#DC2626' : '#16A34A' }}>{r.up ? '↑' : '↓'}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: r.up ? '#DC2626' : '#16A34A' }}>{r.d}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom banner */}
                <div style={{ marginTop: 'auto', padding: '20px 22px', backgroundColor: T.ink, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: T.white, marginBottom: '4px' }}>$50K – $50M+ Available</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>All product lines · 48hr decisions</div>
                  </div>
                  <button className="btn-p" style={{ ...btnPrimary, padding: '11px 22px', fontSize: '11px', flexShrink: 0 }}>Apply Now</button>
                </div>
              </div>
            )}

            {/* ── TAB: Live Deals ── */}
            {heroTab === 'transactions' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 40px', animation: 'slideInUp 0.35s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'pulse2 2s infinite' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.3em', color: T.gray400, textTransform: 'uppercase' }}>Recent Transactions</span>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#15803D', padding: '4px 10px', backgroundColor: '#DCFCE7', borderRadius: '4px' }}>LIVE FEED</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {TRANSACTIONS.map((tx, i) => (
                    <div key={i} className="tx-row"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px', borderRadius: '8px', cursor: 'default', transition: 'background 0.22s', border: `1px solid transparent` }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: tx.sb, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${T.border}` }}>
                          <span style={{ fontSize: '9.5px', fontWeight: 900, color: tx.sc, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tx.type.slice(0, 3)}</span>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: T.ink, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.title}</div>
                          <div style={{ fontSize: '11px', color: T.gray400, fontWeight: 500 }}>{tx.location} · {tx.type}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', flexShrink: 0, marginLeft: '12px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 900, color: T.ink, letterSpacing: '-0.02em' }}>{tx.amt}</span>
                        <span style={{ fontSize: '9px', fontWeight: 800, padding: '3px 9px', borderRadius: '4px', backgroundColor: tx.sb, color: tx.sc, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{tx.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: T.gray400, fontWeight: 500 }}>Transactions across 50+ states</span>
                  <button className="btn-d" style={{ ...btnDark, padding: '11px 22px', fontSize: '11px' }}>View All Deals</button>
                </div>
              </div>
            )}

            {/* ── TAB: Quick Qualify ── */}
            {heroTab === 'qualify' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 40px', animation: 'slideInUp 0.35s ease' }}>
                <div style={{ marginBottom: '28px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.3em', color: T.gray400, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Quick Qualification Check</span>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: T.gray500 }}>Answer 3 quick questions to see which programs you may qualify for.</p>
                </div>

                {/* Qualify form cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  {/* Loan type */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: T.ink, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '10px' }}>What are you financing?</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {['Commercial RE', 'Business Capital', 'Residential Inv.', 'Construction'].map((opt, i) => (
                        <div key={opt}
                          style={{ padding: '12px 14px', border: `1.5px solid ${i === 0 ? T.blue : T.border}`, borderRadius: '7px', cursor: 'pointer', backgroundColor: i === 0 ? T.blueLight : T.white, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: `2px solid ${i === 0 ? T.blue : T.gray200}`, backgroundColor: i === 0 ? T.blue : 'transparent', flexShrink: 0 }} />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: i === 0 ? T.blue : T.ink }}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loan amount */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: T.ink, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '10px' }}>Amount Needed</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
                      {['< $500K', '$500K–$2M', '$2M+'].map((opt, i) => (
                        <div key={opt}
                          style={{ padding: '10px 8px', border: `1.5px solid ${i === 1 ? T.blue : T.border}`, borderRadius: '7px', cursor: 'pointer', backgroundColor: i === 1 ? T.blueLight : T.white, textAlign: 'center', transition: 'all 0.2s' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: i === 1 ? T.blue : T.ink }}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credit */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: T.ink, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '10px' }}>Credit Profile</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
                      {['Good (680+)', 'Fair (580+)', 'Any Score'].map((opt, i) => (
                        <div key={opt}
                          style={{ padding: '10px 8px', border: `1.5px solid ${i === 0 ? T.blue : T.border}`, borderRadius: '7px', cursor: 'pointer', backgroundColor: i === 0 ? T.blueLight : T.white, textAlign: 'center', transition: 'all 0.2s' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: i === 0 ? T.blue : T.ink }}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results preview */}
                <div style={{ padding: '18px 20px', backgroundColor: T.bluePale, borderRadius: '10px', border: `1px solid rgba(26,86,219,0.14)`, marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: T.blue, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>You May Qualify For:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {['SBA 7(a) up to $5M', 'Commercial Purchase Loan', 'DSCR Investor Loan'].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: T.blue, fontWeight: 900, fontSize: '13px' }}>✓</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: T.ink }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-p" style={{ ...btnPrimary, width: '100%', padding: '16px', fontSize: '12.5px' }}>
                  Get My Capital Strategy →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ══ MARQUEE TICKER ══ */}
        <div style={{ backgroundColor: T.ink, padding: '15px 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: `linear-gradient(to right,${T.ink},transparent)`, zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: `linear-gradient(to left,${T.ink},transparent)`, zIndex: 2 }} />
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', marginBottom: '9px', animation: 'marquee 28s linear infinite', width: 'max-content' }}>
            {Array(6).fill(['Commercial Financing', 'Hard Money Loans', 'Bridge Financing', 'SBA Loans', 'DSCR Loans', 'MCA Funding', 'Asset-Based Lending', 'Construction Loans']).flat().map((item, i) => (
              <span key={i} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', color: i % 2 === 0 ? T.blue : 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', gap: '14px', textTransform: 'uppercase' }}>
                {item} <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '8px' }}>◈</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', animation: 'marqueeR 34s linear infinite', width: 'max-content' }}>
            {Array(6).fill(['20+ Years Experience', '$50K to $50M+', '48hr Hard Money', 'No Income DSCR', 'LLC Friendly', 'All Credit Types', 'Institutional Capital', 'Direct Lender']).flat().map((item, i) => (
              <span key={i} style={{ fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.24em', color: i % 2 === 0 ? 'rgba(255,255,255,0.16)' : 'rgba(26,86,219,0.5)', display: 'flex', alignItems: 'center', gap: '14px', textTransform: 'uppercase' }}>
                {item} <span style={{ color: 'rgba(255,255,255,0.07)', fontSize: '8px' }}>◇</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ STATS ROW ══ */}
        <div style={{ borderBottom: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 56px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { val: 20,  suffix: '+',  prefix: '',  label: 'Years Experience', sub: 'In The Field'        },
              { val: 1,   suffix: 'B+', prefix: '$', label: 'Capital Deployed', sub: 'Across All Products' },
              { val: 8,   suffix: '',   prefix: '',  label: 'Product Lines',    sub: 'Financing Solutions'  },
              { val: 100, suffix: '%',  prefix: '',  label: 'Deal Focus',       sub: 'Every Transaction'    },
            ].map((s, i) => (
              <div key={i} className="sc"
                style={{ padding: '56px 40px', borderRight: i < 3 ? `1px solid ${T.border}` : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2.8rem,4vw,4.4rem)', fontWeight: 900, color: T.ink, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '12px' }}>
                  {s.prefix}<Counter to={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: T.ink, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                <div style={{ fontSize: '12px', color: T.gray400 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            §2  POSITIONING
        ════════════════════════════════════════════════ */}
        <section id="positioning" style={{ backgroundColor: T.white }}>
          <SLabel tag="Our Positioning" num="01 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '88px', alignItems: 'center' }}>

            <div className="sl">
              <h2 className="cr" style={{ fontSize: 'clamp(2.4rem,4vw,4.4rem)', fontWeight: 900, lineHeight: 0.92, color: T.ink, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '32px' }}>
                MORE THAN<br />A LENDER.<br />
                <span style={{ color: T.blue }}>A CAPITAL<br />PARTNER.</span>
              </h2>
              <p className="fu" style={{ fontSize: '16px', lineHeight: 1.85, color: T.gray500, marginBottom: '40px' }}>
                Vynra Capital was built by practitioners — not product pushers. Every advisor on our team has spent years in the field, structuring deals across multiple asset classes and market cycles.
              </p>
              <button className="btn-d" style={btnDark}>Learn How We Work</button>
            </div>

            <div className="sr" style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { n: '01', title: 'Long-Term Outcomes',  body: 'We prioritize long-term outcomes over short-term placement fees — every time.' },
                { n: '02', title: 'Wide Capital Network', body: 'We leverage a wide capital network to find the best execution path for your deal.' },
                { n: '03', title: 'Speed & Precision',   body: 'We operate with speed and precision — from term sheet all the way to close.' },
              ].map((item, i) => (
                <div key={i} className="fu"
                  style={{ display: 'flex', gap: '28px', padding: '32px 24px', borderBottom: `1px solid ${T.border}`, cursor: 'default', transition: 'background 0.22s', alignItems: 'flex-start' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.gray50)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: T.numColor, letterSpacing: '0.1em', flexShrink: 0, paddingTop: '2px', minWidth: '22px' }}>{item.n}</span>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 900, color: T.ink, marginBottom: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.title}</h4>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: T.gray500 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §3  PILLARS
        ════════════════════════════════════════════════ */}
        <section id="pillars" style={{ backgroundColor: T.gray50, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <SLabel tag="Why Vynra" num="02 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px' }}>
            <div className="sl" style={{ marginBottom: '68px' }}>
              <h2 className="cr" style={{ fontSize: 'clamp(3rem,5.5vw,6rem)', fontWeight: 900, lineHeight: 0.86, color: T.ink, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                FOUR PILLARS.<br /><span style={{ color: T.blue }}>ONE MANDATE.</span>
              </h2>
            </div>
            <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', backgroundColor: T.border, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${T.border}` }}>
              {PILLARS.map((p, i) => (
                <div key={p.num} className="pillar-card"
                  style={{ backgroundColor: T.white, padding: '48px 36px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'all 0.38s ease' }}>
                  <div className="p-top-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: i === 0 ? T.blue : T.gray100, transition: 'background 0.3s' }} />
                  {/* Larger, darker watermark number */}
                  <div style={{ position: 'absolute', right: '18px', top: '12px', fontSize: '88px', fontWeight: 900, color: T.numColor, lineHeight: 1, userSelect: 'none', letterSpacing: '-0.06em' }}>
                    {p.num}
                  </div>
                  <span style={{ display: 'inline-block', fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.3em', padding: '5px 12px', borderRadius: '4px', backgroundColor: T.blueLight, color: T.blue, marginBottom: '24px', textTransform: 'uppercase' }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: T.ink, marginBottom: '14px', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{p.title}</h3>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.82, color: T.gray500 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §4  SOLUTIONS
        ════════════════════════════════════════════════ */}
        <section id="solutions" style={{ backgroundColor: T.white }}>
          <SLabel tag="Financing Solutions" num="03 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px' }}>
            <div className="sl" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
              <h2 className="cr" style={{ fontSize: 'clamp(3rem,5.5vw,6rem)', fontWeight: 900, lineHeight: 0.86, color: T.ink, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                CAPITAL SOLUTIONS<br /><span style={{ color: T.blue }}>BUILT TO PERFORM.</span>
              </h2>
              <p className="sr" style={{ fontSize: '15px', color: T.gray500, maxWidth: '280px', lineHeight: 1.8 }}>
                Eight purpose-built products covering every stage of real estate and business financing.
              </p>
            </div>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '60px 230px 1fr 230px', padding: '14px 24px', backgroundColor: T.ink, borderRadius: '8px 8px 0 0', marginBottom: '1px' }}>
              {['#', 'PRODUCT', 'DESCRIPTION', 'TAGS'].map(h => (
                <span key={h} style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.36em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>

            {SOLUTIONS.map((sol, i) => (
              <div key={sol.idx}>
                <div className="sol-row sc"
                  onClick={() => setOpenSol(openSol === i ? null : i)}
                  style={{ display: 'grid', gridTemplateColumns: '60px 230px 1fr 230px', padding: '22px 24px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer', backgroundColor: openSol === i ? T.blueLight : T.white, transition: 'background 0.22s', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 900, color: openSol === i ? T.blue : T.numColor, letterSpacing: '0.06em' }}>{sol.idx}</span>
                  <span style={{ fontSize: '14.5px', fontWeight: 800, color: openSol === i ? T.blue : T.ink, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sol.name}</span>
                  <span style={{ fontSize: '13.5px', color: T.gray500, lineHeight: 1.6, paddingRight: '28px' }}>{sol.desc}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', justifyContent: 'flex-end' }}>
                    {sol.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: '9px', fontWeight: 800, padding: '5px 10px', borderRadius: '4px', backgroundColor: openSol === i ? 'rgba(26,86,219,0.1)' : T.gray50, color: openSol === i ? T.blue : T.gray600, letterSpacing: '0.1em', border: `1px solid ${openSol === i ? 'rgba(26,86,219,0.2)' : T.border}`, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{tag}</span>
                    ))}
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: openSol === i ? T.blue : T.gray50, border: `1px solid ${openSol === i ? T.blue : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: openSol === i ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease', fontSize: '17px', fontWeight: 700, color: openSol === i ? T.white : T.gray600, flexShrink: 0 }}>+</div>
                  </div>
                </div>
                {openSol === i && (
                  <div style={{ backgroundColor: T.blueLight, padding: '28px 24px 32px 314px', borderBottom: `1px solid rgba(26,86,219,0.12)`, animation: 'slideInUp 0.3s ease' }}>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.82, color: T.ink, marginBottom: '18px' }}>{sol.detail}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      {sol.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '9.5px', fontWeight: 800, padding: '6px 14px', borderRadius: '4px', backgroundColor: 'rgba(26,86,219,0.08)', color: T.blue, border: '1px solid rgba(26,86,219,0.18)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn-p" style={{ ...btnPrimary, padding: '12px 28px' }}>Apply Now</button>
                      <button className="btn-s" style={{ ...btnSecondary, padding: '12px 22px' }}>Learn More</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §5  WHO WE SERVE
        ════════════════════════════════════════════════ */}
        <section id="who" style={{ backgroundColor: T.gray50, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <SLabel tag="Who We Serve" num="04 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '88px', alignItems: 'start' }}>

            <div className="sl">
              <h2 className="cr" style={{ fontSize: 'clamp(2.4rem,3.8vw,4.2rem)', fontWeight: 900, lineHeight: 0.90, color: T.ink, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '28px' }}>
                SERIOUS<br />CAPITAL<br />FOR<br /><span style={{ color: T.blue }}>SERIOUS<br />PLAYERS.</span>
              </h2>
              <p className="fu" style={{ fontSize: '15.5px', lineHeight: 1.85, color: T.gray500, marginBottom: '40px' }}>
                We work with a broad range of clients — from first-time investors to seasoned developers and enterprise-level businesses seeking institutional-quality capital advisory.
              </p>
              <button className="btn-d" style={btnDark}>See If You Qualify</button>
            </div>

            <div className="sr sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
              {WHO.map((w, i) => (
                <div key={w} className="sc who-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 22px', backgroundColor: T.white, border: `1px solid ${T.border}`, borderRadius: '10px', cursor: 'default', transition: 'all 0.25s ease' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', backgroundColor: T.gray50, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '15px', color: T.blue, fontWeight: 700 }}>
                    {['◈', '◇', '◉'][i % 3]}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: T.ink, letterSpacing: '0.02em' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §6  PROCESS
        ════════════════════════════════════════════════ */}
        <section id="process" style={{ backgroundColor: T.white }}>
          <SLabel tag="How It Works" num="05 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px' }}>
            <div className="sl" style={{ marginBottom: '68px' }}>
              <h2 className="cr" style={{ fontSize: 'clamp(3rem,5.5vw,6rem)', fontWeight: 900, lineHeight: 0.86, color: T.ink, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                FROM INTRO<br /><span style={{ color: T.blue }}>TO FUNDED.</span>
              </h2>
            </div>

            <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', backgroundColor: T.border, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${T.border}` }}>
              {[
                { n: '01', title: 'Submit Your Scenario', body: 'Share your deal details, financing goal, and timeline through our quick intake form.' },
                { n: '02', title: 'Strategy Session',     body: 'We review your scenario and schedule a call to align on the best structuring approach.' },
                { n: '03', title: 'Capital Matching',     body: 'We match your deal to the optimal lender or capital source from our extensive network.' },
                { n: '04', title: 'Close & Fund',         body: 'We manage the process from underwriting through final funding — complete end to end.' },
              ].map((step, i) => (
                <div key={step.n} className={i !== 3 ? 'sc process-cell' : 'sc'}
                  style={{ backgroundColor: i === 3 ? T.blue : T.white, padding: '52px 36px', position: 'relative', cursor: 'default', transition: 'background 0.25s' }}>
                  <div style={{ position: 'absolute', top: '26px', right: '26px', fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.18em', color: i === 3 ? 'rgba(255,255,255,0.4)' : T.gray300 }}>
                    {step.n} / 04
                  </div>
                  {/* Darker, bigger watermark number */}
                  <div style={{ fontSize: '88px', fontWeight: 900, lineHeight: 1, color: i === 3 ? 'rgba(255,255,255,0.1)' : T.numColor, marginBottom: '24px', letterSpacing: '-0.06em', userSelect: 'none' }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: i === 3 ? T.white : T.ink, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.82, color: i === 3 ? 'rgba(255,255,255,0.6)' : T.gray500 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §7  ABOUT
        ════════════════════════════════════════════════ */}
        <section id="about" style={{ backgroundColor: T.gray50, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <SLabel tag="About Vynra" num="06 / 07" />
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '96px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '88px', alignItems: 'start' }}>

            <div className="sl">
              <h2 className="cr" style={{ fontSize: 'clamp(2.4rem,4vw,4.4rem)', fontWeight: 900, lineHeight: 0.90, color: T.ink, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '32px' }}>
                BUILT BY<br />PRACTITIONERS.<br /><span style={{ color: T.blue }}>DRIVEN BY<br />OUTCOMES.</span>
              </h2>
              <p className="fu" style={{ fontSize: '16px', lineHeight: 1.85, color: T.gray500, marginBottom: '20px' }}>
                Vynra Capital was founded on a simple principle: clients deserve advisors who understand deals at a structural level, not just at the surface.
              </p>
              <p className="fu" style={{ fontSize: '16px', lineHeight: 1.85, color: T.gray500, marginBottom: '48px' }}>
                With over two decades of combined experience, our team has structured financing across commercial real estate, business acquisitions, hard money, and alternative capital markets.
              </p>

              <div className="fu sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', backgroundColor: T.border, border: `1px solid ${T.border}`, borderRadius: '10px', overflow: 'hidden' }}>
                {[{ n: '20+', l: 'Years' }, { n: '$B+', l: 'Deployed' }, { n: '8', l: 'Products' }].map((s, i) => (
                  <div key={s.l} className="sc" style={{ textAlign: 'center', padding: '28px 18px', backgroundColor: T.white }}>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: T.blue, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '7px' }}>{s.n}</div>
                    <div style={{ fontSize: '10.5px', fontWeight: 800, color: T.gray400, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sr" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Our Mission',   body: 'To deliver structured capital solutions that enable our clients to move with confidence through complex financing environments.' },
                { title: 'Our Approach',  body: 'We combine deep market knowledge with wide lender access to deliver financing that is properly structured for the deal — not the other way around.' },
                { title: 'Our Standards', body: 'Every deal is reviewed with institutional-quality underwriting rigor, regardless of size. We hold ourselves to the highest professional standards in the industry.' },
              ].map((item, i) => (
                <div key={i} className="fu about-card"
                  style={{ padding: '32px', backgroundColor: T.white, border: `1px solid ${T.border}`, borderRadius: '10px', transition: 'all 0.25s ease', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: T.white }}>✓</span>
                    </div>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 900, color: T.blue, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.85, color: T.gray500 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            §8  CTA
        ════════════════════════════════════════════════ */}
        <section id="cta" style={{ backgroundColor: T.ink, position: 'relative', overflow: 'hidden' }}>
          {[300, 500, 720].map((size, i) => (
            <div key={size} style={{ position: 'absolute', top: '50%', left: '50%', width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: '1px solid rgba(26,86,219,0.1)', animation: `ripple ${2.4 + i * 1.1}s ease-out infinite`, animationDelay: `${i * 0.7}s`, pointerEvents: 'none' }} />
          ))}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: `linear-gradient(to bottom, ${T.blue}, ${T.blueMid})` }} />

          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '128px 72px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '88px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <div className="sl">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: T.blue, animation: 'pulse2 2s infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.44em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' }}>Start Your Application</span>
              </div>
              <h2 style={{ fontSize: 'clamp(4rem,6.5vw,7.5rem)', fontWeight: 900, lineHeight: 0.84, color: T.white, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                YOUR<br />NEXT<br />DEAL<br /><span style={{ color: T.blue }}>STARTS<br />HERE.</span>
              </h2>
            </div>

            <div className="sr" style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              <p style={{ fontSize: '17px', lineHeight: 1.82, color: 'rgba(255,255,255,0.42)' }}>
                Submit your scenario today and receive a structured capital strategy within 24–48 hours. No upfront fees. No commitments.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                {['No upfront fees', 'All credit profiles', '24–48 hr decisions', 'Nationwide'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <span style={{ color: T.blue, fontWeight: 900, fontSize: '15px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn-p" style={{ ...btnPrimary, padding: '17px 40px', fontSize: '13px' }}>
                  Request Capital Now
                </button>
                <button className="btn-ghost" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'transparent', color: 'rgba(255,255,255,0.5)',
                  padding: '17px 32px', borderRadius: '7px',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.13)',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}>
                  Speak With Advisor
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ backgroundColor: T.white, borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '80px 56px 52px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: '64px', marginBottom: '60px' }}>
              <div>
                <div style={{ marginBottom: '22px' }}>
                  <Image src="/Vynra_Capital_Logo.png" alt="Vynra Capital" width={148} height={40} style={{ objectFit: 'contain', height: '38px', width: 'auto' }} />
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.82, color: T.gray500, maxWidth: '260px', marginBottom: '32px' }}>
                  Structured funding for sustainable growth. 20+ years of institutional-grade capital advisory.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['in', 'tw', 'fb'].map(s => (
                    <div key={s} className="social-btn"
                      style={{ width: '40px', height: '40px', borderRadius: '9px', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.25s ease', fontSize: '11px', fontWeight: 800, color: T.gray500, textTransform: 'uppercase' }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {[
                { title: 'Solutions', links: ['SBA Loans', 'Commercial', 'Hard Money', 'DSCR Loans', 'Bridge Financing', 'MCA'] },
                { title: 'Company',   links: ['About', 'Our Process', 'Who We Help', 'Careers'] },
                { title: 'Contact',   links: ['Request Capital', 'Speak to Advisor', 'Partner With Us', 'Privacy Policy'] },
              ].map(col => (
                <div key={col.title}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.4em', color: T.blue, textTransform: 'uppercase', marginBottom: '24px' }}>{col.title}</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="footer-link"
                          style={{ fontSize: '14px', fontWeight: 500, color: T.gray500, textDecoration: 'none', transition: 'all 0.2s ease', display: 'inline-block' }}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '32px', borderTop: `1px solid ${T.border}`, flexWrap: 'wrap', gap: '14px' }}>
              <p style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.18em', color: T.gray300, textTransform: 'uppercase' }}>
                © 2025 Vynra Capital. All Rights Reserved.
              </p>
              <p style={{ fontSize: '11.5px', color: T.gray300 }}>
                Not a licensed lender · Informational purposes only · Consult a financial advisor
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
