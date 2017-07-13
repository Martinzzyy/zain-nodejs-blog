;$(function(){
    $("#article").markdown({
        language: 'zh',
        fullscreen: {
            enable: true,
            debounce: 500
        },
        resize: 'vertical',
        localStorage: 'md',
        imgurl: '/zain/article/uploadthinker',
        base64url: '',
        flowChart : true
    });
    $('#submitbtn').click(function(){
        layer.alert();
    });
    $('.labels').click(function(){
        if($(this).is('.find-label')){
            $(this).removeClass('find-label');
        }else{
            $(this).addClass('find-label').siblings().removeClass('find-label');
        }
    });
    $('#submitbtn').click(function(){
        var query = Tools.GetUrlQuerying(),
            id = query['id'],
            type = query['type'];
        var subdata = {
            title : $('#title').val(),
            subtitle: $('#subtitle').val(),
            title_picture: $('#title_picture_callback').attr('src'),
            content: $("#article").val(),
            label: $('.find-label').attr('dataid'),
            keyword: $('#keyword').val(),
            id = id,
            type = type
        };
        if(!Tools.isDefine(subdata.title)){
            layer.msg('标题不能为空');
            return false;
        }else if(!Tools.isDefine(subdata.subtitle)){
            layer.msg('副标题不能为空');
            return false;
        }else if(!Tools.isDefine(subdata.title_picture)){
            layer.msg('标题图不能为空');
            return false;
        }else if(!Tools.isDefine(subdata.content)){
            layer.msg('内容不能为空');
            return false;
        }else if(!Tools.subdata(subdata.label) || isNaN(subdata.label)){
            layer.msg('label不能为空');
            return false;
        }else if(!Tools.isDefine(subdata.keyword)){
            layer.msg('关键词不能为空');
            return false;
        }else if(!Tools.isDefine(subdata.type)){
            layer.msg('类型错误');
            return false;
        }
        var load = layer.load('加载中', {
            icon: 16,
            shade: 0.1,
            time: 0
        });
        $.ajax({
            url:'/zain/article/add',
            type:'POST',
            cache:false,
            data:subdata,
            success:function(data){
                layer.close(load);
                var result = JSON.parse(data);
                if(1 == result.state){
                    layer.alert(d.content, function () {
                        parent.reloadList();
                    });
                }else{
                    layer.alert(d.content, { icon: 2 });
                }
            },
            error:function(err){
                layer.close(load);
                layer.alert(d.content, { icon: 2 });
            }
        })
    });
});
function ajaxFileUpload() {
    var image = $("#title_picture").val();
    if ($.trim(image) == "") {
        layer.alert("请选择图片！");
        return;
    }
    var patn = /\.jpg$|\.jpeg$|\.png$|\.gif$/i;
    if (!patn.test(image)) {
        layer.alert("您选择的似乎不是图像文件。");
        $("#userPortrait").val("")
        return;
    }
    var elementIds = ["title_picture"];
    $.ajaxFileUpload({
        url: '/zain/article/uploadpicture',
        type: 'post',
        secureuri: false,
        fileElementId: 'title_picture',
        dataType: 'text',
        elementIds: elementIds,
        success: function (data, status) {
            var d = eval('(' + data + ')');
            if (-1 != d.state) {
                $("#title_picture_callback").show().attr('src',d.content)
            } else {
                layer.alert(d.content);
            }
        },
        error: function (data, status, e) {
            layer.alert("上传文件出错了");
        }
    });
}