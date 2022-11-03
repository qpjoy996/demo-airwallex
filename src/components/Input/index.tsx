import {
  ReactComponentElement,
  useCallback,
  useState,
  FocusEvent,
  MouseEvent,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  HTMLInputTypeAttribute,
  HTMLAttributes,
  ReactNode
} from 'react'
import classnames from 'classnames'
// import Icon from '../../Icon'
import { Overwrite, UISize } from 'types/index'
import './index.less'

export type InputProps = Overwrite<
  HTMLAttributes<HTMLInputElement>,
  {
    /** 输入框内容 */
    value?: string
    /** 前缀 */
    prefix?: ReactComponentElement<any> | ReactNode
    /** 后缀 */
    suffix?: ReactComponentElement<any> | ReactNode
    /** 类型 */
    type?: HTMLInputTypeAttribute
    /** 水平对其方式 */
    align?: 'left' | 'center' | 'right'
    /** 提示信息 */
    placeholder?: string
    /** 尺寸 */
    size?: UISize
    /** 是否行内元素 */
    inline?: boolean
    /** 自动聚焦 */
    autoFocus?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 输入触发 */
    onInput?: (v: string, e: ChangeEvent) => void
    /** 回车触发 */
    onEnter?: (v: string, e: KeyboardEvent) => void
    /** 失去焦点触发 */
    onChange?: (v: string, e: ChangeEvent) => void
    /** 聚焦触发 */
    onFocus?: (e: ChangeEvent) => void
    /** 失去焦点触发 */
    onBlur?: (e: ChangeEvent) => void
    /** 按esc，一般来说是取消编辑 */
    onCancel?: (v: string, e: KeyboardEvent) => void
  }
>

export function Input(props: InputProps) {
  const {
    value = '',
    className = '',
    style,
    prefix,
    suffix,
    type = 'text',
    inline = true,
    align = 'left',
    placeholder,
    size,
    autoFocus = false,
    disabled = false,
    onInput,
    onEnter,
    onChange,
    onBlur,
    onFocus,
    onCancel,
    ...rest
  } = props

  // 初始化标记
  const initedRef = useRef(false)

  // 聚焦
  const [focus, setFocus] = useState(false)
  // 内部值
  const [innerValue, setInnerValue] = useState(value)
  // 输入元素
  const inputRef = useRef<HTMLInputElement>(null)
  // 输入的初始值
  const startValueRef = useRef(String(value))

  // 取消标记
  const cancelRef = useRef(false)

  /**
   * 响应自动聚焦
   */
  useEffect(() => {
    if (initedRef.current) {
      if (autoFocus && inputRef.current) {
        const input = inputRef.current
        input.focus()
      }
    }
  }, [autoFocus])

  /**
   * 响应外部的值
   */
  useEffect(() => {
    if (initedRef.current) {
      setInnerValue(String(value))
    }
  }, [value])

  /**
   * 初始化
   */
  useEffect(() => {
    initedRef.current = true
  }, [])

  /**
   * 处理聚焦
   */
  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocus(true)
      // 记录编辑初始值
      startValueRef.current = innerValue
      onFocus?.(e)
    },
    [innerValue, onFocus]
  )

  /**
   * 处理失去焦点
   */
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (cancelRef.current) {
        cancelRef.current = false
      } else {
        onChange?.(innerValue, e)
      }
      setFocus(false)
      onBlur?.(e)
    },
    [onBlur, onChange, innerValue]
  )

  /**
   * 处理鼠标松开
   */
  const handleMouseUp = useCallback((e: MouseEvent) => {
    // 不应preventDefault，否则会导致无法手动选择的问题
    // 但是也不知道当初为什么加，所以先保留
    // e.preventDefault();
  }, [])

  /**
   * 处理变化
   */
  const handleChange = useCallback(
    (e: ChangeEvent) => {
      let { value: _value } = e.target as HTMLInputElement
      setInnerValue(_value)
      onInput?.(_value, e)
    },
    [onInput]
  )

  /**
   * 处理按键
   */
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter?.((e.target as HTMLInputElement).value, e)
        inputRef.current?.blur()
      } else if (e.key === 'Escape') {
        setInnerValue(startValueRef.current)
        onCancel?.(startValueRef.current, e)
        cancelRef.current = true
        inputRef.current?.blur()
      }
      e.stopPropagation()
    },
    [onEnter, onCancel]
  )

  const cls = classnames([
    'airewallex-input',
    { 'airewallex-input-inline': inline },
    { 'airewallex-input-focus': focus },
    { [`airewallex-input-${size}`]: size },
    { disabled },
    className
  ])

  return (
    <div className={cls} style={style}>
      {type === 'search' && !prefix ? (
        <div className="airewallex-input-prefix">
          {/* <Icon type="search" className="icon-search " standard={false} /> */}
        </div>
      ) : prefix ? (
        <div className="airewallex-input-prefix ">
          {prefix}
        </div>
      ) : null}
      <div className="airewallex-input-wrapper">
        <input
          ref={inputRef}
          value={innerValue}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          spellCheck={false}
          disabled={disabled}
          style={{
            ...(prefix || type === 'search'
              ? { paddingLeft: 4 }
              : {}),
            ...(suffix ? { paddingRight: 4 } : {}),
            textAlign: align,
            ...style
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseUp={handleMouseUp}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          {...rest}
        />
      </div>
      {suffix && (
        <div className="airewallex-input-suffix">
          {suffix}
        </div>
      )}
    </div>
  )
}
