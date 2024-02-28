/*
Taken from Wikipedia 

L-System variation - Fractal (binary) fern
https://en.wikipedia.org/wiki/L-system

Variables: F+-[] 
Axiom: F
Rules: F → FF+[+F-F-F]-[-F+F+F]


1. Define axiom and sentence
2. Create objects to represent the rules 
3. Generate
*/

// 1.
var axiom = "F"; // (the initial string)
var sentence = axiom; // we'll call that sentence
var len = 100;
var angle; 

/* 2. WRITING RULES
1. Rule1.a = 'state 1',
   Rule1.b = 'state 2'

- Just consider rules as conditions and states 

Contain in an array and add in JSON format.
*/
var rules = [];

rules[0] = {  // var rule1 = { a: '', b: ''};
	a: "F",
	b: "FF+[+F-F-F]-[-F+F+F]"
}

/* 3.
- Pass over length of the sentence,
Stop at each Char(letter)

CHECK!

- Is the Char equal to the condition: rule1.a or rule2.a?

Accordingly, 
add the state change (calculation) to => newSentence

- pint new sentence in a DOM <p>
*/
function generate () {
	len *= 0.5;
	var newSentence = ""; // What's this

	for (var i = 0; i < sentence.length; i++) { // Pass over sentence
		var currentLetter = sentence.charAt(i); // Get letter
		var found = false;
		for (var j = 0; j < rules.length; j++) {
			if (currentLetter == rules[j].a) {
				found = true;
				newSentence += rules[j].b;
				break;
			}
		}
		if (!found) {
			newSentence += currentLetter;
		}
	}
	sentence = newSentence
	createP(sentence);
	turtle();
}

// Turtle instructions.
// For each character in your sentence, read and do.
function turtle() {
	background(51);
	translate(width/2, height);
	stroke(255, 100);
	for (var i = 0; i < sentence.length; i++) {
		var currentLetter = sentence.charAt(i);

		if (currentLetter == "F") {
			line(0, 0, 0, -len);
			translate(0, -len);
		} else if (currentLetter == "+") {
			rotate(angle); 
		} else if (currentLetter == "-") {
			rotate(-angle); 
		} else if (currentLetter == "[") {
			push(); // save
		} else if (currentLetter == "]") {
			pop();  // exit save
		}
	}

}



function setup() {
	createCanvas(400, 400);
	angle = radians(21);
	background(51);
	turtle();
	// put setup code here
		createP(axiom);
	var button = createButton("generate")
	button.mousePressed(generate);
}

function draw() {
}
