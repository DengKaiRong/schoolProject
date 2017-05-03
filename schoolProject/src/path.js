'use strict';

export default function () {
  window.baseURL = 'http://www.careeach.net:8090/Campus/';
  // window.baseURL = 'http://localhost:8080/Campus/';

  //设置学生与手环绑定
  const setBindURL             = 'setBind';
  window.getBindURL            = baseURL + setBindURL;

  //修改学生与手环的绑定信息
  const updateBindInfoURL      = 'updateBindInfo';
  window.getUpdateBindInfoURL  = baseURL + updateBindInfoURL;

  //删除学生与手环的绑定信息
  const deleteBindInfoURL      = 'deleteBindInfo';
  window.getDeleteBindInfoURL  = baseURL + deleteBindInfoURL;

  //查看班级学生健康报表信息
  const getHealthReportURL     = 'getHealthReport';
  window.getHealthReportURL    = baseURL + getHealthReportURL;

  //查看学生健康详情
  const getHealthDetailURL     = 'getHealthDetail';
  window.getHealthDetailURL    = baseURL + getHealthDetailURL;

  //查看已绑定的手环列表
  const getStuBindReportURL     = 'getStuBindReport';
  window.getStuBindReportURL    = baseURL + getStuBindReportURL;

  //获取学生学号
  const getStudentNoURL         = 'getStudentNo';
  window.getStudentNoURL        = baseURL + getStudentNoURL;

}
