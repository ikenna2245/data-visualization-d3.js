function main(color) {
    //Url to the sliced data on the server
    const dataUrl = "https://a0220767.scedt.tees.ac.uk/ICA/total_att_data.json"

    //Dimension for the margins
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;





    //Div element for the Tooltip 
    const div = d3.select("body").append("div")
        .attr("class", "tooltip-scatter")
        .style("opacity", 0);

    //D3.json to read the json file 
    d3.json(dataUrl)
        .then(data => {
            const svg = d3.select("#scatter")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            const labelY = svg.append("g")
                .append("text")
                .text("Total Attendance")
                .attr("x", margin.top)
                .attr("y", (height / 2) - margin.top * 2)
                .style("fill", "black")
                .attr("font-size", 16)
                .attr("transform", `rotate(270 ${margin.left -margin.top } ${height /2})`)
                .attr("text-anchor", "center");

            const labelX = svg.append("g")
                .append("text")
                .text("Student Mark")
                .attr("y", height + margin.bottom + margin.top)
                .attr("x", width / 2)
                .style("fill", "black")
                .attr("font-size", 14)
                .attr("text-anchor", "left");

            const group = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const xScale = d3.scaleLinear()
                .domain([0, 0])
                .range([0, width]);

            const xAxisGroup = group.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "bm-axis")
                .attr("opacity", "0")
                .call(d3.axisBottom(xScale));

            const yScale = d3.scaleLinear()
                .domain([0, 50])
                .range([height, 0]);
            const yAxisGroup = group.append("g")
                .call(d3.axisLeft(yScale));

            group.append('g')
                .selectAll("dot")

            .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.Mark); })
                .attr("cy", function(d) { return yScale(d.count); })
                .attr("r", 2.5)
                .style("fill", function(d) { return color(d.Mark); })
                .on('mouseenter', event => {
                    div.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    div.html(event.path[0].__data__.ModuleCode + "<br/>" + "ID: " + event.path[0].__data__.StudentID + "<br/>" + "Total Att: " + event.path[0].__data__.count + "<br/>" + "Grade: " + event.path[0].__data__.Grade)
                        .style("left", (event.pageX + 30) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseleave", event => {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            xScale.domain([0, 100])
            group.select(".bm-axis")
                .transition()
                .duration(2000)
                .attr("opacity", "1")
                .call(d3.axisBottom(xScale));

            svg.selectAll("circle")
                .transition()
                .delay(function(d, i) { return (i * 3) })
                .duration(2000)
                .attr("cx", d => xScale(d.Mark))
                .attr("cy", d => yScale(d.count))

        })

}

function main2(color, val) {
    //Url to the sliced data on the server
    const dataUrl = "https://a0220767.scedt.tees.ac.uk/ICA/total_att_data.json"

    //Dimension for the margins
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;





    //Div element for the Tooltip 
    const div = d3.select("body").append("div")
        .attr("class", "tooltip-scatter")
        .style("opacity", 0);

    //D3.json to read the json file 
    d3.json(dataUrl)
        .then(data => {
            const svg = d3.select("#scatter")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            const labelY = svg.append("g")
                .append("text")
                .text("Total Attendance")
                .attr("x", margin.top)
                .attr("y", (height / 2) - margin.top * 2)
                .style("fill", "black")
                .attr("font-size", 16)
                .attr("transform", `rotate(270 ${margin.left -margin.top } ${height /2})`)
                .attr("text-anchor", "center");

            const labelX = svg.append("g")
                .append("text")
                .text("Student Mark")
                .attr("y", height + margin.bottom + margin.top)
                .attr("x", width / 2)
                .style("fill", "black")
                .attr("font-size", 14)
                .attr("text-anchor", "left");

            const group = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const xScale = d3.scaleLinear()
                .domain([0, 0])
                .range([0, width]);

            const xAxisGroup = group.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "bm-axis")
                .attr("opacity", "0")
                .call(d3.axisBottom(xScale));

            const yScale = d3.scaleLinear()
                .domain([0, 50])
                .range([height, 0]);
            const yAxisGroup = group.append("g")
                .call(d3.axisLeft(yScale));

            group.append('g')
                .selectAll("dot")

            .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.Mark); })
                .attr("cy", function(d) { return yScale(d.count); })
                .attr("r", 2.5)
                .style("fill", function(d) { return color(d, val); })
                .on('mouseenter', event => {
                    div.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    div.html(event.path[0].__data__.ModuleCode + "<br/>" + "ID: " + event.path[0].__data__.StudentID + "<br/>" + "Total Att: " + event.path[0].__data__.count + "<br/>" + "Grade: " + event.path[0].__data__.Grade)
                        .style("left", (event.pageX + 30) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseleave", event => {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            xScale.domain([0, 100])
            group.select(".bm-axis")
                .transition()
                .duration(2000)
                .attr("opacity", "1")
                .call(d3.axisBottom(xScale));

            svg.selectAll("circle")
                .transition()
                .delay(function(d, i) { return (i * 3) })
                .duration(2000)
                .attr("cx", d => xScale(d.Mark))
                .attr("cy", d => yScale(d.count))

        })

}

function broad() {
    main(colourPicker)
        // color picsker for single module
    function SingleColorPicker(d, m) {
        if (d.ModuleCode == m) {
            if (d.Mark <= 49) {
                return "#A9A9A9";
            } else if (d.Mark <= 59) {
                return "#FFA500";
            } else if (d.Mark <= 69) {
                return "#0000FF";
            } else if (d.Mark <= 100) {
                return "#00FF00";
            }
        } else {
            return "#FFFFFF";
        }
    }

    // Color picker fnction for the different grades
    function colourPicker(d) {
        if (d <= 49) {
            return "#A9A9A9";
        } else if (d <= 59) {
            return "#FFA500";
        } else if (d <= 69) {
            return "#0000FF";
        } else if (d <= 100) {
            return "#00FF00";
        } else {
            return "#808080";
        }
    }
    d3.select("#modulecode").on("change", function() {
        const selector = d3.select("#modulecode").node().value;
        const check = d3.select("#modulecode").node().selected = true;
        d3.select("#scatter").selectAll("*").remove();

        if (selector == "all") {
            return main(colourPicker)
        } else {
            return main2(SingleColorPicker, selector)
        }

    })

}
window.addEventListener("load", broad);