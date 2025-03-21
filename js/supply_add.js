const form = document.getElementById("addSupplyForm");
form.addEventListener('submit', async (e) => {
    const i = itemGroupsContainer.childElementCount;
    e.preventDefault();

    const supplier_name = document.getElementById("supplier_name").value;
    const items=[
        {
            inventory_item_id: document.getElementById(`inventory_item_id`).value,
            quantity: document.getElementById(`quantity`).value,
            cost: document.getElementById(`cost`).value
        }
    ];
    for (let x=0; x<i; x++) {
        const inventory_item_id = document.getElementById(`inventory_item_id${x}`).value;
        const quantity = document.getElementById(`quantity${x}`).value;
        const cost = document.getElementById(`cost${x}`).value;

        items.push({
            inventory_item_id: inventory_item_id,
            quantity: quantity,
            cost: cost
        });
    }

    const supply = { supplier_name: supplier_name };
    const action = document.getElementById("action").value;

    const response = await fetch('/supply/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supply, action, items })
    });
    window.location.href = "/supply";
});