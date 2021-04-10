// pages/review/review.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser:null,
    reviews: [],

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser:app.globalData.userInfo,
    })

    console.log('options',options)
    const self = this
    let Reviews = new wx.BaaS.TableObject("reviews") 
    let reviewQuery = new wx.BaaS.Query()
    reviewQuery.compare('article_id', "=", options.id)
    Reviews.expand('created_by').setQuery(reviewQuery).find().then(
      (res) => {
        self.setData({
          reviews:res.data.objects
        })
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

  }
})