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

function prepareGallery(){
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            showPic(this);
            return false;
        }
    }
}


function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof(window.onload) != 'function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

addLoadEvent(countBodyChildren);
addLoadEvent(prepareGallery);
