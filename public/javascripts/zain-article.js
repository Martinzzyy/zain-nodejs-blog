;$(function(){
    function setSize() {
        var $content = $("#content"),
            $table_panel = $(".table-list-panel");
        $content.height($(window).height());
        $table_panel.height($content.height() - 150);
        setDelegatesWid();
    }
    function setDelegatesWid() {
        var $table_panel = $(".table-list-panel"),
            $table_head = $('.table-list-title'),
            $delegates_td = $table_panel.find('tr').first().find('.delegation'),
            $delegates_th = $table_head.find('tr').first().find('.delegation'),
            tabwid = $table_panel.width(),
            tdNum = $delegates_td.length,
            percent10 = tabwid * 0.1;

        if (0 >= tdNum) return;
        var tdwid = (tabwid - percent10) / tdNum || 1;
        $delegates_td.find('div').width(tdwid);
        $delegates_th.find('div').width(tdwid);
    }
    $("#first_page,#up_page,#next_page,#last_page").click(function () {
        var pageindex = $(this).attr('page');
        loadDelegation(pageindex);
    });
    $("#input_page").focus(function () {
        //监听回车键
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                var pageindex = $("#input_page").val();
                if (!isNaN(pageindex)) {
                    loadDelegation(pageindex);
                }
            }
        }
    });
    $("#addbtn").click(function () {
        layer.open({
            type: 2,
            title: '发布文章',
            shadeClose: false,
            area: ['100%', '100%'],
            content: '/zain/article/add?type=add'
        });
    });
    window.reloadDelegationList = function () {
        layer.closeAll();
        var page = $("#up_page").attr('page');
        if (!isNaN(page)) {
            page = parseInt(page) + 1;
        } else {
            page = 1;
        }
        loadDelegation(page);
    }
    function getArticleList(pageIndex,search){
        var load = layer.msg('加载中', {
            icon: 16,
            shade: 0.1,
            time: 0
        });
        $.ajax({
            url: '/zain/article',
            cache: false,
            type: 'POST',
            data: { pageindex: pageIndex || 1, search: search },
            success:function(data){
                layer.close(load);
                var d = eval('(' + data + ')');
                if(1 == d.state){
                    var pageData = eval('(' + d.content + ')');
                    //设置分页
                    var pageCount = Math.max(Tools.floatToInt(parseInt(pageData.TotalCount) / parseInt(pageData.PageSize)), 1);
                    $("#first_page").attr("page", 1);
                    $("#last_page").attr("page", pageCount);
                    $("#up_page").attr("page", parseInt(pageData.PageIndex) - 1);
                    $("#next_page").attr("page", parseInt(pageData.PageIndex) + 1);
                    $("#nav_page").text("【" + pageData.PageIndex + "/" + pageCount + "】");

                    //设置列表
                    var list = pageData.DataList, html = "", reg = new RegExp(search, 'ig');
                    $(".table-list-panel>table").html(html);
                    for(var i in list){
                        html += '<tr class="' + (parseInt(i) % 2 == 0 ? 'odd-tr' : '') + '" dataid="' + list[i].id + '">'
                                    + '<td class="delegation"><div class="td-f-left" class="td-f-left" title="' + list[i].title + '">' + (!search ? list[i].title : list[i].title.replace(reg, '<i style="color:red">' + search + '</i>')) + '</div></td>'
                                    + '<td class="delegation">' + Tools.ChangeDateFormat(list[i].createtime, 'yyyy年MM月dd日') + '</td>'
                                    + '<td class="delegation">' +  list[i].see +'</td>'
                                    + '<td class="number">'
                                    + '    <a class="delete" href="javascript:void(0);">删除</a>'
                                    + '    <a class="edit" href="javascript:void(0);">编辑</a>'
                                    + '</td>'
                                + '</tr>';
                    }
                    $(".table-list-panel>table").html(html);
                    setDelegatesWid();
                    var $tr = $(".table-list-panel>table tr");
                    $tr.find('.delete').click(function () {
                        layer.alert('删除')
                    });
                    $tr.find('.edit').click(function () {
                        layer.alert('编辑');
                    });
                }
            },
            error:function(err){
                layer.close(load);
                layer.alert('请求出错了', { icon: 2 });
            }
        })
    }
    $(window).resize(setSize);
    setSize();
    getArticleList(1,"");
});