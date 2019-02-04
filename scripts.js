//https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html

let canvas, ctx, img;

$(function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	$('#input').change(handleFile);

	$('#lineCheckbox').change(function() {
		updateChart();
		$('#curveCheckbox').prop('disabled', ! $(this).is(':checked') );
	});

	$('#curveCheckbox').change(updateChart);
});

function handleFile(evt){
	img = new Image;
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		updateChart();
	}

	// console.log(evt.target.files[0]);
	img.src =  URL.createObjectURL(evt.target.files[0]);
}

function updateChart() {
	if(!img) return;
	drawChart(getRgbData(), $('#lineCheckbox').is(':checked'), $('#curveCheckbox').is(':checked') );
	$('#logo').prop('src', 'img/logo.svg');	
}

function getRgbData() {
	if(!img) return;

	let imgData = ctx.getImageData(0, 0, img.width, img.height);

	// array of how many pixels are that value
	let r = new Array(256).fill(0);
	let g = new Array(256).fill(0);
	let b = new Array(256).fill(0);

	let rAvg = gAvg = bAvg = 0;

	for(let i=0, len=imgData.data.length; i<len; i+=4) {
		r[imgData.data[i] ]++;
		g[imgData.data[i+1] ]++;
		b[imgData.data[i+2] ]++;

		rAvg += imgData.data[i];
		gAvg += imgData.data[i+1];
		bAvg += imgData.data[i+2];
	}

	rAvg /= imgData.data.length/4;
	gAvg /= imgData.data.length/4;
	bAvg /= imgData.data.length/4;

	displayAvgs(rAvg, gAvg, bAvg);

	return {r:r, g:g, b:b};
}

function displayAvgs(rAvg, gAvg, bAvg) {
	let avg = (rAvg+gAvg+bAvg)/3;
	rAvg = Math.round(rAvg*100)/100;
	gAvg = Math.round(gAvg*100)/100;
	bAvg = Math.round(bAvg*100)/100;
	avg = Math.round(avg*100)/100;

	$('#avgP').html(
		'Avgerage Red: ' + rAvg +
		'<br>Avgerage Green: ' + gAvg +
		'<br>Avgerage blue: ' + bAvg +
		'<br>Avgerage brightness: ' + avg +
		'<br>(out of 255)'
	);
}