console.log('我是console.log输出')
function showPic(whichpic){   //作为事件函数，可以接受发生事件的当前元素dom对象
    console.log(whichpic);
    console.log("函数内console.log输出:"+whichpic);
	var source=whichpic.getAttribute("href");  //whichpic是发生click事件的元素实例，或租这个元素的href属性值
	var placeholder = document.getElementById("placeholder");  //id是placeholder的元素
	placeholder.setAttribute("src",source);   //设置id='placeholder'的元素的src属性值为source
}