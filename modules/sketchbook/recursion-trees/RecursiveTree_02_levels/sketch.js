var len = 100;
var angleSlider, lenSlider, mull, angVal, lenVal;
var angle = PI / 4;

var level = 0;

function setup() {
	createCanvas(400, 400);
	
	angleSlider = createSlider(0, TWO_PI, PI/4, 0.01);
	lenSlider = createSlider(0.4, 0.85, 0.425, 0.01);
}

function draw() {
	angle = angleSlider.value();
	mull = lenSlider.value();

	translate(width/2, height);
	background(51);
	stroke(255);

	branch(100);
}

function branch(len) {
	line(0, 0, 0, -len); // Draw branch

	translate(0, -len); // Move to the end of the brach

	
	if (len < 4) return; // When the branches are less than 4 pixels STOP
	len *= 0.9			// Rescale, shrinking for child node

//... Otherwise! Continues branching

// isolate transform
	push(); 
	rotate(angle); // Rotate drawing context
	branch(len * mull); // And Draw new branch!
	// console.log("angle: ",angle,);
	pop();

// isolate transform
	push();
	rotate(-angle); // Rotate drawing context
	branch(len * mull); // Draw new branch!
	// console.log("length:",len,);
	pop();
}
