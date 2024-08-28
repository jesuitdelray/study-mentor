import { ReactNode } from "react"
import { createPortal } from "react-dom"

type TPortalProps = {
    children: ReactNode
    element?: HTMLElement
}

export const Portal = (props: TPortalProps) => {
    const { children, element = document.body } = props

    return createPortal(children, element)
}
