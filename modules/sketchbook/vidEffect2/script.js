/*
*/

// Start the webcam
const startWebCam = async () => {
    const webcamStream = document.getElementById('webcam');
// get UserMedia from webcam device
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        webcamStream.srcObject = stream;
        webcamStream.hidden = true;

        await webcamStream.play();

        const width = webcamStream.videoWidth;
        const height = webcamStream.videoHeight;

        beginFrameCapture(webcamStream, width, height);
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
};
startWebCam();

let maxFrames = 60;

const beginFrameCapture = async = (webcamStream, width, height) => {
// Get the canvas to draw to and set it up  
    const drawingCanvas = document.getElementById('canvas1');
    const ctx = drawingCanvas.getContext('2d');

    drawingCanvas.width = width;
    drawingCanvas.height = height;

    drawingCanvas.hidden = true;

// Store frames in this
    let imgTally = 0;

// Draw the webcam Stream to canvas
    const captureAndStoreFrames = () => {
        ctx.drawImage(webcamStream, 0, 0, width, height);

        const imageData = displayTargetCapture(webcamStream, width, height, ctx);

        if (images.length >= maxFrames) {
            images.shift(); // Remove the oldest frame
        }

        images.push(imageData);
        imgTally++;

        // console.log('Captured video frame:', imageData);
        console.log('Captured frames:', images);
        requestAnimationFrame(captureAndStoreFrames);
    };

    const displayTargetCapture = () => {
        return ctx.getImageData(0, 0, width, height);
    };

    captureAndStoreFrames();
    drawFromPixels(images, width, height);
};


// Modulating the index of the array
// The frames from which the pixels will be used.
let index = 0;
const images = [];

const modulation = () => {

    // Randomly jump around the array
    const random = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const currentImage = images[randomIndex]

        return currentImage;
    };

    // // Replay 
    const replay = (rDuration) => {
        maxFrames = rDuration;
        const currentImage = images[index];
        index = (index + 1) % images.length;
        return currentImage;
    };

    // Replay backwards
    const rewind = () => {
        const currentImage = images[index];
        index = (index - 1 + images.length) % images.length;
        return currentImage;
    };

    const jump = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomDuration = Math.floor(Math.random() * (images.length - randomIndex));
        let index = (randomIndex + randomDuration) % images.length;
        const currentImage = images[index];

        return currentImage;
    }

    let sinAmp = 10000; // larger = more varying speed
    let sinFz = 2000; // larger = faster oscillations
    const oscillate = () => {
        const currentImage = images[index];
        let me = 0;
        // Calculate the offset using a sine function
        const rwRate = sinAmp * Math.sin(index * sinFz) + me;
        
        // Update the index while considering the sine-modulated rwRate
        index = (index - Math.round(rwRate) + images.length) % images.length;
        me++;
        return currentImage;
    };

/* Pick you function here */
    return {
        oscillate,
        random,
        jump,
        rewind,
        replay     
    }   
};
const mod1 = modulation();
const mod2 = modulation();
const mod3 = modulation();
const mod4 = modulation();
const mod5 = modulation();

function drawFromPixels(images, width, height) {

    const pixelCanvas = document.getElementById('canvas2');
    const ctx2 = pixelCanvas.getContext('2d');
    pixelCanvas.width = width;
    pixelCanvas.height = height;

    // Empty canvas of same dimensions
    const imageToDraw = ctx2.createImageData(width, height);
  
    let xIndex = 0;
    let yIndex = 0;
    const xAmp = 1; 
    const xFz = 1; 
    const yAmp = 1; 
    const yFz = 1; 

    const pixelManipulation = () => {
        // Modulations on frames
        // const selectedImgArr = mod3.random(); // Jump around
        // const selectedImgArr = mod3.rewind(); // Slit scan style
        // const selectedImgArr = mod3.replay(200); // More slit scan
        // const selectedImgArr = mod3.oscillate(); // horizontal noise

        for (let y = 0; y < height; y++) {
            // Modulations on y positions
            // const selectedImgArr = mod3.rewind(); // Slit scan style
            const selectedImgArr = mod3.replay(); // wild, use this on face features
            // const selectedImgArr = mod3.random(); // horizontal noise
            // const selectedImgArr = mod3.oscillate(); // ...

            for (let x = 0; x < width; x++) {
                // Modulation on x positions
                // const newY = mod2.jump(); // call here to interrupt per frame
                // const newX = mod1.jump(); // call here to interrupt per frame
                const pixelIndex = (y * width + x) * 4; // RGBA data
            
                // const selectedImgArr = mod3.replay(); // Vertical ripple
                // const selectedImgArr = mod3.rewind(); // Vertical slit scan style

    
                // Calculate the x-offset using a sine function
                const xOffset = xAmp * Math.sin(xIndex * xFz);
                const newX = x + Math.round(xOffset);
                
                // Calculate the y-offset using a sine function
                const yOffset = yAmp * Math.sin(yIndex * yFz);
                const newY = y + Math.round(yOffset);
    
                // Ensure the new x value stays within bounds
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const newIndex = (newY * width + newX) * 4;
                    // const newIndex = (y * width + x) * 4; // 
    
                    imageToDraw.data[pixelIndex] = selectedImgArr.data[newIndex];
                    imageToDraw.data[pixelIndex + 1] = selectedImgArr.data[newIndex + 1];
                    imageToDraw.data[pixelIndex + 2] = selectedImgArr.data[newIndex + 2];
                    imageToDraw.data[pixelIndex + 3] = 255; // Set alpha to fully opaque
                }

            }
        };

        drawResult();
        // Increment the index variables for the next frame
        xIndex += 0.01; 
        yIndex += 0.01; 
    };

    const drawResult = () => {
        ctx2.putImageData(imageToDraw, 0, 0);
        requestAnimationFrame(pixelManipulation);
    };

    requestAnimationFrame(pixelManipulation);
};



        
