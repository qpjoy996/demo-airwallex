import { useCallback, useEffect, useState } from 'react'
// import { produce } from ''
export type Validator = {
  reg?: RegExp
  equal?: string
  message: string
}

export type ValidateErrors<T> = Partial<
  Record<keyof T, Array<Error | string>>
>

type IBaseRules = {
  [key: string]: {
    value: any
    rules: Validator[]
  }
}

/**
 * @param value
 * @param rules
 *
 * @return {string[]}
 */
export const valid = (
  value: any,
  rules: Validator[]
): string[] => {
  const messages: string[] = []
  rules.forEach((rule) => {
    if (rule.reg && !rule.reg?.test(value)) {
      messages.push(rule.message)
    } else if (rule.equal && value !== rule.equal) {
      messages.push(rule.message)
    }
  })
  return messages
}

export const getValid = <T extends IBaseRules>(
  formValue: T,
  force = false
) => {
  const res: {
    [key in keyof typeof formValue]: {
      valid: boolean
      message: string
    }
  } = Object.keys(formValue).reduce(
    (total, key) => {
      const item = formValue[key as keyof T]
      let valid = true
      let message = ''
      if (force || item.value !== '') {
        for (let i = 0; i < item.rules.length; i++) {
          const rule = item.rules[i]
          if (rule.reg && !rule.reg.test(item.value)) {
            valid = false
            message = rule.message
            break
          }
          if (rule.equal && rule.equal !== item.value) {
            valid = false
            message = rule.message
            break
          }
        }
      }
      total[key as keyof T] = {
        valid,
        message
      }
      return total
    },
    {} as {
      [key in keyof typeof formValue]: {
        valid: boolean
        message: string
      }
    }
  )
  return res
}

export const useValidate = <
  T extends {
    [key: string]: {
      value: any
      rules: Validator[]
    }
  }
>(
  formValue: T
) => {
  const [result, setResult] = useState(getValid(formValue))
  useEffect(() => {
    setResult(getValid(formValue))
  }, [formValue])

  const validate = useCallback(
    (values?: {
      [key in keyof T]?: string
    }) => {
      if (values) {
        Object.entries(formValue).forEach(
          ([key, value]) => {
            value.value = values[key]
          }
        )
      }
      const res = getValid(formValue, true)
      setResult(res)
      return Object.keys(res).every(
        (key) => res[key as keyof T].valid
      )
    },
    [formValue]
  )
  const setError = useCallback(
    (key: keyof T, message: string) => {
      result[key] = {
        valid: false,
        message
      }
      setResult({ ...result })
    },
    [result]
  )
  return { result, validate, setError }
}

export const useValidation = <T extends object>(
  rules: Record<keyof TemplateStringsArray, Validator[]>
) => {
  const [errors, setErrors] = useState<ValidateErrors<T>>(
    {}
  )
  const validate = async (value: T) => {
    const newErrors: Partial<
      Record<keyof T, Array<Error | string>>
    > = {}
    Object.keys(rules).forEach((key) => {
      const rule = rules[key as any]
      const fieldValue = value[key as keyof T]
      const errors = valid(fieldValue, rule)
      if (errors.length > 0) {
        newErrors[key as keyof T] = errors
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length <= 0
  }
  const validateField = async (
    key: keyof T,
    value: T[keyof T]
  ) => {
    const rule = rules[key as any]
    const errors = valid(value, rule)
    if (errors.length > 0) {
      setErrors(errors as any)
    }
    return !errors?.length
  }

  return {
    errors,
    validate,
    validateField,
    setErrors
  }
}
