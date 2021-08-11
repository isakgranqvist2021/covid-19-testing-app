const ids = [];

function setupRows() {
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
        });
    });
}

(function () {
    let btn = document.getElementById("export-csv");
    setupRows();

    btn.addEventListener("click", (e) => {
        console.log(ids);
    });
})();
