import React, {
  useRef,
  useCallback,
  useContext,
  MutableRefObject
} from 'react'
import ModalContext from './ModalContext'
import usePortal from './usePortal'
import useSSR from './useSSR'
type UseModalArgs = {
  onOpen: any
  onClose: any
  background: string
}

const defaults = {
  onOpen() {},
  onClose() {},
  background: ''
}

const modalStyles = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 1000
}

const useModal = ({
  onOpen,
  onClose,
  background,
  ...config
}: UseModalArgs = defaults) => {
  const { isServer } = useSSR()
  const context = useContext(ModalContext)
  const bg =
    background === null
      ? ''
      : background || context.background
  const modal = useRef() as MutableRefObject<HTMLDivElement>

  const {
    isOpen,
    togglePortal,
    openPortal,
    closePortal,
    Portal: Backdrop,
    ref,
    portalRef
  } = usePortal({
    onOpen(event: any) {
      if (isServer) return
      //   disableBodyScroll(document.body)

      // eslint-disable-next-line no-param-reassign
      // event.portal.current.className = 'qp-modal'
      event.portal.current.style.cssText = `
        position: absolute;
        background: ${bg ? bg : 'transparent'};
        width: 100vw;
        height: 100vh;
        top: ${window.scrollY}px;
        left: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.7);
      `

      if (onOpen) onOpen(event)
    },
    onClose(event: any) {
      if (isServer) return
      //   enableBodyScroll(document.body)

      // eslint-disable-next-line no-param-reassign
      event.portal.current.removeAttribute('style')
      if (onClose) onClose(event)
    },
    onPortalClick({ target }: any) {
      const clickingOutsideModal =
        modal &&
        modal.current &&
        !modal.current.contains(target as Node)
      if (clickingOutsideModal) closePortal()
    },
    ...config
  })
  const ModalWithBackdrop = useCallback(
    (props: any) => (
      <Backdrop>
        <div ref={modal} style={modalStyles} {...props} />
      </Backdrop>
    ),
    [modalStyles]
  )
  return Object.assign(
    [
      openPortal,
      closePortal,
      isOpen,
      ModalWithBackdrop,
      togglePortal,
      ref,
      portalRef,
      modal
    ],
    {
      Modal: ModalWithBackdrop,
      toggleModal: togglePortal,
      openModal: openPortal,
      closeModal: closePortal,
      isOpen,
      targetRef: ref,
      backdropRef: portalRef,
      modalRef: modal
    }
  )
}

export default useModal
