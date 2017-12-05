window.addEventListener("load", start, false );

function start() {
  document.getElementsByTagName("body")[0].addEventListener("mousemove",trackMouse,false);

  document.getElementById("newButton").addEventListener( "click", newFile, false);
  document.getElementById("saveButton").addEventListener( "click", saveFile, false);

  document.getElementById("paintButton").addEventListener( "click", setBrushTool, false);
  document.getElementById("eraseButton").addEventListener( "click", setEraseTool, false);
  document.getElementById("colorButton").addEventListener( "click", setColorTool, false);
  document.getElementById("resizeButton").addEventListener( "click", setResizeTool, false);
  document.getElementById("cropButton").addEventListener( "click", setCropTool, false);
  document.getElementById("rectangleButton").addEventListener( "click", setRectangleTool, false);
  document.getElementById("ellipseButton").addEventListener( "click", setEllipseTool, false);
  document.getElementById("ellipseStrokeButton").addEventListener( "click", setEllipseStroke, false);
  document.getElementById("ellipseFillButton").addEventListener( "click", setEllipseFill, false);
  document.getElementById("rectangleStrokeButton").addEventListener( "click", setRectangleStroke, false);
  document.getElementById("rectangleFillButton").addEventListener( "click", setRectangleFill, false);
  document.getElementById("redSlider").addEventListener( "input", setColor, false);
  document.getElementById("greenSlider").addEventListener( "input", setColor, false);
  document.getElementById("blueSlider").addEventListener( "input", setColor, false);

  mainCanvas = document.getElementById("mainCanvas");
  guiCanvas = document.getElementById("guiCanvas");

  mainCanvas.addEventListener( "mousedown", beginTool, false );
  mainCanvas.addEventListener( "mouseup", endTool, false );
  document.getElementById("drawingArea").addEventListener( "mouseleave", endTool, false );
  document.getElementById("drawingArea").addEventListener( "mouseup", endTool, false );

  newFile();
}

var trackMouse = function ( event ) {
  mouseX  = event.clientX;
  mouseY = event.clientY;
}

function setBrushTool() {
  currentTool = "paint";
}
function setEraseTool() {
  currentTool = "erase";
}
function setColorTool() {
  currentTool = "color";
}
function setResizeTool() {
  currentTool = "resize";
}
function setCropTool() {
  currentTool = "crop";
}
function setEllipseTool() {
  if ( currentTool != "ellipseStroke" && currentTool != "ellipseFill" )
  currentTool = "ellipseStroke";
}
  function setEllipseStroke() {
    currentTool = "ellipseStroke";
  }
  function setEllipseFill() {
    currentTool = "ellipseFill";
  }
function setRectangleTool() {
  if ( currentTool != "rectStroke" && currentTool != "rectFill" )
  currentTool = "rectStroke";
}
  function setRectangleStroke() {
    currentTool = "rectStroke";
  }
  function setRectangleFill() {
    currentTool = "rectFill";
  }

function newFile() {
  mainCanvas.setAttribute("height","500");
  mainCanvas.setAttribute("width","500");
  mainCanvas.style.width = "500px";
  mainCanvas.style.height = "500px";
  canRect = mainCanvas.getBoundingClientRect();
  ctx = mainCanvas.getContext('2d');
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect( 0, 0,mainCanvas.width, mainCanvas.height);
  guiCanvas.setAttribute("height","500");
  guiCanvas.setAttribute("width","500");
  guiCanvas.style.width = "500px";
  guiCanvas.style.height = "500px";
  canRect = guiCanvas.getBoundingClientRect();
  ctx2 = guiCanvas.getContext('2d');
  ctx2.clearRect( 0, 0,guiCanvas.width, guiCanvas.height);
}

function openFile() {
  var ctx = mainCanvas.getContext('2d');
  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
          mainCanvas.setAttribute( "width", img.width );
          mainCanvas.setAttribute( "height", img.height );
          mainCanvas.style.width = img.width + "px";
          mainCanvas.style.height = img.height + "px";
          ctx.drawImage(img,0,0);
          guiCanvas.setAttribute("height",img.height);
          guiCanvas.setAttribute("width",img.width);
          guiCanvas.style.width = img.width + "px";
          guiCanvas.style.height = img.height+ "px";
          canRect = guiCanvas.getBoundingClientRect();
          ctx2 = guiCanvas.getContext('2d');
          ctx2.clearRect( 0, 0,guiCanvas.width, guiCanvas.height);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(event.target.files[0]);

}

