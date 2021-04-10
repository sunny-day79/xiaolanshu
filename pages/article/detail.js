// pages/article/detail.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    article: null,
    reviews: [],
    RecommendedPosts:[],
    currentUser:null,

  },

  /**
   * Lifecycle function--Called when page load
   */
  showReview(options){
    let self = this;
    let reviewQuery = new wx.BaaS.Query()
    let Reviews = new wx.BaaS.TableObject("reviews") 
    reviewQuery.compare('article_id', "=", options.id)
    Reviews.expand('created_by').setQuery(reviewQuery).find().then(
      (res) => {
        console.log("Reviews",res)
        self.setData({
          reviews:res.data.objects
        })
      }
    )
  },

  onLoad: function (options) {
    this.setData({
      currentUser:app.globalData.userInfo,
      options: options
    }), 
    
    console.log('options',options)
    const self = this
    let Article = new wx.BaaS.TableObject("article")
    let RecommendedPost = new wx.BaaS.TableObject("article")
    Article.expand('created_by').get(options.id).then(
      (res) => {
        console.log("GetArticle", res)
        self.setData({
          article: res.data
        })
      }
    )

    this.showReview(options);

    RecommendedPost.expand('created_by').find().then(
      (res) => {
        console.log("GetPost", res)
        self.setData({
          RecommendedPosts: res.data.objects
        })
      }
    )

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

  createReview: function(event) {
    console.log('createReview',event)
    let content = event.detail.value.content
    console.log('value',content)
    let Reviews = new wx.BaaS.TableObject('reviews')
    let newReview = Reviews.create()
    newReview.set({
      content:content,
      article_id: this.data.article.id,
    }),
    newReview.save().then(
      (res) => {
        console.log('savedReview',res)
        let reviewArray = this.data.reviews
        reviewArray.push(res.data)
        this.setData({
          reviews:reviewArray
        })
      },
      (err) => {
        console.log("error", err)
      }
    )
    this.showReview(this.data.options)
  },

  navigateToPost: function(e) {
    console.log('calling a post', e)
    wx.navigateTo({
      url: `/pages/article/detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  navigateToReviews: function(e) {
    console.log('calling a post', e)
    wx.navigateTo({
      url: `/pages/review/review?id=${e.currentTarget.dataset.id}`,
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