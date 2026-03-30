'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { comics } from '@/data/comics'
import { getMessages, isValidLocale, defaultLocale, locales, localeNames, type Locale } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface Mark {
  id: string
  x: number
  y: number
  w: number
  h: number
  fontSize: number
  text: string
  position: 'left' | 'right'
  bg: string
  shape: 'rect' | 'ellipse'
  fontFamily: string
}

const FONTS = [
  { label: '沐瑶软笔手写体', value: 'Muyao-Softbrush' },
  { label: '悠哉中等体', value: 'Yozai-Medium' },
  { label: '无衬线 (sans-serif)', value: 'sans-serif' },
  { label: '衬线 (serif)', value: 'serif' },
  { label: '等宽 (monospace)', value: 'monospace' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
]

const DEFAULT_MARK: Omit<Mark, 'id' | 'x' | 'y'> = {
  w: 28, h: 15, fontSize: 1.5, text: '', position: 'left',
  bg: 'rgba(255,240,80,0.75)', shape: 'rect', fontFamily: 'Muyao-Softbrush',
}

export default function EditorPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = isValidLocale(params.locale as string) ? (params.locale as Locale) : defaultLocale
  const t = getMessages(locale)

  const initialComicId = searchParams.get('comic') ?? comics[0]?.id ?? ''
  const [comicId, setComicId] = useState(initialComicId)
  const [marks, setMarks] = useState<Mark[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const comic = comics.find(c => c.id === comicId)

  function pct(px: number, dim: number) {
    return Math.round((px / dim) * 1000) / 10
  }

  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = pct(e.clientX - rect.left, rect.width)
    const y = pct(e.clientY - rect.top, rect.height)
    const id = `b${marks.length + 1}`
    setMarks(prev => [...prev, { id, x, y, ...DEFAULT_MARK }])
    setSelected(id)
  }

  function update(id: string, patch: Partial<Mark>) {
    setMarks(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m))
  }

  function remove(id: string) {
    setMarks(prev => prev.filter(m => m.id !== id))
    if (selected === id) setSelected(null)
  }

  const startDragMove = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const mark = marks.find(m => m.id === id)!
    const origX = mark.x
    const origY = mark.y
    function onMove(ev: MouseEvent) {
      const dx = pct(ev.clientX - startX, rect.width)
      const dy = pct(ev.clientY - startY, rect.height)
      setMarks(p => p.map(m => m.id === id ? {
        ...m,
        x: Math.round((origX + dx) * 10) / 10,
        y: Math.round((origY + dy) * 10) / 10,
      } : m))
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [marks])

  const startDragRight = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const startX = e.clientX
    const origW = marks.find(m => m.id === id)!.w
    function onMove(ev: MouseEvent) {
      const dw = pct(ev.clientX - startX, rect.width)
      setMarks(p => p.map(m => m.id === id ? { ...m, w: Math.max(5, Math.round((origW + dw * 2) * 10) / 10) } : m))
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [marks])

  const startDragBottom = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const startY = e.clientY
    const origH = marks.find(m => m.id === id)!.h
    function onMove(ev: MouseEvent) {
      const dh = pct(ev.clientY - startY, rect.height)
      setMarks(p => p.map(m => m.id === id ? { ...m, h: Math.max(3, Math.round((origH + dh * 2) * 10) / 10) } : m))
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [marks])

  const output =
    'bubbles: [\n' +
    marks.map(m => {
      const parts = [
        `id: '${m.id}'`,
        `text: '${m.text.replace(/'/g, "\\'")}'`,
        `position: '${m.position}'`,
        `x: ${m.x}`,
        `y: ${m.y}`,
        `w: ${m.w}`,
        ...(m.h > 0 ? [`h: ${m.h}`] : []),
        `fontSize: ${m.fontSize}`,
        ...(m.bg !== DEFAULT_MARK.bg ? [`bg: '${m.bg}'`] : []),
        ...(m.shape !== 'rect' ? [`shape: '${m.shape}'`] : []),
        ...(m.fontFamily !== DEFAULT_MARK.fontFamily ? [`fontFamily: '${m.fontFamily}'`] : []),
      ]
      return `  { ${parts.join(', ')} },`
    }).join('\n') +
    '\n]'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box', fontFamily: 'sans-serif', fontSize: '13px' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderBottom: '1px solid #ddd', flexShrink: 0 }}>
        <Link href={`/${locale}`} style={{ textDecoration: 'none', color: '#555' }}>← {t.editorBackHome}</Link>
        <b style={{ flex: 1 }}>{t.editorTitle}</b>
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, gap: '1rem', padding: '1rem', overflow: 'hidden' }}>

        {/* Image panel */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label>{t.editorComic}:</label>
            <select value={comicId} onChange={e => { setComicId(e.target.value); setMarks([]) }}>
              {comics.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
            </select>
            <span style={{ color: '#888' }}>— {t.editorHint}</span>
          </div>

          {comic && (
            <div
              ref={containerRef}
              onMouseDown={handleContainerClick}
              style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={comic.image}
                alt=""
                draggable={false}
                style={{ display: 'block', maxHeight: 'calc(100vh - 100px)', userSelect: 'none', pointerEvents: 'none' }}
              />
              {marks.map((m, i) => (
                <div
                  key={m.id}
                  onMouseDown={ev => { setSelected(m.id); startDragMove(ev, m.id) }}
                  style={{
                    position: 'absolute',
                    left: `${m.x}%`,
                    top: `${m.y}%`,
                    width: `${m.w}%`,
                    height: `${m.h}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    background: m.bg,
                    borderRadius: m.shape === 'ellipse' ? '50%' : '0',
                    border: m.id === selected ? '2px solid red' : '1px solid rgba(0,0,0,0.25)',
                    textAlign: 'center',
                    fontSize: `${m.fontSize}vw`,
                    fontWeight: 'bold',
                    fontFamily: m.fontFamily,
                    cursor: 'move',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.3,
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                  }}
                >
                  {m.text || `[${i + 1}]`}

                  {/* Right edge — resize width */}
                  <div
                    onMouseDown={ev => { setSelected(m.id); startDragRight(ev, m.id) }}
                    style={{
                      position: 'absolute', right: 0, top: '50%',
                      transform: 'translateY(-50%)',
                      width: '8px', height: '30%', minHeight: '8px',
                      cursor: 'ew-resize', background: 'rgba(0,0,0,0.35)',
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                  {/* Bottom edge — resize height */}
                  <div
                    onMouseDown={ev => { setSelected(m.id); startDragBottom(ev, m.id) }}
                    style={{
                      position: 'absolute', bottom: 0, left: '50%',
                      transform: 'translateX(-50%)',
                      height: '8px', width: '30%', minWidth: '8px',
                      cursor: 'ns-resize', background: 'rgba(0,0,0,0.35)',
                      borderRadius: '0 0 3px 3px',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panel */}
        <div style={{ width: '290px', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'auto' }}>
          <h3 style={{ margin: 0 }}>{t.editorBubbles} ({marks.length})</h3>

          {marks.length === 0 && (
            <p style={{ color: '#888', margin: 0 }}>{t.editorNoBubbles}</p>
          )}

          {marks.map((m, i) => (
            <div
              key={m.id}
              style={{
                padding: '8px',
                border: m.id === selected ? '2px solid #e53935' : '1px solid #ddd',
                borderRadius: '4px',
                background: '#fafafa',
                cursor: 'pointer',
              }}
              onClick={() => setSelected(m.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <b>#{i + 1} {m.id}</b>
                <button onClick={e => { e.stopPropagation(); remove(m.id) }}>✕</button>
              </div>
              <div style={{ color: '#888', fontSize: '11px', marginBottom: '6px' }}>
                x: {m.x}%  y: {m.y}%  w: {m.w}%  h: {m.h}%
              </div>

              {/* Font size */}
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label style={{ whiteSpace: 'nowrap' }}>{t.editorFontSize}</label>
                <input type="range" min={0.5} max={6} step={0.1} value={m.fontSize}
                  onChange={e => update(m.id, { fontSize: Number(e.target.value) })}
                  style={{ flex: 1 }} onClick={e => e.stopPropagation()} />
                <span style={{ minWidth: '32px' }}>{m.fontSize}vw</span>
              </div>

              {/* Font family */}
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label style={{ whiteSpace: 'nowrap' }}>{t.editorFontFamily}</label>
                <select value={m.fontFamily}
                  onChange={e => update(m.id, { fontFamily: e.target.value })}
                  onClick={e => e.stopPropagation()} style={{ flex: 1 }}>
                  {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>

              {/* Shape */}
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label style={{ whiteSpace: 'nowrap' }}>{t.editorShape}</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <input type="radio" name={`shape-${m.id}`} value="rect"
                    checked={m.shape === 'rect'}
                    onChange={() => update(m.id, { shape: 'rect' })}
                    onClick={e => e.stopPropagation()} /> {t.editorShapeRect}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <input type="radio" name={`shape-${m.id}`} value="ellipse"
                    checked={m.shape === 'ellipse'}
                    onChange={() => update(m.id, { shape: 'ellipse' })}
                    onClick={e => e.stopPropagation()} /> {t.editorShapeEllipse}
                </label>
              </div>

              {/* Background */}
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <label style={{ whiteSpace: 'nowrap' }}>{t.editorBg}</label>
                <input type="color"
                  value={(() => { const r = m.bg.match(/[\d.]+/g); if (!r) return '#fff050'; const [ri, gi, bi] = [parseInt(r[0]), parseInt(r[1]), parseInt(r[2])]; return '#' + [ri, gi, bi].map(v => v.toString(16).padStart(2, '0')).join('') })()}
                  onChange={e => {
                    const hex = e.target.value
                    const ri = parseInt(hex.slice(1, 3), 16), gi = parseInt(hex.slice(3, 5), 16), bi = parseInt(hex.slice(5, 7), 16)
                    const a = parseFloat(m.bg.match(/[\d.]+/g)?.[3] ?? '0.75')
                    update(m.id, { bg: `rgba(${ri},${gi},${bi},${a})` })
                  }}
                  onClick={e => e.stopPropagation()} />
                <label style={{ whiteSpace: 'nowrap' }}>{t.editorOpacity}</label>
                <input type="range" min={0} max={1} step={0.05}
                  value={parseFloat(m.bg.match(/[\d.]+/g)?.[3] ?? '0.75')}
                  onChange={e => {
                    const a = Number(e.target.value)
                    const r2 = m.bg.match(/[\d.]+/g)
                    if (!r2) return
                    update(m.id, { bg: `rgba(${r2[0]},${r2[1]},${r2[2]},${a})` })
                  }}
                  style={{ width: '60px' }} onClick={e => e.stopPropagation()} />
              </div>

              {/* Position */}
              <div style={{ marginBottom: '6px' }}>
                <label>{t.editorPosition}: </label>
                <select value={m.position}
                  onChange={e => update(m.id, { position: e.target.value as 'left' | 'right' })}
                  onClick={e => e.stopPropagation()}>
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </div>

              <textarea
                placeholder={t.editorBubbleText}
                value={m.text}
                onChange={e => update(m.id, { text: e.target.value })}
                style={{ width: '100%', height: '52px', resize: 'vertical', fontFamily: 'sans-serif', boxSizing: 'border-box' }}
                onClick={e => e.stopPropagation()}
              />
            </div>
          ))}

          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <b>{t.editorOutput}</b>
              <button onClick={() => navigator.clipboard.writeText(output)}>{t.editorCopy}</button>
            </div>
            <textarea
              readOnly
              value={output}
              style={{ width: '100%', height: '180px', fontFamily: 'monospace', fontSize: '11px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
