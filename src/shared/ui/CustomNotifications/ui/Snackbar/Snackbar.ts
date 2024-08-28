import { snackbarConstructor } from './snackbarConstructor'

export const Alert = {
  error(message: string, variant?: 'error') {
    snackbarConstructor(message, (variant = 'error'))
  },
  normal(message: string, variant?: 'normal') {
    snackbarConstructor(message, (variant = 'normal'))
  }
}
