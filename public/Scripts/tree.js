/*
|------------------------------------------|
| @author:  王衡
| @version: v 1.0.0
| @website: 
| @email:	wangheng920411@163.com 
|------------------------------------------|
|AlterHistory:
|2014-04-16	create
*/

///初始化树 
function initTree(childs) {

    for (var i = 0; i < childs.length; i++) {
        if (childs[i].children.length > 1) {
            $($(childs[i]).children(".tree_node")).bind("click", function (e) {
                if ($(this).children().length <= 1) return;
                var isShow = $(this).parent().children("ul").css("display") === "block";
                if (isShow) {
                    $(this).parent().children(".tree_node").children("b").removeClass("tree_node_icon_open").addClass("tree_node_icon");
                    $(this).parent().children("ul").slideUp("slow", function () { $(this).parent().parent().css({ height: $(this).parent().parent().innerHeight() }); });
                }
                else {
                    $(this).parent().parent().css({ height: "auto" });
                    $(this).parent().children(".tree_node").children("b").removeClass("tree_node_icon").addClass("tree_node_icon_open");
                    $(this).parent().children("ul").slideDown("slow");
                }
            });
            $(childs[i]).children("ul").css({ display: "none", height: $(childs[i]).children("ul").children().length * 39 });
        }
        else {
            $(childs[i]).children(".tree_node").children("b").removeClass("tree_node_icon").addClass("tree_node_icon_none");
        }

        initTree($(childs[i]).children("ul").children("li"));
    }
}


var trees = $(".tree");
trees.each(function (index, element) {
    var childs = $(element).children();  //取得树面板下的几个结点
    initTree(childs);
});