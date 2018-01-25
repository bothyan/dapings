(function($){
require(  
    [   
      'echarts',   
      'echarts/chart/map'
    ], function(ec) {  
	$.fn.countTo = function (options) {
        options = options || {};
        $.fn.countTo.defaults = {
            from: 0,               // 开始数据
            to: 0,                 // 结束数据
            speed: 1000,           // 过渡时间
            refreshInterval: 100,  // 刷新时间
            decimals: 0,           // 小数点位数
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }    
        return $(this).each(function () 
        {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, 
            {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals')
            }, options);
            
            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            


            $self.data('countTo', data);


            
            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }

            data.interval = setInterval(updateTimer, settings.refreshInterval);

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
            
            function updateTimer() 
            {
                value += increment;
                loopCount++;
                
                render(value);
                
                if (typeof(settings.onUpdate) == 'function'){
                    settings.onUpdate.call(self, value);
                }
                
                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            
            // initialize the element with the starting value
            render(value);
        });
 	}
	var mainFun = {
        myCharts:[],
		init:function(){
			var wWidth = $(window).width(),wHeight = $(window).height();
			var scaleY = wHeight/1080;
			var bWidth = wWidth/scaleY;
			var scaleStyle='scale('+scaleY+')';
			$('.box').css({
				'-moz-transform':scaleStyle,
				'-webkit-transform':scaleStyle,
				'-ms-transform':scaleStyle,
				'transform':scaleStyle,
				'width':bWidth+'px'
			}); 
			this.handle();
            $('.timer').each(function(){
                $(this).countTo();
            });
            this.datas();
		},
		doms:function(){
			
		},
		datas:function(){		
			this.data1();
            this.data2();
            this.data3();
            this.data4();
            this.data5();
            this.data6();
            this.data7();
		},
		handle:function(){
            var that = this;
			$(window).bind("resize",function(){
                $.each(that.myCharts,function(k,v){
                    v.resize();
                });
				var wWidth = $(window).width(),wHeight = $(window).height();
				var scaleY = wHeight/1080;
				var bWidth = wWidth/scaleY;
				var scaleStyle='scale('+scaleY+')';
				$('.box').css({
					'-moz-transform':scaleStyle,
					'-webkit-transform':scaleStyle,
					'-ms-transform':scaleStyle,
					'transform':scaleStyle,
					'width':bWidth+'px'
				});
			});
		},
        data1:function(){
            var option = {
                
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    x:"17%"
                },
                xAxis : [
                    {
                        splitLine:{show: false},
                        type : 'category',
                        data : ["01月","02月","03月","04月","05月","06月"],
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4"
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        name : '金额(万)',
                        splitLine:{show: false}, 
                        type : 'value',
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4"
                            }
                        }
                    }
                ],
                series : [
                    {
                        barWidth:"60%",
                        symbol:"arrow",
                        name:'交易总金额',
                        type:'bar',
                        data:["2000","4000","6000","8000","10000","12000"]
                    }
                ],
                itemStyle:{
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#77defd'
                        }, {
                            offset: 1,
                            color: '#0e5ce1'
                        }])
                    }
                }
            };
            var dom = $("#charts1")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart); 
        },
        data2:function(){
            var option = {
                tooltip : {
                  trigger: 'axis'
                },
                grid:{
                    x:"17%"
                },
                xAxis : [
                  {
                    splitLine:{show: false},
                    type : 'category',
                    boundaryGap : false,
                    data : ["01月","02月","03月","04月","05月","06月"],
                    axisLabel:{
                        interval:0,
                        textStyle:{
                            fontSize:15
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#8894c4" 
                        }
                    }
                  }
                ],
                yAxis : [
                  {
                    name : '金额(万)',
                    splitLine:{show: false}, 
                    type : 'value',
                    axisLabel:{
                        interval:0,
                        textStyle:{
                            fontSize:15
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#8894c4"
                        }
                    }
                  }
                ],
                series : [
                  {
                    name:'交易总笔数',
                    type:'line',
                    symbol:"circle",
                    smooth:true, 
                    itemStyle: {
                      normal: {
                        color:'#64b9fa',
                        areaStyle:{
                          type: 'default',
                          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#77defd'
                          }, {
                            offset: 1,
                            color: '#0e5ce1'
                          }])
                        },
                        lineStyle:{
                          color:"#64b9fa"
                        }
                      }
                    },
                    data:["200","400","600","500","800","900"]
                  }
                ]
              };
            var dom = $("#charts2")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true); 
            this.myCharts.push(myChart);  
        },
        data3:function(){
            var option = {
                tooltip : {
                  trigger: 'axis'
                },
                grid:{
                    x:"17%"
                },
                xAxis : [
                    {
                        splitLine:{show: false},
                        type : 'category',
                        splitLine: {show:false},
                        data :  ["01月","02月","03月","04月","05月","06月"],
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4" 
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        name : '金额(万)',
                        splitLine:{show: false}, 
                        type : 'value',
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4"
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        stack: '总量',
                        itemStyle:{
                            normal:{
                                barBorderColor:'rgba(0,0,0,0)',
                                color:'rgba(0,0,0,0)'
                            },
                            emphasis:{
                                barBorderColor:'rgba(0,0,0,0)',
                                color:'rgba(0,0,0,0)'
                            }
                        },
                        data:[0, 900, 1245, 1530, 1376, 1376]
                    },
                    {
                        type:'bar',
                        stack: '总量',
                        barWidth:"60%",
                        itemStyle : { 
                            normal:{
                                label : {show: false, position: 'top'},
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#77defd'
                                }, {
                                    offset: 1,
                                    color: '#0e5ce1'
                                }])
                            }
                        },
                        textStyle:{
                            color:"#8894c4"
                        },
                        data:[900, 345, 393, 135, 135, 135]
                    }
                ]
            };
            var dom = $("#charts3")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart);   
        },
        data4:function(){
            var option = {
                dataRange: {
                    x:"5%",
                    y:"480",
                    itemWidth:40,
                    min : 0,
                    max : 500,
                    splitNumber: 0,
                    text:['百万','零'],
                    textStyle:{color:"#756192"},
                    color: ['#6c3d3e','#fb080d']
                },
                series : [
                    {
                        name: 'pm2.5',
                        type: 'map',
                        mapType: 'china',
                        hoverable: false,
                        roam:true,
                        data : [],
                        itemStyle:{
                                normal:{
                                    color:'#1456ce',
                                    borderWidth:2,//省份的边框宽度
                                    borderColor:'#42d2ff'
                                }
                            },
                        markPoint : {
                            symbolSize: 0,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data : [
                                {name: "海门", value: 9},
                                {name: "鄂尔多斯", value: 12},
                                {name: "招远", value: 12},
                                {name: "舟山", value: 12},
                                {name: "齐齐哈尔", value: 500}
                            ]
                        },
                        geoCoord: {
                            "海门":[121.15,31.89],
                            "鄂尔多斯":[109.781327,39.608266],
                            "招远":[120.38,37.35],
                            "舟山":[122.207216,29.985295],
                            "齐齐哈尔":[123.97,47.33]
                        }
                    },
                    {
                        name: 'Top5',
                        type: 'map',
                        mapType: 'china',
                        data:[],
                        markPoint : {
                            symbol:'circle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : [
                                {name: "海门", value: 9},
                                {name: "鄂尔多斯", value: 12},
                                {name: "招远", value: 12},
                                {name: "舟山", value: 12},
                                {name: "齐齐哈尔", value: 500}
                            ]
                        }
                    }
                ]
            };  
            var dom = $("#charts4")[0];
            var myChart = ec.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart);        
        },
        data5:function(){
            var option = {
                
                tooltip : {
                    trigger: 'axis',
                    formatter: '{c}%'
                },
                grid:{
                    x:"17%"
                },
                xAxis : [
                    {
                        show:false,
                        splitLine:{show: false},
                        type : 'value',
                        data : ["1000","900","700","600","500","400"],
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4" 
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        
                        type : 'category',
                        data : ['餐饮','快销','零售','休闲娱乐','医疗','民生缴费'],
                        splitLine:{show: false}, 
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                fontSize:15
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#8894c4"
                            }
                        }
                    }
                ],
                series : [
                    {
                        barWidth:"60%",
                        symbol:"arrow",
                        name:'交易总金额',
                        type:'bar',
                        data:["20","40","60","80","100","120"],
                          itemStyle : { normal: {label : {show: true, position: 'insideRight',formatter: "{c}%",}}}
                    }
                ],
                itemStyle:{
                    normal: {

                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#0e5ce1'
                        }, {
                            offset: 1,
                            color: '#77defd'
                        }])
                    }
                }
            };
            var dom = $("#charts5")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart); 
        },
        data6:function(){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                /*calculable : true,
                    legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['收款机','收银厂商','商户app','收银插件','POS机']
                },*/
                series : [
                    {
                        name:'交易来源',
                        type:'pie',
                        radius : ['50%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    formatter: "{b}({d}%)",
                                    position:'inner'
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : false,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '30',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {value:335, name:'收款机'},
                            {value:310, name:'收银厂商'},
                            {value:234, name:'商户app'},
                            {value:135, name:'收银插件'},
                            {value:1548, name:'POS机'}
                        ]
                    }
                ]
            };
            var dom = $("#charts6")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart);           
        },
        data7:function(){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable : true,
               /* legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['微信','支付宝','云闪付','银联','其它']
                },*/
                series : [
                    {
                        name:'支付方式',
                        type:'pie',
                        radius : ['40%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    formatter: "{b}({d}%)",
                                    position:'inner'
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : false,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '30',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {value:335, name:'微信'},
                            {value:310, name:'支付宝'},
                            {value:234, name:'云闪付'},
                            {value:135, name:'银联'},
                            {value:1548, name:'其它'}
                        ]
                    }
                ]
            };
            var dom = $("#charts7")[0];
            var myChart = echarts.init(dom); 
            myChart.setOption(option, true);  
            this.myCharts.push(myChart);           
        }
	}
	mainFun.init();
});      
 })(jQuery);  
