/*
    Current DAY total (RDT VS PCR)
    7 days total (RDT VS PCR)
    Current Month Total (RDT VS PCR)

    Current Month data by entities (Entity A Vs Entity B Vs Entity C vs etc.)
    Current month data by employment status. (Employee vs vendors/Guests)
*/

class CustomChart {
    constructor(selector, label) {
        this.label = label;
        this.element = document.querySelector(selector).getContext("2d");
        this.mode = "dd";
        this.chart = null;

        document
            .getElementById("graph-mode")
            .addEventListener("change", (e) => {
                this.mode = e.target.value;
                this.chart.destroy();
                this.init();
            });
    }

    data() {
        return [
            {
                label: this.label,
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ];
    }

    labels() {
        switch (this.mode) {
            case "dd":
                return [moment(new Date()).format("dddd")];
            case "ww":
                return [...new Array(7)]
                    .map((i, idx) =>
                        moment().startOf("day").subtract(idx, "days")
                    )
                    .map((d) => moment(d).format("dddd"));
            case "mm":
                return [...new Array(30)]
                    .map((i, idx) =>
                        moment().startOf("day").subtract(idx, "days")
                    )
                    .map((d) => moment(d).format("dddd"));
        }
    }

    init() {
        const data = {
            labels: this.labels(),
            datasets: this.data(),
        };

        this.chart = new Chart(this.element, {
            type: "bar",
            data: data,
            options: {
                responsive: true,
                stacked: false,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                scales: {
                    y: { type: "linear", display: true, position: "left" },
                    y1: {
                        type: "linear",
                        display: true,
                        position: "right",
                    },
                },
            },
        });
    }
}

async function init() {
    const res = await fetch("/admin/graph-data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());

    if (res.success) {
        [
            new CustomChart(".type-chart", "type"),
            new CustomChart(".entities-chart", "entities"),
            new CustomChart(".status-chart", "status"),
            new CustomChart(".employement-chart", "employement"),
        ].forEach((c) => c.init());
    }
}

init();
