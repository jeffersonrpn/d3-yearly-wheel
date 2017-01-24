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

  var line = d3.radialLine()
    .angle(function(d) { return angle(d.date); })
    .radius(function(d) { return radius(d.volume); });

})();
