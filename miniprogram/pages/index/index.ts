import { getAllRoads } from "../../utils/api";

const amapFile = require('../../utils/amap-wx.js');//如：..­/..­/libs/amap-wx.js

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    markersData: [],
    myAmapFun: {} as any,
    polyline: [],
  },
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(this.data.markersData,id);
    that.changeMarkerColor(this.data.markersData,id);
  },
  onLoad: function() {
    var myAmapFun = new amapFile.AMapWX({key:'0790205930eada0051631c3e406c029c'});
    this.setData({ myAmapFun })
    this.getCurrentLocation();
    this.getAllRoad();
  },

  async getAllRoad () {
    const res: any = await getAllRoads();
    const roadList = [];
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i];
        roadList.push({
          points: [{latitude: item.road_starting_latitude, longitude: item.road_starting_longitude}, {latitude: item.road_end_latitude, longitude: item.road_end_longitude}],
          color: '#ff0000',
          width: 5
        })
      }
    }
    
    this.setData({
      polyline: roadList,
    })
  },

  getCurrentLocation: function(){
    const that = this;
    wx.getLocation({
      success: (res) => {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    })
  },

  getPoiAround: function() {
    var that = this;
    this.data.myAmapFun.getPoiAround({
      // iconPathSelected: '选中 marker 图标的相对路径', //如：..­/..­/img/marker_checked.pngmarkersData
      // iconPath: '未选中 marker 图标的相对路径', //如：..­/..­/img/marker.png
      success: function(data){
        that.setData({
          markersData: data.markers
        })
        that.setData({
          markers: that.data.markersData
        });
        // that.setData({
        //   latitude: that.data.markersData[0].latitude
        // });
        // that.setData({
        //   longitude: that.data.markersData[0].longitude
        // });
        that.showMarkerInfo(that.data.markersData,0);
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  },

  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function(data,i){
    var that = this;
    var markers = [];
    for(var j = 0; j < data.length; j++){
      // if(j==i){
      //   data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      // }else{
      //   data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      // }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})
