//*** Barchart Using Canvas
//*** https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
//*** Chart.org
//*** https://www.chartjs.org/docs/latest/

const tier_colors = ['#b40426', '#d95847', '#f18d6f', '#f7b89c', '#ead4c8', '#cdd9ec', '#aac7fd', '#82a6fb', '#5d7ce6'];


var myData = {}
var confirm_chart = null
function init(){

    
    var slider = document.getElementById("myRange");
    
    if (slider == null) {
        console.log("Waiting till elements load");
        setTimeout(() => {  init() }, 100);
        return;    
    }

    //slider.max = (parseInt(Object.keys(infographic_left).length) + parseInt(Object.keys(infographic_right).length) ); 
    slider.max = (parseInt(Object.keys(infographic_left).length)  ); 
 	slider.max -= 1;
    var output = document.getElementById("header");
    index = Object.keys(infographic_left)[slider.value]
    output.innerHTML = index;
    output.innerHTML = "Date: " + index + "</br>Day: " +( parseInt(slider.value+1)) ; 
    
    const info_gfk_types = ['left'];

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
	    table.id = "table_inner";
	    var top_obj = info_OBJ[index];
	    
	    var tr = document.createElement("tr");
	    
	    for (label in top_obj[(Object.keys(top_obj))[0]]){
	        
			
	        var th = document.createElement("th");    
	        th.className = label;

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
	        if (label ==  "total_vaccinated_percent"){
	            label = "Vaccinated";
	        }

	        

			th.innerHTML = label;

	        tr.appendChild(th);
	    }
	    table.appendChild(tr);


	    for (row in top_obj){
	        
	        //console.log(row);
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
    //div.appendChild(table);
	document.getElementById("table_container").appendChild(table)

    

	var current_vax_img = document.getElementById("current_vax_img")
	var death_jpg = document.getElementById("death_jpg")
	
	const pageMaxWidth = death_jpg.getBoundingClientRect().right

	current_vax_img.style.maxWidth = pageMaxWidth + "px"; 

	initChart();

    }//*** END Each Infographic type


}//*** END Init

function handleSlider() {

    var slider = document.getElementById("myRange");
    var output = document.getElementById("header");
    
    testCode();
    updateImages();

    if (slider.value <= (Object.keys(infographic_left).length) ) {
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
		
	}//*** END is infographic_LEFT


}//*** END handleSlider

function initChart(){
	
	//var table = document.getElementById("table_container");
	var table = document.getElementById("table_inner");
	

	confirm_list = [];
	death_list = [];
	data_labels = [];
	var slider = document.getElementById("myRange");
	index = Object.keys(infographic_left)[slider.value];
	for (tier in infographic_left[index]){
		
		confirm_list.push(parseInt(infographic_left[index][tier]['case_100k_avg']));
		death_list.push(parseInt(infographic_left[index][tier]['death_100k_avg']));
		label=tier.toString().replace("total_","")+"%";		
		data_labels.push(label)
		
	}

	var death_jpg = document.getElementById("death_jpg")
	const pageMaxWidth = death_jpg.getBoundingClientRect().right
	document.getElementById("intro_text").style.width=pageMaxWidth+'px';

	var vax_jpg = document.getElementById('vax_jpg');
	console.log(pageMaxWidth,parseInt(table.getBoundingClientRect().width),vax_jpg.getBoundingClientRect().width);
	//vax_jpg.height = parseInt(table.getBoundingClientRect().height * 1.15) + 'px';
	

	var remainder = vax_jpg.getBoundingClientRect().width +  table.getBoundingClientRect().width;
	console.log(remainder);
	remainder = pageMaxWidth - remainder 
	console.log(remainder);

	remainder = parseInt(remainder /2);
	
	console.log("Remainder: " + remainder);

	var confirm_ctx = document.getElementById('confirm_chart').getContext('2d');
	var death_ctx = document.getElementById('death_chart').getContext('2d');

	var confirm_canvas = document.getElementById('confirm_chart');
	var death_canvas = document.getElementById('death_chart');

	
	//confirm_canvas.style.width = '100px';
	


	confirm_canvas.style.width = remainder+'px';
	confirm_canvas.style.height = parseInt(table.getBoundingClientRect().height * 1.15) + 'px';
	confirm_canvas.style.width = '400px';

	death_canvas.style.width = remainder+'px';
	death_canvas.style.width = '400px';

	death_canvas.style.height = parseInt(table.getBoundingClientRect().height * 1.15) + 'px';

	vax_jpg.height = parseInt(confirm_canvas.getBoundingClientRect().height);
/*
	//*** Resize Canvas if there is leftover room
	if (window.innerWidth > parseInt(vax_jpg.getBoundingClientRect().right)){
		remainder = window.innerWidth - parseInt(vax_jpg.getBoundingClientRect().right)
		remainder = parseInt(remainder/2)
		confirm_canvas.style.width = (confirm_canvas.getBoundingClientRect().width + remainder) + 'px';
		death_canvas.style.width = confirm_canvas.style.width;
	}
*/





	confirm_chart = new Chart(confirm_ctx, {
	    type: 'bar',

	    data: {

	        labels : data_labels,
	        datasets: [{
	            label: 'Confirmed Cases per 100k by Tier',
	            //data: [12, 19, 3, 5, 2, 3],
	            data: confirm_list,
	            backgroundColor: tier_colors,
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	        }]
	    },
	    options: {

	        scales: {
	            x: {
	                beginAtZero: true,
					min: 0,
	            	max: 100,
	            	stepSize: 20
	            }
	        },
	        indexAxis : 'y',
	        responsive: false,
	        plugins:  {
	        	title : {
	        		display : true,
	        		text: 'Confirmed Cases per 100k by Tier',
	        	},
	        	legend : {
	        		display : false,

	        	}
	        },
			maintainAspectRatio: false,
			showScale: false,
	  		//aspectRatio: 1,

	    }
	});





	//death_canvas.style.width = '300px'
	//death_canvas.style.height =confirm_canvas.style.height;
	death_chart = new Chart(death_ctx, {
	    type: 'bar',

	    data: {

	        labels : data_labels,
	        datasets: [{
	            label: 'Confirmed Cases per 100k by Tier',
	            //data: [12, 19, 3, 5, 2, 3],
	            data: death_list,
	            backgroundColor: tier_colors,
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	        }]
	    },
	    options: {

	        scales: {
	            x: {
	                beginAtZero: true,
					min: 0,
	            	max: 2,
	            	stepSize: .5
	            }
	        },
	        indexAxis : 'y',
	        responsive: false,
	        plugins:  {
	        	title : {
	        		display : true,
	        		text: 'Deaths per 100k by Tier',
	        	},
	        	legend : {
	        		display : false,

	        	}
	        },
			maintainAspectRatio: false,
			showScale: false,
	  		//aspectRatio: 1,

	    }
	});


}//*** END init Chart
function updateData(chart, label, data) {
    chart.data.labels = label;
    chart.data = data;
    chart.update();
}

