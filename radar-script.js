var isicArr = [];
var baseCountry = null;
var compareCountry = null;
var defaultValue = 2000;

var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

var radarData = [
	[
	  {axis:"Manufacturing",value:0},
	  {axis:"Information and communication",value:0},
	  {axis:"Professional scientific and technical activities",value:0},
	  {axis:"Human health and social work activities",value:0},
	  {axis:"Wholesale and retail trade; repair of motor vehicles and motorcycles",value:0},
	  {axis:"Arts, entertainment and recreation ",value:0},
	  {axis:"Administrative and support service activities",value:0},
	  {axis:"Accommodation and food service activities",value:0},
	  {axis:"Financial and insurance activities",value:0},
	  {axis:"Real estate activities",value:0},
	  {axis:"Construction",value:0},
	  {axis:"Mining and quarrying",value:0},
	  {axis:"Electricity, gas, steam and air conditioning supply",value:0},
	  {axis:"Agriculture, forestry and fishing ",value:0},
	  {axis:"Education",value:0},
	  {axis:"Public administration and defence; compulsory social security",value:0},
	  {axis:"Transportation and storage",value:0},
	  {axis:"Other service activities",value:0},
	  {axis:"Not_mapped",value:0},
	],[
	  {axis:"Manufacturing",value:0},
	  {axis:"Information and communication",value:0},
	  {axis:"Professional scientific and technical activities",value:0},
	  {axis:"Human health and social work activities",value:0},
	  {axis:"Wholesale and retail trade; repair of motor vehicles and motorcycles",value:0},
	  {axis:"Arts, entertainment and recreation ",value:0},
	  {axis:"Administrative and support service activities",value:0},
	  {axis:"Accommodation and food service activities",value:0},
	  {axis:"Financial and insurance activities",value:0},
	  {axis:"Real estate activities",value:0},
	  {axis:"Construction",value:0},
	  {axis:"Mining and quarrying",value:0},
	  {axis:"Electricity, gas, steam and air conditioning supply",value:0},
	  {axis:"Agriculture, forestry and fishing ",value:0},
	  {axis:"Education",value:0},
	  {axis:"Public administration and defence; compulsory social security",value:0},
	  {axis:"Transportation and storage",value:0},
	  {axis:"Other service activities",value:0},
	  {axis:"Not_mapped",value:0},
	]
];

//Legend titles
// var LegendOptions = ['Smartphone','Tablet'];
var mycfg = {
	w: w,
	h: h,
	maxValue: 0.6,
	levels: 6,
	ExtraWidthX: 300
}

RadarChart.draw("#chart", radarData, mycfg);

function clearRadarData() {
	var cnt = radarData[0].length;
	for (var j = 0; j < cnt; j++) {
		radarData[0][j].value = 0;
		radarData[1][j].value = 0;
	}
}

function setRadarData() {
	clearRadarData();
	var cnt = radarData[0].length;
	for (var j = 0; j < cnt; j++) {
		for (var k = 0; k < isicArr.length; k++) {
			if (radarData[0][j].axis == isicArr[k].isic_section_name && isicArr[k].country_name == baseCountry) {
				radarData[0][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / defaultValue;
			}
			if (radarData[1][j].axis == isicArr[k].isic_section_name && isicArr[k].country_name == compareCountry) {
				radarData[1][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / defaultValue;
			}
		}
		radarData[0][j].value = radarData[0][j].value.toFixed(2);
		radarData[1][j].value = radarData[1][j].value.toFixed(2);
	}

	console.log(radarData);
	RadarChart.draw("#chart", radarData, mycfg);
}

d3.csv("data/isic_migration.csv", function (data) {
    for (var i = 0; i < data.length; i++) {
        isicArr.push(data[i]);
    }
});

$(function() {
    $(".reset-radar").click(function () {
        clearRadarData();
		baseCountry = null;
		compareCountry = null;
		RadarChart.draw("#chart", radarData, mycfg);
    })
});
//Options for the Radar chart, other than default


//Call function to draw the Radar chart
//Will expect that data is in %'s


////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

// var svg = d3.select('#body')
// 	.selectAll('svg')
// 	.append('svg')
// 	.attr("width", w+300)
// 	.attr("height", h)

// //Create the title for the legend
// var text = svg.append("text")
// 	.attr("class", "title")
// 	.attr('transform', 'translate(90,0)') 
// 	.attr("x", w - 70)
// 	.attr("y", 10)
// 	.attr("font-size", "12px")
// 	.attr("fill", "#404040")
// 	.text("What % of owners use a specific service in a week");
		
// //Initiate Legend	
// var legend = svg.append("g")
// 	.attr("class", "legend")
// 	.attr("height", 100)
// 	.attr("width", 200)
// 	.attr('transform', 'translate(90,20)') 
// 	;
// 	//Create colour squares
// 	legend.selectAll('rect')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("rect")
// 	  .attr("x", w - 65)
// 	  .attr("y", function(d, i){ return i * 20;})
// 	  .attr("width", 10)
// 	  .attr("height", 10)
// 	  .style("fill", function(d, i){ return colorscale(i);})
// 	  ;
// 	//Create text next to squares
// 	legend.selectAll('text')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("text")
// 	  .attr("x", w - 52)
// 	  .attr("y", function(d, i){ return i * 20 + 9;})
// 	  .attr("font-size", "11px")
// 	  .attr("fill", "#737373")
// 	  .text(function(d) { return d; })
// 	  ;	