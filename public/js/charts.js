function typeChart() {
    let typeChartElement = document
        .querySelector(".type-chart")
        .getContext("2d");

    /*
        Current DAY total (RDT VS PCR)
        7 days total (RDT VS PCR)
        Current Month Total (RDT VS PCR)
    */

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "RDT",
                data: [1, 4, 5, 6, 7, 12, 41],
                yAxisID: "y",
                backgroundColor: "#0a58ca",
                borderColor: "#349beb",
            },
            {
                label: "PCR",
                data: [3, 5, 8, 11, 15, 31, 35],
                yAxisID: "y1",
                backgroundColor: "#28d185",
                borderColor: "#1fab6c",
            },
        ],
    };

    const config = {
        type: "line",
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
                y1: { type: "linear", display: true, position: "right" },
            },
        },
    };

    new Chart(typeChartElement, config);
}

function entitiesChart() {
    let entitiesChartelement = document
        .querySelector(".entities-chart")
        .getContext("2d");

    /*
        Current DAY total (RDT VS PCR)
        7 days total (RDT VS PCR)
        Current Month Total (RDT VS PCR)
    */

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "RDT",
                data: [1, 4, 5, 6, 7, 12, 41],
                yAxisID: "y",
                backgroundColor: "#0a58ca",
                borderColor: "#349beb",
            },
            {
                label: "PCR",
                data: [3, 5, 8, 11, 15, 31, 35],
                yAxisID: "y1",
                backgroundColor: "#28d185",
                borderColor: "#1fab6c",
            },
        ],
    };

    const config = {
        type: "line",
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
                y1: { type: "linear", display: true, position: "right" },
            },
        },
    };

    new Chart(entitiesChartelement, config);
}

function statusChart() {
    let statusChartElement = document
        .querySelector(".status-chart")
        .getContext("2d");

    /*
        Current DAY total (RDT VS PCR)
        7 days total (RDT VS PCR)
        Current Month Total (RDT VS PCR)
    */

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "RDT",
                data: [1, 4, 5, 6, 7, 12, 41],
                yAxisID: "y",
                backgroundColor: "#0a58ca",
                borderColor: "#349beb",
            },
            {
                label: "PCR",
                data: [3, 5, 8, 11, 15, 31, 35],
                yAxisID: "y1",
                backgroundColor: "#28d185",
                borderColor: "#1fab6c",
            },
        ],
    };

    const config = {
        type: "line",
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
                y1: { type: "linear", display: true, position: "right" },
            },
        },
    };

    new Chart(statusChartElement, config);
}

function empChart() {
    let empChartElement = document
        .querySelector(".employement-chart")
        .getContext("2d");

    /*
        Current DAY total (RDT VS PCR)
        7 days total (RDT VS PCR)
        Current Month Total (RDT VS PCR)
    */

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "RDT",
                data: [1, 4, 5, 6, 7, 12, 41],
                yAxisID: "y",
                backgroundColor: "#0a58ca",
                borderColor: "#349beb",
            },
            {
                label: "PCR",
                data: [3, 5, 8, 11, 15, 31, 35],
                yAxisID: "y1",
                backgroundColor: "#28d185",
                borderColor: "#1fab6c",
            },
        ],
    };

    const config = {
        type: "line",
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
                y1: { type: "linear", display: true, position: "right" },
            },
        },
    };

    new Chart(empChartElement, config);
}

typeChart();
entitiesChart();
statusChart();
empChart();
