

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
    slider.max = (Object.keys(infographic_left).length - 1) 
    var output = document.getElementById("demo");
    output.innerHTML = Object.keys(infographic_left)[slider.value];
    index = Object.keys(infographic_left)[slider.value];
    console.log(infographic_left[index]);

    //*** Build Table Container
    var table = document.createElement("table");
    var top_obj = infographic_left[index];
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
            td.id = row + "_" + elem;

            value = top_obj[row][elem];

            if (elem == 'tier'){
                value = value.replace("total_","")
                value += "%"                
            }

            td.innerHTML = value;

            tr.appendChild(td)
        }//*** END each elem

        table.appendChild(tr)

    }//*** END each row


    document.getElementById("table_container").appendChild(table);
}

function handleSlider() {

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    index = Object.keys(infographic_left)[slider.value];
    output.innerHTML = index; // Display the default slider value
    
    var top_obj = infographic_left[index];
    
    var table = document.getElementById("table_container")

    for (row in top_obj){
        
        for (elem in top_obj[row]){

            value = top_obj[row][elem]
            if (elem == 'tier'){
                value = value.replace("total_","")
                value += "%"                
            }


            this_DOM = document.getElementById(row + "_" + elem)
            this_DOM.innerHTML = value;
            console.log(elem)

        }//*** END each Elem in row


    }//*** End Each row in top OBJ

}//*** END handleSlider

