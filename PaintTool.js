      var prevMouseX;
      var prebMouseY;
      var startMouseX;
      var startMouseY;
      var mouseX;
      var mouseY;
      var mouseDown = false;
      var currentTool = "brush";
      var brushWidth = 1;
      var img;

      function trackMouse() {
          prevMouseX = mouseX;
          prevMouseY = mouseY;
          mouseX  = event.clientX;
          mouseY = event.clientY;
      }
      function setBrushWidth() {
        brushWidth = document.getElementById("size_Brush").value;
        document.getElementById("size_GUI").innerHTML = brushWidth;
      }
      function setFillTool() {
        currentTool = "fill"
      }
      function setStrokeTool() {
        currentTool = "stroke"
      }
      function setResizeTool() {
        currentTool = "resize";
      }
      function setBrushTool() {
        currentTool = "brush"
        setColor();
      }
      function Tool() {
        mouseDown = true;
        startMouseX = mouseX;
        startMouseY = mouseY;
        if ( currentTool == "brush" ) PaintTool();
        if ( currentTool == "resize") {
          img = new Image();
          var can = document.getElementById("can");
          var dataURL = can.toDataURL();
          img.src = dataURL;
          console.log(dataURL);
          img.onload = ResizeTool();
        }
      }
      function PaintTool() {
        if (mouseDown) {
          var can = document.getElementById("can");
          var canRect = can.getBoundingClientRect();
          var ctx = can.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(prevMouseX-canRect.left,prevMouseY-canRect.top);
          ctx.lineTo(mouseX-canRect.left,mouseY-canRect.top);
          ctx.strokeStyle=getColor();
          ctx.lineJoin = ctx.lineCap = 'round';
          ctx.lineWidth = brushWidth;
          ctx.stroke();
          setTimeout("PaintTool()",10);
        }
      }
      function ResizeTool() {
        if (mouseDown) {
          var can = document.getElementById("can");
          var canRect = can.getBoundingClientRect();
          var ctx = can.getContext("2d");
          can.width = mouseX - canRect.left + 50;
          can.height = mouseY - canRect.top + 50;
          ctx.drawImage(img,0,0);
          setTimeout("ResizeTool()",1);
        }
      }
      function Untool() {
        if ( currentTool == "stroke" || currentTool == "fill" ) {  
          var can = document.getElementById("can");
          var canRect = can.getBoundingClientRect();
          var ctx = can.getContext("2d");
          ctx.strokeStyle=getColor();
          if ( currentTool == "stroke" ) ctx.strokeRect( startMouseX-canRect.left,startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
          else if ( currentTool == "fill" ) {
            ctx.fillStyle = getColor();
            ctx.fillRect( startMouseX-canRect.left,startMouseY-canRect.top,mouseX-startMouseX,mouseY-startMouseY);
          }
        }
        mouseDown = false;
      }