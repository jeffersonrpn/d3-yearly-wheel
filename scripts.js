(function() {
  var
    margin = {
      top: 40,
      left: 40,
      right: 40,
      bottom: 40
    },
    width = 800,
    height = 800,
    center = {
      x: width/2,
      y: height/2
    },
    r = center.x;
  var parseDate = d3.timeParse("%d/%m/%Y");
  var svg = d3.select(".chart").append("svg")
    .attr("version", "1.1")
    .attr("viewBox", "0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
    .attr("width", "100%");
  var g = svg.append("g").attr("transform", "translate("+(center.x+margin.left)+","+(center.y+margin.top)+")");

  // Angles
  var angles = [
    {month: "Jan", angle: 0},
    {month: "Fev", angle: 30},
    {month: "Mar", angle: 60},
    {month: "Abr", angle: 90},
    {month: "Mai", angle: 120},
    {month: "Jun", angle: 150},
    {month: "Jul", angle: 180},
    {month: "Ago", angle: 210},
    {month: "Set", angle: 240},
    {month: "Out", angle: 270},
    {month: "Nov", angle: 300},
    {month: "Dez", angle: 330}];

  var ga = g.append("g").attr("class", "axis a")
    .selectAll("g")
      .data(angles)
    .enter().append("g")
      .attr("transform", function(d) { return "rotate(" + -d.angle + ")"; });
  ga.append("line")
    .attr("x2", r);

  ga.append("text")
    .attr("x", r + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (r+6) + ",0)" : null; })
    .text(function(d) { return d.month; });

  var angle = d3.scaleTime().range([0, 2 * Math.PI]);
  var radius = d3.scaleLinear().range([0, r]);
  var line = d3.radialLine()
    .angle(function(d) { return angle(d.date); })
    .radius(function(d) { return radius(d.volume); });

  d3.json("sample.json", function(error, json) {
    if (error) throw error;

    var data = [];
		json.volumes.forEach(function(d) {
      data.push({
        date: parseDate(d.DataInformacao),
        volume: +d.VolumePercentual
      });
    });

    angle.domain([d3.min(data, function(d) { return d.date; }), d3.max(data, function(d) { return d.date; })]);
    radius.domain([0, d3.max(data, function(d) { return d.volume; })]);

    console.log(2 * Math.PI);
    console.log(d3.min(data, function(d) { return d.date; }));
    console.log(d3.max(data, function(d) { return d.date; }));

    console.log(angle(d3.min(data, function(d) { return d.date; })));
    console.log(angle(d3.max(data, function(d) { return d.date; })));

    svgline = line(data);

    g.append("path")
      .attr("class", "line")
      .attr("d", svgline);

  });

})();
