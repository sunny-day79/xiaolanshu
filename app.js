// app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = '165a1925b454cbd63204'  // 应用名称: SENadvisor' first MiniApp
    wx.BaaS.init(clientID)

    const self = this
    wx.BaaS.auth.getCurrentUser().then(
      (res) => {
        console.log("res from appjs", res)
        wx.setStorageSync('userInfo', res)
        self.globalData.userInfo = res
      }, err => (console.log(err))
    )
  },

  globalData: {
    userInfo: wx.getStorageSync('userInfo')
  }
})