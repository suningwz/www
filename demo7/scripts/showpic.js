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

function prepareHolder() {
	var placeholder=document.createElement('img');
	placeholder.setAttribute('src','image/placeholder.gif');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('alt','My image gallery');
	var description = document.createElement('p');
	description.setAttribute('id','description');
	var destext=document.createTextNode('Choose an image');
	description.appendChild(destext);
	var imagegallery=document.getElementById('imagegallery');
	var parent_of_imagegallery=imagegallery.parentElement;
	if (imagegallery==parent_of_imagegallery.lastChild) {
		parent_of_imagegallery.appendChild(placeholder);
		parent_of_imagegallery.appendChild(description);
	} else {
		parent_of_imagegallery.insertBefore(description,imagegallery.nextSibling);
		parent_of_imagegallery.insertBefore(placeholder,imagegallery.nextSibling);
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

//addLoadEvent(countBodyChildren);
addLoadEvent(prepareHolder);
addLoadEvent(prepareGallery);