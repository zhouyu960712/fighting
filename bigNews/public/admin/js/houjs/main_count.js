
//发送ajax请求，获取文章数量信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8000/admin/article_count',
    success: function (response) {
        //查看后台返回数据
        // console.log(response.data);
        // all_count文章总数,day_count当天文章发布文章总数

        // 1-准备模板
        // 2-拼接模板
        var html = template('articleCountTpl', response.data)
        // console.log(html);//查看拼接好的字符串

        // 3-渲染到页面
        $('#count_1Box').html(html);
    }
});


//发送ajax请求，获取评论数量信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8000/admin/comment_count',
    success: function (response) {
        //查看后台返回数据
        // console.log(response.data);
        // all_count评论总数,day_count当天发布评论总数


        // 1-准备模板
        // 2-拼接模板
        var html = template('commentCountTpl', response.data)
        // console.log(html);//查看拼接好的字符串

        // 3-渲染到页面
        $('#count_2Box').html(html);
    }
});

// function zy(a){
//发送ajax请求，获取月新增文章数每日份的
$.ajax({
    type: 'get',
    url: 'http://localhost:8000/admin/month_article_count',
    success: function (response) {

        var oChart = echarts.init($('#curve_show')[0]);
        var aList_all = [

        ];
        for (var i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].day_count);
            aList_all.push({ 'count': response.data[i].day_count, 'date': response.data[i].day })
        };

        // console.log(aList_all);

        let aCount = [];
        let aDate = [];

        for (var i = 0; i < aList_all.length; i++) {
            aCount.push(aList_all[i].count);
            aDate.push(aList_all[i].date);
        }

        var chartopt = {
            title: {
                text: '月新增文章数',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    name: '日',
                    type: 'category',
                    boundaryGap: false,
                    data: aDate
                }
            ],
            yAxis: [
                {
                    name: '月新增文章数',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' }, color: '#f80' }, lineStyle: { color: '#f80' } },
                    data: aCount
                }],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,136,0,0.39)'
                    }, {
                        offset: .34,
                        color: 'rgba(255,180,0,0.25)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,222,0,0.00)'
                    }])

                }
            },
            grid: {
                show: true,
                x: 50,
                x2: 50,
                y: 80,
                height: 220
            }
        };

        oChart.setOption(chartopt);

        $.ajax({
            type: 'get',
            url: 'http://localhost:8000/admin/article_category_count',
            success: function (response02) {
                console.log(response02.data);

                var oPie = echarts.init(document.getElementById('pie_show'));
                var oPieopt =
                {
                    title: {
                        top: 10,
                        text: '分类文章数量比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: [],
                    legend: {
                        x: 'center',
                        top: 65,
                        data: []
                    },
                    toolbox: {
                        show: true,
                        x: 'center',
                        top: 35,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['45%', '60%'],
                            center: ['50%', '65%'],
                            data: [

                            ]
                        }
                    ]
                };
                for (var i = 0; i < response02.data.length; i++) {
                    // console.log(response.data[i].day_count);
                    oPieopt.legend.data.push(response02.data[i].type);
                    if (i % 2 == 0) {
                        oPieopt.color.push('#fc30' + 'a' + i)
                    } else {
                        oPieopt.color.push('#20fd' + '3' + i)
                    }
                };
                console.log(oPieopt.legend.data);
                console.log(oPieopt.color);

                for (var i = 0; i < response02.data.length; i++) {
                    // console.log(response.data[i].day_count);
                    oPieopt.series[0].data.push({ 'value': response02.data[i].all_count, 'name': response02.data[i].type })
                };
                console.log(oPieopt.series[0].data);
                oPie.setOption(oPieopt);

                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8000/admin/article_category_visit',
                    success: function (response03) {
                        console.log(response03.data);

                        var oColumn = echarts.init(document.getElementById('column_show'));
                        var oColumnopt =
                        {
                            title: {
                                text: '文章访问量',
                                left: 'center',
                                top: '10'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [],
                                top: '40'
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: { show: true },
                                    dataView: { show: true, readOnly: false },
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['1月', '2月', '3月', '4月', '5月']
                                }
                            ],
                            yAxis: [
                                {
                                    name: '访问量',
                                    type: 'value'
                                }
                            ],
                            series: [
                                
                            ],
                            grid: {
                                show: true,
                                x: 50,
                                x2: 30,
                                y: 80,
                                height: 260
                            },
                            dataZoom: [//给x轴设置滚动条
                                {
                                    start: 0,//默认为0
                                    end: 100 - 1000 / 31,//默认为100
                                    type: 'slider',
                                    show: true,
                                    xAxisIndex: [0],
                                    handleSize: 0,//滑动条的 左右2个滑动条的大小
                                    height: 8,//组件高度
                                    left: 45, //左边的距离
                                    right: 50,//右边的距离
                                    bottom: 26,//右边的距离
                                    handleColor: '#ddd',//h滑动图标的颜色
                                    handleStyle: {
                                        borderColor: "#cacaca",
                                        borderWidth: "1",
                                        shadowBlur: 2,
                                        background: "#ddd",
                                        shadowColor: "#ddd",
                                    }
                                }]
                        };
                        for (var i = 0; i < response03.data[0].all_count.length; i++) {
                            // console.log(response.data[i].day_count);
                            oColumnopt.legend.data.push(response03.data[0].all_count[i].type);

                            if (i % 2 == 0) {
                                oColumnopt.series.push({
                                    name: response03.data[0].all_count[i].type,
                                    type: 'bar',
                                    barWidth: 100 / response03.data[0].all_count.length,
                                    itemStyle: {
                                        normal: { areaStyle: { type: 'default' }, color: '#fc30' + 'a' + i }
                                    },
                                    data: []
                                });
                                for(var j=0;j<response03.data.length;j++){
                                    oColumnopt.series[i].data.push(response03.data[j].all_count[i].count)
                                }
                                
                            } else {
                                oColumnopt.series.push({
                                    name: response03.data[0].all_count[i].type,
                                    type: 'bar',
                                    barWidth: 100 / response03.data[0].all_count.length,
                                    itemStyle: {
                                        normal: { areaStyle: { type: 'default' }, color: '#20fd' + '3' + i }
                                    },
                                    data: []
                                });
                                for(var j=0;j<response03.data.length;j++){
                                    oColumnopt.series[i].data.push(response03.data[j].all_count[i].count)
                                }
                            }
                        };
                        console.log(oColumnopt.legend.data);
                        console.log(oColumnopt.series);
                        
                        oColumn.setOption(oColumnopt);
                    }
                })
            }


        });

    }
});

