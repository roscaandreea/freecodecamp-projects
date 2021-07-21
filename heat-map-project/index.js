
const colors = ['#67001f',
      '#b2182b',
      '#d6604d',
      '#f4a582',
      '#fddbc7',
      '#f7f7f7',
      '#d1e5f0',
      '#92c5de',
      '#4393c3',
      '#2166ac',
      '#053061'];

const months=[
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'Decembe'];

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then(res => res.json())
    .then(res =>{
      const { baseTemperature, monthlyVariance } = res;
      createStuff(monthlyVariance.map(d => ({
        ...d,
        temp: baseTemperature - d.variance
      })
  ));
})

function createStuff(data){
  const tooltip = document.getElementById('tooltip'); 
  const width = 820;
  const height = 400;
  const padding = 90;
  const cellHeight = (height - (2 * padding)) / 12;
  const cellWidth = width / Math.floor(data.length / 12);
 // const barWidth = width  / data.length;
  const yScale = d3.scaleLinear()
      .domain([0,11])
      .range([padding,height-padding]);
  
  const xScale = d3.scaleTime()
      .domain([
        d3.min(data,d => d.year),
        d3.max(data,d => d.year)])
      .range([padding,width-padding]);
  
  const tempScale = d3.scaleLinear()
      .domain([d3.min(data, d=> d.temp),
              d3.max(data, d=> d.temp)
              ])
      .range([0,10])
  
  const svg = d3.select("#container")
              .append("svg")
              .attr("width",width)
              .attr("height",height)
  
  
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width -400)
    .attr("y", height -9)
    .attr("style","font-size: 20px")
    .text("Year");
  
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .attr("dx", "-9.5em")
    .attr("transform", "rotate(-90)")
    .attr("style","font-size: 20px")
    .text("Months");
             
 
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class","cell")
    .attr("data-month",d => d.month - 1)
    .attr("data-year",d => d.year)
    .attr("data-temp",d => d.temp)
    .attr("x",d => xScale(d.year))
    .attr("y", d => yScale(d.month -1) -cellHeight)
    .attr("fill", d => {
        return colors[Math.floor(tempScale(d.temp))]
      })
    .attr("width", cellWidth)
    .attr("height", cellHeight)
    .on("mouseover", (d,i) => {
        tooltip.classList.add("show");
        tooltip.style.left = xScale(i.year) - 60 + 'px';
        tooltip.style.top = yScale(i.month -1) -60 + 'px';
        tooltip.setAttribute('data-year',i.year);
        tooltip.innerHTML = `
          <p>${i.year} - ${months[i.month-1]}</p>
          <p>${i.temp} °C</p>
        `;
}).on("mouseout",()=>{
  tooltip.classList.remove("show");
});
     

  //create axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat((month) =>{
    const date = new Date(0);
    date.setUTCMonth(month);
    return d3.timeFormat("%B")(date);
  });
  
  svg.append("g")
    .attr("id","x-axis")
              .attr("transform",`translate(0,${height-padding})`)
     .call(xAxis);
  
  svg.append("g")
    .attr("id","y-axis")
    .attr("transform",`translate(${padding},${-cellHeight})`)
  .call(yAxis);
  
  //create legend
  const legendWidth = 300;
  const legendHeight = 50;
  const legendRectWidth = legendWidth / colors.length;
  
  const legend = d3.select('body')
          .append("svg")
          .attr('id','legend')
          .attr("width",legendWidth)
          .attr("height",legendHeight)
          .attr("transform", "rotate(-90)")
          .selectAll('rect')
          .data(colors)
          .enter()
          .append('rect')
          .attr('x',(_,i) => i * legendRectWidth )
          .attr('y',0)
          .attr('width',legendRectWidth)
          .attr('height',legendHeight)
          .attr('fill',c => c)
          
  }



