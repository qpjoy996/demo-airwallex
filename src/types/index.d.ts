export {}

declare global {
  interface Window {}
  interface Document {
    msHidden: any
    mozHidden: any
    webkitHidden: any
  }
}
