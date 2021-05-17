var isicArr = [];
var baseCountry = null;
var compareCountry = null;
var defaultValue = 2000;
var unitValue = 10000;

var w = 400,
	h = 400;

var colorscale = d3.scale.category10();

var radarData = [
	[
	  {axis:"C",value:0},
	  {axis:"J",value:0},
	  {axis:"M",value:0},
	  {axis:"Q",value:0},
	  {axis:"G",value:0},
	  {axis:"R",value:0},
	  {axis:"N",value:0},
	  {axis:"I",value:0},
	  {axis:"K",value:0},
	  {axis:"L",value:0},
	  {axis:"F",value:0},
	  {axis:"B",value:0},
	  {axis:"D",value:0},
	  {axis:"A",value:0},
	  {axis:"P",value:0},
	  {axis:"O",value:0},
	  {axis:"H",value:0},
	  {axis:"S",value:0},
	  {axis:"X",value:0},
	],[
		{axis:"C",value:0},
		{axis:"J",value:0},
		{axis:"M",value:0},
		{axis:"Q",value:0},
		{axis:"G",value:0},
		{axis:"R",value:0},
		{axis:"N",value:0},
		{axis:"I",value:0},
		{axis:"K",value:0},
		{axis:"L",value:0},
		{axis:"F",value:0},
		{axis:"B",value:0},
		{axis:"D",value:0},
		{axis:"A",value:0},
		{axis:"P",value:0},
		{axis:"O",value:0},
		{axis:"H",value:0},
		{axis:"S",value:0},
		{axis:"X",value:0},
	]
];

var radarData1 = [
	[
		{axis:"C",value:0},
		{axis:"J",value:0},
		{axis:"M",value:0},
		{axis:"Q",value:0},
		{axis:"G",value:0},
		{axis:"R",value:0},
		{axis:"N",value:0},
		{axis:"I",value:0},
		{axis:"K",value:0},
		{axis:"L",value:0},
		{axis:"F",value:0},
		{axis:"B",value:0},
		{axis:"D",value:0},
		{axis:"A",value:0},
		{axis:"P",value:0},
		{axis:"O",value:0},
		{axis:"H",value:0},
		{axis:"S",value:0},
		{axis:"X",value:0},
	],[
	  {axis:"C",value:0},
	  {axis:"J",value:0},
	  {axis:"M",value:0},
	  {axis:"Q",value:0},
	  {axis:"G",value:0},
	  {axis:"R",value:0},
	  {axis:"N",value:0},
	  {axis:"I",value:0},
	  {axis:"K",value:0},
	  {axis:"L",value:0},
	  {axis:"F",value:0},
	  {axis:"B",value:0},
	  {axis:"D",value:0},
	  {axis:"A",value:0},
	  {axis:"P",value:0},
	  {axis:"O",value:0},
	  {axis:"H",value:0},
	  {axis:"S",value:0},
	  {axis:"X",value:0},
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
RadarChart.draw("#chart1", radarData1, mycfg);

function clearRadarData() {
	var cnt = radarData[0].length;
	for (var j = 0; j < cnt; j++) {
		radarData[0][j].value = 0;
		radarData[1][j].value = 0;
		radarData1[0][j].value = 0;
		radarData1[1][j].value = 0;
	}
}

function setRadarData() {
	clearRadarData();
	var cnt = radarData[0].length;
	for (var j = 0; j < cnt; j++) {
		for (var k = 0; k < isicArr.length; k++) {
			if (radarData[0][j].axis == isicArr[k].isic_section_index && isicArr[k].country_name == baseCountry) {
				radarData[0][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / (defaultValue * unitValue) ;
				radarData[1][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / (defaultValue * unitValue);
			}
			else if (radarData[0][j].axis == isicArr[k].isic_section_index && isicArr[k].country_name == compareCountry) {
				radarData1[0][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / (defaultValue * unitValue) ;
				radarData1[1][j].value += (isicArr[k]["net_per_10K_" + currentYear] * 1) / (defaultValue * unitValue);
			}
		}
		radarData[0][j].value *= unitValue;
		radarData[1][j].value *= unitValue;
		radarData1[0][j].value *= unitValue;
		radarData1[1][j].value *= unitValue;
	}
	for (var j1 = 0; j1 < cnt; j1++) {
		if(radarData[0][j1].value < 0) radarData[0][j1].value = 0;
		if(radarData1[0][j1].value < 0) radarData1[0][j1].value = 0;

		if(radarData[1][j1].value < 0) {
			radarData[1][j1].value *= -1;
		}
		else if(radarData[1][j1].value > 0) radarData[1][j1].value = 0;

		if(radarData1[1][j1].value < 0) {
			radarData1[1][j1].value *= -1;
		}
		else if(radarData1[1][j1].value > 0) radarData1[1][j1].value = 0;
	}
	console.log(radarData);
	RadarChart.draw("#chart", radarData, mycfg);
	RadarChart.draw("#chart1", radarData1, mycfg);
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
		RadarChart.draw("#chart1", radarData1, mycfg);
    })
});