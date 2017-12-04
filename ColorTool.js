     //Controller Stuff
     var currentColor_red = 128;
     var currentColor_green = 128;
     var currentColor_blue = 128;
     //var currentColor;

     function setColor() { // Sets color to current values in sliders
       currentColor_red = document.getElementById("red_RGB").value;
       currentColor_green = document.getElementById("green_RGB").value;
       currentColor_blue = document.getElementById("blue_RGB").value;
       //currentColor = document.getElementById("RGB").value;
       //console.log(currentColor);

       document.getElementById("color-tool").style.backgroundColor = getColor();
       updateColorTool();
     }

     function getColor() { //Return string of RGB values for use in other tools
       return "rgb("+currentColor_red+","+currentColor_green+","+currentColor_blue+")"
       //return currentColor;
     }

     function setEraseTool() {
       currentColor_red = 255;
       currentColor_green = 255;
       currentColor_blue = 255;
       currentTool = "brush";
     }
     
     //View Stuff
     function updateColorTool( ) { //Updates HTML to current RGB values
       document.getElementById("red_GUI").innerHTML = currentColor_red;
       document.getElementById("green_GUI").innerHTML = currentColor_green;
       document.getElementById("blue_GUI").innerHTML = currentColor_blue;
     }