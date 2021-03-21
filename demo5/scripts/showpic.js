function showPic(whichpic){
    var source = whichpic.getAttribute('href');
    var title_text=whichpic.getAttribute('title');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src',source);
    var image_description=document.getElementById('description');
    image_description.firstChild.nodeValue=title_text;
}

function countBodyChildren(){
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
}

function popUp(winURL){
    window.open(winURL,"popup","width=320,height=480");
}

window.onload=countBodyChildren;