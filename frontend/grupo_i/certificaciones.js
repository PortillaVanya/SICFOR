/* File: certificaciones.js
   Módulo ES6 (usado por index.html y certificados.html)
   - Gestión de certificados en localStorage
   - Dibuja el certificado en <canvas> (permite descarga PNG sin dependencias externas)
   - APIs: generar, guardar, listar, buscar, exportar JSON, eliminar
*/

const STORAGE_KEY = 'sicfor:certificates:v1'

/** Utilities */
const uid = (len = 10) => Math.random().toString(36).slice(2, 2 + len)
const nowISO = () => new Date().toISOString()
const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString()
}

/** Certificate model factory */
function makeCertificate({ name, title, issuer, date, note }) {
  const id = uid(12)
  const verificationCode = uid(16).toUpperCase()
  return {
    id,
    verificationCode,
    name,
    title,
    issuer,
    date,
    note,
    createdAt: nowISO(),
  }
}

/** Storage helpers */
const storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || '[]'
      return JSON.parse(raw)
    } catch (e) {
      console.error('Storage read error', e)
      return []
    }
  },
  save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Storage write error', e)
    }
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  }
}

/** Canvas renderer for certificate (1200 x 675 px) */
function drawCertificateToCanvas(cert, canvas) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width = 1200
  const H = canvas.height = 675

  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Decorative header band
  const gradient = ctx.createLinearGradient(0, 0, W, 0)
  gradient.addColorStop(0, '#2b46d8')
  gradient.addColorStop(1, '#3b82f6')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, W, 110)

  // Title
  ctx.fillStyle = '#06132a'
  ctx.font = '42px Inter, Arial'
  ctx.textAlign = 'left'
  ctx.fillText(cert.title, 60, 180)

  // Issuer small text
  ctx.font = '16px Inter, Arial'
  ctx.fillStyle = '#475569'
  ctx.fillText(`Emitido por: ${cert.issuer}`, 60, 210)

  // Recipient block
  ctx.textAlign = 'center'
  ctx.fillStyle = '#0b1220'
  ctx.font = '20px Inter, Arial'
  ctx.fillText('Otorgado a', W / 2, 320)

  ctx.font = '48px Inter, Arial'
  ctx.fillStyle = '#0b1220'
  ctx.fillText(cert.name, W / 2, 380)

  // Note / description
  ctx.font = '18px Inter, Arial'
  ctx.fillStyle = '#334155'
  wrapText(ctx, cert.note, W / 2 - 440, 440, 880, 28)

  // Footer: date and verification code
  ctx.textAlign = 'left'
  ctx.font = '16px Inter, Arial'
  ctx.fillStyle = '#475569'
  ctx.fillText(`Fecha: ${formatDate(cert.date)}`, 60, H - 70)

  ctx.textAlign = 'right'
  ctx.fillText(`Código de verificación: ${cert.verificationCode}`, W - 60, H - 70)

  // Simple QR-like box (mock) — draws a stylized square representing a QR
  drawMockQR(ctx, cert.verificationCode, W - 220, H - 170, 150)
}

/** Small helper: draw a mock QR (visual element only) */
function drawMockQR(ctx, text, x, y, size) {
  ctx.save()
  ctx.fillStyle = '#0b1220'
  ctx.fillRect(x, y, size, size)
  ctx.fillStyle = '#fff'
  ctx.fillRect(x + 12, y + 12, size - 24, size - 24)
  // inner pattern
  ctx.fillStyle = '#0b1220'
  const step = Math.floor((size - 24) / 6)
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillRect(x + 12 + i * step, y + 12 + j * step, step - 2, step - 2)
      }
    }
  }
  ctx.restore()
}

/** Text wrapping helper for canvas */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  ctx.textAlign = 'center'
  const words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x + maxWidth / 2, y)
      line = words[n] + ' '
      y += lineHeight
    } else {
      line = testLine
    }
  }
  if (line) ctx.fillText(line.trim(), x + maxWidth / 2, y)
}

/** Download canvas as PNG */
function downloadCanvasAsPNG(canvas, filename = 'certificado.png') {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, 'image/png', 1)
}

