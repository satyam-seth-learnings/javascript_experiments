// prepare call usages data
var DATA = [
    {
        day: "S",
        Personal: 10,
        Home: 20
    },
    {
        day: "M",
        Personal: 20,
        Home: 50
    },
    {
        day: "T",
        Personal: 50,
        Home: 10
    },
    {
        day: "W",
        Personal: 14,
        Home: 20
    },
    {
        day: "TH",
        Personal: 6,
        Home: 47
    },
    {
        day: "F",
        Personal: 10.8,
        Home: 7.8
    },
];
function drawChart() {
    // set chart dimensions
    var margin = { right: 30, bottom: 20 };
    // set width
    var width = 712 - margin.right;
    // set height
    var height = 400 - margin.bottom;
    // selecting chart container
    var chartContainer = d3.select("#chart-container");
    // appending svg tag for chart
    var chart = chartContainer
        .append("svg")
        .attr("viewBox", "0 0 ".concat(width + margin.right, " ").concat(height + margin.bottom + 20))
        // Append g tag for set margin
        .append("g")
        .attr("transform", "translate(0,".concat(margin.bottom, ")"));
    // prepare days data for x axis scale
    var days = ["S", "S", "M", "T", "W", "TH", "F", "S"];
    // crate x axis scale
    var x = d3.scaleBand()
        .domain(days)
        .range([0, width])
        .padding([0.2]);
    // append bottom scale
    chart.append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));
    // get max cost value from data
    var maxCost = d3.max(DATA, function (d) { return d.Personal + d.Home; });
    // crate y axis scale
    var y = d3.scaleLinear()
        .domain([0, maxCost])
        .range([height, 0]);
    // append right scale
    chart
        .append("g")
        .attr("class", "axis-scale")
        .attr("transform", "translate(" + width + ")")
        .call(d3.axisRight(y));
    // prepare data for stacked phone numbers profile
    var labels = ["Personal", "Home"];
    // create stack for all phone numbers
    var stack = d3.stack().keys(labels);
    // creating stacked data
    var stackedData = stack(DATA);
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
        .attr("fill", function (d) { return color(d.key); })
        // appending bar for each label for each day
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.data.day); })
        .attr("y", function (d) {
        return y(d[1]);
    })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());
}
;
// open chart
function openChart() {
    document.querySelector('.setting-container').classList.remove('hidden');
}
// close chart
function closeChart() {
    document.querySelector('.setting-container').classList.add('hidden');
}
window.onload = function () {
    drawChart();
    document.querySelector('button').addEventListener('click', openChart);
    document.querySelector('.empty-container').addEventListener('click', closeChart);
};
