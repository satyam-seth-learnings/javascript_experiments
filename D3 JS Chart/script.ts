declare let d3: any;

interface BarChartData {
    day: string;
    calls: number;
    cost: number;
}

// prepare call usages data
const BAR_CHART_DATA: BarChartData[] = [
    {
        day: "S",
        calls: 10,
        cost: 20,
    },
    {
        day: "M",
        calls: 20,
        cost: 50,
    },
    {
        day: "T",
        calls: 50,
        cost: 10,
    },
    {
        day: "W",
        calls: 14,
        cost: 20,
    },
    {
        day: "TH",
        calls: 6,
        cost: 47,
    },
    {
        day: "F",
        calls: 10.8,
        cost: 7.8,
    },
];



function drawBarChart() {
    // set chart dimensions
    const margin = { right: 30, bottom: 20 };

    // set width
    const width = 712 - margin.right;

    // set height
    const height = 400 - margin.bottom;

    // selecting chart container
    const chartContainer = d3.select("#bar-chart-container");

    // appending svg tag for chart
    const chart = chartContainer
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.right} ${height + margin.bottom + 20}`)
        // Append g tag for set margin
        .append("g")
        .attr("transform", `translate(0,${margin.bottom})`);

    // prepare days data for x axis scale
    const days = ["S", "S", "M", "T", "W", "TH", "F", "S"];

    // crate x axis scale
    const x = d3.scaleBand()
        .domain(days)
        .range([0, width])
        .padding([0.2]);

    // append bottom scale
    chart.append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // get max cost value from data
    const maxCost = d3.max(STACKED_CHART_DATA, (d: any) => d.Personal + d.Home);

    // crate y axis scale
    const y = d3.scaleLinear()
        .domain([0, maxCost])
        .range([height, 0]);

    // append right scale
    chart.append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(" + width + ")")
        .call(d3.axisRight(y));

    const tooltip = chart.append('g')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // append text tag to show total cost
    tooltip.append('text')
        .attr('class', 'cost');

    // append text tag to show number of calls
    tooltip.append('text')
        .attr('class', 'calls');

    // // append g tag for tooltip container
    // const tooltip = chartContainer.append('div')
    //     .attr('class', 'tooltip')
    //     .style('position', 'absolute')
    //     .style('opacity', 0)
    //     .style('color', 'white')
    //     .style("background-color", "black")
    //     .style("border", "solid")
    //     .style("border-color", "gray")
    //     .style("border-width", "2px")
    //     .style("border-radius", "5px")
    //     .style("padding", "5px")

    // // append text tag to show total cost
    // tooltip.append('p')
    //     .attr('class', 'cost');

    // // append text tag to show number of calls
    // tooltip.append('p')
    //     .attr('class', 'calls');


    // // hide tooltip onMouseleave on bar
    // const onMouseleave = () => {
    //     d3.select('.tooltip').style('opacity', 0);
    // };


    // // show tooltip onMouseover on bar
    // const onMouseover = (e: Event, d: any) => {
    //     d3.select('.tooltip').style('opacity', 1);

    //     console.log(d3.pointer(e));
    //     console.log((width / d3.pointer(e)[0]) * 100);

    //     // set tooltip position
    //     d3.select('.tooltip')
    //         .style('left', (d3.pointer(e)[0] + 10) + 'px')
    //     // .style("left", ((width / d3.pointer(e)[0]) * 100) + "%")
    //     // .style("top", (height / d3.pointer(this)[1]) + "%");
    //     // .attr('transform', `translate(${x(d.day)}, ${y(d.cost) - 20})`);

    //     // set current bar total cost info
    //     d3.select('.tooltip .cost')
    //         .text(`Total Cost - ${d.cost}`);

    //     // set current bar number of calls info
    //     d3.select('.tooltip .calls')
    //         .text(`Total Calls - ${d.calls}`)
    //         .attr('transform', 'translate(0, 15)');
    // }

    // show bars
    chart.selectAll()
        .data(BAR_CHART_DATA)
        .enter()
        .append("rect")
        .attr("x", (d: any) => x(d.day))
        .attr("y", (d: any) => y(d.cost))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => height - y(d.cost))
        .attr("fill", "#FFC107")
        .on('mouseover', (e: Event, d: any) => {
            tooltip.style('opacity', 1)
                .attr('transform', `translate(${x(d.day)}, ${y(d.cost) - 75})`);

            // set current bar total cost info
            tooltip.select('.cost')
                .text(`Total Cost - ${d.cost}`)

            // set current bar number of calls info
            tooltip.select('.calls')
                .text(`Total Calls - ${d.calls}`)
                .attr('transform', 'translate(0, 20)');

        })
        .on('mouseleave', () => {
            tooltip.style('opacity', 0);
        });

    // .on("mouseover", function (e: Event, d: any) {
    //     d3.select(this)
    //         .attr("opacity", 0.8);
    //     onMouseover(e, d);
    // })
    // .on("mouseout", function (d: any) {
    //     d3.select(this)
    //         .attr("opacity", 1);

    //     onMouseleave();
    // });


    // show top cost text
    chart.selectAll()
        .data(BAR_CHART_DATA)
        .enter()
        .append("text")
        .attr("x", (d: any) => x(d.day) + x.bandwidth() / 2)
        .attr("y", (d: any) => y(d.cost) - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text((d: any) => `Cost ${d.cost}`);

    // show top calls text
    chart.selectAll()
        .data(BAR_CHART_DATA)
        .enter()
        .append("text")
        .attr("x", (d: any) => x(d.day) + x.bandwidth() / 2)
        .attr("y", (d: any) => y(d.cost) - 25)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text((d: any) => `Calls ${d.calls}`);



};


interface StackedChartData {
    day: string;
    Personal: number;
    Home: number;
}

// prepare call usages data
const STACKED_CHART_DATA: StackedChartData[] = [
    {
        day: "S",
        Personal: 10,
        Home: 20,
    },
    {
        day: "M",
        Personal: 20,
        Home: 50,
    },
    {
        day: "T",
        Personal: 50,
        Home: 10,
    },
    {
        day: "W",
        Personal: 14,
        Home: 20,
    },
    {
        day: "TH",
        Personal: 6,
        Home: 47,
    },
    {
        day: "F",
        Personal: 10.8,
        Home: 7.8,
    },
];


function drawStackedChart() {
    // set chart dimensions
    const margin = { right: 30, bottom: 20 };

    // set width
    const width = 712 - margin.right;

    // set height
    const height = 400 - margin.bottom;

    // selecting chart container
    const chartContainer = d3.select("#stacked-chart-container");

    // appending svg tag for chart
    const chart = chartContainer
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.right} ${height + margin.bottom + 20}`)
        // Append g tag for set margin
        .append("g")
        .attr("transform", `translate(0,${margin.bottom})`);

    // prepare days data for x axis scale
    const days = ["S", "S", "M", "T", "W", "TH", "F", "S"];

    // crate x axis scale
    const x = d3.scaleBand()
        .domain(days)
        .range([0, width])
        .padding([0.2]);

    // append bottom scale
    chart.append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // get max cost value from data
    const maxCost = d3.max(STACKED_CHART_DATA, (d: any) => d.Personal + d.Home);

    // crate y axis scale
    const y = d3.scaleLinear()
        .domain([0, maxCost])
        .range([height, 0]);

    // append right scale
    chart
        .append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(" + width + ")")
        .call(d3.axisRight(y));

    // prepare data for stacked phone numbers profile
    const labels = ["Personal", "Home"];

    // create stack for all phone numbers
    const stack = d3.stack().keys(labels);


    // creating stacked data
    const stackedData = stack(STACKED_CHART_DATA);

    console.log(stackedData);

    // color palette = one color per phone number label
    var color = d3
        .scaleOrdinal()
        .domain(labels)
        .range(["#4BA6EE", "#67AD5B"]);

    // show bars
    chart
        // Append g tag to group the bars
        .append("g")
        // Append g tab for each phone number label
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", (d: any) => color(d.key))
        // appending bar for each label for each day
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d: any) => d)
        .enter()
        .append("rect")
        .attr("x", (d: any) => x(d.data.day))
        .attr("y", (d: any) => {
            return y(d[1]);
        })
        .attr("height", (d: any) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

};


// open chart
function openChart() {
    document.querySelector('.setting-container')!.classList.remove('hidden')
}

// close chart
function closeChart() {
    document.querySelector('.setting-container')!.classList.add('hidden')
}

window.onload = () => {
    drawBarChart();
    drawStackedChart();
    document.querySelector('button')!.addEventListener('click', openChart);
    document.querySelector('.empty-container')!.addEventListener('click', closeChart);
}