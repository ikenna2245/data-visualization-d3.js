//Main fnction with the chart codes
function main(val) {
    // Url to where the data is on the linux server
    const dataUrl = "https://a0220767.scedt.tees.ac.uk/ICA/tidy.json"

    const width = 954;

    const margin = { top: 10, right: 120, bottom: 10, left: 40 }

    const dy = 159.16666666666666 // adjusted for the depth of nodes and margins

    const dx = 10

    const tree = d3.tree().nodeSize([dx, dy])

    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
        // selecting the div and appending the svg 
    const svg = d3.select("#tidy").append("svg")
        .attr("viewBox", [-margin.left, -margin.top, width, dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

    // Div for the tooltip
    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //checking the current value of the checkbox


    d3.json(dataUrl)
        .then(data => {
            // creating data hierarchy 
            const root = d3.hierarchy(data);

            root.x0 = dy / 2;
            root.y0 = 0;

            // number of element to display on the tree first appearance
            root.descendants().forEach((d, i) => {
                d.id = i;
                d._children = d.children;
                if (d.depth && d.data.name.length > val) d.children = null;
            });


            // group for all the links 
            const gLink = svg.append("g")
                .attr("class", "pathway");

            //group for all the nodes for each text
            const gNode = svg.append("g")
                .attr("cursor", "pointer")
                .attr("pointer-events", "all");

            // function the updates the node and links making the tree collapsible 
            // source: https://observablehq.com/@d3/collapsible-tree
            function update(source) {
                const duration = d3.event && d3.event.altKey ? 2500 : 250;
                const nodes = root.descendants().reverse();
                const links = root.links();

                // Compute the new tree layout.
                tree(root);

                let left = root;
                let right = root;
                root.eachBefore(node => {
                    if (node.x < left.x) left = node;
                    if (node.x > right.x) right = node;
                });

                const height = right.x - left.x + margin.top + margin.bottom;

                const transition = svg.transition()
                    .duration(duration)
                    .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
                    .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

                // Update the nodes…
                const node = gNode.selectAll("g")
                    .data(nodes, d => d.id);

                // Enter any new nodes at the parent's previous position.
                const nodeEnter = node.enter().append("g")
                    .attr("transform", d => `translate(${source.y0},${source.x0})`)
                    .attr("fill-opacity", 0)
                    .attr("stroke-opacity", 0)
                    .on("click", (event, d) => {
                        d.children = d.children ? null : d._children;
                        update(d);
                    })
                    .on("mouseenter", event => { // event handling for displaying the tooltips
                        event.path[0].childNodes[1].attributes[0].nodeValue = 6.0;
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        if (event.srcElement.firstElementChild.__data__.data.grade) {
                            div.html("ID: " + event.srcElement.firstElementChild.__data__.data.name + "<br/>" + "Grade: " + event.srcElement.firstElementChild.__data__.data.grade)
                                .style("left", (event.pageX + 30) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        } else {
                            div.html(event.srcElement.firstElementChild.__data__.data.name)
                                .style("left", (event.pageX + 30) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        }

                    })
                    .on("mouseleave", event => { // event handling for exiting the tooltip
                        event.path[0].childNodes[1].attributes[0].nodeValue = 2.5;
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
                //appending each circle to the nodes
                nodeEnter.append("circle")
                    .attr("r", 2.5)
                    .attr("fill", d => d._children ? "#555" : "#999")
                    .attr("stroke-width", 10);

                // appending the text to display
                nodeEnter.append("text")
                    .attr("dy", "0.31em")
                    .attr("x", d => d._children ? -6 : 6)
                    .attr("text-anchor", d => d._children ? "end" : "start")
                    .text(d => { if (d.data.grade) { return d.data.grade } else { return d.data.name } })
                    .clone(true).lower()
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-width", 3)
                    .attr("stroke", "white");

                // Transition nodes to their new position.
                const nodeUpdate = node.merge(nodeEnter).transition(transition)
                    .attr("transform", d => `translate(${d.y},${d.x})`)
                    .attr("fill-opacity", 1)
                    .attr("stroke-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                const nodeExit = node.exit().transition(transition).remove()
                    .attr("transform", d => `translate(${source.y},${source.x})`)
                    .attr("fill-opacity", 0)
                    .attr("stroke-opacity", 0);

                // Update the links…
                const link = gLink.selectAll("path")
                    .data(links, d => d.target.id)
                    .on("mouseenter", event => {
                        event.path[0].classList.add("active");
                    })
                    .on("mouseleave", event => {
                        event.path[0].classList.remove("active");
                    });

                // Enter any new links at the parent's previous position.
                const linkEnter = link.enter().append("path")
                    .attr("d", d => {
                        const o = { x: source.x0, y: source.y0 };
                        return diagonal({ source: o, target: o });
                    })
                    .on("mouseenter", event => {
                        event.path[0].classList.add("active");
                    })
                    .on("mouseleave", event => {
                        event.path[0].classList.remove("active");
                    });

                // Transition links to their new position.
                link.merge(linkEnter).transition(transition)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition(transition).remove()
                    .attr("d", d => {
                        const o = { x: source.x, y: source.y };
                        return diagonal({ source: o, target: o });
                    });

                // Stash the old positions for transition.
                root.eachBefore(d => {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }
            update(root);
        })
}

//function handling the change between macro and micro view
function broad() {
    main(7)
    d3.selectAll('[name="students"]')
        .on("change", event => {
            d3.select('#radioForm').node()['students'].checked = true; // checking the radio button when switched between macro and micro
            const d = d3.select('#radioForm').node()['students'].value; // Value of the form 
            d3.select("#tidy").selectAll("*").remove(); // clearing the previous chart to display the new one.
            if (d == "macro") {
                return main(7);
            }
            if (d == "micro") {
                return main(30);
            }
        });
}

window.addEventListener("load", broad);