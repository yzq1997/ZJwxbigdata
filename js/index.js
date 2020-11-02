let httpUrl = 'http://www.zjxf315.com/bigdataApiTest/api/Data/';
var jsonUrl = 'http://www.zjxf315.com/bigdata/json/zhenjiang.json';
var fla = true; //自动下滑
var flb = false; //自动上滑
var scr = $(document).scrollTop();


//大地图
function gomap(n) {
	var uploadedDataURL = "http://www.zjxf315.com/bigdata/json/zhenjiang.json";
	$.ajax({
		url: httpUrl + 'GetOrignStat?type=' + n,
		type: 'get',
		success: function (res) {
			var data1 = JSON.parse(res)
			// console.log(data1);

			$.getJSON(uploadedDataURL, function (geoJson) {
				echarts.registerMap('镇江', geoJson);
				myChart.hideLoading();
				let datas = data1.data.Data.map(si => { return { value: si['VALUE'], code: si['CODE'] } });
				let datass = data1.data.Data.map(si => { return { value: si['VALUE'], name: si['NAME'], code: si['CODE'] } });
				var geoCoordMap = {
					'句容市': [119.167, 31.9473],
					'丹徒市': [119.4338, 32.1289],
					'润州区': [119.4148, 32.2135],
					'京口区': [119.4545, 32.2061],
					'丹阳市': [119.5819, 31.9914],
					'扬中市': [119.8280, 32.2372],

				};
				option = {
					// backgroundColor: '#404a59', // 背景
					tooltip: { // 窗口外框
						show: false,
						backgroundColor: 'rgba(0,0,0,0)',
						trigger: 'item',
						axisPointer: {
							type: 'shadow'
						},
					},
					geo: {
						// map:'镇江'
					},
					xAxis: [{
						"show": false,
						"type": "value"
					}],
					yAxis: [{
						"show": false,
						"type": "value"
					}],
					series: [
						{
							legend: {},
							tooltip: { // 显示的窗口
								trigger: 'item'
							},
							name: '地图',
							type: 'map',
							map: '镇江', // 自定义扩展图表类型
							zoom: 0.55, //缩放
							label: { // 文字
								show: true,
								color: '#fff',
								fontSize: 16,
								emphasis: {
									color: '#FFF'
								},
								normal: {
									show: true,
									color: 'white',
									fontSize: 15
								}
							},
							itemStyle: {  //地图样式
								normal: {
									borderColor: 'rgba(147, 235, 248, 1)',
									borderWidth: 1,
									areaColor: {
										type: 'radial',
										x: 0.5,
										y: 0.5,
										r: 0.8,
										colorStops: [{
											offset: 0,
											color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
										}, {
											offset: 1,
											color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
										}],
										globalCoord: false // 缺省为 false
									},
									shadowColor: 'rgba(128, 217, 248, 1)',
									// shadowColor: 'rgba(255, 255, 255, 1)',
									shadowOffsetX: -2,
									shadowOffsetY: 2,
									shadowBlur: 10,
									color: 'transparent'
								}
							},
							data: datass,
							emphasis: { //鼠标移入动态的时候显示的默认样式
								// color='#fff',
								shadowColor: 'rgba(128, 217, 248, 0)',
								itemStyle: {
									areaColor: '#4990b9',
									// fontColor = "#fff"
									// borderColor: '#FFF',
									// borderWidth: 1
								},
							},
							layoutCenter: ['46%', '36%'],
							layoutSize: '160%',
							// layoutColor:'#fff',
							markPoint: {
								data: [
									{
										name: '句容市',
										x: '28%',
										y: '38%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									},
									{
										name: '丹徒区',
										x: '41%',
										y: '29%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									},
									{
										name: '润州区',
										x: '45%',
										y: '19%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									},
									{
										name: '京口区',
										x: '68%',
										y: '19%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									},
									{
										name: '丹阳市',
										x: '64%',
										y: '34.5%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									},
									{
										name: '扬中市',
										x: '79%',
										y: '16%',
										symbol: 'circle',
										symbolSize: 8,
										itemStyle: {
											color: '#FFC600'
										}
									}
								]
							},
						}
					],
				}
				myChartA.setOption(option);

			})
		},
	});
	myChartA.on('click', function (params) {
		// console.log(params.name);//此处写点击事件内容
		var n = ''
		if (params.name == '句容市') {
			n = "1321183"
		} else if (params.name == '丹阳市') {
			n = "1321181"
		} else if (params.name == '丹徒区') {
			n = "1321112"
		} else if (params.name == '润州区') {
			n = "1321111"
		} else if (params.name == '京口区') {
			n = "1321102"
		} else if (params.name == '扬中市') {
			n = "1321182"
		};
		getnum(n);
		getdata1(n);
		getdata2(n);
		getdata3(n);
		getdata4(n);
		godown();
		document.getElementsByClassName('bg')[0].innerHTML = params.name;
		document.getElementsByClassName('toup')[0].innerHTML = '登记投诉';
	}); 5

};
var myChartA = echarts.init(document.getElementById('map'));
gomap("")


// 点击高新区/新区/市本级小地图
function quji(item) {
	// console.log(item);
	document.getElementsByClassName('bg')[0].innerHTML = item
	if (item == '高新区') {
		n = '1321185'
	} else if (item == '新区') {
		n = '1321184';
	} else {
		n = '1321100';
	};
	document.getElementsByClassName('toup')[0].innerHTML = '登记投诉';
	getnum(n);
	getdata1(n);
	getdata2(n);
	getdata3(n);
	getdata4(n);
	godown();
}


// console.log(document.body.clientHeight); //全部高度  2212
// console.log(document.body.scrollHeight); //正文高度  2212
// console.log(document.body.scrollTop); //正文高度  0
// console.log(window.screen.height);  //屏幕高度
// console.log(window.screen.availHeight);  //屏幕分辨率高度  812
// console.log($(document).scrollTop());  //屏幕高度  812

//获取屏幕高度，让封面自适应高度
document.getElementsByClassName('cover')[0].style.height = window.screen.availHeight + 'px'


var box = $('.box')
var headerbox = $('.header')
// console.log(headerbox.offset().top);
$('.swiper-scrollbar').scroll(() => {
	debugger
})

//监听滚动条滑动
window.addEventListener("scroll", function (e) {
	if (document.documentElement.scrollTop > window.screen.availHeight) {
		// document.getElementsByClassName("header")[0].classList.add("header2");
		flb = true;

	}
	if (document.documentElement.scrollTop < window.screen.availHeight) {
		// document.getElementsByClassName("header")[0].classList.remove("header2");

	}
	// if (document.documentElement.scrollTop == 0) {

	// 	setTimeout(function (){
	// 		var fla = true; //自动下滑
	// 	var flb = false; //自动上滑
	// 	},1000)
	// }
	if (document.documentElement.scrollTop == window.screen.availHeight) {
		// setTimeout(function(){
		// 	document.getElementsByClassName("cover")[0].style.display = 'none'
		// },500)

	}
	if (fla) {
		godown();
		fla = false;
	}



})
var Btns = true;
//点击上滑按钮
function godown() {
	// debugger
	// mySwiper1
	mySwiper1.slideNext()
	let car = document.getElementById('header2');
	let t = car.offsetTop;
	while (car = car.offsetParent) {
		t += car.offsetTop
	};
	$("html,body").animate({ scrollTop: t });
}


//返回地图
function goback() {
	// document.body.scrollTop = document.documentElement.scrollTop = 0;
	document.getElementsByClassName("cover")[0].style.display = 'block'
	document.getElementsByClassName('bg')[0].innerHTML = '镇江市';
	document.getElementsByClassName('toup')[0].innerHTML = '累计投诉';
	getnum("");
	getdata1("");
	getdata2("");
	getdata3("");
	getdata4("");

	// mySwiper1.slideN()
	mySwiper1.slidePrev()

	// var clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
	timer = setInterval(function () {
		//获取滚动条的滚动高度
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		//用于设置速度差，产生缓动的效果
		var speed = Math.floor(-osTop / 5);
		document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
		isTop = true;  //用于阻止滚动事件清除定时器
		if (osTop == 0) {
			clearInterval(timer);
		}
	}, 10);
	// console.log($(document).scrollTop());
	setTimeout(function () {
		fla = true;
	}, 1500)
	col()

}

//点击当前城市
function choice() {
	if (document.getElementsByClassName('map')[0].style.display == 'block') {
		col()
	} else {
		var cites = document.getElementsByClassName('city')
		var flag = document.getElementsByClassName('bg')[0].innerHTML
		// console.log(cites);
		// console.log(flag);

		for (let i = 0; i < cites.length; i++) {
			cites[i].style.color = '#D6E0FF'
			if (flag == cites[i].innerHTML) {
				cites[i].style.color = '#75C6F1'
			}
		}

		document.getElementsByClassName('map')[0].style.display = 'block'
		document.getElementsByClassName('bg')[0].style.background = 'url(../images/img/iconup.png) no-repeat'
		document.getElementsByClassName('bg')[0].style.backgroundSize = '0.11rem 0.11rem'
		document.getElementsByClassName('bg')[0].style.backgroundPosition = '0 70%'
	}

}

//点击下拉框中的城市
function city(c) {
	console.log(c);
	document.getElementsByClassName('bg')[0].innerHTML = c;
	col();
	var n = '';  //城市id 
	if (c == '镇江市') {
		n = ""
	} else if (c == '丹阳市') {
		n = '1321181'
	} else if (c == '句容市') {
		n = '1321183'
	} else if (c == '扬中区') {
		n = '1321182'
	} else if (c == '丹徒区') {
		n = '1321112'
	} else if (c == '京口区') {
		n = '1321102'
	} else if (c == '润州区') {
		n = '1321111'
	} else if (c == '新区') {
		n = '1321184'
	} else if (c == '高新区') {
		n = '1321185'
	} else if (c == '市本级') {
		n = '1321100'
	}

	if (c == "镇江市") {
		document.getElementsByClassName('toup')[0].innerHTML = '累计投诉';
	} else {
		document.getElementsByClassName('toup')[0].innerHTML = '登记投诉';
	}
	getnum(n);
	getdata1(n);
	getdata2(n);
	getdata3(n);
	getdata4(n);

}

//显示隐藏
function col() {
	document.getElementsByClassName('map')[0].style.display = 'none';
	document.getElementsByClassName('bg')[0].style.background = 'url(../images/img/icondown.png) no-repeat'
	document.getElementsByClassName('bg')[0].style.backgroundSize = '0.11rem 0.11rem'
	document.getElementsByClassName('bg')[0].style.backgroundPosition = '0 70%'
}

//投诉数量
getnum("")
function getnum(n) {
	$.ajax({
		url: httpUrl + 'GetComplaintsByCode?areaCode=' + n,
		type: 'get',
		success: function (res) {
			// console.log(JSON.parse(res));
			document.getElementsByClassName("p1")[0].innerHTML = `<span>${JSON.parse(res).data.TotalComplaints}</span>` + '件'
			document.getElementsByClassName("p2")[0].innerHTML = `<span>${JSON.parse(res).data.ProcessComplaints}</span>` + '件'
			var num = JSON.parse(res).data.RetrieveEconomy / 10000
			num = num.toFixed(2);
			document.getElementsByClassName("p3")[0].innerHTML = `<span>${num}</span>` + '万元'

		},
	});
}

//被投诉企业TOP10
getdata1("")
function getdata1(n) {

	let html = '';
	SecondTopDtd = $.Deferred()
	$.ajax({
		url: httpUrl + 'GetAccusedEnterprises?areaCode=' + n,
		type: 'get',
		success: function (res) {
			var data = JSON.parse(res).data;
			// console.log(data);

			if (data.length > 0) {
				$.each(data, function (index, item) {
					// console.log(item.INVOPT.slice(0,17));
					if (item.INVOPT.length > 18) {
						item.INVOPT = item.INVOPT.slice(0, 18) + '...'
					}

					html += `<li class="roll2_${index + 1} ${index % 2 === 0 ? 'aaa' : 'bbb'}">
						<span href="#" class="ellipsis">
							<div class="tit">
							<img src="../images/newImage/Noindex/NO.${index + 1}.png">  ${item.INVOPT}

							</div>
							<div class="ellipsisBarOut">
							<div class="ellipsisBar">
								<div class="ellipsisWithin" style="width: ${70 - index * 5}%;padding-right: 0.1rem;"><span class="tsl">投诉量${item.VALUE}件</span>  </div>
							</div>

							<span class="modularNum">
								
							</span>
							

							</div>
						</span>
					</li>`
					// <img src="../images/newImage/rise.png" class="ellipsisBarIconUp">
					// <img src="../images/newImage/down.png" class="ellipsisBarIconDown">  
					// console.log(index,item)
					$("#roll").css('text-align', 'left')
					$("#roll").html(html);
					if ((item.VALUE - item.VALUE1) / item.VALUE1 == 0) {
						$('.ellipsisBarIconUp').css('display', 'none')
						$('.ellipsisBarIconDown').css('display', 'none')
					} else if ((item.VALUE - item.VALUE1) / item.VALUE1 > 0) {
						$('.ellipsisBarIconUp').css('display', 'block')
						$('.ellipsisBarIconDown').css('display', 'none')
					} else {
						$('.ellipsisBarIconUp').css('display', 'none')
						$('.ellipsisBarIconDown').css('display', 'block')
					}
				})
			} else {
				let html = `
				<img src = './Images/newImage/insideImages/nodata.png' style="margin: -1em 0 0 0;">`;
				$("#roll").css('text-align', 'center')
				$("#roll").html(html);
			}
			SecondTopDtd.resolve()
		},
	})
}


//男女比列
getdata2("");
function getdata2(n) {

	let html = '';
	SecondTopDtd = $.Deferred()
	$.ajax({
		url: httpUrl + 'GetSexStat?areaCode=' + n,
		type: 'get',
		success: function (res) {
			var data = JSON.parse(res).data;
			// console.log(data);

			$.ajax({
				url: httpUrl + 'GetAgeState?areaCode=' + n,
				type: 'get',
				success: function (res) {
					var data1 = JSON.parse(res).data;
					// console.log(data1);
					var num = data1[0].AGECOUNTS + data1[1].AGECOUNTS + data1[2].AGECOUNTS + data1[3].AGECOUNTS + data1[4].AGECOUNTS

					var s1 = ((data1[0].AGECOUNTS / num) * 100).toFixed(2)
					var s2 = ((data1[1].AGECOUNTS / num) * 100).toFixed(2)
					var s3 = ((data1[2].AGECOUNTS / num) * 100).toFixed(2)
					var s4 = ((data1[3].AGECOUNTS / num) * 100).toFixed(2)
					var s5 = ((data1[4].AGECOUNTS / num) * 100).toFixed(2)
					document.getElementsByClassName('pp1')[0].innerHTML = s1 + '%'
					document.getElementsByClassName('pp2')[0].innerHTML = s2 + '%'
					document.getElementsByClassName('pp3')[0].innerHTML = s3 + '%'
					document.getElementsByClassName('pp4')[0].innerHTML = s4 + '%'
					document.getElementsByClassName('pp5')[0].innerHTML = s5 + '%'
					// console.log(s1,s2,s3,s4,s5);


					// var equipment = ['男', '女'];
					var project = ['儿童', '老人', '少年', '中青年', '其他'];
					var option = {
						backgroundColor: '#353746',
						// tooltip: {
						// 	formatter: function (param) {
						// 		if (param.data.type == null) {

						// 			return param.data.name + ":" + param.value + '个';
						// 		} else {

						// 			return param.data.type + ":" + param.value + '个';
						// 		}
						// 	}
						// },
						// legend: {
						// 	orient: 'vertical',
						// 	left: 10,
						// 	data: ['儿童', '老人', '少年', '中青年', '其他']
						// },
						// animation: false,
						// layoutAnimation:false,
						// hoverAnimation:false,
						series: [
							{
								// animation: false,
								name: '整体分类',
								type: 'pie',
								radius: [0, '40%'],
								// hoverAnimation: false,
								label: {
									position: 'inner',
								},
								layoutAnimation: false,
								selectedOffset: 0,
								selectedMode: 'single',//parseInt
								data: [
									{ value: data[0].VLAUE, name: `男${parseInt((data[0].VLAUE / (data[0].VLAUE + data[1].VLAUE)) * 100)}%`, itemStyle: { color: "#FFA800" } },
									{ value: data[1].VLAUE, name: `女${parseInt((data[1].VLAUE / (data[0].VLAUE + data[1].VLAUE)) * 100 + 1)}%`, itemStyle: { color: "#8666FC" } },
								]
							},
							{
								name: '分布年龄',
								animation: false,
								type: 'pie',
								radius: ['80%', '60%'],
								label: {
									normal: {
										show: false,
										// formatter: function (params) {
										// 	if (params.value != 0)
										// 		return params.data.type + ":" + params.value + '个';
										// 	else
										// 		return '';
										// }
									}
								},
								data: [
									{
										value: data1[0].AGECOUNTS, name: '儿童', type: project[0], itemStyle: {
											color: '#CF83FF'
										}
									},
									{
										value: data1[1].AGECOUNTS, name: '老人', type: project[1], itemStyle: {
											color: '#F94B7B'
										}
									},
									{
										value: data1[2].AGECOUNTS, name: '少年', type: project[2], itemStyle: {
											color: "#FFA800"
										}
									},
									{
										value: data1[3].AGECOUNTS, name: '中青年', type: project[3], itemStyle: {
											color: "#8766FD"
										}
									},
									{
										value: data1[4].AGECOUNTS, name: '其他', type: project[4], itemStyle: {
											color: "#1FCCAB"
										}
									},

								]
							}
						]
					};
					myChart.setOption(option);
					// console.log(option);
					// myChart.on('click', function (params) {
					// 	// alert(1);
					// 	console.log(params);//此处写点击事件内容
					// });
				},
			})
		},
	})

};
var myChart = echarts.init(document.getElementById('modular21'));



// 工单处理结果
getdata3("");
function getdata3(n) {

	let html = '';
	SecondTopDtd = $.Deferred()
	$.ajax({
		url: httpUrl + 'GetFeedBackResultStat?areaCode=' + n,
		type: 'get',
		success: function (res) {
			var data = JSON.parse(res).data;
			// console.log(data);
			// data = data.splice(0, 8)
			let html = '';
			let total = 0;
			$.each(data, function (index, item) {
				item.VALUE = item.VALUE / 1
				total += item.VALUE * 1
			})

			$.each(data, function (index, item) {

				html += `<li class="roll_${index + 1}">
						<p class='gdcl_p'>${item.NAME}</p>
						<div class="ellipsisBarOut"style="width: 80%;background-image: url('../images/newImage/insideImages/backpng.png');height: 0.1rem;background-repeat: no-repeat;">
								<div class="ellipsisBar" style="margin: 0">
									<div class="ellipsisWithin gdclt" style="background-image: url(../images/newImage/insideImages/backpngback.png);width: ${((item.VALUE / total) * 100).toFixed(2)}%;">
								</div>
								<span class="gdcl_span">${((item.VALUE / total) * 100).toFixed(2)}%</span>
							</div>
						</div>
						
                    </li>`
			})
			$('#comment1').html(html)




		},
	})
}


//消费性质
getdata4("");
function getdata4(n) {

	const map = 'http://211.149.250.2:20001/wisdom315_BusinessAPI_Jiangsu/UpLoadedFiles/Files/2020/09/02/20200902022600291.png'
	// const mapBoder = 'http://211.149.250.2:20001/wisdom315_BusinessAPI_Jiangsu/UpLoadedFiles/Files/2020/09/07/20200907045550000.png'
	$.ajax({
		url: httpUrl + 'GetShopSortStat?areaCode=' + n,
		type: 'get',
		success: function (res) {
			var data = JSON.parse(res).data;
			data.data1.splice(3, 1); //删除其他
			data.data2.splice(3, 1); //删除其他
			// console.log(data);
			var znum = 0;
			data.data2.map((index, item) => {
				znum = znum + Number(index)
			})
			// console.log(znum);
			document.getElementsByClassName('y1')[0].innerHTML = ((data.data2[0] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y2')[0].innerHTML = ((data.data2[1] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y3')[0].innerHTML = ((data.data2[2] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y5')[0].innerHTML = ((data.data2[3] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y6')[0].innerHTML = ((data.data2[4] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y7')[0].innerHTML = ((data.data2[5] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y8')[0].innerHTML = ((data.data2[6] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y9')[0].innerHTML = ((data.data2[7] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y10')[0].innerHTML = ((data.data2[8] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y11')[0].innerHTML = ((data.data2[9] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y12')[0].innerHTML = ((data.data2[10] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y13')[0].innerHTML = ((data.data2[11] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y14')[0].innerHTML = ((data.data2[12] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y15')[0].innerHTML = ((data.data2[13] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y16')[0].innerHTML = ((data.data2[14] / znum) * 100).toFixed(1) + '%'
			document.getElementsByClassName('y17')[0].innerHTML = ((data.data2[15] / znum) * 100).toFixed(1) + '%'
			// document.getElementsByClassName('y18')[0].innerHTML = ((data.data2[17] / znum) * 100).toFixed(1) + '%'



			document.getElementsByClassName('yy1')[0].innerHTML = data.data2[0] + '件'
			document.getElementsByClassName('yy2')[0].innerHTML = data.data2[1] + '件'
			document.getElementsByClassName('yy3')[0].innerHTML = data.data2[2] + '件'
			// document.getElementsByClassName('yy4')[0].innerHTML = data.data2[3] + '件'
			document.getElementsByClassName('yy5')[0].innerHTML = data.data2[3] + '件'
			document.getElementsByClassName('yy6')[0].innerHTML = data.data2[4] + '件'
			document.getElementsByClassName('yy7')[0].innerHTML = data.data2[5] + '件'
			document.getElementsByClassName('yy8')[0].innerHTML = data.data2[6] + '件'
			document.getElementsByClassName('yy9')[0].innerHTML = data.data2[7] + '件'
			document.getElementsByClassName('yy10')[0].innerHTML = data.data2[8] + '件'
			document.getElementsByClassName('yy11')[0].innerHTML = data.data2[9] + '件'
			document.getElementsByClassName('yy12')[0].innerHTML = data.data2[10] + '件'
			document.getElementsByClassName('yy13')[0].innerHTML = data.data2[11] + '件'
			document.getElementsByClassName('yy14')[0].innerHTML = data.data2[12] + '件'
			document.getElementsByClassName('yy15')[0].innerHTML = data.data2[13] + '件'
			document.getElementsByClassName('yy16')[0].innerHTML = data.data2[14] + '件'
			document.getElementsByClassName('yy17')[0].innerHTML = data.data2[15] + '件'






			var uploadedDataURL = "../images/img/dibg.png";
			var seriesData = data.data1.map((si, index) => {
				return {
					name: si,
					value: data.data2[index]
				}
			})
			// var legendData1 = ["大白", "长大", "杜洛克", "约克猪"]
			// var legendData2 = ["二元", "三元", "大长", "PIC"]
			var colorList = ['#CF83FF', '#FFA800', '#1FCCAB', '#3AE83E', '#FFCE79', '#FFA800', '#10B26B', '#F94B7B', '#8766FD', '#FFDE00', '#4B68F9', '#A294D6', '#5158BB', '#FD66B4', '#DD56ED', '#DD5685'];
			var znum = 0;
			//   var totalList = seriesData.map(si => { return Number(si.value) });
			//   var totals = totalList.reduce((si, total) => {
			// 	return total + si
			//   })
			seriesData.forEach((si, index) => {
				//   console.log(si,index);

				si['labelLine'] = {
					show: false,
					length: 0,
					length2: 0
				}
				si['emphasis'] = {
					labelLine: {
						show: (index) < 0,
					}
				}
			})
			option5 = {
				backgroundColor: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 1,
					colorStops: [{
						offset: 0,
						color: '#363646' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#363646' // 100% 处的颜色
					}],
					globalCoord: false // 缺省为 false
				},
				tooltip: {
					trigger: 'item',
					show: false
				},
				title: {
					text: '消费性质',
					x: 'center',
					y: 'center',
					textStyle: {
						fontWeight: 'normal',
						color: '#fff',
						fontSize: '12',
						left: '10'
					}
				},
				graphic: [  //背景图片
					{
						z: 4,
						type: 'image',
						id: 'logo',
						left: 'center',
						top: 'center',
						z: -10,
						bounding: 'raw',
						rotation: 0,//旋转
						origin: [40, 40],//中心点
						scale: [1.8, 1.8],//缩放
						style: {
							image: uploadedDataURL,
							width: 80,
							height: 80,
							opacity: 1
						}
					}],
				animation: false,

				series: [{
					type: 'pie',
					// radius:'130%',
					// animation: false,
					// clickable:false,
					// z: 3,
					// hoverAnimation: false,
					// layoutAnimation: false,
					center: ['50%', '50%'],
					radius: ['40%', '50%'],
					hoverOffset: 10,
					// avoidLabelOverlap: true,
					hoverOffset: 15,
					itemStyle: {
						normal: {
							color: function (params) {
								return colorList[params.dataIndex]
							}
						}
					},
					label: {
						normal: {
							show: true,
							fontSize: 12,
							position: 'outside',
							// layoutAnimation: false,
							// hoverAnimation: false,
							// animation: false,
							// formatter: '{a|{b}：{d}%}\n{hr|}',
							formatter: function (params, ticket, callback) {
								// console.log(params);
								var total = 0; //总数量
								var percent = 0; //占比
								seriesData.forEach(function (value, index, array) {
									value.value = value.value * 1
									total += value.value;
								});
								percent = ((params.value / total) * 100).toFixed(1);
								// console.log(params);
								return params.dataIndex < 5 ? `${params.name}${params.value}件\n{hr|}\n  ${percent}% ` : ''
							},
							rich: {
								a: {
									color: '#fff',
									padding: [30, -80, 0, -80]
								}
							}
						},

					},
					show: true,
					lineStyle: {
						show:false,
						color: '#a2c7f3',
						length: 0,
						length2: 0
					},
					data: seriesData

				},]
			};
			myChart2.setOption(option5);
			echartData = option5['series'][0]['data'];

		},
	})
}
var myChart2 = echarts.init(document.getElementById('xfxz_t'));






