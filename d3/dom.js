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

// var Data;

// var table = d3.select('#graph')
//                 .append('table')
//                 .attr('class', 'table');
// var thead = table.append('thead');
// var tbody = table.append('tbody');

// var reload = function () {
//   d3.csv('villains.csv', function (data) {
//     Data = data;
//     Data = Data.filter(function (d) { return d['Doctor actor'] == 'Matt Smith'; })
//     redraw();
//   });
// };
// reload();

// var redraw = function () {
//   var tr = tbody.selectAll('tr')
//                  .data(Data);
//   tr.enter()
//     .append('tr');
//   tr.exit()
//     .remove();
//   tr.selectAll('td')
//     .data(function (d) { return d3.values(d); })
//     .enter()
//     .append('td')
//     .text(function (d) { return d; });
//   tbody.selectAll('tr')
//     .sort(function (a, b) { return d3.ascending(a['Year first'], b['Year first']); });
//   tbody.selectAll('tr').sort(function (a, b) {
//      return d3.descending(Number(a['Doc. no.']), Number(b['Doc. no.']));
//      });
//   tbody.selectAll('tr')
//      .filter(function (d) { return d['Doctor actor'] != 'Matt Smith'; })
//      .remove()
// };

// var svg = d3.select("#graph")
//   .append('svg')
//   .style('width', 1024)
//   .style('height', 768);

// svg.append('text')
//   .text('A picture!')
//   .attr({
//     x: 10,
//     y: 150,
//     'text-anchor': 'start'
//   });

// svg.append('line')
//   .attr({
//     x1: 10,
//     y1: 10,
//     x2: 100,
//     y2: 100,
//     stroke: 'blue',
//     'stroke-width': 3
//   });

// svg.append('rect')
//   .attr({
//     x: 200,
//     y: 100,
//     width: 300,
//     height: 300
//   });

// svg.select('rect')
//   .attr({
//     stroke: 'green',
//     'stroke-width': 0.5,
//     fill: 'white',
//     rx: 10,
//     ry:10
//   });

// svg.append('circle')
//   .attr({
//     cx: 350,
//     cy: 250,
//     r: 100,
//     fill: 'green',
//     'fill-opacity': 0.5,
//     stroke: 'steelblue',
//     'stroke-width': 2
//   });

// svg.append('ellipse')
//   .attr({
//     cx: 350,
//     cy: 250,
//     rx: 150,
//     ry: 70,
//     fill: 'green',
//     'fill-opacity': 0.3,
//     stroke: 'steelblue',
//     'stoke-width': 0.7
//   });

// svg.append('ellipse')
//   .attr({
//     cx: 350,
//     cy: 250,
//     rx: 20,
//     ry: 70,
//   });

// svg.selectAll('ellipse, circle')
//   .attr('transform', 'translate(150, 0) scale(1.2) translate(-50, -50) rotate(-45, 350, 250) skewX(10)');

// svg.append('path')
//   .attr({
//     d: 'M 100 100 L 300 100 L 200 300 z',
//     stroke: 'black',
//     'stroke-width': 2,
//     fill: 'red',
//     'fill-opacity': 0.7
//   });

var width = 1024,
  height = 768,
  margin = 10;

var svg = d3.select('#graph')
  .append('svg')
  .attr('width', width+2*margin)
  .attr('height', height+2*margin);

var g = svg.append('g')
  .attr('transform', 'translate('+margin+', '+margin+')');

var sine = d3.range(0, 10).map(
  function (k) {
    return [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)];
  }
);

var x = d3.scale.linear()
  .range([0, width / 2 - margin])
  .domain(d3.extent(sine, function (d) { return d[0]; })),
  y = d3.scale.linear().range([ height / 2 - margin, 0]).domain([-1, 1]);

var line = d3.svg.line()
  .x(function (d) {
    return x(d[0]);
  })
  .y(function (d) {
    return y(d[1]);
  })

g.append('path')
  .datum(sine)
  .attr('d', line)
  .attr({
    stroke: 'steelblue',
    'stroke-width': 2,
    fill: 'none'
  });

g.append('path')
  .datum(sine)
	.attr("d", line.interpolate('step-before'))
  .attr({stroke: 'black',
  'stroke-width': 1,
  fill: 'none'});

var g2 = svg.append('g')
     .attr('transform', 'translate('+(width/2+margin)+', '+margin+')');

var area = d3.svg.area()
  .x(function (d) {
    return x(d[0]);
  })
  .y0(height /2 )
  .y1(function (d) {
    return y(d[1]);
  })
  .interpolate('basis');

g2.append('path')
  .datum(sine)
  .attr('d', area)
  .attr({
    fill: 'steelblue',
    'fill-opacity': 0.4
  });

g2.append('path')
  .datum(sine)
  .attr('d', line.interpolate('basis'))
  .attr({
    stroke: 'steelblue',
    'stoke-width': 2,
    fill: 'none'
  });