const tableBody = document.getElementById('employeeTable').querySelector('tbody');

async function populateTable() {
    const response = await fetch('/api/employees');
    const employees = await response.json();

    employees.forEach(e => {
        const row = tableBody.insertRow();
        const id = row.insertCell();
        const name = row.insertCell();
        const role = row.insertCell();
        const sched = row.insertCell();
        const salary = row.insertCell();
        const email = row.insertCell();

        id.textContent = e.id;
        name.textContent = e.name;
        role.textContent = e.role;
        sched.textContent = e.sched;
        salary.textContent = e.salary;
        email.textContent = e.email;
    });
}

populateTable();