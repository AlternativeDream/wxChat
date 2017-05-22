//exam.js

var app = getApp();
var data = require("../public/data");
var ques = data.getData();
var total = parseInt(ques.total);
var answer = {};

Page({
  data: {
    question: ques.question[0],
    answer: ''
  },
  lastques: function() {
    var id = parseInt(this.data.question.id);

    if (id > 1) {
      id = id - 2;

      this.setData({
        question: ques.question[id],
        answer: answer[id+1]
      })
    }

    if(answer[id+1] == undefined) {
      this.setData({
        answer: ''
      });
    }
  },
  nextques: function() {
    var id = parseInt(this.data.question.id);

    if(id < total){
      this.setData({
        question: ques.question[id],
        answer: answer[id+1]
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '是否提交结果',
        success: function(res) {
          if(res.confirm) {
            console.log("交卷");
            wx.setStorage({
              key: 'result',
              data: answer,
            })
            wx.navigateTo({
              url: '../index/result',
            })
          }
        }
      })
    }

    if (answer[id + 1] == undefined) {
      this.setData({
        answer: ''
      });
    }
  },
  option: function(event) {
    var id = parseInt(this.data.question.id);
    answer[id] = ques.question[id-1].options[event.currentTarget.id-1].oOrder;
    this.setData({
      answer: answer[id]
    });
  },
  onLoad: function (options) {
    var id = parseInt(this.data.question.id);
    var page = this;
    if(answer[id] != undefined) {
      page.setData({
        answer: answer[id]
      });
    } else {
      page.setData({
        answer: ''
      });
    }
  }
})