let rows = document.querySelectorAll("tbody tr");
let selectAllBtn = document.getElementById("select-all");
let exportBtn = document.getElementById("export-csv");
let rowsSelected = false;
let ids = [];

function selectRow(row) {
    if (!row.classList.contains("selected")) {
        row.classList.add("selected");
        ids.push(row.getAttribute("data-tid"));
    } else {
        row.classList.remove("selected");
        ids.splice(
            ids.findIndex((id) => id === row.getAttribute("data-tid")),
            1
        );
    }

    exportBtn.textContent = `Export To CSV (${ids.length})`;
}

function selectRows() {
    selectAllBtn.textContent = "Unselect All";
    rowsSelected = true;
    rows.forEach((row) => {
        row.classList.add("selected");
        ids.push(row.getAttribute("data-tid"));
    });
    exportBtn.textContent = `Export To CSV (${ids.length})`;
}

function unSelectRows() {
    selectAllBtn.textContent = "Select All";
    rowsSelected = false;
    rows.forEach((row) => row.classList.remove("selected"));
    ids = [];
    exportBtn.textContent = "Export To CSV";
}

async function submitForExport() {
    if (ids.length <= 0) return alert("no data selected");
    console.log(ids);
    // const response = await fetch("/admin/export-csv", {
    //     method: "POST",
    //     body: JSON.stringify(ids),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }).then((res) => res.json());

    // if (response.success) {
    //     window.open(response.data, "_blank").focus();
    // } else {
    //     alert(response.message);
    // }
}

(function init() {
    selectAllBtn.addEventListener("click", () => {
        if (!rowsSelected) return selectRows();
        if (rowsSelected) return unSelectRows();
    });

    rows.forEach((row) => row.addEventListener("click", () => selectRow(row)));
    exportBtn.addEventListener("click", () => submitForExport());
})();

/*
    We should be able to select data by the following criteria for export or to view stats:
    DATE X or DATE X
    MONTH (JANUARY, FEBUARY ETC)
    ENTITY’s FOR DATE, MONTH or YEAR.
    STATUS for DATE, MONTH or YEAR.
    TEST TYPE for DATE, MONTH or YEAR.
*/
