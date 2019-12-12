
//发送ajax请求，获取用户信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8000/admin/getuser',
    success: function (response) {
        //查看后台返回数据
        console.log(response);

        // 1-准备模板
        // 2-拼接模板
        var html = template('userInfoTpl', response.data);
        // console.log(html);//查看拼接好的字符串

        // 3-渲染到页面
        $('#userInfoBox').html(html);
    }
});

$('#del').on('click',function(){
    // console.log(confirm('您确定您要退出吗？'))
    if(confirm('您确定您要退出吗？')){
        $.ajax({
            type:'post',
            url:'http://localhost:8000/admin/logout',
            success:function(){
                location.href='/admin/login.html';
            }
        })
    }
})


