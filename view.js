window.addEventListener("load", startView, false);

function startView() { //Applies active styling to current working tool and the visibility of tool options menus

  var button;

  button = document.getElementById("paintButton");
  if (currentTool == "paint") button.className = "active";
  else {
    button.className = "";
  }

  button = document.getElementById("eraseButton");
  if (currentTool == "erase") button.className = "active";
  else {
    button.className = "";
  }

  button = document.getElementById("lineButton");
  if (currentTool == "line") button.className = "active";
  else {
    button.className = "";
  }

  button = document.getElementById("colorButton");
  if (currentTool == "color") button.className = "active";
  else {
    button.className = "";
  }

  button = document.getElementById("resizeButton");
  if (currentTool == "resize") button.className = "active";
  else {
    button.className = "";
  }
  button = document.getElementById("cropButton");
  if (currentTool == "crop") button.className = "active";
  else {
    button.className = "";
  }


  button = document.getElementById("rectangleButton");
  if (currentTool == "rectStroke" || currentTool == "rectFill") {
    button.className = "active";
    document.getElementById("rectangleSettings").style.display = "block";
  }
  else {
    button.className = "";
    document.getElementById("rectangleSettings").style.display = "none";
  }
  button = document.getElementById("rectangleStrokeButton");
  if (currentTool == "rectStroke") button.className = "halfButton active";
  else {
    button.className = "halfButton";
  }
  button = document.getElementById("rectangleFillButton");
  if (currentTool == "rectFill") button.className = "halfButton active";
  else {
    button.className = "halfButton";
  }

  button = document.getElementById("ellipseButton");
  if (currentTool == "ellipseStroke" || currentTool == "ellipseFill") {
    button.className = "active";
    document.getElementById("ellipseSettings").style.display = "block";
  }
  else {
    button.className = "";
    document.getElementById("ellipseSettings").style.display = "none";
  }
  button = document.getElementById("ellipseStrokeButton");
  if (currentTool == "ellipseStroke") button.className = "halfButton active";
  else {
    button.className = "halfButton";
  }
  button = document.getElementById("ellipseFillButton");
  if (currentTool == "ellipseFill") button.className = "halfButton active";
  else {
    button.className = "halfButton";
  }

  settings = document.getElementById("widthSettings");
  if (currentTool == "paint" || currentTool == "erase" || currentTool =="line" ||currentTool == "rectStroke" || currentTool == "ellipseStroke") {
    settings.style.display = "block";
  } else {
    settings.style.display = "none";
  }

  settings = document.getElementById("colorSettings");
  if (currentTool == "paint" || currentTool =="line" || currentTool == "ellipseStroke" || currentTool == "ellipseFill" || currentTool == "rectStroke" || currentTool == "rectFill" || currentTool == "color") {
    settings.style.display = "block";
  } else {
    settings.style.display = "none";
  }

  //Sets values of tool options to current values
  document.getElementById("brushSize").value = brushWidth;
  document.getElementById("redValue").innerHTML = currentColorRed;
  document.getElementById("greenValue").innerHTML = currentColorGreen;
  document.getElementById("blueValue").innerHTML = currentColorBlue;
  document.getElementById("redSlider").value = currentColorRed;
  document.getElementById("greenSlider").value = currentColorGreen;
  document.getElementById("blueSlider").value = currentColorBlue;
  document.getElementById("colorPreview").style.backgroundColor = "rgb(" + currentColorRed + "," + currentColorGreen + "," + currentColorBlue + ")";

  setTimeout("startView()", 16);

}
