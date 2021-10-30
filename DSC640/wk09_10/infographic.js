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
    //document.getElementById("table_container").appendChild(table);

    initChart();
    }//*** END Each Infographic type
    moreTest();


}//*** END Init

function handleSlider() {

    var slider = document.getElementById("myRange");
    var output = document.getElementById("header");
    
    testCode();
    
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
		
		/*
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

		*/


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

function initChart(){
	
	var table = document.getElementById("table_container");
	

	


    console.log();


	data_list = [];
	data_labels = [];
	var slider = document.getElementById("myRange");
	index = Object.keys(infographic_left)[slider.value];
	for (tier in infographic_left[index]){
		
		data_list.push(parseInt(infographic_left[index][tier]['case_100k_avg']));
		label=tier.toString().replace("total_","")+"%";		
		data_labels.push(label)
		
	}
	console.log(infographic_left[index][tier]);
	console.log(myData);
console.log(data_labels);


var ctx = document.getElementById('myChart').getContext('2d');

var canvas = document.getElementById('myChart');
canvas.style.width = '300px'
canvas.style.height = table.getBoundingClientRect().height + 'px'
confirm_chart = new Chart(ctx, {
    type: 'bar',

    data: {

        labels : data_labels,
        datasets: [{
            label: 'Confirmed Cases per 100k by Tier',
            //data: [12, 19, 3, 5, 2, 3],
            data: data_list,
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
        
		maintainAspectRatio: false,
		showScale: false,
  		//aspectRatio: 1,

    }
});

}
function updateData(chart, label, data) {
    chart.data.labels = label;
    chart.data = data;
    chart.update();
}

function testCode(){
	myData = {};
	data_list = [];
	data_labels = [];
	var slider = document.getElementById("myRange");
	index = Object.keys(infographic_left)[slider.value];
	for (tier in infographic_left[index]){
		
		myData[tier.toString()] = parseInt(infographic_left[index][tier]['case_100k_avg']);
		//myData[tier.toString()] = parseInt(infographic_left[index][tier]['New_Confirm']);
		//data_list.push(parseInt(infographic_left[index][tier]['relative_confirm_100k']));
		data_list.push(parseInt(infographic_left[index][tier]['case_100k_avg']));
		label=tier.toString().replace("total_","")+"%";		
		data_labels.push(label)
		
	}
	//console.log(infographic_left[index][tier]);
	//console.log(myData);
	//console.log(data_labels);

	var chart = document.getElementById('myChart');


	confirm_chart.data.datasets[0].data = data_list;
	confirm_chart.update();
}//*** 
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/choropleth
function Choropleth(data, {
  id = d => d.id, // given d in data, returns the feature id
  value = () => undefined, // given d in data, returns the quantitative value
  title, // given a feature f and possibly a datum d, returns the hover text
  format, // optional format specifier for the title
  scale = d3.scaleSequential, // type of color scale
  domain, // [min, max] values; input of color scale
  range = d3.interpolateBlues, // output of color scale
  width = 640, // outer width, in pixels
  height, // outer height, in pixels
  projection, // a D3 projection; null for pre-projected geometry
  features, // a GeoJSON feature collection
  featureId = d => d.id, // given a feature, returns its id
  borders, // a GeoJSON object for stroking borders
  outline = projection && projection.rotate ? {type: "Sphere"} : null, // a GeoJSON object for the background
  unknown = "#ccc", // fill color for missing data
  fill = "white", // fill color for outline
  stroke = "white", // stroke color for borders
  strokeLinecap = "round", // stroke line cap for borders
  strokeLinejoin = "round", // stroke line join for borders
  strokeWidth, // stroke width for borders
  strokeOpacity, // stroke opacity for borders
} = {}) {
  // Compute values.
  const N = d3.map(data, id);
  const V = d3.map(data, value).map(d => d == null ? NaN : +d);
  const Im = new d3.InternMap(N.map((id, i) => [id, i]));
  const If = d3.map(features.features, featureId);

  // Compute default domains.
  if (domain === undefined) domain = d3.extent(V);

  // Construct scales.
  const color = scale(domain, range);
  if (unknown !== undefined) color.unknown(unknown);

  // Compute titles.
  if (title === undefined) {
    format = color.tickFormat(100, format);
    title = (f, i) => `${f.properties.name}\n${format(V[i])}`;
  } else if (title !== null) {
    const T = title;
    const O = d3.map(data, d => d);
    title = (f, i) => T(f, O[i]);
  }

  // Compute the default height. If an outline object is specified, scale the projection to fit
  // the width, and then compute the corresponding height.
  if (height === undefined) {
    if (outline === undefined) {
      height = 400;
    } else {
      const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
      const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
      projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
      height = dy;
    }
  }

  // Construct a path generator.
  const path = d3.geoPath(projection);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  if (outline != null) svg.append("path")
      .attr("fill", fill)
      .attr("stroke", "currentColor")
      .attr("d", path(outline));

  svg.append("g")
    .selectAll("path")
    .data(features.features)
    .join("path")
      .attr("fill", (d, i) => color(V[Im.get(If[i])]))
      .attr("d", path)
    .append("title")
      .text((d, i) => title(d, Im.get(If[i])));

  if (borders != null) svg.append("path")
      .attr("pointer-events", "none")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", path(borders));

  return Object.assign(svg.node(), {scales: {color}});
  
function moreTest(){
	//*** https://synthesis.sbecker.net/articles/2012/07/18/learning-d3-part-7-choropleth-maps
	//*** https://observablehq.com/@d3/choropleth
	console.log("more Testing");

chart = Choropleth(unemployment, {
  id: d => d.id,
  value: d => d.rate,
  scale: d3.scaleQuantize,
  domain: [1, 10],
  range: d3.schemeBlues[9],
  title: (f, d) => `${f.properties.name}, ${statemap.get(f.id.slice(0, 2)).properties.name}\n${d?.rate}%`,
  features: counties,
  borders: statemesh,
  width: 975,
  height: 610
})


}