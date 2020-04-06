var uploadImage = require('../../js/uploadImg/uploadImg.js');//地址换成你自己存放文件的位置

Page({
  data: {

  },

  //选择照片
  choose: function () {
    wx.chooseImage({
      count: 3, // 默认最多一次选择3张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/images/当前年月日文件下的/图片.png
          //图片路径可自行修改【(这二个参数就是你oss地址目录的下一个路径目录，比如:https://xxx.com/images/xxx.png)】
          uploadImage(res.tempFilePaths[i], 'images/',
            function (result) {
              console.log("======上传成功图片地址为：", result);
              //这个result就是返给你上传到oss上的地址链接
              wx.hideLoading();
            }, function (result) {
              console.log("======上传失败======", result);
              
              wx.hideLoading()
            }
          )
        }
      }
    })
  }
})