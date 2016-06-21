// var width = 900,
//     height = 300,
//     pad = 20,
//     left_pad = 100;

// var x = d3.scale
//         .ordinal()
//         .rangeRoundBands([left_pad, width - pad], 0.1);

// var y = d3.scale
//         .linear()
//         .range([height-pad, pad]);

// var xAxis = d3.svg.axis().scale(x).orient("bottom");
// var yAxis = d3.svg.axis().scale(y).orient("left");

// var svg = d3.select("#graph")
//           .append("svg")
//           .attr("width", width)
//           .attr("height", height);

// var newCol = d3.selectAll('tr').append('td');
// newCol.text(function (d, i) {
//         return ['Six', 'y', 'h', 'n'][i];
// })

// d3.selectAll('tr td').style('color', function (d, i) {
//         return i%2 ? 'green':'red'; 
// })

var Data;

var table = d3.select('#graph')
                .append('table')
                .attr('class', 'table');
var thead = table.append('thead');
var tbody = table.append('tbody');

var reload = function () {
  d3.csv('villains.csv', function (data) {
    Data = data;
    Data = Data.filter(function (d) { return d['Doctor actor'] == 'Matt Smith'; })
    redraw();
  });
};
reload();

var redraw = function () {
  var tr = tbody.selectAll('tr')
                 .data(Data);
  tr.enter()
    .append('tr');
  tr.exit()
    .remove();
  tr.selectAll('td')
    .data(function (d) { return d3.values(d); })
    .enter()
    .append('td')
    .text(function (d) { return d; });
  tbody.selectAll('tr')
    .sort(function (a, b) { return d3.ascending(a['Year first'], b['Year first']); });
  tbody.selectAll('tr').sort(function (a, b) {
     return d3.descending(Number(a['Doc. no.']), Number(b['Doc. no.']));
     });
  tbody.selectAll('tr')
     .filter(function (d) { return d['Doctor actor'] != 'Matt Smith'; })
     .remove()
};