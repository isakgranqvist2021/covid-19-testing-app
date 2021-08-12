/*
    Current DAY total (RDT VS PCR)
    7 days total (RDT VS PCR)
    Current Month Total (RDT VS PCR)

    Current Month data by entities (Entity A Vs Entity B Vs Entity C vs etc.)
    Current month data by employment status. (Employee vs vendors/Guests)
*/

const getDays = (days) =>
    [...new Array(days)].map((i, idx) =>
        moment().startOf("day").subtract(idx, "days")
    );

function checkIfBtwn(rawData, days) {
    let values = [];
    for (let i = 0; i < days.length; i++) {
        values.push({
            value: 0,
            sday: days[i].startOf("day").toString(),
            eday: days[i].endOf("day").toString(),
        });
    }

    rawData.forEach((t) => {
        values.forEach((v, i) => {
            let isBtwn = moment(t.createdAt).isBetween(v.sday, v.eday);

            if (isBtwn) {
                v.value++;
            }
        });
    });

    return values.map((v) => v.value); // should be same length as days variable
}

function convertData(rawData, mode, dataset) {
    let days = (() => {
        if (mode === "dd") return getDays(1);
        if (mode === "ww") return getDays(7);
        if (mode === "mm") return getDays(30);
    })();

    let datapoints = (() => {
        if (dataset === "status") {
            return [
                {
                    label: "positive",
                    datapoints: checkIfBtwn(rawData.positive, days),
                },
                {
                    label: "negative",
                    datapoints: checkIfBtwn(rawData.negative, days),
                },
            ];
        } else if (dataset === "type") {
            return [
                {
                    label: "PCR",
                    datapoints: checkIfBtwn(rawData.pcr, days),
                },
                {
                    label: "RDT",
                    datapoints: checkIfBtwn(rawData.rdt, days),
                },
            ];
        } else if (dataset === "entities") {
            let n = 0;
            let d = [];
            let keys = [];

            for (let k in rawData) {
                n++;
                keys.push(k);
            }

            for (let i = 0; i < n; i++) {
                d.push({
                    label: keys[i],
                    datapoints: checkIfBtwn(rawData[keys[i]], days),
                });
            }

            return d;
        } else if (dataset === "employement") {
            return [
                {
                    label: "employee",
                    datapoints: (() => {
                        return [65, 59, 80, 81, 56, 55, 40];
                    })(),
                },
                {
                    label: "vendor/guest",
                    datapoints: (() => {
                        return [65, 59, 80, 81, 56, 55, 40];
                    })(),
                },
            ];
        }
    })();

    return datapoints;
}

class CustomChart {
    constructor(selector, label, rawData) {
        this.label = label;
        this.element = document.querySelector(selector).getContext("2d");
        this.mode = "dd";
        this.chart = null;
        this.rawData = rawData;
        this.data = convertData(this.rawData, this.mode, this.label);
    }

    reload(withMode) {
        this.mode = withMode;
        this.data = convertData(this.rawData, this.mode, this.label);
        this.chart.destroy();
        this.init();
    }

    getData() {
        let properties = {
            borderWidth: 1,
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
        };

        return this.data.map((d) => {
            return {
                ...properties,
                label: d.label,
                data: [...d.datapoints],
            };
        });
    }

    labels() {
        switch (this.mode) {
            case "dd":
                return getDays(1).map((d) => moment(d).format("dddd"));
            case "ww":
                return getDays(7).map((d) => moment(d).format("dddd"));
            case "mm":
                return getDays(30).map((d) => moment(d).format("dddd"));
        }
    }

    init() {
        this.chart = new Chart(this.element, {
            type: "bar",
            data: {
                labels: this.labels(),
                datasets: this.getData(),
            },
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

    console.log(res);

    if (res.success) {
        const charts = [
            new CustomChart(".type-chart", "type", res.data.typeData),
            new CustomChart(".entities-chart", "entities", res.data.entData),
            new CustomChart(".status-chart", "status", res.data.statusData),
            new CustomChart(
                ".employement-chart",
                "employement",
                res.data.empData
            ),
        ];

        document
            .getElementById("graph-mode")
            .addEventListener("change", (e) => {
                charts.forEach((chart) => chart.reload(e.target.value));
            });

        charts.forEach((c) => c.init());
    }
}

init();
