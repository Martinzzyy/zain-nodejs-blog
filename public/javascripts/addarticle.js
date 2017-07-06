;$(function(){
    $("#article").markdown({
        language: 'zh',
        fullscreen: {
            enable: true,
            debounce: 500
        },
        resize: 'vertical',
        localStorage: 'md',
        imgurl: '/c/imgUpload',
        base64url: '/c/imgUpload',
        flowChart : true
    });
})