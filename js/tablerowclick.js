function handleTableRowClick(tableSelector, links) {
    const table = document.querySelector(tableSelector);

    let selectedId = null;

    table.addEventListener('click', (event) => {
        const row = event.target.closest('tr');

        if (row && row.classList.contains('selected')) {
            row.classList.remove('selected');
            links.forEach(e => {
                const btn = document.getElementById(e.id);
                btn.href = `${e.href}`;
            });
        } 
        else if (event.target.tagName !== "TH") {
            // Remove 'selected' class from any previously selected row
            const selectedRow = document.querySelector('tr.selected');
            if (selectedRow) {
                selectedRow.classList.remove('selected');
            }

            // Add 'selected' class to the clicked row
            row.classList.add('selected');

            // Get the employee ID from the data attribute
            selectedId = row.cells[0].textContent;

            links.forEach(e => {
                const btn = document.getElementById(e.id);
                btn.href = `${e.href}/${selectedId}`;
            });
        }
    });
}