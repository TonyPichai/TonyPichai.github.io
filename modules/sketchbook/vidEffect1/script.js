// Start the webcam
const startWebCam = async () => {
    const webcamStream = document.getElementById('webcam');

    try {
// Method to get UserMedia from webcam device
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// Set the video element source as the mediaStream from user
        webcamStream.srcObject = stream;
        webcamStream.hidden = true;
// Do nothing until the video plays
         await webcamStream.play();
// Get dimensions to size up the canvas.
        const width = webcamStream.videoWidth;
        const height = webcamStream.videoHeight;
// Now now you've got the from user, 
// set to an element and returned .play(), let's capture it
        beginFrameCapture(webcamStream, width, height);
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
};
startWebCam();


const beginFrameCapture = async = (webcamStream, width, height) => {
// Get the canvas to draw to and set it up  
    const drawingCanvas = document.getElementById('canvas1');
    const ctx = drawingCanvas.getContext('2d');

    drawingCanvas.width = width;
    drawingCanvas.height = height;

    drawingCanvas.hidden = true;

// Store frames in this
    const images = [];
    let imgTally = 0;

// Draw the webcam Stream to canvas
// Copy the
    const captureAndStoreFrames = () => {
        ctx.drawImage(webcamStream, 0, 0, width, height);

        const imageData = displayTargetCapture(webcamStream, width, height, ctx);
        const maxFrames = 500;
        if (images.length >= maxFrames) {
            // Remove the oldest frame
            images.shift();
        }
        images.push(imageData);
        imgTally++;

        console.log('Captured video frame:', imageData);
        console.log('Captured frames:', images);
        requestAnimationFrame(captureAndStoreFrames);

// number of frames
        if (imgTally < 30) { 
// Continue capturing frames
            // requestAnimationFrame(captureAndStoreFrames);
        } else {
// After 2 seconds (30 frames at 60fps), proceed to pixel manipulation
            if (images.length >= 30) {
                // console.log('frames got', imgTally);
                // manipulatePixels(images, width, height);
            }
        }
    };

    const displayTargetCapture = () => {
        return ctx.getImageData(0, 0, width, height);
    };

    captureAndStoreFrames();
    drawRandomImage(images,  width, height);


};

function drawRandomImage(images, width, height) {

// A bunch of functions to iterate over the frames with
    const imgIndex = () => {

        let currentIndex = 0;

        // Randomly jump around the array
        const randomIndex = () => {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        };

        // Replay backwards
        const reverseIndex = () => {
            const currentImage = images[currentIndex];
            currentIndex = images.length % (currentIndex - 1);
            return currentImage;
        };

        // let currentIndex = 0;
        let oscillationAmplitude = 200; // Adjust this value as needed
        let oscillationFrequency = 0.5; // Adjust this value as needed

        const reverseIndexWithSine = () => {
            const offset = oscillationAmplitude * Math.sin(currentIndex * oscillationFrequency);
            const newIndex = (currentIndex + Math.round(offset)) % images.length;
            currentIndex = newIndex;
        
            return images[newIndex];
        };

        // return reverseIndexWithSine();
        return reverseIndex();
        // return randomIndex();
    };

    const pixelCanvas = document.getElementById('canvas2');
    const ctx2 = pixelCanvas.getContext('2d');
    pixelCanvas.width = width;
    pixelCanvas.height = height;

    // Empty canvas of same dimensions
    const imageToDraw = ctx2.createImageData(width, height);
  
    const pixelManipulation = () => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const pixelIndex = (y * width + x) * 4; // RGBA data
        
              const selectedImgArr = imgIndex();
      
              imageToDraw.data[pixelIndex] = selectedImgArr.data[pixelIndex];
              imageToDraw.data[pixelIndex + 1] = selectedImgArr.data[pixelIndex + 1];
              imageToDraw.data[pixelIndex + 2] = selectedImgArr.data[pixelIndex + 2];
              imageToDraw.data[pixelIndex + 3] = 255; // Set alpha to fully opaque
            }
          }
        drawResult();
    };

    const drawResult = () => {
        ctx2.putImageData(imageToDraw, 0, 0);
        requestAnimationFrame(pixelManipulation);
    };

    requestAnimationFrame(pixelManipulation);
};
