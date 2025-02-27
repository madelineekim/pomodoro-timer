import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    console.log({data})
  const svgRef = useRef();

  useEffect(() => {
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    const x = d3.scaleBand()
      .domain(d3.groupSort(data, ([d]) => -d.hours, (d) => d.day)) // descending frequency
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.hours)])
      .range([height - marginBottom, marginTop]);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add bars
    svg.append("g")
      .attr("fill", "#dca54c")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.day))
      .attr("y", (d) => y(d.hours))
      .attr("height", (d) => y(0) - y(d.hours))
      .attr("width", x.bandwidth());


    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

      const max_hours = data.reduce((max, obj) => (obj.hours > max.hours ? obj : max), data[0]);

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y)
      .ticks(Math.round(max_hours.hours)) // Specify the number of ticks you want
      .tickFormat((y) => Math.round(y)) // Round to the nearest integer
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Hours Worked"));
  }, [data]); // Redraw on data change

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChart;
