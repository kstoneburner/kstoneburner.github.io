const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
function init(){
	//loadJSON)
	//console.log(window.location)
	//console.log(window.location.href)
sleep(1000).then(() => {
  	alert(infographic_left)
})

}


 function loadJSON(filename,callback) {   
 	
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true); // Replace 'appDataServices' with the path to your file

    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(processJSON(xobj.responseText));
          }
    };
    xobj.send(null);  
 }

 function processJSON(inputJSON) {

 	alert(inputJSON);

 }

async function getQuote(input_path) {
  
try {

     const response = await fetch(path) ;
     const data = await response.json();
     console.log({data});
  } catch (error) {
     console.log(error);
      }
  }