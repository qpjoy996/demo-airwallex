import useToastCore, {
  ToastCoreConfigI
} from './useToastCore'

export interface useToastProps {
  success: (
    message: string,
    config?: ToastCoreConfigI | undefined
  ) => void
  error: (
    message: string,
    config?: ToastCoreConfigI | undefined
  ) => void
  warning: (
    message: string,
    config?: ToastCoreConfigI | undefined
  ) => void
  core: (
    message: string,
    config?: ToastCoreConfigI | undefined
  ) => void
}

function useToast() {
  const { success, error, warning, core } = useToastCore()

  return { success, error, warning, core }
}

export default useToast
