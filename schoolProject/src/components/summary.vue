<template>
	<div>
		<!--右侧内容-->
		<div class="xycon">
			<div class="xycona">
				<div class="summt">
					<div class="xy_h4"><h4>学生健康报表</h4></div>
					<div class="summt_tb">
						<table  cellspacing="0" cellpadding="0">
							<tr>
								<th>序号</th>
								<th>学号</th>
								<th>姓名</th>
								<th>手环名称</th>
								<th>运动步数</th>
								<th>最后心率</th>
								<th>步数排名</th>
							</tr>
							<tr v-for="(val, index) of list" @click="gotoDetails(val)">
								<td>{{index + 1}}</td>
								<td>{{val.studentNo}}</td>
								<td>{{val.userName}}</td>
								<td>{{val.type}}</td>
								<td>{{val.steps}}</td>
								<td>{{val.number}}</td>
								<td>{{val.bra_id}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="summc">
					<div class="xy_h4"><h4>班级运动数据对比</h4></div>
					<div class="summcx">
						<h4><span>班级</span>运动数据对比图</h4>
						<div class="container" id="container1"></div>
					</div>
					<div class="summcx">
						<h4><span>班级</span>心率数据对比图</h4>
						<div class="container" id="container2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getOriginData } from '../framework/service.js';
	import $ from '../assets/js/jquery-vendor.js';
	import Highcharts from '../assets/js/highcharts.js';

	export default {
		created () {
			this.getData();
		},
		mounted () {
			var sport = {
				title: [],
				data: []
			};
			this.sportsData(sport);
			var heartRate = {
				title: [],
				data: []
			};
			this.heartRateData(heartRate);
		},
		data () {
			return {
				list: []
			};
		},
		methods: {
			getData () {
				const callBack = (response) => {
					if (response.body.status == '200') {
						this.list = response.body.result.healthData;
						// 运动数据对比展示
						const sportsData =  response.body.result.sportsData[0];
						var sport = {
							title: [],
							data: []
						};
						for (let item in sportsData) {
							sport.title.push(item);
							sport.data.push(sportsData[item]);
						}
						this.sportsData(sport);
						// 心率数据对比展示
						const heartRateData =  response.body.result.heartRateData[0];
						var heartRate = {
							title: [],
							data: []
						};
						for (let headItem in heartRateData) {
							heartRate.title.push(headItem);
							heartRate.data.push(parseInt(heartRateData[headItem]));
						}
						this.heartRateData(heartRate);
					}
				};
				getOriginData(this, window.getHealthReportURL, {}, callBack);
			},
			sportsData (item) {
				$('#container1').highcharts({
	         chart: {
             type: 'column',
             zoomType:'x',
             plotBorderColor: '#e4e4e4',
             plotBorderWidth: 1,
             plotBackgroundColor:'#f9f9fa',
	         },
	         title: false,//主标题
	         subtitle: false,//副标题
	         legend: false,
	         credits: {
             enabled: false
	         },
	         xAxis: {
             categories: item.title,
	             //tickInterval:12,//刻度间隔
						 tickLength:0,//刻度长度
	         },
	         credits: {
             enabled: false
	         },
	         tooltip: { //提示框加入单位
	           valueSuffix: '步'
	         },
	         yAxis: {
             title: false,
             tickAmount:6,
              minorGridLineDashStyle: 'longdash',
             minorTickInterval: 'auto',
             minorTickWidth: 0,
             labels: {
               formatter: function() {
                 return this.value +'步';
               }
             }
	         },
	         series: [{
             name: '运动步数',
             color:'#26b6ff',
             data: item.data
	         }]
	     	});
			},
			heartRateData (item) {
				$('#container2').highcharts({
					 chart: {
						 type: 'column',
						 zoomType:'x',
						 plotBorderColor: '#e4e4e4',
						 plotBorderWidth: 1,
						 plotBackgroundColor:'#f9f9fa',
					 },
					 title: false,//主标题
					 subtitle: false,//副标题
					 legend: false,
					 credits: {
						 enabled: false
					 },
					 xAxis: {
						 categories: item.title,
							 //tickInterval:12,//刻度间隔
						 tickLength:0,//刻度长度
					 },
					 credits: {
						 enabled: false
					 },
					 tooltip: { //提示框加入单位
						 valueSuffix: '次/分钟'
					 },
					 yAxis: {
						 title: false,
						 tickAmount:6,
						 minorGridLineDashStyle: 'longdash',
						 minorTickInterval: 'auto',
						 minorTickWidth: 0,
						 labels: {
						   formatter: function() {
							   return this.value +'次/分钟';
						   }
			 		   }
					 },
					 series: [{
						 name: '心率数据',
						 color:'#26b6ff',
						 data: item.data
					 }]
				});
			},
			gotoDetails (item) {
				this.$router.push({
					name: 'personal',
					params: {
					 	id: item.studentNo
					}
				});
			}
		}
	};
</script>
