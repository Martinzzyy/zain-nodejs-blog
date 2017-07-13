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
        layer.alert($("#article").val());
    });
    $('.labels').click(function(){
        if($(this).is('.find-label')){
            $(this).removeClass('find-label');
        }else{
            $(this).addClass('find-label');
        }
    })
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