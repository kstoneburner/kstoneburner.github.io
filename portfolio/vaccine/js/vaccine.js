anims = { };
loop_running = false;
refresh_rate = 200;
function init(){
	
	//*** Check that image_paths is fully loaded
	//*** If not, wait 100ms, run init() again
	if (typeof image_paths == "undefined") { setTimeout(function(){ console.log("Waiting For image_paths");init() },100); return; }

	image_elems = document.getElementsByClassName('last_image')

	for (var i=0; i < image_elems.length; i++) {
		
		//***
		if (typeof image_paths[image_elems[i].id] != "undefined"){
			filelist = image_paths[image_elems[i].id];

			//console.log("images/"+image_elems[i].id+"/"+filelist);
			thisElem = document.getElementById(image_elems[i].id);
			thisElem.src = "images/"+image_elems[i].id+"/"+filelist.pop();

		}
		else {
			alert(image_elems[i].id+" Does Not Exist in image_paths")
		}
	}//*** END each last_image_elem


	image_elems = document.getElementsByClassName('animate_image')

	for (var i=0; i < image_elems.length; i++) {
		
		//***
		if (typeof image_paths[image_elems[i].id] != "undefined"){
			filelist = image_paths[image_elems[i].id];

			//console.log("images/"+image_elems[i].id+"/"+filelist);
			thisElem = document.getElementById(image_elems[i].id);
			thisElem.src = "images/"+image_elems[i].id+"/"+filelist.pop();

		}
		else {
			alert(image_elems[i].id+" Does Not Exist in image_paths")
		}
	}//*** END each animate_image

	
	
} //*** END Init

function openTab(evt, target) {
  // Declare all variables
  var i, tabcontent, tablinks;


  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(target).style.display = "block";
  evt.currentTarget.className += " active";
} 

//*** Play: Unicode = &#x23F5;
//*** Pause: Unicode = &#x23F8;

function animate_image(self){

	//console.log(self.id  + " " + self.status)

	if (typeof(self.status) == "undefined") {
		self.status = "pause"
	}

	if (self.status == "pause") {
		self.status = "play"
		self.innerHTML = "&#x23F8"
		update_anim_loop(self.status,self.id)
	}
	else if (self.status == "play"){
		self.status = "pause"
		self.innerHTML = "&#x23F5"
		update_anim_loop(self.status,self.id)
	}

}

function update_anim_loop(input_action,input_id){

	//*** Initialize ID if needed
	if (typeof(anims[input_id]) == "undefined" ) {

		anims[input_id] = {
			'status' : input_action,
			'index' : 0,
			'image_list' : image_paths[input_id]
		}		
	}

	//*** Assign Object Status
	anims[input_id]['status']  = input_action

	//*** Start Animation Loop if needed
	if (loop_running == false) {loop_running = true; anim_loop()}

}//*** END Update_anim_loop

function anim_loop() {

	//for (const [id, loop_obj] of Object.entries(anims)) 
	for (const id in anims)
	{
    	
    	if (anims[id]['status'] == 'play') {

    		i = anims[id]['index']

    		filename = anims[id]['image_list'][i];

    		thisElem = document.getElementById(id)
    		thisElem.src = "images/"+id+"/"+filename

    		anims[id]['index'] = anims[id]['index'] + 1;

    		if (anims[id]['index'] > anims[id]['image_list'].length - 1 ) {
				anims[id]['index'] = 0

				buttons = document.getElementsByClassName("animate_image");
				for (i = 0; i < buttons.length; i++) {
				    //button[i].style.display = "none";
				    if (buttons[i].id == id) {
				    	buttons[i].innerHTML = "&#x23F5";
				    	buttons[i].status = "pause"
				    }
				}


				update_anim_loop('pause',id);
				

    		}


    	}
	}

	setTimeout(function(){ anim_loop() },refresh_rate); return;
}//*** END anim_loop

