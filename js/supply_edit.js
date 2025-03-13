const form = document.getElementById("addSupplyForm");
form.addEventListener('submit', async (e) => {
    const itemGroupsContainer = document.getElementById("itemGroupsContainer");
    const i = itemGroupsContainer.childElementCount;
    e.preventDefault();

    const supplier_name = document.getElementById("supplier_name").value;
    const supplyItems=[
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

        supplyItems.push({
            inventory_item_id: inventory_item_id,
            quantity: quantity,
            cost: cost
        });
    }

    const supply = { supplier_name: supplier_name };
    const action = document.getElementById("action").value;

    const id = document.getElementById("order_supply_id").textContent;
    const response = await fetch(`/supply/edit/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supply, action, supplyItems })
    });
    window.location.href = "/supply";
});