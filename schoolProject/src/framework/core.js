
// 地址栏参数数据转换
exports.dataConversion = (dataStr) => {
  return JSON.parse(decodeURI(dataStr));
};

exports.equipment = (val) => {
  var res = false;
  const userAgent = navigator.userAgent.toLowerCase();
  if(userAgent.indexOf(val) > -1) {
    res = true;
  }
  return res;
};

exports.numformat = function (n) {
  var num = n;
  if (typeof (n) != 'number') {
    num = parseFloat(n).toFixed(0);
  }
  var reg = /^-?\d+\.?\d*$/;
  if (reg.test(num)) {
    var length = (num + "").match(/\d/g).length;
    if (length > 4 && length <= 8) {
      var val = (num / 10000).toFixed(2);
      var tmp = parseFloat(val).toFixed(0);
      if (tmp.length >= 3) {
        val = parseFloat(val).toFixed(0);
      } else if (tmp.length >= 2) {
        val = parseFloat(val).toFixed(1);
      }
      return val + '万';
    } else if (length > 8 && length <= 12) {
      var val = (num / 100000000).toFixed(2);
      var tmp = parseFloat(val).toFixed(0);
      if (tmp.length >= 3) {
        val = parseFloat(val).toFixed(0);
      } else if (tmp.length >= 2) {
        val = parseFloat(val).toFixed(1);
      }
      return val + '亿';
    } else if (length > 12) {
      var val = (num / 1000000000000).toFixed(2);
      var tmp = parseFloat(val).toFixed(0);
      if (tmp.length >= 3) {
        val = parseFloat(val).toFixed(0);
      } else if (tmp.length >= 2) {
        val = parseFloat(val).toFixed(1);
      }
      return val + '万亿';
    } else {
      return parseFloat(n).toFixed(2) + '元';
    }
  } else {
    return n;
  }
}
