function inserthtml(){
	var test_div = document.getElementById('testdiv');
	var insert_content = '<p>This is insert content</p>';
	test_div.innerHTML=insert_content;
}

function insertnode(){
	var li_node=document.createElement('li');
	var li_text_node=document.createTextNode('These are insert node');
	var test_div=document.getElementById('testdiv');
	li_node.appendChild(li_text_node);
	test_div.appendChild(li_node);
}

window.onload=insertnode;

	
	