/** Page module logic */
class CertificateModule {
  constructor() {
    this.certList = storage.load()
    this._initPages()
  }

  _initPages() {
    // Index page elements
    this.form = document.getElementById('form-generate')
    this.inputName = document.getElementById('input-name')
    this.inputTitle = document.getElementById('input-title')
    this.inputIssuer = document.getElementById('input-issuer')
    this.inputDate = document.getElementById('input-date')
    this.inputNote = document.getElementById('input-note')
    this.btnPreview = document.getElementById('btn-preview')
    this.btnClear = document.getElementById('btn-clear')
    this.canvas = document.getElementById('certificate-canvas')
    this.btnDownload = document.getElementById('btn-download')
    this.btnCopyJSON = document.getElementById('btn-copy-json')
    this.msg = document.getElementById('msg')

    // History page elements (if present)
    this.historyList = document.getElementById('history-list')
    this.searchCode = document.getElementById('search-code')
    this.btnSearch = document.getElementById('btn-search')
    this.btnClearSearch = document.getElementById('btn-clear-search')
    this.searchResult = document.getElementById('search-result')
    this.btnExportJson = document.getElementById('btn-export-json')
    this.btnClearHistory = document.getElementById('btn-clear-history')

    // Attach handlers where relevant
    if (this.form) this._attachIndexHandlers()
    if (this.historyList) this._attachHistoryHandlers()

    // initial render
    if (this.canvas) this._renderEmptyCanvas()
    if (this.historyList) this._renderHistory()
  }

