// pages/profile/profile.js
const app = getApp()
Page({
  /**
   * Page initial data
   */
  data: {
    currentUser: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })
},


  userInfoHandler: function(userInfo) {
    let self = this 
    wx.baas.auth.loginWithWechat(userInfo).then(
      (res) => {
        console.log('userInfo', res);
        self.setData({currentUser: res});
        wx.setStorageSync('userInfo', res)
      },
      err => {
        console.log('error!', err)
      }
      )
  },

  

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

})