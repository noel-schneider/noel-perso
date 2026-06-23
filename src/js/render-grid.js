import { projects } from '../data/projects.js'

function cardHTML(p) {
  const isExternal = p.kind === 'external'
  const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const arrow = isExternal ? '↗' : '→'
  return `
    <a href="${p.href}"${targetAttrs}
       class="group relative block aspect-square overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      <img src="${p.image}" alt="${p.title}" loading="lazy"
           class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <span class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
        <span class="flex flex-col">
          <span class="text-[11px] uppercase tracking-wider text-white/70">${p.category}</span>
          <span class="text-sm font-medium text-white">${p.title}</span>
        </span>
        <span class="text-sm text-white/80 transition-transform group-hover:translate-x-0.5">${arrow}</span>
      </span>
    </a>`
}

function renderGrid() {
  const grid = document.querySelector('[data-projects-grid]')
  if (!grid) return
  grid.innerHTML = projects.map(cardHTML).join('')
}

renderGrid()
