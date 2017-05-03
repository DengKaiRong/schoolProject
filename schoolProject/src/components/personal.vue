<template>
  <div class="xycon">
		<div class="xycona">
			<div class="pertop">
				<div class="xy_h4"><h4>学生明细数据</h4></div>
				<form action="#" id="perform" onsubmit="return false">
				<div class="xy_icon">
				    <div class="xy_inline">
				      <label>学号：</label>
              <select class="kr_select" v-model="data.studentNo">
                  <option v-for="(val, index) of stuList">{{val}}</option>
              </select>
				    </div>
				    <div class="xy_inline">
				      <label>姓名：</label>
				      <div class="xy_dinput">
				        <input type="text" v-model="data.userName"  class="xy_input died" disabled="disabled">
				      </div>
				    </div>
				     <div class="xy_inline">
				      <label>手环：</label>
				      <div class="xy_dinput">
				         <input type="text" v-model="data.type"  class="xy_input died" disabled="disabled">
				      </div>
				    </div>
				    <div class="xy_inline">
				      <label>日期：</label>
				      <div class="xy_dinput">
				        <input type="text" v-model="data.date"  class="xy_input died" disabled="disabled">
				      </div>
				    </div>
				     <div class="xy_inline">
				      <label>步数：</label>
				      <div class="xy_dinput">
				        <input type="text" v-model="data.steps"  class="xy_input died" disabled="disabled">
				      </div>
				    </div>
				    <div class="xy_inline">
				      <label>心率：</label>
				      <div class="xy_dinput">
				        <input type="text" v-model="data.number"  class="xy_input died" disabled="disabled">
				      </div>
				    </div>
				    <div class="xy_inline">
				      <div class="xy_dinput">
				      	<label></label>
				        <input type="submit" class="xy_but" @click="search" value="查询">
				      </div>
				    </div>
  				</div>
				</form>
			</div>
			<div class="percon">
				<div class="xy_h4"><h4>运动数据</h4></div>
				<div class="percx">
					<h4><span>{{data.userName}}</span>运动数据对比图</h4>
					<div class="container" id="container3"></div>
				</div>
				<div class="percx">
					<h4><span>{{data.userName}}</span>心率数据对比图</h4>
					<div class="container" id="container4"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import { postOriginData } from '../framework/service.js';
  export default {
    created () {

      //获取学生列表
      this.getStuList()

      //获取明细
      this.data.studentNo = this.$route.params.id;
      this.getDetail(this.data.studentNo);

      //定时器
      let self = this
      this.intervalid = setInterval(() => {
        self.getDetail(self.data.studentNo)
      }, 60000)

    },
    mounted () {
      var sport = {
        steps: [],
        stepTime: []
      }
      this.sportData(sport);
    },
    data () {
      return {
        data: {
          studentNo: '',
          userName: '',
          type: '',
          steps: '',
          date: '',
          number: ''
        },
        stuList:[]
      };
    },
    beforeDestroy: function () {
        //销毁定时器
        clearInterval(this.intervalid)
    },
    methods: {
      getDetail (id) {
        const callBack = (response) => {

          if (response.body.status == '200') {
            if (JSON.stringify(response.body.result) == '{}'){
                this.$message.error('暂无数据')
                this.data = {
                  studentNo: this.data.studentNo,
                  userName: '',
                  type: '',
                  steps: '',
                  date: '',
                  number: ''
                }
                var sport = {
                  steps: [],
                  stepTime: []
                }
                this.sportData(sport);
                var heart = {
                  number: [],
                  hearTime: []
                }
                this.heartData(heart);
            }else{
                this.data = response.body.result.detailData;
                // 运动数据图表展示
                const sportDatas = response.body.result.sportData;
                var sport = {
                  steps: [],
                  stepTime: []
                }
                for (let sportItem of sportDatas) {
                  sport.steps.push(sportItem.steps);
                  sport.stepTime.push(sportItem.stepTime);
                }
                this.sportData(sport);
                // 心率数据图表展示
                const heartDatas = response.body.result.heartData;
                var heart = {
                  number: [],
                  hearTime: []
                }
                for (let heartItem of heartDatas) {
                  heart.number.push(heartItem.number);
                  heart.hearTime.push(heartItem.hearTime);
                }
                this.heartData(heart);
            }

          }else{
            this.$message.error(response.body.msg)
          }
        };

        postOriginData(this, window.getHealthDetailURL, { studentNo: id }, callBack);

      },
      getStuList () {
        const callBack = (response) => {

          if (response.body.status == '200') {
            if (JSON.stringify(response.body.result) == '{}'){
                this.$message.error('获取学生学号列表数据失败!')
            }else{
                this.stuList = response.body.result;            
            }
          }else{
            this.$message.error(response.body.msg)
          }
        };

        postOriginData(this, window.getStudentNoURL, {}, callBack);

      },
      search () {
        this.getDetail(this.data.studentNo);
      },
      sportData (item) {
        $('#container3').highcharts({
          chart: {
            type: 'line',
            plotBorderColor: '#e4e4e4',
            plotBorderWidth: 1,
            plotBackgroundColor:'#f9f9fa',
          },
          title: false,//主标题
          subtitle: false,//副标题
          legend: false,
          credits: {//版权信息
            enabled: false
          },
          xAxis: {
            //tickInterval:3,//刻度间隔
            tickLength:0,//刻度长度
            categories: item.stepTime
          },
          yAxis: {
            title: false,
            minorGridLineDashStyle: 'longdash',
            minorTickInterval: 'auto',
            minorTickWidth: 0,
            labels: {
              formatter: function() {
                return this.value +'步';
              }
            }
          },
          tooltip: { //提示框加入单位
            valueSuffix: '步'
          },
          series: [{
            name:'运动步数',
            color:'#26b6ff',
            data: item.steps
          }]
        });
      },
      heartData (item) {
        $('#container4').highcharts({
          chart: {
            type: 'line',
            plotBorderColor: '#e4e4e4',
            plotBorderWidth: 1,
            plotBackgroundColor:'#f9f9fa',
          },
          title: false,//主标题
          subtitle: false,//副标题
          legend: false,
          credits: {//版权信息
            enabled: false
          },
          xAxis: {
            //tickInterval:3,//刻度间隔
            tickLength:0,//刻度长度
            categories: item.hearTime
          },
          yAxis: {
            title: false,
            minorGridLineDashStyle: 'longdash',
            minorTickInterval: 'auto',
            minorTickWidth: 0,
            labels: {
              formatter: function() {
                return this.value +'次/分钟';
              }
            }
          },
          tooltip: { //提示框加入单位
            valueSuffix: '次/分钟'
          },
          series: [{
            name:'运动步数',
            color:'#26b6ff',
            data: item.number
          }]
        });
      }
    }
  }
</script>
