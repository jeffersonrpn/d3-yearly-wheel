(function() {
  var
    margin = {
      top: 60,
      left: 60,
      right: 60,
      bottom: 60
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
  var radius = d3.scaleLinear().range([0, r]).domain([0, 100]);
  var line = d3.radialLine()
    .angle(function(d) { return angle(d.date); })
    .radius(function(d) { return radius(d.volume); });

  d3.json("https://wwws-cloud.lsd.ufcg.edu.br:42160/api/reservatorios/12172/monitoramento", function(error, json) {
    if (error) throw error;

    var
      years = [],
      currentYear = 0,
      year,
      date,
      svgline;
		json.volumes.forEach(function(d) {
      date = parseDate(d.DataInformacao);
      year = date.getFullYear();
      // if (year >= 2007 && year <= 2017) {
        if (year !== currentYear) {
          currentYear = year;
          years[currentYear] = {
            year: currentYear,
            data: []
          }
        }
        years[currentYear].data.push({
          date: date,
          volume: +d.VolumePercentual
        });
      // }
    });

    years.forEach(function(year) {
      console.log(year);
      angle.domain([new Date(year.year+'-01-01'), new Date(year.year+'-12-31')]);
      svgline = line(year.data);
      g.append("path")
        .attr("id", year.year)
        .attr("class", "line")
        .attr("d", svgline);
    })

  });

})();
