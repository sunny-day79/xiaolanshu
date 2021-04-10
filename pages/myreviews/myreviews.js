// pages/myreviews/myreviews.js
const app = getApp()
Page({
  /**
   * Page initial data
   */
  data: {
  currentUser: null,
  myreviews:[],

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let self = this;
    this.setData({
      currentUser: app.globalData.userInfo
    });

    let Myreviews = new wx.BaaS.TableObject('reviews')
    let query = new wx.BaaS.Query();
    query.compare("created_by", "=", this.data.currentUser.id)
    Myreviews.expand(['article_id']).setQuery(query).find().then(
      (res) => {
        console.log("getting your reviews", res)
        self.setData({
          myreviews: res.data.objects
        })
      },
      (err) => {
        console.log('err', err)
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
})