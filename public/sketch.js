// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RUSvMxxm_Jo

//Giphy


var aa;
var iframe = document.getElementById("myFrame").contentWindow;

function setup() {


}


function draw(){

	aa = iframe.document.querySelectorAll("[gltf-model-plus]");

	if (aa.length > 0){
		
		iframe.NAF.utils.getNetworkedEntity(aa[0]).then(e1 => {

			e1.setAttribute("position", "0,0,0");
			console.log("a");
		})
	}


}