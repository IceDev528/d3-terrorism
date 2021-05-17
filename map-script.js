var allData = new Array();
var prevalenceData = new Array();
var countryData = new Array();
var migrationData = new Array();
var populationData = new Array();
var arrowData = new Array();
var currentYear = document.getElementById('year-select').value;
var terrorType = document.getElementById('terror-select').value;
var map;

// var colors = d3.scale.category10();
var colors = d3.scale.linear().domain([1,10])
    .range(["white", "red"])

var color = d3.scale.linear()
			  .range(["808080", "#ffe3e3","#ffaaaa","#ff7171","#ff3939", "#ff0000"]);

var legendText = ["No data", "0 < Value < 50", "50 < Value < 200", "200 < Value < 500", "500 < Value < 1000", "1000 < Value"];

function makeColor(percentage) {
    if (percentage >= 0 && percentage < 50) {
        return colors(2);
    }
    else if (percentage >= 50 && percentage < 200) {
        return colors(4);
    }
    else if (percentage >= 200 && percentage < 500) {
        return colors(6);
    }
    else if (percentage >= 500 && percentage < 1000) {
        return colors(8);
    }
    else if (percentage >= 1000) {
        return colors(10);
    }
}

function getUnique(array) {
    var uniqueArray = [];
    var resultArray = [];
    // Loop through array values
    for(i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    for(j=0; j < uniqueArray.length; j++){
       var data = {"country": uniqueArray[j], "country_code": '', "attack": 0, "victim": 0, "killed": 0};
       resultArray.push(data);
    }
    return resultArray;
}

function calcTotal(arr, year) {
    prevalenceData = [];

    var yearData = new Array();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].iyear == year) {
            yearData.push(arr[i]);
            prevalenceData.push(arr[i].country_txt);
        }
    }

    prevalenceData = getUnique(prevalenceData);

    for (var k = 0; k < prevalenceData.length; k++) {
        for (var j = 0; j < yearData.length; j++) {
            if(yearData[j].country_txt == prevalenceData[k].country) {
                prevalenceData[k].attack ++;
                prevalenceData[k].victim += yearData[j].nwound * 1;
                prevalenceData[k].killed += yearData[j].nkill * 1;
            }
        }
        for (var n = 0; n < countryData.length; n++) {
            if( prevalenceData[k].country == countryData[n].name) {
                prevalenceData[k].country_code = countryData[n].code;
            }
        }
    }
}

function setCountries(arr, year, terror) {
    calcTotal(arr, year);
    for (var i = 0; i < prevalenceData.length; i++) {
        var selectedGeo = {};
        var percentage = prevalenceData[i][terror];
        selectedGeo[prevalenceData[i].country_code] = makeColor(percentage);
        map.updateChoropleth(selectedGeo);
    }
}

function getValue(code) {
    for(var i = 0; i < prevalenceData.length; i++) {
        if(code == prevalenceData[i].country_code) {
            return prevalenceData[i][terrorType];
        } 
    }
}

function tooltipHtml(n, code) {	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
    "<tr><td>"+getValue(code)+"</td></tr>"+
    "</table>";
}

function drawArrow(data) {
    map.arc(data, {strokeWidth: 1, arcSharpness: 1.4});
}

function getPopulation(country) {
    for(var i = 0; i < populationData.length; i++) {
        if(country == populationData[i].country) {
            return populationData[i].population;
        }
    }
}

function getThickness(num) {
    var strokeWidth = 1;
    var posVal = Math.abs(num);
    
    if(posVal > 0 && posVal < 100) strokeWidth = 1;
    else if(posVal >= 100 && posVal < 300) strokeWidth = 1.5;
    else if(posVal >= 300 && posVal < 500) strokeWidth = 2;
    else if(posVal >= 500 && posVal < 1000) strokeWidth = 2.5;
    else if(posVal >= 1000 && posVal < 3000) strokeWidth = 3;
    else if(posVal >= 3000 && posVal < 5000) strokeWidth = 4;
    else if(posVal >= 5000 && posVal < 10000) strokeWidth = 5;
    else if(posVal >= 10000) strokeWidth = 6;

    return strokeWidth;
}

