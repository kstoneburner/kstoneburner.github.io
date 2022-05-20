function init(){
	
	//*** Check that image_paths is fully loaded
	//*** If not, wait 100ms, run init() again
	if (typeof image_paths == "undefined") { setTimeout(function(){ console.log("Waiting For image_paths");init() },100); return; }

	last_image_elems = document.getElementsByClassName('last_image')

	for (var i=0; i < last_image_elems.length; i++) {
		
		//***
		if (typeof image_paths[last_image_elems[i].id] != "undefined"){
			filelist = image_paths[last_image_elems[i].id];

			console.log("images/"+last_image_elems[i].id+"/"+filelist);
			
			document.getElementById(last_image_elems[i].id).src = "images/"+last_image_elems[i].id+"/"+filelist.pop();
		}
		else {
			alert(last_image_elems[i].id+" Does Not Exist in image_paths")
		}
	}//*** END each last_image_elem
}

