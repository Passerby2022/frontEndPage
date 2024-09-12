var back = document.getElementById('back');
//定义一个数组用于存放粒子的各种属性
var pixaldata = [];
//定义一个变量用于设置粒子的生命周期
var pixallife = 50;
//利用鼠标的移动事件来触发产生粒子
window.addEventListener("mousemove", function(evt){
    //利用span元素来作为粒子，设置一下span的样式
    var span = document.createElement("span");
    span.className = "pixal";
    //在back层中建立新的子元素span
    back.appendChild(span);
    //同时在粒子属性数组添加对粒子的设定
    //包括粒子存活事件、随机的颜色、随机的位置以及随机的移动速度
    pixaldata.push({
        age: 0,
        color: "rgba(" +
            parseInt(Math.random() * 255) + "." + 
            parseInt(Math.random() * 255) + "." + 
            parseInt(Math.random() * 255) + "." + 
            parseInt(Math.random() * 255) + ")" ,
        vx: Math.random() * 0.5,
        vy: Math.random() * 0.75,
        sx: evt.x,
        sy: evt.y
    })
});

//根据以上数据，重新绘制粒子层
function draw() {
    for(var i = 0; i < pixaldata.length; i++){
        pixal = pixaldata[i];
        //利用js获取back的子元素，子元素的数量与粒子数组一致
        children = back.children[i];
        pixal.age++;
        pixal.sx += pixal.vx * 2;
        pixal.sy += pixal.vy * 2;
        children.style.background = pixal.color;
        children.style.left = pixal.sx + "px";
        children.style.top = pixal.sy + "px";
        //判断子元素的生命值是否以及超过了预设的寿命
        if(pixal.age > pixallife){
            //在粒子数组中删除对应的元素，同时删除back的对应子元素
            pixaldata.splice(i,1);
            back.removeChild(back.childNodes[i]);
        }   
    }
}
//设定好刷新速度
setInterval(draw, 1);

//因为粒子始终处于所有元素的前面
//所以为了不影响正常的点击操作
//粒子的扩散范围是象右下方扩散的