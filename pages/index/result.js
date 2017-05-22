var app = getApp();
var data = require("../public/data");
var result = data.getResult();
Page({
  data: {
    right: 0,
    mistake: 0,
    noans: 0
  },
  onLoad: function (options) {
    var page = this;
    wx.getStorage({
      key: 'result',
      success: function(res) {
        var right = 0,mistake = 0,noans = 0;
        for(var i = 0; i < result.total; i++) {
          if(res.data[i+1] != undefined) {
            if( res.data[i+1] == result.question[i].rightkey ) {
              right ++;
            } else {
              mistake ++;
            }
          } else {
            noans ++
          }
        }
        page.setData({
          right: right,
          mistake: mistake,
          noans: noans
        });
        wx.clearStorage();
      },
    });
  }
})