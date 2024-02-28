/*
A basic example of recursion

Tasks
1. Keep track of which level of the tree you're on

2. Draw the branch levels at different thickness
(stroke weights)

3. Vary the number of branches per level

4. Vary the angle of the branches
*/

var angle = PI / 4;
var slider;

function setup() {
	createCanvas(400, 400);
	slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
	background(52);
	angle = slider.value();
	stroke(255);
	translate(width/2, height); // translate origin
	branch(100);
}

function branch(len){
	line(0, 0, 0, -len);
	translate(0, -len); // Moves to the end point to draw from 

	if (len < 2) return; // If after the first transform, the line is less than 2 pixels, return 

	push();
	rotate(angle);
	branch(len * 0.67); // 2/3 Only branching to the right
	pop();
	push();
	rotate(-angle);
	branch(len * 0.67)
	pop();

}
