class Device {
  static u = navigator.userAgent
  static isWeixin() {
    return (
      this.u.toLowerCase().indexOf('micromessenger') !== -1
    )
  }
  static isIOS() {
    return /(ipad|iphone|ipod|iwatch|ios)/i.test(this.u)
    // return !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  static isAndroid() {
    return /android|adr/i.test(this.u)
  }
  static isIosQQ() {
    return this.isIOS() && / QQ/i.test(this.u)
  }
  static isAndroidQQ() {
    return (
      this.isAndroid() &&
      /MQQBrowser/i.test(this.u) &&
      /QQ/i.test(this.u.slice().replace('MQQBrowser', ''))
    )
  }
  static isQQ() {
    // https://www.jianshu.com/p/5bfcfd25a51e
    // return (
    //   this.u.indexOf('MQQBrowser') > -1 ||
    //   this.u.indexOf('QQTheme') > -1
    // )
    return this.isIosQQ() || this.isAndroidQQ()
  }
  static isFeishu() {
    return /feishu/i.test(this.u)
  }
  static isApplets() {
    return this.isWeixin() || this.isQQ() || this.isFeishu()
  }
}

export default Device
