const tableBody = document.getElementById('menuTable').querySelector('tbody');

async function populateTable() {
    const response = await fetch('/api/menu');
    const records = await response.json();

    records.forEach(r => {
        const row = tableBody.insertRow();
        const name = row.insertCell();
        const price = row.insertCell();
        const cost = row.insertCell();
        const ingredients = row.insertCell();

        name.textContent = r.name;
        price.textContent = r.price;
        cost.textContent = r.cost;
        ingredients.textContent = r.ingredients;
    });
}

populateTable();