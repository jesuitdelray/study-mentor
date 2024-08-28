export function crossIcon(className: string) {
  // eslint-disable-next-line max-len
  const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
</svg>`

  const closeEl = new DOMParser()
    .parseFromString(crossIcon, 'image/svg+xml')
    .querySelector('svg') as SVGElement
  closeEl.classList.add(className)

  return closeEl
}
