(function() {
  var
    margin = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    },
    width = 1000,
    height = 1000,
    center = {
      x: width/2,
      y: height/2
    },
    r = center.x;
  function cosX(x) {
    return Math.round( (Math.cos(x * (Math.PI / 180)))*100) / 100;
  }
  function sinX(x) {
    return Math.round( (Math.sin(x * (Math.PI / 180)))*100) / 100;
  }
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

  g.selectAll("line")
    .data(angles).enter()
    .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function(d) { return cosX(d.angle) * r })
      .attr("y2", function(d) { return sinX(d.angle) * r })
      .attr("class", "axis angle")
      .attr("id", function(d) { return d.month });

})();
