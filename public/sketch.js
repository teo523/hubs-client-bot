// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RUSvMxxm_Jo

//Giphy


var parsedStream;

function setup() {

var canvas = createCanvas(windowWidth/4,windowHeight/3);
canvas.parent("rightDiv");
}


function draw(){
	background(0);
	if (stream != undefined ) {

		
		parsedStream = JSON.parse(stream);
		for (i in parsedStream){
			var x1 = map(parsedStream[i].x,-3.78,3.78,0,width);
			var z1 = map(parsedStream[i].z,-9,4.4,0,height);
			fill(255,0,0);
			ellipse(x1,z1,10,10);
			//console.log("x: "+ parsedStream[i].x + ". z: " + parsedStream[i].z);

		}



	}
}