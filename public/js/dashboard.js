const ids = [];

function setupRows(btn) {
    let rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        row.addEventListener("click", (e) => {
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
                btn.textContent = `Export CSV (${ids.length})`;
            } else {
                btn.style.display = "none";
            }
        });
    });
}

(function () {
    let btn = document.getElementById("export-csv");
    btn.style.display = "none";
    setupRows(btn);

    btn.addEventListener("click", async (e) => {
        const response = await fetch("/admin/export-csv", {
            method: "POST",
            body: JSON.stringify(ids),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());

        console.log(response);
    });
})();