  _attachIndexHandlers() {
    // default date to today
    if (this.inputDate && !this.inputDate.value) {
      this.inputDate.value = new Date().toISOString().slice(0, 10)
    }

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleGenerateAndSave()
    })

    this.btnPreview?.addEventListener('click', () => {
      this._renderPreviewFromForm()
    })

    this.btnClear?.addEventListener('click', () => {
      this.form.reset()
      this._renderEmptyCanvas()
      this._setMessage('Formulario limpiado', 'info')
      if (this.btnDownload) this.btnDownload.disabled = true
      if (this.btnCopyJSON) this.btnCopyJSON.disabled = true
    })

    this.btnDownload?.addEventListener('click', () => {
      if (!this.currentPreview) return
      const filename = `certificado_${this.currentPreview.id}.png`
      downloadCanvasAsPNG(this.canvas, filename)
    })

    this.btnCopyJSON?.addEventListener('click', () => {
      if (!this.currentPreview) return
      navigator.clipboard?.writeText(JSON.stringify(this.currentPreview, null, 2))
        .then(() => this._setMessage('JSON copiado al portapapeles', 'info'))
        .catch(() => this._setMessage('No se pudo copiar JSON', 'error'))
    })
  }

  _attachHistoryHandlers() {
    this.btnSearch?.addEventListener('click', () => {
      const q = (this.searchCode.value || '').trim().toUpperCase()
      if (!q) { this.searchResult.textContent = 'Ingrese un código.'; return }
      const found = this.certList.find(c => c.verificationCode === q)
      if (found) {
        this.searchResult.textContent = `Certificado válido — ${found.name} · ${found.title} · emitido: ${formatDate(found.date)}`
        this.searchResult.classList.remove('muted')
      } else {
        this.searchResult.textContent = 'No se encontró el código.'
        this.searchResult.classList.add('muted')
      }
    })

    this.btnClearSearch?.addEventListener('click', () => {
      this.searchCode.value = ''
      this.searchResult.textContent = ''
    })

    this.btnExportJson?.addEventListener('click', () => {
      const dataStr = JSON.stringify(this.certList, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificados_sicfor_${new Date().toISOString().slice(0,10)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    })

    this.btnClearHistory?.addEventListener('click', () => {
      if (!confirm('¿Eliminar todo el historial de certificados? Esta acción es irreversible.')) return
      this.certList = []
      storage.clear()
      this._renderHistory()
      this._setMessage('Historial eliminado', 'info')
    })
  }

  _setMessage(text, type = 'info') {
    if (!this.msg) return
    this.msg.textContent = text
    this.msg.setAttribute('aria-hidden', 'false')
    this.msg.style.display = 'block'
    if (type === 'error') this.msg.style.background = '#fff1f2'
    else this.msg.style.background = '#f8fafc'
    setTimeout(() => {
      this.msg.style.display = 'none'
    }, 3000)
  }

  _renderEmptyCanvas() {
    if (!this.canvas) return
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '20px Inter, Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Previsualización del certificado', this.canvas.width / 2, this.canvas.height / 2)
  }

  _renderPreviewFromForm() {
    if (!this.canvas) return
    const payload = {
      name: this.inputName.value.trim() || 'Nombre del beneficiario',
      title: this.inputTitle.value.trim() || 'Certificado',
      issuer: this.inputIssuer.value.trim() || 'Centro',
      date: this.inputDate.value || new Date().toISOString().slice(0,10),
      note: this.inputNote.value.trim() || ''
    }
    const temp = { ...makeCertificate(payload) }
    // Do not add to storage yet — this is a preview
    this.currentPreview = temp
    drawCertificateToCanvas(temp, this.canvas)
    if (this.btnDownload) this.btnDownload.disabled = false
    if (this.btnCopyJSON) this.btnCopyJSON.disabled = false
    this._setMessage('Vista previa actualizada', 'info')
  }

  _handleGenerateAndSave() {
    const payload = {
      name: this.inputName.value.trim(),
      title: this.inputTitle.value.trim(),
      issuer: this.inputIssuer.value.trim(),
      date: this.inputDate.value || new Date().toISOString().slice(0,10),
      note: this.inputNote.value.trim()
    }
    if (!payload.name) { alert('El nombre del beneficiario es obligatorio'); return }
    const cert = makeCertificate(payload)
    // Save to storage
    this.certList.unshift(cert)
    storage.save(this.certList)
    this._setMessage('Certificado generado y guardado en historial', 'info')
    // Render preview and enable download
    this.currentPreview = cert
    if (this.canvas) drawCertificateToCanvas(cert, this.canvas)
    if (this.btnDownload) this.btnDownload.disabled = false
    if (this.btnCopyJSON) this.btnCopyJSON.disabled = false
    // If on history page, update list (if present)
    this._renderHistory()
    // Keep form values but let user know
  }

  _renderHistory() {
    if (!this.historyList) return
    this.historyList.innerHTML = ''
    if (!this.certList || this.certList.length === 0) {
      this.historyList.innerHTML = `<div class="small muted">No hay certificados en el historial.</div>`
      return
    }

    for (const cert of this.certList) {
      const item = document.createElement('div')
      item.className = 'history-item'
      item.innerHTML = `
        <div>
          <div style="font-weight:700">${escapeHtml(cert.name)}</div>
          <div class="history-meta">${escapeHtml(cert.title)} · emitido: ${formatDate(cert.date)}</div>
          <div class="history-meta">Código: <strong>${cert.verificationCode}</strong></div>
          <div class="history-meta">Generado: ${new Date(cert.createdAt).toLocaleString()}</div>
        </div>
        <div class="history-actions">
          <button data-id="${cert.id}" class="btn-outline btn-view">Ver</button>
          <button data-id="${cert.id}" class="btn-ghost btn-delete">Eliminar</button>
        </div>
      `
      this.historyList.appendChild(item)
    }

    // Attach listeners for view / delete
    this.historyList.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id')
        const cert = this.certList.find(c => c.id === id)
        if (!cert) return
        // Open a small window with the PNG (download in-memory)
        const tmpCanvas = document.createElement('canvas')
        tmpCanvas.width = 1200
        tmpCanvas.height = 675
        drawCertificateToCanvas(cert, tmpCanvas)
        tmpCanvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          window.open(url, '_blank')
          setTimeout(() => URL.revokeObjectURL(url), 30000)
        }, 'image/png', 1)
      })
    })

    this.historyList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id')
        if (!confirm('¿Eliminar este certificado del historial?')) return
        this.certList = this.certList.filter(c => c.id !== id)
        storage.save(this.certList)
        this._renderHistory()
        this._setMessage('Certificado eliminado', 'info')
      })
    })
  }
}

/** Small HTML escape utility */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]))
}

/** Initialize module when DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  // instantiate module
  window.SICFOR_CertModule = new CertificateModule()
})