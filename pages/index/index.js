// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    posts: [],
    currentUser: null
  },
  // 事件处理函数

  onLoad: function (options) {
    
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Posts = new wx.BaaS.TableObject('article')

    Posts.expand('created_by').find().then(
      (res) => {
        console.log('post successfully loaded',res)
        self.setData({
          posts: res.data.objects
        })
        console.log(this.data.posts)
      }, (err) => {
        console.log('post failed',err)
      }
    )
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

  navigateToPost: function(e) {
    console.log('calling a post', e)
    wx.navigateTo({
      url: `/pages/article/detail?id=${e.currentTarget.dataset.id}`,
    })
  }
})
