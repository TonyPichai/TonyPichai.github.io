# AntPichai.github.io
Inside of header.js you need to change the paths to the json file depending on wether you are locally hosting or on git hub.

Inside generatePageContent()    
     // Local file path
     const response = await fetch('modules/content.json');
     
     // Github file path!!!
     const response = await fetch('/modules/content.json');