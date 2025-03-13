const addItemBtn = document.getElementById("addItemBtn");
const itemGroup = document.querySelector('.item-group');
const itemGroupsContainer = document.getElementById('itemGroupsContainer');

addItemBtn.addEventListener("click", () => {
    const newItemGroup = itemGroup.cloneNode(true);
    const i = itemGroupsContainer.childElementCount;

    // Clear input values in the cloned group
    newItemGroup.querySelectorAll('input, select').forEach(input => {
        input.value = '';
        input.name = `${input.name}_${i}`;
        input.id = `${input.id}${i}`;
    });

    // Append the cloned group to the container
    itemGroupsContainer.appendChild(newItemGroup);
});