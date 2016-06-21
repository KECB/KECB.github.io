var width = 900,
    height = 300,
    pad = 20,
    left_pad = 100;

var x = d3.scale
        .ordinal()
        .rangeRoundBands([left_pad, width - pad], 0.1);

var y = d3.scale
        .linear()
        .range([height-pad, pad]);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

var svg = d3.select("#graph")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

var newCol = d3.selectAll('tr').append('td');
newCol.text(function (d, i) {
        return ['Six', 'y', 'h', 'n'][i];
})

d3.selectAll('tr td').style('color', function (d, i) {
        return i%2 ? 'green':'red'; 
})