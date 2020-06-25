
//注册一个界面
// pages/fruitsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruitslist:[
      {name:"香蕉",number:10,price:1,buynbr:0,reducedis:false,adddis:false},
      {name:"苹果",number:10,price:3,buynbr:0,reducedis:false,adddis:false},
      {name:"橘子",number:10,price:2,buynbr:0,reducedis:false,adddis:false},
      {name:"芒果",number:10,price:4,buynbr:0,reducedis:false,adddis:false},
    ],
    sum:0
  },

    handlePushBtn: function (event) {
      var dataset = event.currentTarget.dataset;
      var sum = dataset.total;
      wx.navigateTo({
        url: '/pages/Purchase/Purchase',
        events: {
          // 获取传送数据
          acceptDataFromOpenedPage: function(data) {
          }
        },
        success: function(res) {
          // 传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', sum)
        }
      })
  },

  decrease:function(e){ 
    var dataset = e.currentTarget.dataset;
    var buynum = dataset.buynum;
    var index = dataset.index; 
    let fruitslist = this.data.fruitslist;    
    let num = fruitslist[index].buynbr; 
    if(num == 0){      
      wx.showToast({title: '不能再减了~',icon:'none'})      
      return ;   
    }     
    num = num - 1; 
    fruitslist[index].buynbr = num; 
    fruitslist[index].number = fruitslist[index].number + 1; 
    this.setData({fruitslist:fruitslist}); 
    this.count_price();
  },  
      
  increase:function(e){    
    var dataset = e.currentTarget.dataset;
    var buynum = dataset.buynum; 
    var index = dataset.index;  
    let fruitslist = this.data.fruitslist;    
    let num = fruitslist[index].buynbr;   
    if(fruitslist[index].number == 0){      
      wx.showToast({title: '不能再加了~',icon:'none'})      
      return ;   
    } 
    num = num + 1;    
    fruitslist[index].buynbr = num; 
    fruitslist[index].number = fruitslist[index].number - 1;  
    this.setData({fruitslist:fruitslist});   
    this.count_price(); 
  },

  count_price() { 
    let fruitslist = this.data.fruitslist; 
    let total = 0;      
    for (let i = 0; i < fruitslist.length; i++) {         
        total += fruitslist[i].buynbr * fruitslist[i].price;        
    }    
    this.setData({sum:total}); 
 },

 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
  } 
})