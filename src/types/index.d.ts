export {}

declare global {
  interface Window {}
  interface Document {
    msHidden: any
    mozHidden: any
    webkitHidden: any
  }
}

export type UISize = 'default' | 'small' | 'large'
export type Overwrite<T, U> = Pick<
  T,
  Exclude<keyof T, keyof U>
> &
  U