function testCode(){
	myData = {};
	confirm_list = [];
	death_list = [];
	data_labels = [];
	var slider = document.getElementById("myRange");
	index = Object.keys(infographic_left)[slider.value];
	for (tier in infographic_left[index]){
		
		myData[tier.toString()] = parseInt(infographic_left[index][tier]['case_100k_avg']);
		//myData[tier.toString()] = parseInt(infographic_left[index][tier]['New_Confirm']);
		//data_list.push(parseInt(infographic_left[index][tier]['relative_confirm_100k']));
		confirm_list.push(parseInt(infographic_left[index][tier]['case_100k_avg']));
		death_list.push(parseInt(infographic_left[index][tier]['death_100k_avg']));
		label=tier.toString().replace("total_","")+"%";		
		data_labels.push(label)
		
	}
	//console.log(infographic_left[index][tier]);
	//console.log(myData);
	//console.log(data_labels);

	//var chart = document.getElementById('confirm_chart');


	confirm_chart.data.datasets[0].data = confirm_list;
	confirm_chart.update();

	death_chart.data.datasets[0].data = death_list;
	death_chart.update();
	
}//*** 

function updateImages(){
	var confirm_jpg = document.getElementById('confirm_jpg');
	var death_jpg = document.getElementById('death_jpg');
	var vax_jpg = document.getElementById('vax_jpg');


	

	var slider = document.getElementById("myRange");
	const confirm_template = 'confirm_hist_'
	const death_template = 'death_hist_'
	const vax_template = 'vax_hist_'
	
	//*** Change the image of the Fakegif based on the Slider Index
	

//vax_hist_312
	//*** Get the current filename from the img 
	var find_confirm = confirm_jpg.src.split("/")
	find_confirm = find_confirm[find_confirm.length - 1]

	//*** Get the current filename from the img 
	var find_death = death_jpg.src.split("/")
	find_death = find_death[find_death.length - 1]

	//*** Get the current filename from the img 
	var find_vax = vax_jpg.src.split("/")
	find_vax = find_vax[find_vax.length - 1]	
  		
	  	//*** Replace the current filename with one based on the slider
	  	confirm_jpg.src = confirm_jpg.src.replace(find_confirm,confirm_template + (parseInt(slider.value) + 1)  + ".jpg")
	  	death_jpg.src = death_jpg.src.replace(find_death,death_template + (parseInt(slider.value) + 1)  + ".jpg")
	  
	  	if (parseInt(slider.value) <= 312) {
	  		//*** Set to First Vax Value if slider is before vax data
	  		vax_jpg.src.replace(find_vax,"vax_hist_312.jpg");
	  	}
	  	else {
	  		vax_jpg.src = vax_jpg.src.replace(find_vax,vax_template + (parseInt(slider.value) + 1)  + ".jpg")		
	  	}
}//*** END updateImages