

async function run(){
 
const tooltip = document.getElementById('tooltip'); 

const eduRes = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');

const education = await eduRes.json();

const countyRes = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
const counties = await countyRes.json();

 const width = 960;
 const height = 600;
 const padding = 90;
  
 const path = d3.geoPath(); 
 const data =     topojson.feature(counties,counties.objects.counties).features;
  const minEdu = d3.min(education, edu => edu.bachelorsOrHigher);
  const maxEdu = d3.max(education, edu => edu.bachelorsOrHigher);
  const step = (maxEdu-minEdu)/8;

  const colorsScale = d3.scaleThreshold()
         .domain(d3.range(minEdu,maxEdu,step))
         .range(d3.schemePurples[9]);
  const colors = [];
  for(let i=minEdu;i<=maxEdu;i+=step){
    colors.push(colorsScale(i))
  }

 const svg = d3.select("#container")
             .append("svg")
             .attr("width",width)
             .attr("height",height)
 
 svg.append('g')
  .selectAll('path')
  .data(data)
  .enter()
  .append('path')
  .attr('class','county')
  .attr('fill', d =>
   colorsScale(education.find(ed => ed.fips === d.id ).bachelorsOrHigher))
  .attr('data-fips', d => d.id)
  .attr('data-education', d =>
    education.find(ed => ed.fips === d.id ).bachelorsOrHigher)
  .attr('d',path)  
  .on("mouseover", (d,i) => {
       const { coordinates } = i.geometry;
       const [x,y] = coordinates[0][0]; 
       const edu = education.find(ed => ed.fips === i.id );
   
       tooltip.classList.add("show");
       tooltip.style.left = x - 50 + 'px';
       tooltip.style.top = y - 50 + 'px';
       tooltip.setAttribute('data-education',edu.bachelorsOrHigher);
       tooltip.innerHTML = `
         <p>${edu.area_name} - ${edu.state}</p>
         <p>${edu.bachelorsOrHigher}%</p>
       `;
}).on("mouseout",()=>{
 tooltip.classList.remove("show");
});
    
 //create legend

 const legendWidth = 400;
 const legendHeight = 20;
 const legendRectWidth = legendWidth / colors.length;
 
 const legend = d3.select('#container')
         .append("svg")
         .attr('id','legend')
         .attr("class",'legend')
         .attr("width",legendWidth)
         .attr("height",legendHeight)
         .selectAll('rect')
         .data(colors)
         .enter()
         .append('rect')
         .attr('x',(_,i) => i * legendRectWidth )
         .attr('y',0)
         .attr('width',legendRectWidth)
         .attr('height',legendHeight)
         .attr('fill',c => c)
 
 svg.append("text").attr("x", 460).attr("y", 55).text("3%").style("font-size", "15px").attr("text-anchor","start");
  
 svg.append("text").attr("x", 505).attr("y", 55).text("12%").style("font-size", "15px").attr("text-anchor","start");
  
 svg.append("text").attr("x", 550).attr("y", 55).text("21%").style("font-size", "15px").attr("text-anchor","start");
   
 svg.append("text").attr("x", 595).attr("y", 55).text("30%").style("font-size", "15px").attr("text-anchor","start");
  
svg.append("text").attr("x", 640).attr("y", 55).text("39%").style("font-size", "15px").attr("text-anchor","start");
  
svg.append("text").attr("x", 680).attr("y", 55).text("48%").style("font-size", "15px").attr("text-anchor","start");
  
svg.append("text").attr("x", 730).attr("y", 55).text("57%").style("font-size", "15px").attr("text-anchor","start");
  
svg.append("text").attr("x", 775).attr("y", 55).text("66%").style("font-size", "15px").attr("text-anchor","start");
  
svg.append("text").attr("x", 820).attr("y", 55).text("75%").style("font-size", "15px").attr("text-anchor","start");
}

run();
         




