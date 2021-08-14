function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

const getDays = (days) =>
    [...new Array(days)]
        .map((i, idx) => moment().startOf("day").subtract(idx, "days"))
        .reverse();

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
                { label: "PCR", datapoints: checkIfBtwn(rawData.pcr, days) },
                { label: "RDT", datapoints: checkIfBtwn(rawData.rdt, days) },
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
                    datapoints: checkIfBtwn(rawData.employee, days),
                },
                {
                    label: "vendor/guest",
                    datapoints: checkIfBtwn(rawData.vendors_guests, days),
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
            borderWidth: 2,
            backgroundColor: [
                "#0a58ca",
                "#696969",
                "#146c43",
                "#a124a3",
                "#d9344a",
                "#baac29",
                "#148e9c",
            ],
            borderColor: [
                "#1f6dde",
                "#7d7d7d",
                "#1d8a57",
                "#c249c4",
                "#e34d61",
                "#d9ca3d",
                "#1eb8c9",
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
        let config = {
            type: this.mode === "mm" ? "line" : "bar",
            data: {
                labels: this.labels(),
                datasets: this.getData(),
            },
            options: {
                responsive: true,
                stacked: false,
                plugins: {
                    legend: {
                        title: {
                            text: this.label,
                        },
                    },
                },
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                scales: {
                    y: { type: "linear", display: true, position: "left" },
                },
            },
        };

        this.chart = new Chart(this.element, config);
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
