'use strict';

export default function () {

  window.baseURL = 'http://www.careeach.net:8090/Campus/';

  //设置学生与手环绑定
  const setBindURL             = 'setBind';
  window.getBindURL            = baseURL + setBindURL;

  //修改学生与手环的绑定信息
  const updateBindInfoURL      = 'updateBindInfo';
  window.getUpdateBindInfoURL  = baseURL + updateBindInfo;

  //删除学生与手环的绑定信息
  const deleteBindInfoURL      = 'deleteBindInfo';
  window.getDeleteBindInfoURL  = baseURL + deleteBindInfo;

  //查看班级学生健康报表信息
  const getHealthReportURL     = 'getHealthReport';
  window.getHealthReportURL    = baseURL + getHealthReport;

  //查看学生健康详情
  const getHealthDetailURL     = 'getHealthDetail';
  window.getHealthDetailURL    = baseURL + getHealthDetail;
}
