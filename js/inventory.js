const tableBody = document.getElementById('invTable').querySelector('tbody');

async function populateTable() {
    const response = await fetch('/api/inventory');
    const records = await response.json();

    records.forEach(r => {
        const row = tableBody.insertRow();
        const id = row.insertCell();
        const name = row.insertCell();
        const quantity = row.insertCell();
        const cost_per_unit = row.insertCell();

        id.textContent = r.id;
        name.textContent = r.name;
        quantity.textContent = r.quantity;
        cost_per_unit.textContent = r.cost_per_unit;
    });
}

populateTable();