//RGB color values
var currentColorRed = 0;
var currentColorGreen = 0;
var currentColorBlue = 0;

//Paint Tracking Positions
var prevPaintX;
var prevPaintY;

//Beginning Click Position for Shapes/Crop Tools
var startMouseX;
var startMouseY;

//Current Mouse State
var mouseX;
var mouseY;
var mouseDown = false;
var currentTool = "paint";

//Tool Width Setting
var brushWidth = 1;

//Canvas Variables
var mainCanvas;
var guiCanvas;