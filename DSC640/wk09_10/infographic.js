

function init(){
	//loadJSON)
	//console.log(window.location)
	//console.log(window.location.href.replace("infographic.html","infographic_left.json"));
    //filename = window.location.href.replace("infographic.html","infographic_left.json");
    //loadJSON(filename);
    //console.log(infographic_left);
    
    var slider = document.getElementById("myRange");
    
    if (slider == null) {
        console.log("Waiting till elements load");
        setTimeout(() => {  init() }, 100);
        return;    
    }

    slider.max = (parseInt(Object.keys(infographic_left).length) + parseInt(Object.keys(infographic_right).length) ); 
 	slider.max -= 3;
    var output = document.getElementById("demo");
    index = Object.keys(infographic_left)[slider.value]
    output.innerHTML = index;
    output.innerHTML = "Date: " + index + "</br>Days: " +( parseInt(slider.value+1)) ; 
    

    const info_gfk_types = ['left','right'];

    for (var infographic_type in info_gfk_types) {
    	
    	if (info_gfk_types[infographic_type] == 'left'){
    		var info_OBJ = infographic_left;
    	}

		if (info_gfk_types[infographic_type] == 'right'){
    		var info_OBJ = infographic_right;
    	}
    		
    	index = Object.keys(info_OBJ)[slider.value];	
    	
	    //*** Build Table Container
	    var table = document.createElement("table");
	    var top_obj = info_OBJ[index];


	    

		var div = document.createElement("div");

		if (info_gfk_types[infographic_type] == 'left'){
			div.innerHTML = "Before Surge:</br>" + Object.keys(info_OBJ)[0] + " - " + Object.keys(info_OBJ)[Object.keys(info_OBJ).length-1];
		}
	    
	    if (info_gfk_types[infographic_type] == 'right'){
			div.innerHTML = "Post Surge:</br>" + Object.keys(info_OBJ)[0] + " - " + Object.keys(info_OBJ)[Object.keys(info_OBJ).length-1];
		}
	    div.className = 'header';
	    
	    

	    
	    
	    var tr = document.createElement("tr");
	    
	    for (label in top_obj[(Object.keys(top_obj))[0]]){
	        var th = document.createElement("th");    
	        if (label ==  "tier"){
	            label = "Tier";
	        }
	        if (label ==  "case_100k_avg"){
	            label = "Confirmed</br>100k";
	        }
	        if (label ==  "death_100k_avg"){
	            label = "Deaths</br>100k";
	        }

	        if (label ==  "relative_confirm_100k"){
	            label = "Relative</br>Confirm %";
	        }

	        if (label ==  "relative_death_100k"){
	            label = "Relative</br>Death %";
	        }

	        th.className = label;

			th.innerHTML = label;

	        tr.appendChild(th);
	    }
	    table.appendChild(tr);


	    for (row in top_obj){
	        
	        console.log(row);
	        //console.log(top_obj[row]);
	        var tr = document.createElement("tr");
	        tr.className = row;

	        for (elem in top_obj[row]) {

	            var td = document.createElement("td");

	            td.className = elem;
	            td.id = info_gfk_types[infographic_type]+"_" +  row + "_" + elem;

	            value = top_obj[row][elem];

	            if (elem == 'tier'){
	                value = value.replace("total_","");
	                value += "%";

	                
	            }


				if (info_gfk_types[infographic_type] == 'left'){
			         td.innerHTML = value;
				}
			    
			    if (info_gfk_types[infographic_type] == 'right'){
			    	td.innerHTML = "_";
			    	 if (elem == 'tier'){
				         td.innerHTML = value;		    	 
			    	 }
	            	
				}

	            

	            tr.appendChild(td)
	        }//*** END each elem

	        table.appendChild(tr)

    }//*** END each row
    div.appendChild(table);
	document.getElementById("table_container").appendChild(div)
    //document.getElementById("table_container").appendChild(table);


    }//*** END Each Infographic type

}

function handleSlider() {

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    if (slider.value < (Object.keys(infographic_left).length) ) {
	    index = Object.keys(infographic_left)[slider.value];

	    

	    output.innerHTML = "Date: " + index + "</br>Days: " + parseInt(parseInt(slider.value)+1) ; 
	    
	    var top_obj = infographic_left[index];
	    
	    var table = document.getElementById("table_container_left")

	    for (row in top_obj){
	        
	        for (elem in top_obj[row]){

	            value = top_obj[row][elem]
	            if (elem == 'tier'){
	                value = value.replace("total_","")
	                value += "%"                
	            }

	            this_DOM = document.getElementById("left_" + row + "_" + elem);

	            this_DOM.innerHTML = value;

	        }//*** END each Elem in row

	    }//*** End Each row in top OBJ
	
		//*** Draw Right Table
	    var top_obj = infographic_right[Object.keys(infographic_right)[0]];
	    
	    var table = document.getElementById("table_container_right");

	    for (row in top_obj){
	        
	        for (elem in top_obj[row]){

	            value = top_obj[row][elem]

	            this_DOM = document.getElementById("right_" + row + "_" + elem);

	            this_DOM.innerHTML = "_";

	            if (elem == 'tier'){
	                value = value.replace("total_","")
	                value += "%"                
		            this_DOM.innerHTML = value;
	            }



	        }//*** END each Elem in row


	    }//*** End Each row in top OBJ	    




	}//*** END is infographic_LEFT
	
	else {

		//*****************************
		//*** Draw Right Table
		//*****************************
		index = Object.keys(infographic_right)[slider.value - ((Object.keys(infographic_left).length)-2)];

	    output.innerHTML = "Date: " + index + "</br>Days: " + slider.value ; 
	  
	    var top_obj = infographic_right[index];
	    
	    var table = document.getElementById("table_container_right");

	    for (row in top_obj){
	        
	        for (elem in top_obj[row]){

	            value = top_obj[row][elem]
	            if (elem == 'tier'){
	                value = value.replace("total_","")
	                value += "%"                
	            }

	            this_DOM = document.getElementById("right_" + row + "_" + elem);

	            this_DOM.innerHTML = value;

	        }//*** END each Elem in row

	    }//*** End Each row in top OBJ	    


		//*****************************
		//*** Draw Left Table
		//*****************************
		index = Object.keys(infographic_left)[(Object.keys(infographic_left).length)-1];

		var top_obj = infographic_left[index];

			    var table = document.getElementById("table_container_let");

	    for (row in top_obj){
	        
	        for (elem in top_obj[row]){

	            value = top_obj[row][elem]
	            if (elem == 'tier'){
	                value = value.replace("total_","")
	                value += "%"                
	            }

	            this_DOM = document.getElementById("left_" + row + "_" + elem);

	            this_DOM.innerHTML = value;

	        }//*** END each Elem in row

	    }//*** End Each row in top OBJ	    


	   }//*** END update right Container

}//*** END handleSlider