function saveFile() {
  var data = mainCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.open(data);
}


function beginTool() {
  console.log( currentTool);
  mouseDown = true;
  startMouseX = mouseX;
  startMouseY = mouseY;
  if ( currentTool == "paint" || currentTool == "erase" ) {
    var canRect = mainCanvas.getBoundingClientRect();
    prevPaintX = mouseX;
    prevPaintY = mouseY;
    PaintTool();
  }
  if ( currentTool == "resize") {
    img = new Image();
    var dataURL = mainCanvas.toDataURL();
    img.src = dataURL;
    console.log(dataURL);
    img.onload = ResizeTool();
  }
  if ( currentTool == "rectStroke" || currentTool == "rectFill" ) {
    DrawRectGUI();
  }
  if ( currentTool == "ellipseStroke" || currentTool == "ellipseFill" ) {
    DrawEllipseGUI();
  }
  if ( currentTool == "crop") {
    DrawCropGUI();
  }
  if ( currentTool == "color") {
    colorTool();
  }
}
function ResizeTool() {
  if (mouseDown) {
    var canRect = mainCanvas.getBoundingClientRect();
    var ctx = mainCanvas.getContext("2d");
    var newWidth =  mouseX - canRect.left;
    var newHeight = mouseY - canRect.top;
    mainCanvas.setAttribute( "width", newWidth );
    mainCanvas.setAttribute( "height", newHeight );
    mainCanvas.style.width = newWidth + "px";
    mainCanvas.style.height = newHeight + "px";

    var canRect2 = guiCanvas.getBoundingClientRect();
    var ctx2 = guiCanvas.getContext("2d");
    var newWidth =  mouseX - canRect2.left;
    var newHeight = mouseY - canRect2.top;
    guiCanvas.setAttribute( "width", newWidth );
    guiCanvas.setAttribute( "height", newHeight );
    guiCanvas.style.width = newWidth + "px";
    guiCanvas.style.height = newHeight + "px";

    ctx.drawImage(img,0,0,mainCanvas.width,mainCanvas.height);
    setTimeout("ResizeTool()",16);
  }
}

function PaintTool() {
  if (mouseDown) {
    var can = mainCanvas;
    var canRect = can.getBoundingClientRect();
    var ctx = can.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(prevPaintX-canRect.left,prevPaintY-canRect.top);
    ctx.lineTo(mouseX-canRect.left,mouseY-canRect.top);
    ctx.strokeStyle=getColor();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineWidth = brushWidth;
    ctx.stroke();
    prevPaintX = mouseX;
    prevPaintY = mouseY;
    setTimeout("PaintTool()",16);
  }
}

