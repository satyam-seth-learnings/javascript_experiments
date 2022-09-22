class BarChart {
    constructor(namespace, parent) {
        this.data = [
            {
                day: 'sun',
                hour: 1,
            },
            {
                day: 'mon',
                hour: 2,
            },
            {
                day: 'tue',
                hour: 3,
            },
            {
                day: 'wed',
                hour: 4,
            },
            {
                day: 'thu',
                hour: 5,
            },
            {
                day: 'fri',
                hour: 1,
            },
            {
                day: 'sat',
                hour: 2,
            },
        ];
        this.namespace = namespace;
        this.parent = parent;
    }
    get chartId() {
        return `${this.namespace}-bar-chart`;
    }
    get chart() {
        return document.getElementById(this.chartId);
    }
    getChart() {
        const chart = document.createElement('div');
        chart.className = 'chart';
        chart.id = this.chartId;
        chart.appendChild(this.getBarsContainer());
        chart.appendChild(this.getHoursContainer());
        chart.appendChild(this.getDaysContainer());
        return chart;
    }
    getHoursContainer() {
        const hoursContainer = document.createElement('div');
        hoursContainer.classList.add('hours');
        for (let i = 5; i >= 1; i--) {
            const hourContainer = document.createElement('div');
            hourContainer.classList.add('hour');
            hourContainer.innerText = `${i} hr`;
            hoursContainer.appendChild(hourContainer);
        }
        return hoursContainer;
    }
    getDaysContainer() {
        const daysContainer = document.createElement('div');
        daysContainer.classList.add('days');
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((day) => {
            const dayContainer = document.createElement('div');
            dayContainer.classList.add('day');
            dayContainer.innerText = day;
            daysContainer.appendChild(dayContainer);
        });
        return daysContainer;
    }
    getBarsContainer() {
        const barsContainer = document.createElement('div');
        barsContainer.classList.add('bars');
        this.data.forEach(info => {
            const bar = document.createElement('div');
            bar.classList.add('bar', info.day);
            bar.style.height = `${info.hour * 20}%`;
            barsContainer.appendChild(bar);
        });
        return barsContainer;
    }
    render() {
        this.parent.appendChild(this.getChart());
    }
}
window.onload = () => {
    const chartContainer = document.querySelector('.chart-container');
    const barChart = new BarChart('demo', chartContainer);
    barChart.render();
};
