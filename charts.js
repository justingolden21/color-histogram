google.charts.load('current', {'packages':['corechart','bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(rgbData, lines, curved=false) {
	let chartdata = [ ['Occurences', 'Red', 'Green', 'Blue', 'All'] ];
	let intervalSize = 32; // power of 2, number of sections on x axis
	let numSections = 256/intervalSize;
	for(let i=0; i<intervalSize; i++) {
		let rVal = gVal = bVal = 0;
		for(let j=0; j<numSections; j++) {
			rVal += rgbData.r[i*numSections + j];
			gVal += rgbData.g[i*numSections + j];
			bVal += rgbData.b[i*numSections + j];
		}
		chartdata.push([(i*numSections) + '-' + ( (i+1)*numSections), rVal, gVal, bVal, (rVal+gVal+bVal)/3 ]);
	}
	let data = google.visualization.arrayToDataTable(chartdata);

	options = {
		title: 'Color Histogram',
		chartArea: {width: '75%'},
		hAxis: { title: 'Color Value' },
		vAxis: { title: 'Occurences' },
		bar: { groupWidth: '90%' },
		colors: ['#933', '#393', '#339', '#333']
	};
	if(curved)
		options.curveType = 'function';

	let chart;
	if(lines)
		chart = new google.visualization.LineChart(document.getElementById('chart') );		
	else 
		chart = new google.charts.Bar(document.getElementById('chart') );

	// below works only with line charts
	// google.visualization.events.addListener(chart, 'ready', function () {
	// 	$(document.body).append('<img src="' + chart.getImageURI() + '">');
	// });

	chart.draw(data, options);
}
