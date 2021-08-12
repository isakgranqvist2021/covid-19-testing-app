let ids = [];
let rowsSelected = false;

function toggleRow(row, btn) {
    let tid = row.getAttribute("data-tid");

    if (row.classList.contains("selected")) {
        row.classList.remove("selected");
        ids.splice(
            ids.findIndex((id) => id === tid),
            1
        );
    } else {
        row.classList.add("selected");
        ids.push(tid);
    }

    if (ids.length > 0) {
        btn.style.display = "block";
        btn.textContent = `Export To CSV (${ids.length})`;
    } else {
        btn.style.display = "none";
    }
}

function setupRows(btn) {
    let rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        row.addEventListener("click", (e) => toggleRow(row, btn));
    });
}

function selectAll(btn) {
    let rows = document.querySelectorAll("tbody tr");
    let sAll = document.getElementById("select-all");
    sAll.addEventListener("click", (e) => {
        if (!rowsSelected) {
            rowsSelected = true;
            sAll.textContent = "Unselect All";
        } else {
            rowsSelected = false;
            sAll.textContent = "Select All";
        }

        rows.forEach((row) => toggleRow(row, btn));
    });
}

function handleClick(btn) {
    btn.addEventListener("click", async (e) => {
        const response = await fetch("/admin/export-csv", {
            method: "POST",
            body: JSON.stringify(ids),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());

        console.log(response.data);

        if (response.success) {
            window.open(response.data, "_blank").focus();
        } else {
            alert(response.message);
        }
    });
}

(function () {
    let btn = document.getElementById("export-csv");
    btn.style.display = "none";
    setupRows(btn);
    handleClick(btn);
    selectAll(btn);
})();
