window.addEventListener("load", startView, false );

function startView() {
  DisplayCurrentTool();
}

function DisplayCurrentTool() {

  var button;
      
      button = document.getElementById("paintButton");
      if ( currentTool == "paint" ) button.className = "active";
      else {
        button.className = "";
      }

      button = document.getElementById("eraseButton");
      if ( currentTool == "erase" ) button.className = "active";
      else {
        button.className = "";
      }

      button = document.getElementById("resizeButton");
      if ( currentTool == "resize" ) button.className = "active";
      else {
        button.className = "";
      }
      button = document.getElementById("cropButton");
      if ( currentTool == "crop" ) button.className = "active";
      else {
        button.className = "";
      }
      

      button = document.getElementById("rectangleButton");
      if ( currentTool == "rectStroke" || currentTool == "rectFill" ) {
        button.className = "active";
        document.getElementById("rectangleSettings").style.display = "block";
      }
      else {
        button.className = "";
        document.getElementById("rectangleSettings").style.display = "none";
      }
      button = document.getElementById("rectangleStrokeButton");
      if ( currentTool == "rectStroke" ) button.className = "halfButton active";
      else {
        button.className = "halfButton";
      }
      button = document.getElementById("rectangleFillButton");
      if ( currentTool == "rectFill" ) button.className = "halfButton active";
      else {
        button.className = "halfButton";
      }

      settings = document.getElementById("widthSettings");
      if ( currentTool == "paint" || currentTool == "erase" || currentTool == "rectStroke" ) {
        settings.style.display="block";
      } else {
        settings.style.display="none";
      }

      settings = document.getElementById("colorSettings");
      if ( currentTool == "paint" || currentTool == "erase" || currentTool == "rectStroke" || currentTool == "rectFill" ) {
        settings.style.display="block";
      } else {
        settings.style.display="none";
      }

      document.getElementById("brushSizeValue").innerHTML = brushWidth;
      document.getElementById("redValue").innerHTML = currentColorRed;
      document.getElementById("greenValue").innerHTML = currentColorGreen;
      document.getElementById("blueValue").innerHTML = currentColorBlue;
      document.getElementById("colorPreview").style.backgroundColor = "rgb("+currentColorRed+","+currentColorGreen+","+currentColorBlue+")";

      setTimeout("DisplayCurrentTool()",1);
    
}
