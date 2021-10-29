//*** Barchart Using Canvas
//*** https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
const tier_colors = ['#b40426', '#d95847', '#f18d6f', '#f7b89c', '#ead4c8', '#cdd9ec', '#aac7fd', '#82a6fb', '#5d7ce6'];
var myVinyls = {
    "Classical music": 10,
    "Alternative rock": 14,
    "Pop": 2,
    "Jazz": 12
};

var myData = {}

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


	    
	    /*
		var div = document.createElement("div");

		if (info_gfk_types[infographic_type] == 'left'){
			div.innerHTML = "Before Surge:</br>" + Object.keys(info_OBJ)[0] + " - " + Object.keys(info_OBJ)[Object.keys(info_OBJ).length-1];
		}
	    
	    if (info_gfk_types[infographic_type] == 'right'){
			div.innerHTML = "Post Surge:</br>" + Object.keys(info_OBJ)[0] + " - " + Object.keys(info_OBJ)[Object.keys(info_OBJ).length-1];
		}
	    div.className = 'header';
	    */
	    

	    
	    
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

    testCode()
    }//*** END Each Infographic type
/*
var bodySelection = d3.select("body");

var svgSelection = bodySelection.append("svg")
      .attr("width", 50)
      .attr("height", 50);

var circleSelection = svgSelection.append("circle")
      .attr("cx", 25)
      .attr("cy", 25)
      .attr("r", 25)
      .style("fill", "purple");

var theData = [ 1, 2, 3 ];

var p = d3.select("body").selectAll("p")
  .data(theData)
  .enter()
  .append("p")
  .text( function (d) { return d; } );
*/

/*
circleRadii = [40, 20, 10];


var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

var circles = svgContainer.selectAll("circle")
                          .data(circleRadii)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", 50)
                       .attr("cy", 50)
                       .attr("r", function (d) { return d; })
                       .style("fill", function(d) {

                           var returnColor;

                           if (d === 40) { returnColor = "green";
                           } else if (d === 20) { returnColor = "purple";
                           } else if (d === 10) { returnColor = "red"; }

                           return returnColor;
                       });
*/

// set the dimensions and margins of the graph
/*
var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
*/
/*
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
*/


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




//*** Helper Function
/*
The drawLine function takes six parameters:

    ctx: reference to the drawing context
    startX: the X coordinate of the line starting point
    startY: the Y coordinate of the line starting point
    endX: the X coordinate of the line end point
    endY: the Y coordinate of the line end point
    color: the color of the line
*/
function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}
//*** Helper Function
/*
The drawBar function takes six parameters:

    ctx: reference to the drawing context
    upperLeftCornerX: the X coordinate of the bar's upper left corner
    upperLeftCornerY: the X coordinate of the bar's upper left corner
    width: the width of the bar
    height: the height of the bar
    color: the color of the bar

*/
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}


var Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
            
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();

            gridValue+=this.options.gridScale;
        }
 
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;

        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );

            barIndex++;
        }
 
    }
}


function testCode(){
	myData = {};
	for (tier in infographic_left[index]){
		
		//myData[tier.toString()] = parseInt(infographic_left[index][tier]['relative_confirm_100k']);
		myData[tier.toString()] = parseInt(infographic_left[index][tier]['case_100k_avg']);

		
		
	}
	//console.log(infographic_left[index][tier]);
	console.log(myData);
	var myCanvas = document.getElementById("myCanvas");
	myCanvas.width = 300;
	myCanvas.height = 300;
	 
	var ctx = myCanvas.getContext("2d");

	var myBarchart = new Barchart(
	    {
	        canvas:myCanvas,
	        padding:10,
	        gridScale:5,
	        gridColor:"#eeeeee",
	        data:myData,
	        //data:myVinyls,
	        //colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743", "#a55ca5","#a55ca5","#a55ca5","#a55ca5","#a55ca5"]
	        colors : tier_colors,
	    }
	);
	myBarchart.draw();
}
