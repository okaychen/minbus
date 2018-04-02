"use static";
var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
  // 靠左上角位置
  anchor: BMAP_ANCHOR_TOP_LEFT,
  // LARGE类型
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  // 启用显示定位
  enableGeolocation: true
});
map.addControl(navigationControl);
// 添加定位控件
var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess", function (e) {
  // 定位成功事件
  var address = '';
  address += e.addressComponent.province;
  address += e.addressComponent.city;
  address += e.addressComponent.district;
  address += e.addressComponent.street;
  address += e.addressComponent.streetNumber;
  alert("当前定位地址为：" + address);
});
geolocationControl.addEventListener("locationError", function (e) {
  // 定位失败事件
  alert(e.message);
});
map.addControl(geolocationControl);
map.enableScrollWheelZoom(); //启用滚轮
map.enablePinchToZoom(); // 启用手指放大缩小
//自动定位
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function (r) {
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    var mk = new BMap.Marker(r.point);
    map.addOverlay(mk);
    map.panTo(r.point);
    // alert('您的位置：'+r.point.lng+','+r.point.lat);
  } else {
    alert('failed' + this.getStatus());
  }
}, {
  enableHighAccuracy: true
})