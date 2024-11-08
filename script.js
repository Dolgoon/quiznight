let tables = [];
const maxPeoplePerTable = 6;

document.getElementById('personName').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addAndAssignPerson();
    }
});

function setupTables(newTableCount) {
    let allPeople = tables.flatMap(table => table.people);

    tables = Array.from({ length: newTableCount }, (_, i) => ({
        name: `Table ${i + 1}`,
        people: []
    }));

    allPeople.forEach((person, index) => {
        tables[index % newTableCount].people.push(person);
    });

    renderTables();
}

function incrementTableCount() {
    const tableCountInput = document.getElementById('tableCount');
    tableCountInput.value = parseInt(tableCountInput.value) + 1;
    setupTables(parseInt(tableCountInput.value));
}

function decrementTableCount() {
    const tableCountInput = document.getElementById('tableCount');
    if (tableCountInput.value > 1) {
        tableCountInput.value = parseInt(tableCountInput.value) - 1;
        setupTables(parseInt(tableCountInput.value));
    }
}

function addAndAssignPerson() {
    const name = document.getElementById('personName').value.trim();
    const totalPeople = tables.reduce((acc, table) => acc + table.people.length, 0);

    if (!name) {
        alert("Please enter a valid name.");
        return;
    }

    if (totalPeople >= tables.length * maxPeoplePerTable) {
        alert("All tables are full. Please remove a person to add a new one.");
        return;
    }

    let attempts = 0;
    let assigned = false;
    while (!assigned && attempts < tables.length) {
        const randomTableIndex = Math.floor(Math.random() * tables.length);
        const table = tables[randomTableIndex];

        if (table.people.length < maxPeoplePerTable) {
            table.people.push(name);
            alert(`${name} is added to ${table.name}`);
            assigned = true;
        }
        attempts++;
    }

    if (assigned) {
        document.getElementById('personName').value = '';
        renderTables();
    }
}

function removePerson(tableIndex, personIndex) {
    tables[tableIndex].people.splice(personIndex, 1);
    renderTables();
}

function renameTable(index) {
    const newName = prompt("Enter new table name:");
    if (newName) {
        tables[index].name = newName;
        renderTables();
    }
}

function renderTables() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    tables.forEach((table, i) => {
        const tableEl = document.createElement('div');
        tableEl.className = 'table';

        const tableHeader = document.createElement('div');
        tableHeader.className = 'table-header';

        const tableName = document.createElement('strong');
        tableName.textContent = table.name;
        tableHeader.appendChild(tableName);

        const renameButton = document.createElement('button');
        renameButton.className = 'rename-btn';
        renameButton.onclick = () => renameTable(i);
        renameButton.innerHTML = `<img src="https://img.icons8.com/material-outlined/24/1E3A5F/pencil.png" alt="Rename">`;
        tableHeader.appendChild(renameButton);

        tableEl.appendChild(tableHeader);

        table.people.forEach((person, personIndex) => {
            const personEl = document.createElement('div');
            personEl.className = 'person-item';
            personEl.textContent = person;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.textContent = "X";
            removeButton.onclick = () => removePerson(i, personIndex);

            personEl.appendChild(removeButton);
            tableEl.appendChild(personEl);
        });

        tableContainer.appendChild(tableEl);
    });
}


function renderTables() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    tables.forEach((table, i) => {
        const tableEl = document.createElement('div');
        tableEl.className = 'table';

        if (table.people.length >= maxPeoplePerTable) {
            tableEl.classList.add('full'); // Apply the "full" class if table is at max capacity
        }

        const tableHeader = document.createElement('div');
        tableHeader.className = 'table-header';

        const tableName = document.createElement('strong');
        tableName.textContent = table.name;
        tableHeader.appendChild(tableName);

        const renameButton = document.createElement('button');
        renameButton.className = 'rename-btn';
        renameButton.onclick = () => renameTable(i);
        renameButton.innerHTML = `<img src="https://img.icons8.com/material-outlined/24/1E3A5F/pencil.png" alt="Rename">`;
        tableHeader.appendChild(renameButton);

        tableEl.appendChild(tableHeader);

        table.people.forEach((person, personIndex) => {
            const personEl = document.createElement('div');
            personEl.className = 'person-item';
            personEl.textContent = person;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.textContent = "X";
            removeButton.onclick = () => removePerson(i, personIndex);

            personEl.appendChild(removeButton);
            tableEl.appendChild(personEl);
        });

        tableContainer.appendChild(tableEl);
    });
}

// Call the setup function at the bottom if needed
setupTables(15);