function DrawRectGUI() {
  canRect = guiCanvas.getBoundingClientRect();
  var ctx = guiCanvas.getContext("2d");
  ctx.clearRect(0, 0, guiCanvas.width, guiCanvas.height);
  if (mouseDown) {
    ctx.strokeRect( startMouseX-canRect.left,startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
    setTimeout("DrawRectGUI()",16);
  }
}

function DrawEllipseGUI() {
  canRect = guiCanvas.getBoundingClientRect();
  var ctx = guiCanvas.getContext("2d");
  ctx.clearRect(0, 0, guiCanvas.width, guiCanvas.height);
  if (mouseDown) {
    ctx.beginPath();
    ctx.strokeStyle='black"';
    ctx.lineWidth = 1;
    ctx.ellipse( (startMouseX+mouseX)/2 - canRect.left,(startMouseY+mouseY)/2 - canRect.top,Math.abs(mouseX-startMouseX)/2,Math.abs(mouseY-startMouseY)/2,0,0,Math.PI*2,false);
    ctx.stroke();
    setTimeout("DrawEllipseGUI()",16);
  }
}

function DrawCropGUI() {
  var canRect = guiCanvas.getBoundingClientRect();
  var ctx = guiCanvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, guiCanvas.width, guiCanvas.height )
  if (mouseDown) {
    ctx.clearRect( startMouseX-canRect.left,startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
    setTimeout("DrawCropGUI()",16);
  }
}

function colorTool() {
  var canRect = guiCanvas.getBoundingClientRect();
  var ctx = mainCanvas.getContext("2d");
  var pointX = mouseX - canRect.left;
  var pointY = mouseY - canRect.top;
  var img = ctx.getImageData( pointX, pointY, 1, 1);
  if ( mouseDown ) {
    currentColorRed = img.data[0];
    currentColorGreen = img.data[1];
    currentColorBlue = img.data[2];
    setTimeout("colorTool()",16);
  }
}

function endTool() {
  var canRect2 = guiCanvas.getBoundingClientRect();
  var ctx2 = guiCanvas.getContext("2d");
  var newWidth =  mainCanvas.width;
  var newHeight = mainCanvas.height;
  guiCanvas.setAttribute( "width", newWidth );
  guiCanvas.setAttribute( "height", newHeight );
  guiCanvas.style.width = newWidth + "px";
  guiCanvas.style.height = newHeight + "px";
  if ( mouseDown && currentTool == "crop" ) {
    img = new Image();
    var dataURL = mainCanvas.toDataURL();
    img.src = dataURL;
    img.onload = function() {
      var canRect = mainCanvas.getBoundingClientRect();
      var ctx = mainCanvas.getContext("2d");
      var newWidth =  Math.abs(mouseX - startMouseX)
      var newHeight = Math.abs(mouseY - startMouseY);
      mainCanvas.setAttribute( "width", newWidth );
      mainCanvas.setAttribute( "height", newHeight );
      mainCanvas.style.width = newWidth + "px";
      mainCanvas.style.height = newHeight + "px";

      var canRect2 = guiCanvas.getBoundingClientRect();
      var ctx2 = guiCanvas.getContext("2d");
      var newWidth =  mainCanvas.width;
      var newHeight = mainCanvas.height;
      guiCanvas.setAttribute( "width", newWidth );
      guiCanvas.setAttribute( "height", newHeight );
      guiCanvas.style.width = newWidth + "px";
      guiCanvas.style.height = newHeight + "px";
      ctx2.clearRect( 0, 0, guiCanvas.width, guiCanvas.height );

      var cropOffsetX = Math.max( canRect.left-startMouseX, canRect.left-mouseX );
      var cropOffsetY = Math.max( canRect.top-startMouseY, canRect.top-mouseY );
      ctx.drawImage(img,cropOffsetX, cropOffsetY);
    }
  }
  if ( mouseDown && (currentTool == "rectStroke" || currentTool == "rectFill" ) ) {  
    var canRect = mainCanvas.getBoundingClientRect();
    var ctx = mainCanvas.getContext("2d");
    ctx.strokeStyle=getColor();
    ctx.lineWidth = brushWidth;
    ctx.lineJoin = ctx.lineCap = 'miter';
    if ( currentTool == "rectStroke" )
    {
      ctx.strokeRect( startMouseX-canRect.left,startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
    }
    else if ( currentTool == "rectFill" ) {
      ctx.fillStyle = getColor();
      ctx.fillRect( startMouseX-canRect.left, startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
    }
  }
  if ( mouseDown && (currentTool == "ellipseStroke" || currentTool == "ellipseFill" ) ) {
    var canRect = mainCanvas.getBoundingClientRect();
    var ctx = mainCanvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle=getColor();
    ctx.fillStyle=getColor();
    ctx.lineWidth = brushWidth;
    ctx.ellipse( (startMouseX+mouseX)/2 - canRect.left,(startMouseY+mouseY)/2 - canRect.top,Math.abs(mouseX-startMouseX)/2,Math.abs(mouseY-startMouseY)/2,0,0,Math.PI*2,false);
    if ( currentTool == "ellipseStroke" )
    {
      ctx.stroke();
    }
    else if (currentTool == "ellipseFill" ) {
      console.log("huh");
      ctx.fill();
    }
  }
  mouseDown = false;
}




function getColor() { //Return string of RGB values for use in other tools
  if ( currentTool == "erase" ) {
    return "rgb(255,255,255)";
  }
  return "rgb("+currentColorRed+","+currentColorGreen+","+currentColorBlue+")";
}

function setColor() { // Sets color to current values in sliders
  currentColorRed = document.getElementById("redSlider").value;
  currentColorGreen = document.getElementById("greenSlider").value;
  currentColorBlue = document.getElementById("blueSlider").value;
}

function setBrushWidth() {
  brushWidth = document.getElementById("brushSize").value;
  document.getElementById("brushSizeValue").innerHTML = brushWidth;
}