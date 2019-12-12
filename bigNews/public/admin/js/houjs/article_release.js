//给图片添加注册一个change事件
$("#exampleInputFile").on('change',function(){
    //获取当前选中的文件

    var file=this.files[0];
    // 获取到选中文件的地址

    var imgUrl=URL.createObjectURL(file);
    // 给隐藏域设置val值 以便后面的获取
    $("#exampleImg").val(imgUrl);
})


//文章发表表单提交
$('#articleAddForm').on('submit','.btn', function () {
    // alert('ok');//测试事件注册是否成功
    console.log($(this).val());
    // 获取表单中的内容
    // var formData=$(this).serialize();
    // console.log(formData);
    // $()
    // //发送ajax请求
    // $.ajax({
    //     type:'post',
    //     url:'http://localhost:8000/admin/article_publish',
    //     data:formData,
    //     success:function(response){
    //         console.log(response);
    //     }
    // })

    return false;
})
