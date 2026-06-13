import { projects } from '../data/projects.js'

function cardHTML(p) {
  const isExternal = p.kind === 'external'
  const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const arrow = isExternal ? '↗' : '→'
  return `
    <a href="${p.href}"${targetAttrs}
       class="group flex min-h-[120px] flex-col justify-between rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <span class="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">${p.category}</span>
      <span class="mt-6 flex items-end justify-between">
        <span class="text-lg font-medium">${p.title}</span>
        <span class="text-sm text-neutral-400 transition-transform group-hover:translate-x-0.5 dark:text-neutral-500">${arrow}</span>
      </span>
    </a>`
}

function renderGrid() {
  const grid = document.querySelector('[data-projects-grid]')
  if (!grid) return
  grid.innerHTML = projects.map(cardHTML).join('')
}

renderGrid()