function getArrowGradient(num) {
    var strokeColor;
    var posVal = Math.abs(num);
    if(num > 0) {
        if(posVal > 0 && posVal < 100) strokeColor = 'rgba(255,0,0,1)';
        else if(posVal >= 100 && posVal < 300) strokeColor = 'rgba(255,0,0,0.9)';
        else if(posVal >= 300 && posVal < 500) strokeColor = 'rgba(255,0,0,0.8)';
        else if(posVal >= 500 && posVal < 1000) strokeColor = 'rgba(255,0,0,0.7)';
        else if(posVal >= 1000 && posVal < 3000) strokeColor = 'rgba(255,0,0,0.6)';
        else if(posVal >= 3000 && posVal < 5000) strokeColor = 'rgba(255,0,0,0.5)';
        else if(posVal >= 5000 && posVal < 10000) strokeColor = 'rgba(255,0,0,0.5)';
        else if(posVal >= 10000) strokeColor = 'rgba(255,0,0,0.5)';
    }
    else {
        if(posVal > 0 && posVal < 100) strokeColor = 'rgba(0,0,255,1)';
        else if(posVal >= 100 && posVal < 300) strokeColor = 'rgba(0,0,255,0.9)';
        else if(posVal >= 300 && posVal < 500) strokeColor = 'rgba(0,0,255,0.8)';
        else if(posVal >= 500 && posVal < 1000) strokeColor = 'rgba(0,0,255,0.7)';
        else if(posVal >= 1000 && posVal < 3000) strokeColor = 'rgba(0,0,255,0.6)';
        else if(posVal >= 3000 && posVal < 5000) strokeColor = 'rgba(0,0,255,0.5)';
        else if(posVal >= 5000 && posVal < 10000) strokeColor = 'rgba(0,0,255,0.5)';
        else if(posVal >= 10000) strokeColor = 'rgba(0,0,255,0.5)';
    }
    return strokeColor;
}

function setArrow(country) {
    for(var i = 0; i < migrationData.length; i++) {
        if(country == migrationData[i].base_country_name) {
            var realPopulation = migrationData[i]["net_per_10K_" + currentYear] * getPopulation(country) / 10000;

            var temp = { 
                origin: {
                    latitude: migrationData[i].base_lat,
                    longitude: migrationData[i].base_long
                },
                destination: {
                    latitude: migrationData[i].target_lat,
                    longitude: migrationData[i].target_long
                },
                options: {
                    strokeWidth: getThickness(realPopulation),
                    strokeColor: getArrowGradient(realPopulation),
                    greatArc: true
                }
            }
            arrowData.push(temp);
        }
    }
}

function showMap(geography) {
    var flag = 0;
    for(var i = 0; i < migrationData.length; i++) {
        if(geography.properties.name == migrationData[i].base_country_name) {
            flag = 1;
            setArrow(migrationData[i].base_country_name);
            drawArrow(arrowData);
            break;
        }
    }
    if(flag == 0) alert("Map: No data!!!");
}

function showRadar(geography) {
    for(var i = 0; i < isicArr.length; i++) {
        if(geography.properties.name == isicArr[i].country_name) {
            if(baseCountry == null) baseCountry = geography.properties.name;
            else compareCountry = geography.properties.name;
            break;
        }
    }
    console.log(baseCountry, compareCountry);
}

function setMapData() {
    var mapData = {
        element: document.getElementById("worldmap"),
        projection: 'mercator',
        fills: {
            defaultFill: "#808080",
        },
        height: 900,
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function (geography) {
                d3.select("#tooltip").transition().duration(200).style("opacity", .9);      
                d3.select("#tooltip").html(tooltipHtml(geography.properties.name, geography.id))  
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY) + "px");
            })
            .on('mouseout', function () {
                d3.select("#tooltip").transition().duration(200).style("opacity", 0);
            })
            .on('click', function(geography) {
                showMap(geography);
                showRadar(geography);
                setRadarData();
            });
        }
    };
    return mapData;
}

map = new Datamap(setMapData());

color.domain([0,1,2,3,4,5]);

var legend = d3.select("#legend-box").append("svg")
    .attr("class", "legend")
    .attr("width", 150)
    .attr("height", 150)
    .selectAll("g")
    .data(color.domain().slice())
    .enter()
    .append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .data(legendText)
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

map.svg.call(d3.behavior.zoom().on('zoom', function () {
     map.svg.selectAll('g').attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')')
}));

d3.json("data/countries.json", function (data) {
    for (var i = 0; i < data.length; i++) {
        countryData.push(data[i]);
    }
});

d3.csv("data/globalterrorismdb_0221dist.csv", function (data) {
    for (var i = 0; i < data.length; i++) {
        allData.push(data[i]);
    }
    calcTotal(allData, currentYear);
    setCountries(allData, currentYear, terrorType);
});

d3.csv("data/Gapminder_All_Time.csv", function (data) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].Year == 2015) {
            var temp = {"country": data[i].Country, "country_code": data[i].Code, "population": data[i].Population};
            populationData.push(temp);
        }
    }
});

d3.csv("data/public_use-talent-migration.csv", function (data) {
    for (var i = 0; i < data.length; i++) {
        migrationData.push(data[i]);
    }
});

$(function() {
    $("#year-select").change(function (event) {
        year = event.target.value;
        currentYear = year;
        setCountries(allData, year, terrorType);
        document.getElementById("year-val").innerHTML = "Current Year: " + year;
    })
    $("#terror-select").change(function (event) {
        terror = event.target.value;
        terrorType = terror;
        setCountries(allData, currentYear, terrorType);
    })
    $(".reset-map").click(function () {
        document.getElementById("worldmap").innerHTML = "";
        arrowData = [];
        map = new Datamap(setMapData());
        setCountries(allData, currentYear, terrorType);
    })
});