declare let d3: any;

// prepare call usages data
const DATA = [
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


function drawChart() {
    // set chart dimensions
    const margin = { right: 30, bottom: 20 };

    // set width
    const width = 712 - margin.right;

    // set height
    const height = 400 - margin.bottom;

    // selecting chart container
    const chartContainer = d3.select("#chart-container");

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
    const maxCost = d3.max(DATA, (d: any) => d.Personal + d.Home);

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
    const stackedData = stack(DATA);

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
    drawChart();
    document.querySelector('button')!.addEventListener('click', openChart);
    document.querySelector('.empty-container')!.addEventListener('click', closeChart);
}