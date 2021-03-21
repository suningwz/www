function showPic(whichpic){
	var source=whichpic.getAttribute("href");
	var title_text=whichpic.getAttribute("title");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	var description=document.getElementById("description")；
	description.firstChild.nodeValue=title_text;
}