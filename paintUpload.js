function upload() 
{
	
	//var fileinput = document.getElementById("finput");
	//var filename = fileinput.value;
	//alert("Chose "+ filename);

	var imgcanvas = document.getElementById("can");
	var fileinput = document.getElementById("finput");
	var image = new SimpleImage(fileinput);
	image.drawTo(imgcanvas);
}