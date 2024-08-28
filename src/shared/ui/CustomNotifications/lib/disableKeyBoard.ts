function buttonHandler(e: KeyboardEvent) {
  e.preventDefault()
}

export const disableKeyboard = {
  add() {
    document.addEventListener('keydown', buttonHandler)
  },
  remove() {
    document.removeEventListener('keydown', buttonHandler)
  }
}
