var isicArr = [];
var baseCountry = null;
var compareCountry = null;

console.log(currentYear);

var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];

d3.csv("data/isic_migration.csv", function (data) {
    for (var i = 0; i < data.length; i++) {
        isicArr.push(data[i]);
    }
});

console.log(isicArr);

var defaultData = [
	[
	  {axis:"Manufacturing",value:0.59},
	  {axis:"Information and communication",value:0.56},
	  {axis:"Professional scientific and technical activities",value:0.42},
	  {axis:"Human health and social work activities",value:0.34},
	  {axis:"Wholesale and retail trade; repair of motor vehicles and motorcycles",value:0.48},
	  {axis:"Arts, entertainment and recreation ",value:0.14},
	  {axis:"Administrative and support service activities",value:0.11},
	  {axis:"Accommodation and food service activities",value:0.05},
	  {axis:"Financial and insurance activities",value:0.07},
	  {axis:"Real estate activities",value:0.12},
	  {axis:"Construction",value:0.27},
	  {axis:"Mining and quarrying",value:0.03},
	  {axis:"Electricity, gas, steam and air conditioning supply",value:0.12},
	  {axis:"Agriculture, forestry and fishing ",value:0.4},
	  {axis:"Education",value:0.03},
	  {axis:"Public administration and defence; compulsory social security",value:0.22},
	  {axis:"Transportation and storage",value:0.03},
	  {axis:"Other service activities",value:0.03},
	  {axis:"Not_mapped",value:0.07},
	],[
	  {axis:"Manufacturing",value:0.59},
	  {axis:"Information and communication",value:0.56},
	  {axis:"Professional scientific and technical activities",value:0.42},
	  {axis:"Human health and social work activities",value:0.34},
	  {axis:"Wholesale and retail trade; repair of motor vehicles and motorcycles",value:0.48},
	  {axis:"Arts, entertainment and recreation ",value:0.14},
	  {axis:"Administrative and support service activities",value:0.11},
	  {axis:"Accommodation and food service activities",value:0.05},
	  {axis:"Financial and insurance activities",value:0.07},
	  {axis:"Real estate activities",value:0.12},
	  {axis:"Construction",value:0.27},
	  {axis:"Mining and quarrying",value:0.03},
	  {axis:"Electricity, gas, steam and air conditioning supply",value:0.12},
	  {axis:"Agriculture, forestry and fishing ",value:0.4},
	  {axis:"Education",value:0.03},
	  {axis:"Public administration and defence; compulsory social security",value:0.22},
	  {axis:"Transportation and storage",value:0.03},
	  {axis:"Other service activities",value:0.03},
	  {axis:"Not_mapped",value:0.07},
	]
];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", defaultData, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	