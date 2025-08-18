const trackNumber = document.getElementById('looperTracks');
const tracksGUI = document.getElementById('tracksGUI');
const originalDiv = document.getElementById('original-track');

const addTrackToGUI = (count) => {
    // clear existing tracks
    tracksGUI.innerHTML = '';
    // Add new tracks
    for (let i = 0; i < count; i++) {
        // Clone the original div
        const trackGUI = originalDiv.cloneNode(true); // Pass true to clone all children as well

        // Set an id for the new div
        trackGUI.setAttribute('id', 'newTrack' + i);
        // Append the new div to the container
        tracksGUI.appendChild(trackGUI);
    }
}

// Initialize with default value
addTrackToGUI(trackNumber.value);

// Add event listener to update on dropdown change
trackNumber.addEventListener('change', (event) => {
  const count = event.target.value;
  addTrackToGUI(count);
});