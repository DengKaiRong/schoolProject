import Highcharts
$(function(){
	//左侧导航收缩
	$('.xynavc li h4').toggle(function(){
		$(this).parent().removeClass('on');
		$(this).siblings().slideUp();
	},function(){
		$(this).parent().addClass('on');
		$(this).siblings().stop(true,true).slideDown();
	})

	 //设置资料删除提示
	$('.summt_tb td .del').on('click',function(){
		var $this=$(this).parents('tr');
		layer.confirm('确定删除这条数据吗？', {
	  		btn: ['确定','再想想'] //按钮
		}, function(){
			$this.remove();
			lens();
	  		layer.msg('删除成功', {icon:2});
		});
	})
	//设置资料编辑资料
	$('.summt_tb td .edit').on('click',function(){
		layer.open({
		  type: 1,
		  title:'编辑资料',
		  closeBtn: 1, //不显示关闭按钮
		  anim: 2,
		  area: ['auto', 'auto'],
		  shadeClose: false, //开启遮罩关闭
		  content: $('.editcon'),
		});
	});

	//取消编辑弹窗
	$('.ed_oper a').click(function(){
			layer.closeAll()
	})
		//保存编辑弹窗
	$('.ed_oper .xy_but').click(function(){
		var x=	$('.ed_icon .xy_input');
			if($(x[1]).val()==''|| $(x[2]).val()==''|| $(x[0]).val()==''){
				layer.alert('数据不能为空！');
				return false;
			};
			layer.closeAll()
			layer.msg('编辑已保存', {icon:1});

	})



	//添加学生信息
	lens();
	$('#setform .xy_but').click(function(){
		var j = $('#setform .xy_input');
		if($(j[1]).val()==''|| $(j[2]).val()==''|| $(j[0]).val()==''){
			layer.alert('请完整填写数据。')
			return false;
		}
		$('#settable').append("<tr><td></td><td>"+$(j[0]).val()+"</td><td>"+$(j[1]).val()+"</td><td>学生手环1</td><td>"+$(j[2]).val()+"</td><td>2017-04-12</td><td><a href='javascript:void(0)' class='edit'>编辑</a><a href='javascript:void(0)'  class='del'>删除</a></td></tr>")
		lens();
		$('#setform .xy_input').val('');
	})	


	//汇总报表运动图
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
            categories: ['马可波罗', '虞姬', '荆轲'],
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
            data: [2000, 3000, 1500]
        }]
    });

    //汇总报表心率图
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
            categories: ['马可波罗', '虞姬', '荆轲'],
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
            data: [78, 75, 70,]
        }]
    });


    //个人运动数据图表
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
            categories: [ '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45','10:00','10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00','13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30']
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
             data: [1000, 2000, 2400, 500,1500,2000, 3000, 1500, 500, 2500, 1000, 1500, 4000, 1000, 2000, 2400, 500,1500,2000, 3000, 1500, 500, 2500, 1000, 1500, 4000, 1000, 2000, 2400, 500,1500]
        }]
    });

     //个人心率数据图表
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
            categories: [ '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45','10:00','10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00','13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30']
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
             data: [78, 75, 70, 68, 90, 68, 85, 66, 88, 80, 90, 85, 78, 68, 90, 68, 85, 66, 88, 80,78, 75, 70, 68, 90, 68, 85, 66, 88, 80,77]
        }]
    });



})

//自动添加序号
	function lens(){
	 	var len = $('#settable tr').length;
        for(var i = 1;i<len;i++){
            $('#settable tr:eq('+i+') td:first').text(i);
        }
	}

//汇总报表点击信息跳转个人页面
function loca(e){
	window.location.href='personal.html'
}
