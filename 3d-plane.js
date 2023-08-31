/* Point cloud visualization using a 2D context. 
Using perspective projection and rotation transformations this creates
the effect of 3D by simulating 3D 
*/

var mouseX = 0;
var mouseY = 0;
var counter = 0; // counter for movements

// Random seed on load to make it interesting
const randSeedX = Math.floor(Math.random() * 100) + 1;
const randSeedY = Math.floor(Math.random() * 10) + 1;

function rotate(point3d, pointOfRotation, dimensionRotated, angle, translate) {

        var dim1 = point3d[pointOfRotation] + translate; //x
        var dim2 = point3d[dimensionRotated] + translate; //y
 
        var cosRY = Math.cos(angle);
        var sinRY = Math.sin(angle);
 
        var tempZ = dim2; 
        var tempX = dim1;

        dim1 = (tempX * cosRY) + (tempZ * sinRY);
        dim2 = (tempX * -sinRY) + (tempZ * cosRY);

        point3d[pointOfRotation] = dim1;
        point3d[dimensionRotated] = dim2;
}

function draw() {
        var width = 1280;
        var height = 800;
        var HALF_WIDTH = width / 2;
        var HALF_HEIGHT = height / 2;

        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.addEventListener('mousemove',
                (mousePosition) => {
                        mouseX = mousePosition.layerX;
                        mouseY = mousePosition.layerY;
                }, false);

        var x3d = 0;
        var y3d = 0;
        var z3d = 0;
        
        // Drawing geometry in this looping animation function
        // so that when its interacted with, the animation can update.

        counter += 0.01;

        let xCounter = counter * randSeedX; // variables for motion
        let yCounter = counter * randSeedY;

        const fov = 400;
        // const fov = 1000; // original
        const size = 200; // Scale of matrix
        // const size = 500; // Original Scale of matrix
        const scalar = 50; // no. of none directional/dimensional point

        const numPoints = scalar * scalar; // Multiplying that dimension by itself for a 2x2 grid
        
        var pointMatrix = []; // Array to hold all the points
        var point3d = [];

        // Creating a x-y plane from those dimensions
        for (let i = 0; i < scalar; i++) {
                // Giving the points positions along curves

                let xFz = Math.PI / scalar; // Set a frequency rate of plot, pt1. for moire pattens
                let xRadian = xFz * i // Frequency of the point's intervals
                var yWave = Math.sin(xRadian); // Plot them in y and create a sine wave

                for (let j = 0; j < scalar; j++) {
                        let yFz = Math.PI / scalar; // pt2. for moire patterns
                        let yRadian = yFz * j;
                	var xWave = Math.sin(yRadian); // x-plot wave


                        // animating the waves
                        let xFunc = (xWave * yCounter * 0.01);
                        let yFunc = (yWave * xCounter * 0.01);

                        let waveTypeA = Math.random() < 0.5 ? xFunc : yFunc; // generate +ve or -ve
                        let waveTypeB = Math.random() < 0.5 ? xFunc : yFunc; // generate +ve or -ve

                        // factor controls z depth
                        let zWave =  Math.sin( waveTypeA + waveTypeB ) * scalar; 
                        // let zWave =  Math.sin( xFunc + yFunc ) * scalar; 
                        
                        let pX = i * size / scalar;
                        let pY = j * size / scalar;
                        var pointVector = [pX, pY, zWave];
                        // Add the vector translated points to the matrix
                        pointMatrix.push(pointVector);
                }
        }

        // background colour
        context.fillStyle = "#fffdf6"
        context.fillRect(0, 0, width, height);


        for (let i = 0; i < numPoints; i += scalar) {

                for (let j = 0; j < scalar; j++ ) {
                        point3d = pointMatrix[Math.floor(i+j)];
                        z3d = point3d[2];

                        // This is the speed of the z
                        // It moves the points forwards in space
                        // We don't need it for the pure rotate
                        
                        // How close
                        z3d -= 450;

                        // Check that the points aren't disappearing into space and if so push them back
                        // This also stops them stretching
                        // When they get too close
                        if (z3d < -fov) z3d += 0;

                        point3d[2] = z3d;
 
                        // Calculate the rotation of the object
                        // Using inputs
                        let angX = xCounter * 0.001;
                        // let zTal = 0
                        angX = (1 / (width - mouseX) ) * 1;
                        // let angY = yCounter * 0.001;
                        // angY = (1 / (height - mouseY) ) * 1;

                        fz = 0.0002; 
                        // let angZ = 0.1 / (angX + angY);
                        // let angZ = yCounter * 0.001; 
                        let angZ = Math.sin(xCounter * fz) ;
                        let angY = Math.sin(yCounter * fz) ;

                        const x = 0;
                        const y = 1;
                        const z = 2;
                        // (theVectorMatrix,axisAnchor, rotatedDimension, angle, translate)
                        // rotate(point3d, x, y, angZ, -size/2);
                        let posNeg = Math.random() < 0.5 ? -1 : 1; // generate +ve or -ve

                        rotate(point3d, x, y, posNeg * angZ, -size/2);
                        rotate(point3d, x, z, posNeg * angY, 1);

                        // rotate(point3d, x, z, mouseY, 0);
                        // rotate(point3d, x, z, angX, 0);

                        // Here

                        // let angZ = 0.1 / (angX + angY);
                        // let angZ = Math.sin(xCounter * fz) ;
                        // let angO = posNeg * Math.sin(xCounter * fz) ;
                        // let angZ = posNeg * xCounter * fz;

                        // const x = 0;
                        // const y = 1;
                        // const z = 2;
                        // // (theVectorMatrix,axisAnchor, rotatedDimension, angle, translate)
                        // // rotate(point3d, x, y, angZ, -size/2);

                        // rotate(point3d, x, y, 0, -size/2);
                        // rotate(point3d, x, z, angZ, 1);
                        // rotate(point3d, y, z, angO, 1);
                        // Here

                         // Get the point in position 
                         x3d = point3d[0];
                         y3d = point3d[1];
                         z3d = point3d[2];


                        // Convert the Z value to a scale factor
// This will give the appearance of depth
                        var scale = (fov / (fov + z3d));

                        // Store the X value with the scaling
                        // FOV is taken into account
                        // (just pushing it over to the left a bit too)
                        var x2d = (x3d * scale) + HALF_WIDTH;
                        // var x2d = (x3d * scale) + HALF_WIDTH;

// Store the Y value with the scaling
// FOV is taken into account
                        var y2d = (y3d * scale) + HALF_HEIGHT;

                        // vertex colour
                        context.fillStyle = "#898989";
                        context.fillRect(x2d + scale, y2d, scale, scale);
                        context.stroke();

                }
        }
        requestAnimationFrame(draw);
}
requestAnimationFrame(draw);