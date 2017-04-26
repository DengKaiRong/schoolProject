'use strict';

// get请求，vue vue势力,url地址，params参数，callback回调函数
exports.get = function (vue, url, params, callback) {
  vue.$http({
    method: 'GET',
    url: url,
    params: params
  }).then(function (response) {
    response.body = JSON.parse(response.body);
    callback(response);
  });
};

// post，vue vue势力,url地址，params参数，callback回调函数
exports.post = function (vue, url, params, callback) {
  vue.$http({
    method: 'POST',
    url: url,
    body: params
  }).then(function (response) {
    response.body = JSON.parse(response.body);
    callback(response);
  });
};

// 请求网络数据, 无处理
exports.getOriginData = function (vue, url, params, callback){
    vue.$http({
    method: 'GET',
    url: url,
    params: params
  }).then(function (response) {
    callback(response);
  });
}

// 请求网络数据, 无处理, POST
exports.postOriginData = function (vue, url, params, callback){
    vue.$http({
    method: 'POST',
    url: url,
    body: params
  }).then(function (response) {
    callback(response);
  });
}
