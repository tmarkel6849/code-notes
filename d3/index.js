// create an svg, import data, create a linear scale

const svg = d3.select('#chart-area')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500)

const y = d3.scale
  .linear()
  .domain([ 0, 828 ])
  .range([ 0, 400 ]);

d3.json('data/buildings.json', (data) => {
  data.forEach(obj => {
    obj.height = +obj.height
  })

  const rects = d3.selectAll('rect')
    .data()
    .enter()
      .append('rect')
      .attr('y', 0)
      .attr('x', (d, i) => i * 60)
      .attr('width', 40)
      .attr('height', (d) => y(d.height))
      .attr('fill', 'grey')
})


let margin = {
  top: 10,
  bottom: 100,
  right: 10,
  left: 10
}

// no magic numbers, create an svg group, scale the x and y axis

let width = 600 - margin.right - margin.left
    height = 400 - margin.top - margin.bottom

const g = d3.select('#chart-area')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.botton)
    .append('g')
    .attr('transform', `tranlate(${margin.left}, ${margin.top})`)

d3.json('buildings.json', (data) => {
  data.forEach(entry => {
    entry.height = +entry.height
  })
  const x = d3.scaleBand()
    .domain(data.map((entry) => entry.name))
    .range([ 0, width ])
    .paddingInner(0.3)
    .paddingOuter(0.3)

  const y = scaleLinear()
    .domain([ 0, d3.max(data, (entry) => entry.height) ])
    .range([ 0, height ])

  const rects = d3.selectAll('rect')
    .date(data)
    .enter()
    .append('rect')
      .attr('y', 0)
      .attr('x', (d) => x(d.name))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(d.height))
      .attr('fill', 'grey')
})