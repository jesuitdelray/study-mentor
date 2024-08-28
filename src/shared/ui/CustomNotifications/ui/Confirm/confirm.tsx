import { TRANSITION_TIME } from '../../const/const'
import { disableKeyboard } from '../../lib/disableKeyBoard'
import { crossIcon } from '../../svg/crossIcon'
import { whiteWarningIcon } from '../../svg/whiteWarningIcon'
import styles from './confirm.module.scss'

export function Confirm(message: string): Promise<boolean> {
  const wrapperEl = document.createElement('div')
  const containerEl = document.createElement('div')
  const infoContainerEl = document.createElement('div')
  const titleBlockEl = document.createElement('div')
  const buttonContainerEl = document.createElement('div')
  const messageEl = document.createElement('p')
  const strongTextEl = document.createElement('strong')
  const confirmBtnEl = document.createElement('button')
  confirmBtnEl.textContent = 'Confirm'
  const refuseBtnEl = document.createElement('button')
  refuseBtnEl.textContent = 'Cancel'

  const closeIconEl = crossIcon(styles.cross)
  const iconEl = whiteWarningIcon(styles.icon)

  strongTextEl.textContent = 'Confirm your action'
  messageEl.textContent = message
  messageEl.classList.add(styles.message)
  wrapperEl.classList.add(styles.wrapper)
  containerEl.classList.add(styles.container)
  infoContainerEl.classList.add(styles.infoContainer)
  titleBlockEl.classList.add(styles.titleBlock)
  buttonContainerEl.classList.add(styles.btnContainer)

  containerEl.style.transition = `all ${TRANSITION_TIME}ms ease-in`

  titleBlockEl.append(strongTextEl)
  titleBlockEl.append(closeIconEl)

  infoContainerEl.append(iconEl)
  infoContainerEl.append(messageEl)

  buttonContainerEl.append(confirmBtnEl)
  buttonContainerEl.append(refuseBtnEl)

  containerEl.append(titleBlockEl)
  containerEl.append(infoContainerEl)
  containerEl.append(buttonContainerEl)
  wrapperEl.append(containerEl)

  document.body.append(wrapperEl)

  function cleanup(timeout = 0) {
    disableKeyboard.remove()
    setTimeout(() => {
      containerEl.classList.remove(styles.appended)
    }, timeout)

    setTimeout(() => {
      wrapperEl.remove()
    }, timeout + TRANSITION_TIME)
  }

  requestAnimationFrame(() => {
    containerEl.classList.add(styles.appended)
  })

  disableKeyboard.add()

  return new Promise((res, rej) => {
    confirmBtnEl.onclick = () => {
      cleanup()
      res(true)
    }
    refuseBtnEl.onclick = () => {
      cleanup()
      res(false)
    }
    closeIconEl.onclick = () => {
      cleanup()
      res(false)
    }
  })
}
