/*自执行*/
/*闭包
1. 避免变量的全局污染
2. 把全局变量变成了局部变量
*/
(function($){
    /*定义第三方方法*/
    /*定义新jquery方法*/
    /*基于jquery封装一个插件*/
    /*扩展 jQuery 元素集来提供新的方法（通常用来制作插件）。*/
    /*$.fn.extend({ a:function(){},b:function(){} });*/

    $.fn.WaterFall = function(){
        /*
        * 1.瀑布流布局的大容器  当作元素集
        * 2.小容器  一行放5个
        * 3.根据容器的宽度计算 间距
        * 4.第一排比较特殊   顶部定位都是0  左边定位 当前列索引*（小容器宽度+间距）
        * 5.其他排列         找到最矮的一列  跟均这一列的索引 和 高度 进行定位
        * 顶部定位  当前列高度+间距     左侧定位 当前列索引*（小容器宽度+间距）
        * 6. 需要记录每一列的高度 当时 每一次排列之后需要跟新  每一列高度
        * */

        /*初始化  $('.items').WaterFall();*/
        var parentBox = $(this);

        /*子容器*/
        var childBox = parentBox.children();

        /*盒子每一行数量*/
        var col = 5;

        /*计算间距*/
        var parentBoxWidth = parentBox.width();
        var childBoxWidth = childBox.width();
        var space = (parentBoxWidth-childBoxWidth*col)/(col-1);

        /*核心*/
        var colHeightArr = [];

        childBox.each(function(i,item){
            /* col 是 5  0，1，2，3，4 */
            var $item = $(item);
            if (i < col) {
                /*这就是第一排*/
                $item.css({
                    top: 0,
                    left: i*(childBoxWidth+space)
                });
                /*记录高度*/
                colHeightArr[i] = $item.height();
            } else {
                /*其他盒子*/
                /*找当前最矮的那一列*/
                var minIndex = 0;
                var minHeight = colHeightArr[minIndex];
                $.each(colHeightArr,function(i,item){
                    if(minHeight > item){
                        minIndex = i;
                        minHeight = item;
                    }
                });
                /*定位*/
                $item.css({
                    top:minHeight+space,
                    left: minIndex*(childBoxWidth+space)
                });
                /*记录*/
                colHeightArr[minIndex] = minHeight + space + $item.height();
            }
        });

        /*设置父容器的高度  最高的一列*/
        var maxHeight = colHeightArr[0];
        $.each(colHeightArr,function(i,item){
            if(maxHeight < item){
                maxHeight = item;
            }
        })
        parentBox.height(maxHeight);
    }

})(jQuery);