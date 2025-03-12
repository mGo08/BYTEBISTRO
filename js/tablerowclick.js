function handleTableRowClick(tableSelector, editButtonId, deleteButtonId, baseUrl) {
    const table = document.querySelector(tableSelector);
    const editButton = document.getElementById(editButtonId);
    const deleteButton = document.getElementById(deleteButtonId);

    let selectedId = null;

    table.addEventListener('click', (event) => {
        const row = event.target.closest('tr');

        if (row && event.target.tagName !== "TH") {
            // Remove 'selected' class from any previously selected row
            const selectedRow = document.querySelector('tr.selected');
            if (selectedRow) {
                selectedRow.classList.remove('selected');
            }

            // Add 'selected' class to the clicked row
            row.classList.add('selected');

            // Get the employee ID from the data attribute
            selectedId = row.cells[0].textContent;

            editButton.href = `${baseUrl}/edit/${selectedId}`;
            deleteButton.href = `${baseUrl}/delete/${selectedId}`;
        }
    });
}