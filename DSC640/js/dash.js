load_confirm = true;
function openCity(evt, cityName) {
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
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 


function showHistorical(evt, id){
  // Declare all variables
  var i, dd_content;


  // Get all elements with class="tabcontent" and hide them
  dd_content = document.getElementsByClassName("dd_historical");
  for (i = 0; i < dd_content.length; i++) {
    dd_content[i].style.display = "none";
  }

 if (id == 'confirm_animation'){
    thisElem = document.getElementById(id);
    if (load_confirm) {
      load_confirm=false;

       
      img = document.createElement("img");
      //adds image to the image element
      img.src="confirm_100k_history.gif";
      //img.src="confirm_100k_thumb.gif";
      thisElem.innerHTML = "";
      thisElem.appendChild(img);
      
      

    }//*** End Load Confirem
 }//*** End Check confirm_animation

 document.getElementById(id).style.display = "inline";



} //*** END showHistorical