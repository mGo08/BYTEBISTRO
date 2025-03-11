const tableBody = document.getElementById('logTable').querySelector('tbody');

async function populateTable() {
    const response = await fetch('/api/dashboard');
    const logs = await response.json();

    logs.forEach(log => {
        const row = tableBody.insertRow();
        const idCell = row.insertCell();
        const timestampCell = row.insertCell();
        const panelCell = row.insertCell();
        const actionCell = row.insertCell();
        const managerCell = row.insertCell();

        idCell.textContent = log.id;
        timestampCell.textContent = log.timestamp;
        panelCell.textContent = log.panel;
        actionCell.textContent = log.action;
        managerCell.textContent = log.manager;
    });
}

populateTable();