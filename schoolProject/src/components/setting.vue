<template>
	<div>
		<!--资料编辑框-->

		<el-dialog title="修改资料" v-model="editFlag">
			  <el-form>
			    <el-form-item label="学号" :label-width="formLabelWidth">
			      	<el-input auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="活动名称" :label-width="formLabelWidth">
			  		<el-input auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="手环":label-width="formLabelWidth">
			      	<el-select placeholder="请选择手环">
				        <el-option label="区域一" value="shanghai"></el-option>
				        <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="Mac":label-width="formLabelWidth">
			  		<el-input auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			  	<el-button @click="editFlag = false">确定</el-button>
			    <el-button @click="editFlag = false">取 消</el-button>
			  </div>
		</el-dialog>
			
		<div class="editcon">
			<div class="ed_icon">
				<form action="#">
				<div class="xy_inline">
					      <label>学号：</label>
					      <div class="xy_dinput">
					        <input  value="0004"  type="text"  class="xy_input">
					      </div>
					    </div>
				<div class="xy_inline">
					      <label>姓名：</label>
					      <div class="xy_dinput">
					        <input value="东皇太一"  type="text"  class="xy_input">
					      </div>
					    </div>
				<div class="xy_inline">
					      <label>手环：</label>
					      <div class="xy_dinput">
					         <select class="xy_select">
	        					<option value="学生手环1">学生手环1</option>
	        					<option value="学生手环2">学生手环2</option>
	        					<option value="学生手环3">学生手环3</option>
	      					</select>
					      </div>
					      </div>
				<div class="xy_inline">
					<label>手环MAC：</label>
					 <div class="xy_dinput">
					  	<input value="02:XX:XX:XX:XX" type="text"  class="xy_input">
					  </div>
				</div>
				<div class="ed_oper">
					<input class="xy_but" type="submit" value="保存"/>
					<a href="javascript:void(0)">取消</a>
				</div>
			</form>
			</div>
		</div>
		<!--右侧内容-->
		<div class="xycon">
			<div class="xycona">
				<div class="settop">
					<div class="xy_h4"><h4>学生手环绑定</h4></div>
					<form action="#" id='setform'>
					<div class="xy_icon">
					    <div class="xy_inline">
					      <label>学号：</label>
					      <div class="xy_dinput">
					        <input  type="text"  class="xy_input" v-model="student.studentNo">
					      </div>
					    </div>
					    <div class="xy_inline">
					      <label>姓名：</label>
					      <div class="xy_dinput">
					        <input  type="text"  class="xy_input" v-model="student.userName">
					      </div>
					    </div>
					     <div class="xy_inline">
					      <label>手环：</label>
					      <div class="xy_dinput">
					         <select class="xy_select" v-model="student.type">
	        					<option value="学生手环1">学生手环1</option>
	        					<option value="学生手环2">学生手环2</option>
	        					<option value="学生手环3">学生手环3</option>
	      					</select>
					      </div>
					    </div>
					    <div class="xy_inline">
					      <label>手环MAC：</label>
					      <div class="xy_dinput">
					        <input type="text"  class="xy_input" v-model="student.mac">
					      </div>
					    </div>
					    <div class="xy_inline">
					      <div class="xy_dinput">
					      	<label></label>
					        <input class="xy_but" @click="save_add" value="保存">
					      </div>
					    </div>
	  				</div>
					</form>  
				</div>
				<div class="setcon">
					<div class="xy_h4"><h4>已绑定列表</h4></div>
					<div class="summt_tb no_curp">
						<table  cellspacing="0" cellpadding="0" id="settable">
							<tr>
								<th>序号</th>
								<th>学号</th>
								<th>姓名</th>
								<th>手环名称</th>
								<th>手环MAC</th>
								<th>绑定时间</th>
								<th>操作</th>
							</tr>
							<tr v-for="(val, index) of list" >
								<td>{{index + 1}}</td>
								<td>{{val.studentNo}}</td>
								<td>{{val.userName}}</td>
								<td>{{val.type}}</td>
								<td>{{val.mac}}</td>
								<td>{{val.creTime}}</td>
								<td>
								<a @click="edit(val)" class="edit">编辑</a>
								<a @click="del(val)" class="del">删除</a>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { getOriginData, postOriginData } from '../framework/service.js';
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
				list: [],
				student:{
					studentNo:"",
					userName:"",
					mac:"",
					type:"学生手环1"
				},
				editFlag:false,
				formLabelWidth: '70px'
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
			//添加学生绑定手环
			save_add (){

				if (this.student.studentNo != "" && this.student.userName != "" && this.student.mac != "" && this.student.type != "") {

					const callBack = (response) => {
						if (response.body.status == '200') {
							//请求数据刷新 
							this.getData();
							//初始化
							this.student = {
								studentNo:"",
								userName:"",
								mac:"",
								type:"学生手环1"
							}
						}
					};

					var params = {
						studentNo : this.student.studentNo,
						userName : this.student.userName,
						mac : this.student.mac,
						type : this.student.type
					}

					console.log(params)
					postOriginData(this, window.getBindURL, params, callBack);

				}else{
					//弹出提示框
					this.$message('资料填写有误!');
				}

			},
			//编辑框
			edit (item) {
				console.log(item)
				this.editFlag = true
			},
			del (item) {
				console.log(item)
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