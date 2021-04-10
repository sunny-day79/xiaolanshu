// pages/post/post.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser:null,
    photo: null,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser:app.globalData.userInfo,

  })
  },
  userInfoHandler: function(data) {
    const self = this
    wx.BaaS.auth.loginWithWechat(data).then(
      (res) => {
        console.log('UseLogin',res)
        self.setData ({
          currentUser:res
        }),
        wx.setStorageSync('userInfo', res)
        getApp().globalData.userInfo = res
      },
      (err) => {
      },
    )
  },
  uploadImage: function() {
    const self = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        self.setData({
          photo:res.tempFilePaths[0]
        })
      },
      })

  },

  addArticle: function(event) {
    console.log("addArticle",event)
    let title = event.detail.value.title
    let description = event.detail.value.description
    let article = new wx.BaaS.TableObject('article')
    let newArticle = article.create()
    let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: this.data.photo}
        let metaData = {categoryName: 'articleImage'}
        MyFile.upload(fileParams, metaData).then(res => {
          // Upload successful
          newArticle.set({
            title : title,
            description : description,
            image : res.data.path,
          })
          newArticle.save().then(
            (res) =>
            wx.switchTab({
              url: '/pages/index/index',
            })
          )
        })
    
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